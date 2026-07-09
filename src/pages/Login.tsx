import { useNavigate } from 'react-router-dom';
import { useAuth, Role } from '../context/AuthContext';
import { User, ShieldAlert, Briefcase } from 'lucide-react';
import Header from '../components/Header';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: Role) => {
    login(role);
    navigate(`/dashboard/${role}`);
  };

  // Mock empty onNavigate for the header when on login page
  const handleNavigate = (id: string) => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <Header onNavigate={handleNavigate} activeSection="" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-500 font-sans text-sm">Select a role to sign in (Demo)</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => handleLogin('user')}
              className="w-full flex items-center justify-between px-6 py-4 border border-gray-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 transition-colors group cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                <span className="font-semibold text-gray-700 group-hover:text-emerald-700">Client / User</span>
              </div>
            </button>

            <button
              onClick={() => handleLogin('consultant')}
              className="w-full flex items-center justify-between px-6 py-4 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors group cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <span className="font-semibold text-gray-700 group-hover:text-blue-700">Advisory Consultant</span>
              </div>
            </button>

            <button
              onClick={() => handleLogin('admin')}
              className="w-full flex items-center justify-between px-6 py-4 border border-gray-200 rounded-xl hover:bg-purple-50 hover:border-purple-200 transition-colors group cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <ShieldAlert className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                <span className="font-semibold text-gray-700 group-hover:text-purple-700">System Admin</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
