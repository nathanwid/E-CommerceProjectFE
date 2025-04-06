import Cart from "@/components/account/Cart";

export default async function page() {
  return (
    <>
      <h1 className="text-2xl mb-8 font-bold">My Shopping Cart</h1>
      <Cart />
    </>
  );
}
