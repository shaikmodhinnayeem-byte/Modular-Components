import { useState } from 'react';
import './AdminDashboard.css';
import { STUDENTS, T } from '../../core/utils/constants';
import AlertBanner from '../../core/components/AlertBanner';
import StatusCard from '../../core/components/StatusCard';
import DataTable, { Badge, Card, SectionHeader, ProgressBar } from '../../core/components/DataTable';
import ManageUtilities    from './ManageUtilities';
import ManageAnnouncements from './ManageAnnouncements';
import ManageIssues       from './ManageIssues';

const TABS = [
  { id: 'overview',       label: 'Overview'       },
  { id: 'utilities',      label: 'Utilities'      },
  { id: 'announcements',  label: 'Announcements'  },
  { id: 'issues',         label: 'Issues'         },
];

export default function AdminDashboard() {
  const [tab,           setTab]          = useState('overview');
  const [studentSearch, setStudentSearch] = useState('');
  const [deptFilter,    setDeptFilter]   = useState('All');

  const filteredStudents = STUDENTS.filter(s => {
    const q = studentSearch.toLowerCase();
    return (
      (!q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)) &&
      (deptFilter === 'All' || s.dept === deptFilter)
    );
  });

  return (
    <div>
      <SectionHeader title="Admin Panel" sub="Manage system configurations, users, and content" />
      <AlertBanner type="info" message="You are in Admin mode. Changes made here affect all users." />

      {/* ── Tab Nav ── */}
      <div className="admin-tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`admin-tab-btn ${tab === t.id ? 'admin-tab-btn--active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Overview ── */}
      {tab === 'overview' && (
        <div>
          <div className="admin-stats-grid">
            <StatusCard label="Total Students" value={STUDENTS.length}                                                              variant="info"    delay={0}    />
            <StatusCard label="Below 75%"      value={STUDENTS.filter(u => u.attendance < 75).length}                              variant="danger"  delay={0.05} />
            <StatusCard label="Avg CGPA"       value={(STUDENTS.reduce((a, u) => a + u.cgpa, 0) / STUDENTS.length).toFixed(2)}    variant="success" delay={0.1}  />
            <StatusCard label="Departments"    value={[...new Set(STUDENTS.map(u => u.dept))].length}                              variant="default" delay={0.15} />
          </div>

          <Card title={`Student Registry (${filteredStudents.length})`}>
            <div className="admin-registry-toolbar">
              <div className="admin-search-wrap">
                <span className="admin-search-icon">⌕</span>
                <input
                  placeholder="Search name or ID..."
                  value={studentSearch}
                  onChange={e => setStudentSearch(e.target.value)}
                />
              </div>
              <div className="admin-dept-filters">
                {['All', 'CSE', 'ECE', 'MECH', 'IT'].map(d => (
                  <button
                    key={d}
                    className={`admin-dept-btn ${deptFilter === d ? 'admin-dept-btn--active' : 'admin-dept-btn--inactive'}`}
                    onClick={() => setDeptFilter(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <DataTable
              columns={[
                { key: 'id',         label: 'ID',         render: v => <span style={{ color: T.accent }}>{v}</span> },
                { key: 'name',       label: 'Name'      },
                { key: 'dept',       label: 'Dept'      },
                { key: 'attendance', label: 'Attendance', render: v => <ProgressBar value={v} />  },
                { key: 'cgpa',       label: 'CGPA',       render: v => <Badge label={String(v)} variant={v >= 9 ? 'success' : v >= 7.5 ? 'info' : 'warn'} /> },
              ]}
              rows={filteredStudents}
              emptyMessage="No students match your search."
            />
          </Card>
        </div>
      )}

      {tab === 'utilities'     && <ManageUtilities />}
      {tab === 'announcements' && <ManageAnnouncements />}
      {tab === 'issues'        && <ManageIssues />}
    </div>
  );
}
