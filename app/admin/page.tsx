import { isValidAdminSession, getAdminSessionToken } from "@/app/libs/adminAuth";
import AdminDashboard from "@/app/components/admin/AdminDashboard";
import AdminLogin from "@/app/components/admin/AdminLogin";

export const dynamic = "force-dynamic";

// Password-gated but still server-rendered, so keep it out of the index.
// robots.ts also disallows /admin; this is the belt-and-braces signal.
export const metadata = {
   title: "Admin",
   robots: { index: false, follow: false },
};

export default function AdminPage(): React.ReactElement {
   if (isValidAdminSession(getAdminSessionToken())) {
      return <AdminDashboard />;
   }

   return <AdminLogin />;
}
