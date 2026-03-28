import { useState } from 'react';
import './ManageIssues.css';
import { useApp, ADMIN_ISSUES, T } from '../../core/utils/constants';
import DataTable, { Badge, Btn, Card } from '../../core/components/DataTable';

const PRIORITY_V = { Critical: 'danger', High: 'warn', Medium: 'info', Low: 'default' };
const STATUS_V   = { Open: 'danger', 'In Progress': 'warn', Resolved: 'success' };

export default function ManageIssues() {
  const { addAlert } = useApp();
  const [issues, setIssues] = useState(ADMIN_ISSUES);

  const resolve = id => {
    setIssues(l => l.map(i => i.id === id ? { ...i, status: 'Resolved' } : i));
    addAlert('success', `Issue ${id} marked as resolved.`);
  };

  const columns = [
    { key: 'id',       label: 'ID',       render: v => <span style={{ color: T.accent, fontWeight: 600 }}>{v}</span> },
    { key: 'title',    label: 'Issue'   },
    { key: 'reporter', label: 'Reporter' },
    { key: 'dept',     label: 'Dept'    },
    { key: 'priority', label: 'Priority', render: v => <Badge label={v} variant={PRIORITY_V[v] || 'default'} /> },
    { key: 'status',   label: 'Status',   render: v => <Badge label={v} variant={STATUS_V[v]   || 'default'} /> },
    {
      key: 'id',
      label: 'Action',
      render: (v, row) =>
        row.status !== 'Resolved'
          ? <Btn small variant="success" onClick={() => resolve(v)}>Resolve</Btn>
          : <span className="manage-issues-done">✓ Done</span>,
    },
  ];

  return (
    <Card title={`Issue Management (${issues.length})`}>
      <DataTable columns={columns} rows={issues} />
    </Card>
  );
}
