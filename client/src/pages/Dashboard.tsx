import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/ui/PageHeader";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { Input, Select } from "../components/ui/Form";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<{
    name: string;
    role: string;
  } | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <div>
      <PageHeader title="Dashboard" />

      <Card className="mb-8 bg-gradient-to-r from-primary-50 to-white border-primary-100">
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

      {/* ADMIN VIEW */}
      {user?.role === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="User Access Management">
            <p className="text-sm text-gray-600 mb-4">
              Control access levels and manage staff/doctor accounts.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100">
                <span className="font-medium text-gray-900">
                  Dr. Smith{" "}
                  <span className="text-xs text-gray-500 font-normal">
                    (Doctor)
                  </span>
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingUser({ name: "Dr. Smith", role: "doctor" });
                    setIsEditUserOpen(true);
                  }}
                >
                  Edit
                </Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100">
                <span className="font-medium text-gray-900">
                  Nurse Joy{" "}
                  <span className="text-xs text-gray-500 font-normal">
                    (Staff)
                  </span>
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingUser({ name: "Nurse Joy", role: "staff" });
                    setIsEditUserOpen(true);
                  }}
                >
                  Edit
                </Button>
              </div>
              <Button
                className="w-full mt-2"
                onClick={() => setIsAddUserOpen(true)}
              >
                Add New User
              </Button>
            </div>
          </Card>
          <Card title="System Overview">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
                <span className="block text-3xl font-bold text-primary-600">
                  12
                </span>
                <span className="text-sm text-primary-600 font-medium">
                  Doctors
                </span>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <span className="block text-3xl font-bold text-gray-700">
                  140
                </span>
                <span className="text-sm text-gray-600 font-medium">
                  Patients
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* DOCTOR VIEW */}
      {user?.role === "doctor" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Today's Tasks">
            <p className="text-sm text-gray-600 mb-4">
              Your appointments and rounds for today.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 mt-2 bg-primary-500 rounded-full mr-3"></span>
                <span className="text-gray-700">
                  09:00 AM - Checkup with John Doe
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 mt-2 bg-primary-500 rounded-full mr-3"></span>
                <span className="text-gray-700">10:30 AM - Surgery Prep</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 mt-2 bg-primary-500 rounded-full mr-3"></span>
                <span className="text-gray-700">02:00 PM - Ward Rounds</span>
              </li>
            </ul>
          </Card>
          <Card title="Weekly Report">
            <div className="bg-gray-50 h-32 rounded border border-gray-100 flex items-center justify-center text-gray-400 mb-4">
              [Chart Placeholder: Patients Treated]
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsReportOpen(true)}
            >
              View Detailed Reports
            </Button>
          </Card>
        </div>
      )}

      {/* PATIENT VIEW */}
      {user?.role === "patient" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="My Reports">
            <p className="text-sm text-gray-600 mb-4">
              Access your latest medical test results and history.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100">
                <span>Blood Test (Oct 2023)</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert("Downloading: Blood Test (Oct 2023)")}
                >
                  Download
                </Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100">
                <span>X-Ray (Sep 2023)</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert("Opening Viewer: X-Ray (Sep 2023)")}
                >
                  View
                </Button>
              </div>
            </div>
          </Card>
          <Card title="Book Appointment">
            <p className="text-sm text-gray-600 mb-4">
              Need to see a doctor? Schedule now.
            </p>
            <Button
              className="w-full"
              onClick={() => navigate("/appointments")}
            >
              Book New Appointment
            </Button>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Next available:{" "}
              <span className="font-semibold text-primary-600">
                Today, 4 PM
              </span>
            </p>
          </Card>
        </div>
      )}

      {/* Modals */}
      <Modal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        title="Add New User"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                alert("User Added (Mock)");
                setIsAddUserOpen(false);
              }}
            >
              Create User
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Name" placeholder="e.g. John Smith" />
          <Select label="Role">
            <option value="doctor">Doctor</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </Select>
        </div>
      </Modal>

      <Modal
        isOpen={isEditUserOpen}
        onClose={() => setIsEditUserOpen(false)}
        title="Edit User"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsEditUserOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                alert("User Updated (Mock)");
                setIsEditUserOpen(false);
              }}
            >
              Save Changes
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Name"
            defaultValue={editingUser?.name}
            placeholder="e.g. John Smith"
          />
          <Select label="Role" defaultValue={editingUser?.role}>
            <option value="doctor">Doctor</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </Select>
        </div>
      </Modal>

      <Modal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        title="Weekly Report Details"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Detailed performance metrics for the current week.
          </p>
          <div className="bg-gray-50 p-4 rounded border border-gray-100">
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Total Patients: 45</li>
              <li>Surgeries Performed: 3</li>
              <li>Consultations: 32</li>
              <li>Emergency Cases: 10</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
