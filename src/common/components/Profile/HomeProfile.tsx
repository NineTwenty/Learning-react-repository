import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from 'common/contexts/current-user-context';

export default function HomeProfile() {
  const { id: userId } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`profile/${userId}/posts`, { replace: true });
  }, [navigate, userId]);

  return null;
}
