import { useAuth } from '../../context/AuthContext';
export default function AdminDashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-500">Welcome, {user?.id}</p>
      <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div>
  );
}