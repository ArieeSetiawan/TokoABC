import express from 'express';
import { getInventory } from '../controllers/inventoryController';

const router = express.Router();

router.post('/', getInventory);

export default router;
