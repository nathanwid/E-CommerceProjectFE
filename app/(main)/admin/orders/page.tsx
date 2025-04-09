import OrderFilter from "@/components/OrderFilter";
import AllOrdersTable from "@/components/admin/AllOrdersTable";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  return (
    <>
      <h1 className="text-2xl mb-8 font-bold">Orders</h1>
      <OrderFilter />
      <AllOrdersTable searchParams={searchParams} />
    </>
  );
}
