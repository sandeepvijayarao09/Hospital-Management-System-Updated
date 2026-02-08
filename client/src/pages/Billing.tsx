import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { PageHeader } from "../components/ui/PageHeader";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";
import { Pagination } from "../components/ui/Pagination";
import { Modal } from "../components/ui/Modal";
import { Input, Select } from "../components/ui/Form";

interface Invoice {
  _id: string;
  patientId: { _id: string; name: string };
  amount: number;
  status: "paid" | "pending" | "overdue";
  createdAt: string;
}

interface Patient {
  _id: string;
  name: string;
}

const Billing: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form State
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"pending" | "paid" | "overdue">(
    "pending",
  );

  useEffect(() => {
    fetchInvoices();
    fetchPatients();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await api.get("/billing");
      setInvoices(response.data);
    } catch (error) {
      // Mock data fallback...
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

  const handleCreateInvoice = async () => {
    if (!selectedPatientId || !amount) {
      alert("Please select a patient and enter an amount.");
      return;
    }

    try {
      await api.post("/billing", {
        patientId: selectedPatientId,
        amount: parseFloat(amount),
        status: status,
      });
      setIsCreateModalOpen(false);
      fetchInvoices();

      // Reset form
      setSelectedPatientId("");
      setAmount("");
      setStatus("pending");
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Failed to create invoice");
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "overdue":
        return "error";
      default:
        return "neutral";
    }
  };

  return (
    <div>
      <PageHeader
        title="Billing & Invoices"
        description="Manage invoices and payments."
        action={
          <Button onClick={() => setIsCreateModalOpen(true)}>
            Create Invoice
          </Button>
        }
      />

      <Card className="overflow-hidden p-0">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading invoices...
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </tr>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice._id}>
                    <TableCell className="text-gray-900 font-medium">
                      {typeof invoice.patientId === "object"
                        ? invoice.patientId?.name
                        : "Unknown"}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(invoice.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-gray-900 font-medium">
                      ${invoice.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Pagination
              totalItems={invoices.length}
              itemsPerPage={10}
              currentPage={1}
            />
          </>
        )}
      </Card>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Invoice"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateInvoice}>Create Invoice</Button>
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
          <Input
            label="Amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default Billing;
