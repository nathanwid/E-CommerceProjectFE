import OrderFilter from "@/components/OrderFilter";
import OrdersTable from "@/components/account/OrdersTable";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  return (
    <>
      <h1 className="text-2xl mb-8 font-bold">My Orders</h1>
      <OrderFilter />
      <OrdersTable searchParams={searchParams} />
    </>
  );
}
