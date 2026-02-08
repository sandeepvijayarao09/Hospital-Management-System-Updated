import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
    patientId: mongoose.Types.ObjectId;
    doctorId: mongoose.Types.ObjectId;
    date: Date;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    notes: string;
}

const AppointmentSchema: Schema = new Schema({
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    notes: { type: String },
}, {
    timestamps: true
});

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);
