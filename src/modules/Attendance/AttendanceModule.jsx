import './AttendanceModule.css';
import { useApp, STUDENTS, T } from '../../core/utils/constants';
import { usePersist } from '../../core/hooks/useAsyncSimulator';
import { Card, SectionHeader } from '../../core/components/DataTable';

const SUBJECTS_BY_DEPT = {
  CSE: ['Data Structures', 'DBMS', 'Operating Systems', 'Computer Networks', 'Web Technologies'],
  ECE: ['Signals and Systems', 'Digital Electronics', 'VLSI Design', 'Microprocessors', 'Communication Systems'],
  IT: ['Java Programming', 'Cloud Computing', 'Cyber Security', 'Data Mining', 'Software Engineering'],
  MECH: ['Thermodynamics', 'Fluid Mechanics', 'Machine Design', 'Manufacturing Processes', 'CAD/CAM'],
};

const WEEKDAY_SLOTS = [
  { id: 'Mon-09:00', label: 'Monday | 09:00 | FEDF' },
  { id: 'Tue-11:00', label: 'Tuesday | 11:00 | DBMS' },
  { id: 'Wed-14:00', label: 'Wednesday | 14:00 | Operating Systems' },
  { id: 'Thu-09:00', label: 'Thursday | 09:00 | Computer Networks' },
  { id: 'Fri-10:00', label: 'Friday | 10:00 | Data Structures' },
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function buildSubjectAttendance(student) {
  if (!student) return [];

  const subjects = SUBJECTS_BY_DEPT[student.dept] || ['Core Subject 1', 'Core Subject 2', 'Core Subject 3'];
  const offsets = [4, -3, 2, -5, 1, -2];

  return subjects.map((subject, idx) => {
    const pct = clamp(student.attendance + offsets[idx % offsets.length], 45, 99);
    return { subject, pct };
  });
}

function ProfessorAttendanceView({ user, addAlert }) {
  const [selectedSlot, setSelectedSlot] = usePersist('faculty_slot', WEEKDAY_SLOTS[0].id);
  const [statusMap, setStatusMap] = usePersist('faculty_attendance_draft', {});
  const [history, setHistory] = usePersist('faculty_attendance_history', []);

  const presentCount = Object.values(statusMap).filter(value => value === 'present').length;
  const absentCount = Object.values(statusMap).filter(value => value === 'absent').length;

  const markAll = status => {
    const nextMap = {};
    STUDENTS.forEach(student => {
      nextMap[student.id] = status;
    });
    setStatusMap(nextMap);
  };

  const markOne = (studentId, status) => {
    setStatusMap({ ...statusMap, [studentId]: status });
  };

  const submitAttendance = () => {
    const missing = STUDENTS.filter(student => !statusMap[student.id]).length;
    if (missing > 0) {
      addAlert('danger', `Mark all students first. Pending: ${missing}`);
      return;
    }

    const slotLabel = WEEKDAY_SLOTS.find(slot => slot.id === selectedSlot)?.label || selectedSlot;
    const record = {
      id: `${Date.now()}`,
      slot: selectedSlot,
      slotLabel,
      professor: user.name,
      createdAt: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
      present: presentCount,
      absent: absentCount,
    };

    setHistory([record, ...history].slice(0, 8));
    addAlert('success', `Attendance submitted for ${slotLabel}`);
  };

  return (
    <div>
      <SectionHeader
        title="Take Attendance"
        sub="Faculty can mark each student as present or absent for weekday classes"
      />

      <Card bare>
        <div className="attendance-professor-head">
          <div>
            <div className="attendance-name">{user.name}</div>
            <div className="attendance-meta">{user.facultyId || 'Faculty'} | Role: Professor</div>
          </div>

          <div className="attendance-professor-controls">
            <label htmlFor="attendance-slot" className="attendance-professor-label">Class Slot</label>
            <select
              id="attendance-slot"
              className="attendance-professor-select"
              value={selectedSlot}
              onChange={e => setSelectedSlot(e.target.value)}
            >
              {WEEKDAY_SLOTS.map(slot => (
                <option key={slot.id} value={slot.id}>{slot.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="attendance-actions">
          <button className="attendance-action-btn" onClick={() => markAll('present')}>Mark All Present</button>
          <button className="attendance-action-btn attendance-action-btn--danger" onClick={() => markAll('absent')}>Mark All Absent</button>
          <button className="attendance-submit-btn" onClick={submitAttendance}>Submit Attendance</button>
        </div>

        <div className="attendance-summary-line">
          Present: <span style={{ color: T.success }}>{presentCount}</span>
          {' | '}
          Absent: <span style={{ color: T.danger }}>{absentCount}</span>
          {' | '}
          Pending: <span style={{ color: T.warn }}>{STUDENTS.length - (presentCount + absentCount)}</span>
        </div>

        <div className="attendance-mark-grid">
          {STUDENTS.map(student => {
            const status = statusMap[student.id];
            return (
              <div key={student.id} className="attendance-mark-row">
                <div className="attendance-mark-student">
                  <div className="attendance-mark-name">{student.name}</div>
                  <div className="attendance-mark-meta">{student.id} | {student.dept}</div>
                </div>

                <div className="attendance-mark-actions">
                  <button
                    className={`attendance-toggle-btn ${status === 'present' ? 'attendance-toggle-btn--present' : ''}`}
                    onClick={() => markOne(student.id, 'present')}
                  >
                    Present
                  </button>
                  <button
                    className={`attendance-toggle-btn ${status === 'absent' ? 'attendance-toggle-btn--absent' : ''}`}
                    onClick={() => markOne(student.id, 'absent')}
                  >
                    Absent
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="attendance-history">
          <div className="attendance-history-title">Recent Attendance Sessions</div>
          {history.length === 0 ? (
            <div className="attendance-empty">No attendance submitted yet.</div>
          ) : (
            <div className="attendance-history-list">
              {history.map(item => (
                <div key={item.id} className="attendance-history-item">
                  <span>{item.slotLabel}</span>
                  <span>{item.present} present / {item.absent} absent</span>
                  <span>{item.createdAt}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default function AttendanceModule() {
  const { user, addAlert } = useApp();

  if (user?.role === 'professor') {
    return <ProfessorAttendanceView user={user} addAlert={addAlert} />;
  }

  const student = STUDENTS.find(
    s => s.id === user?.studentId || s.name === user?.name
  );

  const subjectAttendance = buildSubjectAttendance(student);
  const overallPct = subjectAttendance.length
    ? Math.round(subjectAttendance.reduce((sum, item) => sum + item.pct, 0) / subjectAttendance.length)
    : 0;

  if (!student) {
    return (
      <div>
        <SectionHeader
          title="Attendance Overview"
          sub="Subject-wise attendance for enrolled courses"
        />
        <Card bare>
          <div className="attendance-empty">No student attendance data found for this login.</div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader
        title="Attendance Overview"
        sub="Subject-wise attendance for your enrolled courses"
      />

      <Card bare>
        <div className="attendance-profile">
          <div className="attendance-avatar">
            {student.name.split(' ').map(part => part[0]).join('')}
          </div>

          <div className="attendance-info">
            <div className="attendance-name">{student.name}</div>
            <div className="attendance-meta">{student.id} | {student.dept}</div>
          </div>

          <div className="attendance-overall">
            Overall: <span style={{ color: overallPct < 75 ? T.danger : T.success }}>{overallPct}%</span>
          </div>
        </div>

        <div className="attendance-subject-list">
          {subjectAttendance.map(item => {
            const barColor = item.pct < 75 ? T.danger : item.pct < 85 ? T.warn : T.success;
            return (
              <div className="attendance-subject-row" key={item.subject}>
                <div className="attendance-subject-name">{item.subject}</div>

                <div className="attendance-subject-track">
                  <div
                    className="attendance-subject-fill"
                    style={{ width: `${item.pct}%`, background: barColor }}
                  />
                </div>

                <div className="attendance-subject-pct" style={{ color: barColor }}>
                  {item.pct}%
                </div>
              </div>
            );
          })}
        </div>

        <div className="attendance-footer">
          <span className="attendance-summary">
            Subjects: {subjectAttendance.length} | Above 75%: {subjectAttendance.filter(item => item.pct >= 75).length}
          </span>
        </div>
      </Card>
    </div>
  );
}
