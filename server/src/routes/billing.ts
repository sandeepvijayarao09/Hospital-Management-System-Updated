import express from 'express';
import { billingController } from '../controllers/billingController';

const router = express.Router();

router.get('/', billingController.getAll);
router.post('/', billingController.create);
router.put('/:id', billingController.update);

export default router;
