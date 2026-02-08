import express from 'express';
import { patientController } from '../controllers/patientController';

const router = express.Router();

router.get('/', patientController.getAll);
router.post('/', patientController.create);
router.get('/:id', patientController.getById);
router.put('/:id', patientController.update);
router.delete('/:id', patientController.delete);

export default router;
