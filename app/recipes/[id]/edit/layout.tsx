import { requireAuth } from "../../../lib/auth";

export default async function EditRecipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Protect this route - require authentication
  await requireAuth();
  return <>{children}</>;
}
