import express from 'express';
import { createOrder, getOrders } from '../controllers/ordersController';

const router = express.Router();

router.post('/create', createOrder);
router.post('/', getOrders);

export default router;
