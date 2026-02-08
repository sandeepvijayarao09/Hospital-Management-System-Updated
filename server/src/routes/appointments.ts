import express from 'express';
import { appointmentController } from '../controllers/appointmentController';

const router = express.Router();

router.get('/', appointmentController.getAll);
router.post('/', appointmentController.create);
router.put('/:id/status', appointmentController.updateStatus);

export default router;
