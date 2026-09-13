import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('leaderboard')
      .then(setLeaders)
      .catch((requestError) => {
        setError(requestError.message);
        setStatus('error');
      })
      .finally(() => setStatus((currentStatus) => currentStatus === 'error' ? currentStatus : 'ready'));
  }, []);

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Weekly standings</p><h1>Leaderboard</h1></div></div>
      {status === 'loading' && <p className="muted">Loading leaderboard...</p>}
      {status === 'error' && <p className="alert alert-danger">{error}</p>}
      <div className="leaderboard-list">
        {leaders.map((leader, index) => (
          <article className="leader-row" key={leader.userId || leader.id || leader._id}>
            <span className="rank">{leader.rank || index + 1}</span>
            <div className="leader-name"><strong>{leader.userId}</strong><span>{leader.points} points</span></div>
            <div className="progress" role="progressbar" aria-label={`${leader.userId} points`}><div className="progress-bar" style={{ width: `${Math.min(100, (leader.points / (leaders[0]?.points || 1)) * 100)}%` }} /></div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;
