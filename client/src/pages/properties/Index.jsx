import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";
import data from "./data-table-components/data.json";
import AdminLayout from "@/layouts/AdminLayout";
const Index = () => {
  return (
    <AdminLayout>
      <h1>Properties</h1>
      <DataTable data={data} columns={columns} />
    </AdminLayout>
  );
};

export default Index;
