import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('workouts', workoutsEndpoint)
      .then(setWorkouts)
      .catch((requestError) => {
        setError(requestError.message);
        setStatus('error');
      })
      .finally(() => setStatus((currentStatus) => currentStatus === 'error' ? currentStatus : 'ready'));
  }, []);

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Training library</p><h1>Workouts</h1></div><span className="count-badge">{workouts.length} plans</span></div>
      {status === 'loading' && <p className="muted">Loading workouts...</p>}
      {status === 'error' && <p className="alert alert-danger">{error}</p>}
      <div className="data-grid">
        {workouts.map((workout) => (
          <article className="workout-card" key={workout.id || workout._id || workout.name}>
            <p className="eyebrow">{workout.level}</p><h2>{workout.name}</h2><p>{workout.focus || 'Full body'} · {workout.durationMinutes} minutes</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Workouts;
