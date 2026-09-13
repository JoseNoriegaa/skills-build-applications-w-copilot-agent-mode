import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('activities')
      .then(setActivities)
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
          <p className="eyebrow">Movement log</p>
          <h1>Activities</h1>
        </div>
        <span className="count-badge">{activities.length} sessions</span>
      </div>
      {status === 'loading' && <p className="muted">Loading activities...</p>}
      {status === 'error' && <p className="alert alert-danger">{error}</p>}
      <div className="table-wrap">
        <table className="table align-middle mb-0">
          <thead><tr><th>Type</th><th>Athlete</th><th>Duration</th><th>Date</th></tr></thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id || activity._id}>
                <td><strong>{activity.type}</strong></td>
                <td>{activity.userId}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Unscheduled'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Activities;
