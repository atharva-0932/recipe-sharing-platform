import { requireAuth } from "../../lib/auth";
import { redirect } from "next/navigation";

export default async function NewRecipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Protect this route - require authentication
  const user = await requireAuth();
  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}



