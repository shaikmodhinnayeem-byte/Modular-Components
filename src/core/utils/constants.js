import { createContext, useContext } from 'react';

/* ── App Context ──────────────────────────────────────────────────────────── */
export const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

/* ── Theme tokens (JS mirror of CSS vars for inline styles) ──────────────── */
export const T = {
  bg:          '#0a0a0f',
  surface:     '#12121a',
  surfaceHigh: '#1a1a28',
  border:      '#2a2a40',
  accent:      '#6c63ff',
  accentSoft:  '#9d96ff',
  accentGlow:  'rgba(108,99,255,0.25)',
  danger:      '#ff4757',
  warn:        '#ffa502',
  success:     '#2ed573',
  info:        '#1e90ff',
  text:        '#e8e8f0',
  textMuted:   '#7a7a9a',
  textDim:     '#4a4a6a',
  font:        "'DM Mono','Fira Code',monospace",
  fontD:       "'Syne','Space Grotesk',sans-serif",
};

/* ── Students ─────────────────────────────────────────────────────────────── */
export const STUDENTS = [
  { id: 'CS001', name: 'Arjun Mehta',    dept: 'CSE',  attendance: 87, cgpa: 8.9 },
  { id: 'CS002', name: 'Priya Sharma',   dept: 'CSE',  attendance: 92, cgpa: 9.2 },
  { id: 'CS003', name: 'Ravi Kumar',     dept: 'ECE',  attendance: 71, cgpa: 7.5 },
  { id: 'CS004', name: 'Sneha Patel',    dept: 'MECH', attendance: 95, cgpa: 9.6 },
  { id: 'CS005', name: 'Amit Verma',     dept: 'CSE',  attendance: 64, cgpa: 7.1 },
  { id: 'CS006', name: 'Kavya Reddy',    dept: 'IT',   attendance: 88, cgpa: 8.4 },
  { id: 'CS007', name: 'Rohan Nair',     dept: 'CSE',  attendance: 76, cgpa: 8.1 },
  { id: 'CS008', name: 'Divya Iyer',     dept: 'ECE',  attendance: 90, cgpa: 9.0 },
  { id: 'CS009', name: 'Karthik Suresh', dept: 'IT',   attendance: 58, cgpa: 6.8 },
  { id: 'CS010', name: 'Ananya Bose',    dept: 'CSE',  attendance: 83, cgpa: 8.6 },
  { id: 'EC011', name: 'Vishal Menon',   dept: 'ECE',  attendance: 91, cgpa: 9.1 },
  { id: 'EC012', name: 'Shruti Pillai',  dept: 'ECE',  attendance: 69, cgpa: 7.3 },
  { id: 'ME013', name: 'Nikhil Joshi',   dept: 'MECH', attendance: 78, cgpa: 7.9 },
  { id: 'ME014', name: 'Pooja Kulkarni', dept: 'MECH', attendance: 94, cgpa: 9.3 },
  { id: 'IT015', name: 'Siddharth Rao',  dept: 'IT',   attendance: 62, cgpa: 7.0 },
  { id: 'IT016', name: 'Meera Krishnan', dept: 'IT',   attendance: 85, cgpa: 8.7 },
  { id: 'CS017', name: 'Aditya Pandey',  dept: 'CSE',  attendance: 73, cgpa: 7.6 },
  { id: 'CS018', name: 'Lakshmi Venkat', dept: 'CSE',  attendance: 97, cgpa: 9.7 },
  { id: 'EC019', name: 'Rahul Ghosh',    dept: 'ECE',  attendance: 55, cgpa: 6.5 },
  { id: 'ME020', name: 'Tanvi Desai',    dept: 'MECH', attendance: 89, cgpa: 8.8 },
  { id: 'CS021', name: 'Pranav Shetty',  dept: 'CSE',  attendance: 80, cgpa: 8.2 },
  { id: 'IT022', name: 'Harini Sundar',  dept: 'IT',   attendance: 93, cgpa: 9.4 },
  { id: 'EC023', name: 'Deepak Nambiar', dept: 'ECE',  attendance: 67, cgpa: 7.2 },
  { id: 'ME024', name: 'Swati Pawar',    dept: 'MECH', attendance: 82, cgpa: 8.3 },
  { id: 'CS025', name: 'Varun Pillai',   dept: 'CSE',  attendance: 60, cgpa: 6.9 },
];

/* ── Issues seed data ─────────────────────────────────────────────────────── */
export const ISSUES_INIT = [
  { id: 'ISS-001', title: 'Projector not working in Room 204',    cat: 'Infrastructure', status: 'Open',        priority: 'High',     ts: '2026-02-15' },
  { id: 'ISS-002', title: 'Attendance portal error for batch 22', cat: 'Technical',      status: 'In Progress', priority: 'Critical', ts: '2026-02-16' },
  { id: 'ISS-003', title: 'Lab computers need antivirus update',  cat: 'Technical',      status: 'Resolved',    priority: 'Medium',   ts: '2026-02-17' },
];

/* ── Admin issues seed ────────────────────────────────────────────────────── */
export const ADMIN_ISSUES = [
  { id: 'ISS-001', title: 'Projector not working in Room 204',    reporter: 'Arjun Mehta',   dept: 'CSE',  priority: 'High',     status: 'Open' },
  { id: 'ISS-002', title: 'Attendance portal error for batch 22', reporter: 'Priya Sharma',  dept: 'CSE',  priority: 'Critical', status: 'In Progress' },
  { id: 'ISS-003', title: 'Lab computers need antivirus update',  reporter: 'Ravi Kumar',    dept: 'ECE',  priority: 'Medium',   status: 'Resolved' },
  { id: 'ISS-004', title: 'Wi-Fi outage in Block B',              reporter: 'Sneha Patel',   dept: 'MECH', priority: 'High',     status: 'Open' },
];

/* ── Utility services seed ────────────────────────────────────────────────── */
export const UTILITY_SERVICES = [
  { name: 'Server Cluster A', instance: '01', status: 'Running'  },
  { name: 'Database Primary',  instance: '02', status: 'Running'  },
  { name: 'CDN Network',       instance: '03', status: 'Degraded' },
  { name: 'Cache Layer',       instance: '04', status: 'Running'  },
  { name: 'Mail Service',      instance: '05', status: 'Running'  },
];

/* ── Announcements seed ───────────────────────────────────────────────────── */
export const ANNOUNCEMENTS_INIT = [
  { id: 1, title: 'Semester Exams Schedule Released',    body: 'The timetable for semester examinations has been published. Please check the exam portal.',                                 type: 'Academic', ts: 'Feb 18', pinned: true  },
  { id: 2, title: 'FEDF Hackathon — Registrations Open', body: '25CS1201E students can register for the internal hackathon on the skill development portal before Feb 28.',              type: 'Event',    ts: 'Feb 17', pinned: false },
  { id: 3, title: 'Library Extended Hours',              body: 'The central library will be open until 10 PM during exam week (Feb 20–Mar 5).',                                            type: 'General',  ts: 'Feb 16', pinned: false },
];
