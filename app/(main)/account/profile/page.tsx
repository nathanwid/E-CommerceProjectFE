import { auth } from "@/auth";
import AddressForm from "@/components/account/AddressForm";
import ProfileForm from "@/components/account/ProfileForm";

export default async function page() {
  const session = await auth();
  const token = session?.user?.token;
  const userId = session?.user.id;
  {
  }

  return (
    <>
      <h1 className="text-2xl mb-8 font-bold">My Profile</h1>
      <ProfileForm token={token} />
      <AddressForm userId={userId} />
    </>
  );
}
