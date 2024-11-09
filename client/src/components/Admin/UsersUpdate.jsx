import React, { useEffect, useState } from 'react';
import axiosInstanse from '../../utils/axiosConfig';
import { API_ROUTES } from '../../utils/apiRoutes';
import '../../styles/UsersUpdate.css'; // Import the CSS file for styles

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstanse.get(API_ROUTES.USERS.GET_ALL, { withCredentials: true });
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  const toggleAdminPrivilege = async (userId, manager) => {
    try {
      const response = await axiosInstanse.put(API_ROUTES.USERS.UPDATE(userId), { manager: !manager }, { withCredentials: true });
      const updatedUser = response.data;
      setUsers(users.map((user) => (user._id === userId ? updatedUser : user)));

    } catch {
      console.error('Error updating admin privilege:', error); // Log the error message
      setError('Failed to update admin privilege');
    }

  };

  const deleteUser = async (userId) => {
    if (window.confirm('?אתה בטוח שברצונך למחוק משתמש זה')) {
      try {
        await axiosInstanse.delete(API_ROUTES.USERS.DELETE(userId), { withCredentials: true });
        setUsers(users.filter((user) => user._id !== userId)); // Remove the deleted user from the state
      } catch {
        setError('לא ניתן למחוק משתמש זה');
      }
    }
  };

  return (
    <div className="admin-page">
      <h1>עריכת משתמשים-אדמין</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>שם משתמש</th>
            <th>אימייל </th>
            <th>הרשאות אדמין </th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.manager ? 'כן' : 'לא'}</td>
              <td className="action-cell">
                <button onClick={() => toggleAdminPrivilege(user._id, user.manager)} className="action-button">
                  {user.isAdmin ? 'שנה הרשאה' : 'שנה הרשאה'}
                </button>
                <button onClick={() => deleteUser(user._id)} className="delete-button">
                  מחק משתמש
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
