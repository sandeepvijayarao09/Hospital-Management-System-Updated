import express from 'express';
import { doctorController } from '../controllers/doctorController';

const router = express.Router();

router.get('/', doctorController.getAll);
router.post('/', doctorController.create);
router.get('/:id', doctorController.getById);
router.put('/:id', doctorController.update);
router.delete('/:id', doctorController.delete);

export default router;
