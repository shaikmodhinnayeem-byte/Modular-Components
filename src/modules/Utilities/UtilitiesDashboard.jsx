import { useEffect } from 'react';
import './UtilitiesDashboard.css';
import useAsyncSimulator from '../../core/hooks/useAsyncSimulator';
import { useApp, STUDENTS } from '../../core/utils/constants';
import StatusCard from '../../core/components/StatusCard';
import Loader from '../../core/components/Loader';
import AlertBanner from '../../core/components/AlertBanner';
import { Badge, Btn, Card, SectionHeader, ProgressBar } from '../../core/components/DataTable';

const HEALTH_SERVICES = ['Auth Service', 'DB Cluster', 'CDN Layer', 'API Gateway', 'Cache Redis'];

export default function UtilitiesDashboard() {
  const { addAlert } = useApp();

  const { data, loading, run } = useAsyncSimulator(
    () => new Promise(res =>
      setTimeout(() => res({ online: 142, offline: 8, pending: 23, uptime: 99.2, alerts: 3 }), 1200)
    )
  );

  useEffect(() => { run(); }, [run]);

  if (loading) return <Loader label="Fetching system status..." />;

  return (
    <div>
      <SectionHeader
        title="System Dashboard"
        sub="Real-time infrastructure overview — PS-30 Component Showcase"
      />

      <AlertBanner
        type="warn"
        title="Scheduled Maintenance"
        message="Server cluster B will undergo maintenance on Feb 22, 02:00–04:00 IST."
      />

      <div className="dashboard-stats-grid">
        <StatusCard label="Active Nodes"  value={data?.online}       sub="across 3 clusters" variant="success" delay={0}    />
        <StatusCard label="Offline"       value={data?.offline}      sub="require attention" variant="danger"  delay={0.05} />
        <StatusCard label="Pending Jobs"  value={data?.pending}      sub="in queue"          variant="warn"    delay={0.1}  />
        <StatusCard label="Uptime"        value={`${data?.uptime}%`} sub="last 30 days"      variant="success" glow delay={0.15} />
        <StatusCard label="Active Alerts" value={data?.alerts}       sub="needs review"      variant="info"    delay={0.2}  />
      </div>

      <div className="dashboard-cards-grid">
        <Card title="Student Performance">
          <div className="dashboard-perf-list">
            {STUDENTS.slice(0, 4).map(s => (
              <ProgressBar key={s.id} label={s.name} value={s.attendance} />
            ))}
          </div>
        </Card>

        <Card title="Component Health">
          {HEALTH_SERVICES.map((s, i) => (
            <div key={s} className="dashboard-health-row">
              <span className="dashboard-health-label">{s}</span>
              <Badge label={i === 2 ? 'Degraded' : 'Healthy'} variant={i === 2 ? 'warn' : 'success'} />
            </div>
          ))}
          <div className="dashboard-diagnostics-btn">
            <Btn small onClick={() => addAlert('info', 'Diagnostics run complete. All systems nominal.')}>
              Run Diagnostics
            </Btn>
          </div>
        </Card>
      </div>
    </div>
  );
}
