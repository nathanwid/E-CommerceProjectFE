import OrderFilter from "@/components/account/OrderFilter";
import Orders from "@/components/account/Orders";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  return (
    <>
      <h1 className="text-2xl mb-8 font-bold">My Orders</h1>
      <OrderFilter />
      <Orders searchParams={searchParams} />
    </>
  );
}
