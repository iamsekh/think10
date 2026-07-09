import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function UserDashboard() {
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
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">Client Dashboard</h1>
          <p className="text-gray-500 mb-8">Welcome back. Here is your advisory overview.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">Active Assessments</h3>
              <p className="text-3xl font-bold text-emerald-600">2</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">Scheduled Calls</h3>
              <p className="text-3xl font-bold text-emerald-600">1</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">Profile Status</h3>
              <p className="text-xl font-bold text-emerald-600 mt-2">Verified</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
