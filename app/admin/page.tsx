import { isValidAdminSession, getAdminSessionToken } from "@/app/libs/adminAuth";
import AdminDashboard from "@/app/components/admin/AdminDashboard";
import AdminLogin from "@/app/components/admin/AdminLogin";

export const dynamic = "force-dynamic";

export default function AdminPage(): React.ReactElement {
   if (isValidAdminSession(getAdminSessionToken())) {
      return <AdminDashboard />;
   }

   return <AdminLogin />;
}
