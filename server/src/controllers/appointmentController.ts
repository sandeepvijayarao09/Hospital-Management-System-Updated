import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import Appointment, { IAppointment } from '../models/Appointment';

class AppointmentController extends BaseController<IAppointment> {
    constructor() {
        super(Appointment);
    }

    // Override getAll to include population
    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const appointments = await this.model.find()
                .populate('patientId', 'name')
                .populate('doctorId', 'name');
            res.json(appointments);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // Keep custom logic for status update
    public async updateStatus(req: Request, res: Response): Promise<void> {
        try {
            const { status } = req.body;
            const appointment = await this.model.findByIdAndUpdate(
                req.params.id,
                { status },
                { new: true }
            );

            if (!appointment) {
                res.status(404).json({ message: 'Appointment not found' });
                return;
            }
            res.json(appointment);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}

export const appointmentController = new AppointmentController();
