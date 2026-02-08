import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import Billing, { IBilling } from '../models/Billing';

class BillingController extends BaseController<IBilling> {
    constructor() {
        super(Billing);
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const invoices = await this.model.find()
                .populate('patientId', 'name')
                .populate('appointmentId', 'date');
            res.json(invoices);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}

export const billingController = new BillingController();
