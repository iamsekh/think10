import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function ConsultantDashboard() {
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
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">Advisory Portal</h1>
          <p className="text-gray-500 mb-8">Manage your clients and advisory sessions.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">Active Clients</h3>
              <p className="text-3xl font-bold text-blue-600">8</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">Upcoming Sessions</h3>
              <p className="text-3xl font-bold text-blue-600">3</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">New Messages</h3>
              <p className="text-3xl font-bold text-blue-600">12</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
