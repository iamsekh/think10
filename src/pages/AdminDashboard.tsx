import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function AdminDashboard() {
  const navigate = useNavigate();

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
      <div className="min-h-screen bg-gray-50 pt-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">Admin Control Panel</h1>
          <p className="text-gray-500 mb-8">System overview and management.</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 mb-1">Total Users</h3>
              <p className="text-3xl font-bold text-purple-600">1,248</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 mb-1">Active Consultants</h3>
              <p className="text-3xl font-bold text-purple-600">24</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 mb-1">Pending Approvals</h3>
              <p className="text-3xl font-bold text-orange-500">7</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 mb-1">System Status</h3>
              <p className="text-xl font-bold text-emerald-500 mt-2">Operational</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
