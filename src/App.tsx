import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ConsultantDashboard from './pages/ConsultantDashboard';

// Protected Route wrapper component
function ProtectedRoute({ children, allowedRoles }: { children: JSX.Element, allowedRoles: ('user' | 'admin' | 'consultant')[] }) {
  const { role } = useAuth();
  
  if (!role) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />; // Or some "Unauthorized" page
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div id="think10-app" className="min-h-screen bg-white text-[#0F172A] font-sans selection:bg-[#68E8C4]/20 selection:text-[#0B1220]">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            
            {/* Dashboards */}
            <Route 
              path="/dashboard/user" 
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/consultant" 
              element={
                <ProtectedRoute allowedRoles={['consultant']}>
                  <ConsultantDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
