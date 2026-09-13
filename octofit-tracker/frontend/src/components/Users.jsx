import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('users')
      .then(setUsers)
      .catch((requestError) => {
        setError(requestError.message);
        setStatus('error');
      })
      .finally(() => setStatus((currentStatus) => currentStatus === 'error' ? currentStatus : 'ready'));
  }, []);

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">People</p>
          <h1>Users</h1>
        </div>
        <span className="count-badge">{users.length} members</span>
      </div>
      {status === 'loading' && <p className="muted">Loading users...</p>}
      {status === 'error' && <p className="alert alert-danger">{error}</p>}
      <div className="data-grid">
        {users.map((user) => (
          <article className="data-card" key={user.id || user._id || user.username}>
            <span className="avatar">{(user.name || user.username || '?').slice(0, 1)}</span>
            <div>
              <h2>{user.name || user.username}</h2>
              <p>@{user.username || 'unknown'} · {user.email || 'No email provided'}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Users;
