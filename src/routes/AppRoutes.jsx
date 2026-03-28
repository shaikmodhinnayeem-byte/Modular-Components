import './AppRoutes.css';
import UtilitiesDashboard  from '../modules/Utilities/UtilitiesDashboard';
import AttendanceModule    from '../modules/Attendance/AttendanceModule';
import TimetableModule     from '../modules/Timetable/TimetableModule';
import IssueReporting      from '../modules/Issues/IssueReporting';
import AnnouncementsModule from '../modules/Announcements/AnnouncementsModule';
import AdminDashboard      from '../modules/Admin/AdminDashboard';

const VIEWS = {
  dashboard:     UtilitiesDashboard,
  attendance:    AttendanceModule,
  timetable:     TimetableModule,
  issues:        IssueReporting,
  announcements: AnnouncementsModule,
  admin:         AdminDashboard,
};

/**
 * AppRoutes
 * Simple string-based router — no react-router dependency needed.
 * Props:
 *   route {string} - active route id
 */
export default function AppRoutes({ route }) {
  const View = VIEWS[route] || UtilitiesDashboard;
  return (
    <div className="route-view">
      <View />
    </div>
  );
}
