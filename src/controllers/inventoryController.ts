import { Request, Response } from 'express'
import axios from 'axios'
import paginate from '../lib/paginate'

const supplierAPI : { [key: string]: string } = {
    default: 'https://fakestoreapi.com/products',
    fakeStore: 'https://fakestoreapi.com/products',
    brandA: 'https://brandA.com',
    brandB: 'https://brandB.com',
  }

interface GetInventoryRequestBody {
    sort?: string
    filter?: string
    brand?: string
    page: number
    per_page: number
}

export const getInventory = async (req: Request, res: Response) => {
  try {
    const { sort, filter, brand, page, per_page }: GetInventoryRequestBody = req.body
    const supplierURL = supplierAPI[brand || 'default']
    if(!supplierURL){
        res.status(404).json({error: "Store Not Found"})
        return
    }
    let url = `${supplierURL}`

    const response = await axios.get(url)
    let data = response.data

    if (filter) {
        const filterLowerCase = filter.toLowerCase()
        data = data.filter((item: { title: string }) =>
          item.title.toLowerCase().includes(filterLowerCase)
        )
      }
    if (sort === "asc") {
        data.sort((a: { id: number }, b: { id: number }) => a.id - b.id)
      } else if (sort === "desc") {
        data.sort((a: { id: number }, b: { id: number }) => b.id - a.id)
      }
    
      const paginationResult = paginate({
        page,
        per_page,
        count: data.length,
        totalData: data.length,
      })
      const startIndex = (paginationResult.page - 1) * paginationResult.per_page
      const endIndex = startIndex + paginationResult.per_page
      const paginatedData = data.slice(startIndex, endIndex)

    res.json({
        data: paginatedData,
        ...paginationResult
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
