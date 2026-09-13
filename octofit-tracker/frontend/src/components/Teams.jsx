import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('teams')
      .then(setTeams)
      .catch((requestError) => {
        setError(requestError.message);
        setStatus('error');
      })
      .finally(() => setStatus((currentStatus) => currentStatus === 'error' ? currentStatus : 'ready'));
  }, []);

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Community</p><h1>Teams</h1></div><span className="count-badge">{teams.length} teams</span></div>
      {status === 'loading' && <p className="muted">Loading teams...</p>}
      {status === 'error' && <p className="alert alert-danger">{error}</p>}
      <div className="data-grid">
        {teams.map((team) => (
          <article className="data-card team-card" key={team.id || team._id || team.name}>
            <div className="team-mark">+</div><div><h2>{team.name}</h2><p>{team.memberIds?.length || 0} members</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Teams;
