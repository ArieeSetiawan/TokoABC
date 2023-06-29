import { Request, Response } from 'express'
import { PrismaClient, order } from '@prisma/client'
import axios from 'axios'
import paginate from '../lib/paginate'
const prisma = new PrismaClient()

interface GetOrdersRequestBody {
    sort?: string
    page: number
    per_page: number
}

export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
        nama_pemesan,
        alamat_pemesan,
        item_id,
        quantity,
        brand,
        created_by
      }: order = req.body

    const shop = await prisma.supplier.findFirst({
        where:{
          nama: brand
        }
      })
  
      if(!shop){
        res.status(404).json({error: "Store Not Found"})
          return
      }
      
      const supplierURL = shop.url
      if(!supplierURL){
          res.status(404).json({error: "URL is Empty"})
          return
      }
    let url = `${supplierURL}/${item_id}`

    let item = await axios.get(url)
    if(!item.data){
        res.status(404).json({error: "Item Not Found"})
        return
    }
    let total_price = item.data.price * quantity

      const newOrder = await prisma.order.create({
        data: {
          nama_pemesan,
          alamat_pemesan,
          item_id,
          quantity,
          total_price,
          brand,
          created_by
        }
      })
  
      res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getOrders = async (req: Request, res: Response) => {
  try {
    const { sort, page, per_page }: GetOrdersRequestBody = req.body
    const orders = await prisma.order.findMany()

    if (sort === "asc") {
        orders.sort((a, b) => new Date(a.created_at) < new Date(b.created_at) ? -1 : 1);
      } else if (sort === "desc") {
        orders.sort((a, b) => new Date(a.created_at) > new Date(b.created_at) ? -1 : 1);
      }
    
      const paginationResult = paginate({
        page,
        per_page,
        count: orders.length,
        totalData: orders.length,
      })
      const startIndex = (paginationResult.page - 1) * paginationResult.per_page
      const endIndex = startIndex + paginationResult.per_page
      const paginatedData = orders.slice(startIndex, endIndex)

      res.json({
        data: paginatedData,
        ...paginationResult
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
