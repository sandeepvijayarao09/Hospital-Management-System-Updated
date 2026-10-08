import { BaseController } from './BaseController';
import Doctor from '../models/Doctor';

export const doctorController = new BaseController(Doctor);
