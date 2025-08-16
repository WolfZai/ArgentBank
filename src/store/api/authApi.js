export async function login (credentials) {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();
      return { body: data };
    } catch (error) {
      console.error('Login error:', error);
    }
  };