import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const useLoginMiddleware = () => {

  const navigate = useNavigate()

  const [userData, setUserData] = useState('')

  useEffect(() => {
    // Perform logic or operations after login
    console.log('Middleware executed after login');

    // You can make API requests, update state, etc.
    // Example: Fetch user data after login
    const fetchUserData = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];
    
        if (!token) {
          console.log('Token not found');
          navigate('/login')
          return;
        }
    
        const response = await fetch('http://localhost:9000/api/chat', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          navigate('/login')
          throw new Error('Failed to fetch user data');
        }
    
        const userData = await response.json();
        setUserData(userData)
        // Handle the user data or update state accordingly
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    

    fetchUserData();
  }, []);

  return userData; // Return null or a placeholder component if needed
};

export default useLoginMiddleware;
