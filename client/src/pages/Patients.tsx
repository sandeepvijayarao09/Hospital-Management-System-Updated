import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { PageHeader } from "../components/ui/PageHeader";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
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

interface Patient {
  _id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  address: string;
}

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  const [viewPatient, setViewPatient] = useState<Patient | null>(null);

  // Form State
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newGender, setNewGender] = useState("male");
  const [newContact, setNewContact] = useState("");
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get("/patients");
      setPatients(response.data);
    } catch (error) {
      setPatients([
        {
          _id: "1",
          name: "John Doe",
          age: 30,
          contact: "123-456-7890",
          gender: "male",
          address: "123 Main St",
        },
        {
          _id: "2",
          name: "Jane Smith",
          age: 25,
          contact: "987-654-3210",
          gender: "female",
          address: "456 Oak Ave",
        },
        {
          _id: "3",
          name: "Bob Johnson",
          age: 45,
          contact: "555-555-5555",
          gender: "male",
          address: "789 Pine Ln",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingPatient(null);
    setNewName("");
    setNewAge("");
    setNewGender("male");
    setNewContact("");
    setNewAddress("");
    setIsFormModalOpen(true);
  };

  const openEditModal = (patient: Patient) => {
    setEditingPatient(patient);
    setNewName(patient.name);
    setNewAge(patient.age.toString());
    setNewGender(patient.gender);
    setNewContact(patient.contact);
    setNewAddress(patient.address);
    setIsFormModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const patientData = {
        name: newName,
        age: parseInt(newAge),
        gender: newGender,
        contact: newContact,
        address: newAddress,
      };

      if (editingPatient) {
        await api.put(`/patients/${editingPatient._id}`, patientData);
      } else {
        await api.post("/patients", patientData);
      }

      setIsFormModalOpen(false);
      fetchPatients();
      // Reset form
      setEditingPatient(null);
      setNewName("");
      setNewAge("");
      setNewGender("male");
      setNewContact("");
      setNewAddress("");
    } catch (error) {
      console.error("Error saving patient:", error);
      alert("Failed to save patient");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this patient?"))
      return;
    try {
      await api.delete(`/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient");
    }
  };

  return (
    <div>
      <PageHeader
        title="Patient Management"
        description="View and manage patient records."
        action={<Button onClick={openAddModal}>Add Patient</Button>}
      />

      <Card className="overflow-hidden p-0">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading patients...
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </tr>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient._id}>
                    <TableCell className="text-gray-900 font-medium">
                      {patient.name}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {patient.age}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {patient.contact}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setViewPatient(patient)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(patient)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(patient._id)}
                          className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Pagination
              totalItems={patients.length}
              itemsPerPage={10}
              currentPage={1}
            />
          </>
        )}
      </Card>

      {/* Add/Edit Patient Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingPatient ? "Edit Patient" : "Add New Patient"}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsFormModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingPatient ? "Update Patient" : "Save Patient"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Full Name"
            placeholder="e.g. John Doe"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Age"
              type="number"
              placeholder="e.g. 30"
              value={newAge}
              onChange={(e) => setNewAge(e.target.value)}
            />
            <Select
              label="Gender"
              value={newGender}
              onChange={(e) => setNewGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          </div>
          <Input
            label="Contact Number"
            type="tel"
            placeholder="e.g. 123-456-7890"
            value={newContact}
            onChange={(e) => setNewContact(e.target.value)}
          />
          <Input
            label="Address"
            placeholder="e.g. 123 Main St"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
        </div>
      </Modal>

      {/* View Patient Modal */}
      <Modal
        isOpen={!!viewPatient}
        onClose={() => setViewPatient(null)}
        title="Patient Details"
      >
        {viewPatient && (
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Name</span>
              <span className="font-medium">{viewPatient.name}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Age</span>
              <span className="font-medium">{viewPatient.age}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Contact</span>
              <span className="font-medium">{viewPatient.contact}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Gender</span>
              <span className="font-medium capitalize">
                {viewPatient.gender}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Address</span>
              <span className="font-medium">{viewPatient.address}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Patient ID</span>
              <span className="font-mono text-sm">{viewPatient._id}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Patients;
