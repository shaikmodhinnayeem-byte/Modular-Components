import { useState } from 'react';
import './ManageUtilities.css';
import { useApp, UTILITY_SERVICES, T } from '../../core/utils/constants';
import { Btn, Card } from '../../core/components/DataTable';

const STATUS_COLOR = {
  Running:       T.success,
  Stopped:       T.danger,
  Degraded:      T.warn,
  'Restarting...': T.info,
};

export default function ManageUtilities() {
  const { addAlert } = useApp();
  const [services, setServices] = useState(UTILITY_SERVICES);

  const restart = async name => {
    setServices(s => s.map(v => v.name === name ? { ...v, status: 'Restarting...' } : v));
    await new Promise(r => setTimeout(r, 1500));
    setServices(s => s.map(v => v.name === name ? { ...v, status: 'Running' } : v));
    addAlert('success', `${name} restarted successfully.`);
  };

  const stop = name => {
    setServices(s => s.map(v => v.name === name ? { ...v, status: 'Stopped' } : v));
    addAlert('warn', `${name} has been stopped.`);
  };

  return (
    <Card title="Manage Utilities">
      {services.map((u, i) => (
        <div
          key={u.name}
          className="utils-row"
          style={{ animation: `fadeUp 0.3s ease ${i * 0.05}s both` }}
        >
          <div className="utils-row-left">
            <div
              className="utils-status-dot"
              style={{ background: STATUS_COLOR[u.status] || T.info }}
            />
            <div>
              <div className="utils-name">{u.name}</div>
              <div className="utils-meta">
                Instance {u.instance} ·{' '}
                <span style={{ color: u.status === 'Running' ? T.success : T.warn }}>{u.status}</span>
              </div>
            </div>
          </div>
          <div className="utils-actions">
            <Btn small variant="ghost"  onClick={() => restart(u.name)}>Restart</Btn>
            <Btn small variant="danger" onClick={() => stop(u.name)}>Stop</Btn>
          </div>
        </div>
      ))}
    </Card>
  );
}
