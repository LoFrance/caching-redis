import { useEffect, useState } from 'react';

function App() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      fetch(`http://localhost:5005/users/list`)
        .then(response => response.json())
        .then(data => {
          console.log('ricevuto', data);
          setUserData(Array.from(data.users));
        });

      setLoading(false);
    } catch (error) {
      setError('An error occurred!');
    }
  }, []);

  if (loading) return <h1>Loading users</h1>;
  if (error) return <h1>Error fetching users</h1>;
  return (
    <>
      <h1>Users</h1>

      {userData && (
        <div>
          {userData.map(user => (
            <>
              <h2>User Information</h2>
              <p>
                Name:
                {user.name}
              </p>
              <p>Email: {user.email}</p>
            </>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
