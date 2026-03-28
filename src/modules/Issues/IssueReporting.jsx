import { useState } from 'react';
import './IssueReporting.css';
import { useApp, ISSUES_INIT, T } from '../../core/utils/constants';
import { usePersist } from '../../core/hooks/useAsyncSimulator';
import DataTable, { Badge, Btn, Card, SectionHeader } from '../../core/components/DataTable';

const STATUS_VARIANT  = { Open: 'danger', 'In Progress': 'warn', Resolved: 'success' };
const PRIORITY_VARIANT = { Critical: 'danger', High: 'warn', Medium: 'info', Low: 'default' };
const CATEGORIES = ['Academic', 'Infrastructure', 'Admin', 'Technical', 'Other'];

let issueCounter = ISSUES_INIT.length;

export default function IssueReporting() {
  const { addAlert } = useApp();
  const [issues, setIssues] = usePersist('issues_v2', ISSUES_INIT);
  const [form, setForm]     = useState({ title: '', cat: 'Technical', priority: 'Medium', desc: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showForm,   setShowForm]   = useState(false);

  const submit = async () => {
    if (!form.title.trim()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    const newIssue = {
      id:       `ISS-${String(++issueCounter).padStart(3, '0')}`,
      title:    form.title,
      cat:      form.cat,
      priority: form.priority,
      status:   'Open',
      ts:       new Date().toISOString().split('T')[0],
    };
    setIssues([newIssue, ...issues]);
    setForm({ title: '', cat: 'Technical', priority: 'Medium', desc: '' });
    setSubmitting(false);
    setShowForm(false);
    addAlert('success', `Issue ${newIssue.id} raised successfully.`);
  };

  const columns = [
    { key: 'id',       label: 'ID',       render: v => <span style={{ color: T.accent, fontWeight: 600 }}>{v}</span> },
    { key: 'title',    label: 'Issue'   },
    { key: 'cat',      label: 'Category' },
    { key: 'priority', label: 'Priority', render: v => <Badge label={v} variant={PRIORITY_VARIANT[v]} /> },
    { key: 'status',   label: 'Status',   render: v => <Badge label={v} variant={STATUS_VARIANT[v]}   /> },
    { key: 'ts',       label: 'Date',     render: v => <span style={{ color: T.textMuted }}>{v}</span>   },
  ];

  return (
    <div>
      <SectionHeader title="Issue Reporting" sub="Submit, track, and manage reported issues" />

      <div className="issues-toolbar">
        <Btn onClick={() => setShowForm(!showForm)} icon={showForm ? '×' : '+'}>
          {showForm ? 'Cancel' : 'Report Issue'}
        </Btn>
      </div>

      {showForm && (
        <Card title="New Issue" className="issues-form-card">
          <div className="issues-form">
            <input
              placeholder="Issue title *"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            />
            <div className="issues-form-row">
              <select value={form.cat} onChange={e => setForm(f => ({ ...f, cat: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                {['Low', 'Medium', 'High', 'Critical'].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <textarea
              rows={3}
              placeholder="Describe the issue..."
              value={form.desc}
              onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
              style={{ resize: 'vertical' }}
            />
            <Btn onClick={submit} disabled={submitting || !form.title.trim()}>
              {submitting ? 'Submitting...' : 'Submit Issue'}
            </Btn>
          </div>
        </Card>
      )}

      <Card title={`All Issues (${issues.length})`}>
        <DataTable columns={columns} rows={issues} />
      </Card>
    </div>
  );
}
