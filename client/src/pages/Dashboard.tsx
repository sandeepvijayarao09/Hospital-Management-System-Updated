import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { PageHeader } from "../components/ui/PageHeader";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";
import { Input } from "../components/ui/Form";

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
}

interface Appointment {
  _id: string;
  patientId: { name: string } | null;
  doctorId: { name: string } | null;
  date: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
}

interface Invoice {
  _id: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
}

const currency = (n: number) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD" });

const Stat: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
    <span className="block text-3xl font-bold text-primary-600">{value}</span>
    <span className="text-sm text-gray-600 font-medium">{label}</span>
  </div>
);

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [patientCount, setPatientCount] = useState(0);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");

  const load = async () => {
    try {
      const [p, d, a, b] = await Promise.all([
        api.get("/patients"),
        api.get("/doctors"),
        api.get("/appointments"),
        api.get("/billing"),
      ]);
      setPatientCount(p.data.length);
      setDoctors(d.data);
      setAppointments(a.data);
      setInvoices(b.data);
    } catch {
      console.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAddDoctor = async () => {
    if (!doctorName || !specialization) {
      alert("Please enter a name and specialization.");
      return;
    }
    try {
      await api.post("/doctors", { name: doctorName, specialization });
      setIsAddDoctorOpen(false);
      setDoctorName("");
      setSpecialization("");
      load();
    } catch {
      alert("Failed to add doctor");
    }
  };

  const now = Date.now();
  const upcoming = appointments
    .filter((a) => a.status !== "cancelled" && new Date(a.date).getTime() >= now - 60 * 60 * 1000)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const outstanding = invoices
    .filter((i) => i.status !== "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div>
      <PageHeader title="Dashboard" />

      <Card className="mb-6 bg-gradient-to-r from-primary-50 to-white border-primary-100">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          Welcome Back, {user?.name}
        </h3>
        <p className="text-gray-600">
          You are logged in as a{" "}
          <span className="font-bold uppercase text-primary-600">
            {user?.role}
          </span>
          .
        </p>
      </Card>

      {loading ? (
        <div className="p-8 text-center text-gray-500">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Stat label="Patients" value={patientCount} />
            <Stat label="Doctors" value={doctors.length} />
            <Stat label="Upcoming appointments" value={upcoming.length} />
            <Stat label="Outstanding billing" value={currency(outstanding)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Upcoming Appointments">
              {upcoming.length === 0 ? (
                <p className="text-sm text-gray-500">No upcoming appointments.</p>
              ) : (
                <ul className="space-y-3">
                  {upcoming.slice(0, 5).map((a) => (
                    <li
                      key={a._id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100"
                    >
                      <div>
                        <div className="font-medium text-gray-900">
                          {a.patientId?.name ?? "Unknown"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {a.doctorId?.name ?? "Unknown"} ·{" "}
                          {new Date(a.date).toLocaleString()}
                        </div>
                      </div>
                      <Badge variant={a.status === "confirmed" ? "success" : "warning"}>
                        {a.status}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate("/appointments")}
              >
                All Appointments
              </Button>
            </Card>

            <Card title="Doctors">
              {doctors.length === 0 ? (
                <p className="text-sm text-gray-500">No doctors added yet.</p>
              ) : (
                <ul className="space-y-3">
                  {doctors.map((d) => (
                    <li
                      key={d._id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100"
                    >
                      <span className="font-medium text-gray-900">{d.name}</span>
                      <span className="text-xs text-gray-500">{d.specialization}</span>
                    </li>
                  ))}
                </ul>
              )}
              {user?.role === "admin" && (
                <Button className="w-full mt-4" onClick={() => setIsAddDoctorOpen(true)}>
                  Add Doctor
                </Button>
              )}
            </Card>
          </div>
        </>
      )}

      <Modal
        isOpen={isAddDoctorOpen}
        onClose={() => setIsAddDoctorOpen(false)}
        title="Add Doctor"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsAddDoctorOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddDoctor}>Add Doctor</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Name"
            placeholder="e.g. Dr. Jane Smith"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
          <Input
            label="Specialization"
            placeholder="e.g. Cardiology"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
