import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { PageHeader } from "../components/ui/PageHeader";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";
import { Pagination } from "../components/ui/Pagination";
import { Input, Select } from "../components/ui/Form";

interface Appointment {
  _id: string;
  patientId: { _id: string; name: string };
  doctorId: { _id: string; name: string; specialization: string } | null;
  date: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
}

interface Patient {
  _id: string;
  name: string;
}

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
}

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  // Booking Form State
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await api.get("/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Failed to fetch patients");
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await api.get("/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Failed to fetch doctors");
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedPatientId || !selectedDoctorId || !selectedDate) {
      alert("Please select a patient, a doctor and a date.");
      return;
    }

    try {
      await api.post("/appointments", {
        patientId: selectedPatientId,
        doctorId: selectedDoctorId,
        date: selectedDate,
        status: "pending",
      });
      setIsBookModalOpen(false);
      fetchAppointments();

      // Reset form
      setSelectedPatientId("");
      setSelectedDoctorId("");
      setSelectedDate("");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment");
    }
  };

  const updateStatus = async (id: string, status: "confirmed" | "cancelled") => {
    try {
      await api.put(`/appointments/${id}/status`, { status });
      fetchAppointments();
    } catch (error) {
      alert("Failed to update appointment");
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "neutral";
    }
  };

  return (
    <div>
      <PageHeader
        title="Appointments"
        description="Manage patient appointments."
        action={
          <Button onClick={() => setIsBookModalOpen(true)}>
            Book Appointment
          </Button>
        }
      />

      <Card className="overflow-hidden p-0">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading appointments...
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </tr>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment._id}>
                    <TableCell className="text-gray-900 font-medium">
                      {/* Handle both populate object and potentially unpopulated id just in case */}
                      {typeof appointment.patientId === "object"
                        ? appointment.patientId?.name
                        : "Unknown"}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {appointment.doctorId
                        ? `${appointment.doctorId.name} (${appointment.doctorId.specialization})`
                        : "Unknown"}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(appointment.date).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {appointment.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(appointment._id, "confirmed")}
                          >
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => updateStatus(appointment._id, "cancelled")}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Pagination
              totalItems={appointments.length}
              itemsPerPage={10}
              currentPage={1}
            />
          </>
        )}
      </Card>

      {/* Book Appointment Modal */}
      <Modal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        title="Book New Appointment"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsBookModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleBookAppointment}>Confirm Booking</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Select
            label="Patient"
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </Select>

          <Select
            label="Doctor"
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name} ({d.specialization})
              </option>
            ))}
          </Select>

          <Input
            label="Date & Time"
            type="datetime-local"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Appointments;
