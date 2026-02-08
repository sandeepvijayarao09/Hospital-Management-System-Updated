import mongoose, { Schema, Document } from 'mongoose';

export interface IBilling extends Document {
    patientId: mongoose.Types.ObjectId;
    appointmentId: mongoose.Types.ObjectId;
    amount: number;
    status: 'paid' | 'pending' | 'overdue';
    paymentDate?: Date;
    createdAt: Date;
}

const BillingSchema: Schema = new Schema({
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['paid', 'pending', 'overdue'], default: 'pending' },
    paymentDate: { type: Date },
}, {
    timestamps: true
});

export default mongoose.model<IBilling>('Billing', BillingSchema);
