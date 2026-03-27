import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ResidentDashboard from './pages/resident/Dashboard';
import SecurityDashboard from './pages/security/Dashboard';
import ServiceDashboard from './pages/service/Dashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute roles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/resident" element={
            <ProtectedRoute roles={['RESIDENT']}>
              <ResidentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/security" element={
            <ProtectedRoute roles={['SECURITY']}>
              <SecurityDashboard />
            </ProtectedRoute>
          } />
          <Route path="/service" element={
            <ProtectedRoute roles={['SERVICE']}>
              <ServiceDashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}