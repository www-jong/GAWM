import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useUserStore } from '@/stores/user';

export default function AuthRedirect() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate('/home');
    } else {
      navigate('/landing');
    }
  }, [user, navigate]);

  return <Outlet />;
}
