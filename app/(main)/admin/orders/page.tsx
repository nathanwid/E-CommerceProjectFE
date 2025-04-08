import OrderFilter from "@/components/OrderFilter";
import AllOrders from "@/components/admin/AllOrders";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  return (
    <>
      <h1 className="text-2xl mb-8 font-bold">Orders</h1>
      <OrderFilter />
      <AllOrders searchParams={searchParams} />
    </>
  );
}
