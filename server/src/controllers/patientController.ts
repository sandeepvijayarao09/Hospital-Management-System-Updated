import { BaseController } from './BaseController';
import Patient from '../models/Patient';

export const patientController = new BaseController(Patient);
