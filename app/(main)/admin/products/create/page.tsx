import { auth } from "@/auth";
import CreateProductForm from "@/components/admin/CreateProductForm";

export default async function CreateProductPage() {
  const session = await auth();
  const token = session?.user.token;

  return (
    <>
      <h1 className="text-2xl mb-8 font-bold">Create Product</h1>
      <CreateProductForm token={token} />
    </>
  );
}
