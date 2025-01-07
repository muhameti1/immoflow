import { useState, useEffect } from "react";
import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";
import AdminLayout from "@/layouts/AdminLayout";
import axiosInstance from "@/api/axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get("/properties");
        setProperties(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-4">Properties</h1>
          </div>
          <div>
            <Button onClick={() => navigate("/app/properties/create")}>
              Create new
            </Button>
          </div>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataTable data={properties} columns={columns} />
        )}
      </div>
    </AdminLayout>
  );
};

export default Index;
