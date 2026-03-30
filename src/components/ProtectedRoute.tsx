import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loader2 } from 'lucide-react';
import ProfileCheckOverlay from './ProfileCheckOverlay';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa]">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
        <p className="mt-4 text-gray-500 font-black uppercase tracking-widest text-xs">Memuat Sesi...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <ProfileCheckOverlay />
      <Outlet />
    </>
  );
}
