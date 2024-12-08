import { adminAuth } from "@/middleware/adminAuth";

export default async function AdminDashboard() {
  const admin = await adminAuth();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin content here */}
    </div>
  );
} 