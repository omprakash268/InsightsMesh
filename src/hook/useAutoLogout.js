// hooks/useAutoLogout.js
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const useAutoLogout = (timeoutMinutes) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const resetTimer = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      dispatch(logout());
      localStorage.removeItem('auth_token');
      localStorage.removeItem('username');
      navigate('/login');
    }, timeoutMinutes * 60 * 1000);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'click'];
    const handleActivity = () => resetTimer();

    for (const event of events) {
      window.addEventListener(event, handleActivity);
    }

    resetTimer();

    return () => {
      for (const event of events) {
        window.removeEventListener(event, handleActivity);
      }
      clearTimeout(timeoutRef.current);
    };
  }, []);
};

export default useAutoLogout;
