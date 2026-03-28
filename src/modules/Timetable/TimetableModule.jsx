import './TimetableModule.css';
import { T } from '../../core/utils/constants';
import { SectionHeader } from '../../core/components/DataTable';

const DAYS  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const SLOTS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];

const SUBJECTS = {
  FEDF:  { color: T.accent,   short: 'FEDF' },
  DS:    { color: T.success,  short: 'DS'   },
  OS:    { color: T.warn,     short: 'OS'   },
  CN:    { color: T.info,     short: 'CN'   },
  MATHS: { color: '#ff6b9d',  short: 'MTH'  },
  LAB:   { color: '#a29bfe',  short: 'LAB'  },
};

const GRID = {
  'Mon-09:00': 'FEDF', 'Mon-10:00': 'DS',   'Mon-14:00': 'OS',
  'Tue-09:00': 'CN',   'Tue-11:00': 'FEDF', 'Tue-15:00': 'LAB',
  'Wed-10:00': 'MATHS','Wed-14:00': 'FEDF', 'Wed-16:00': 'DS',
  'Thu-09:00': 'OS',   'Thu-11:00': 'CN',   'Thu-14:00': 'MATHS',
  'Fri-09:00': 'LAB',  'Fri-10:00': 'FEDF', 'Fri-15:00': 'DS',
};

export default function TimetableModule() {
  const today = DAYS[new Date().getDay() - 1];

  return (
    <div>
      <SectionHeader title="Timetable" sub="Weekly schedule with route-based conditional rendering" />

      <div className="timetable-legend">
        {Object.entries(SUBJECTS).map(([name, { color }]) => (
          <div key={name} className="timetable-legend-item">
            <div className="timetable-legend-dot" style={{ background: color }} />
            {name}
          </div>
        ))}
      </div>

      <div className="timetable-scroll">
        <table className="timetable">
          <thead>
            <tr>
              <th className="time-col">TIME</th>
              {DAYS.map(d => (
                <th key={d} className={d === today ? 'today-col' : ''}>
                  {d}{d === today && ' ●'}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SLOTS.map((slot, si) => (
              <tr key={slot}>
                <td className="time-cell">{slot}</td>
                {DAYS.map(d => {
                  const sub = GRID[`${d}-${slot}`];
                  const s   = sub ? SUBJECTS[sub] : null;
                  return (
                    <td key={d} className={d === today ? 'today-cell' : ''}>
                      {s ? (
                        <div
                          className="timetable-subject"
                          style={{
                            background:  `${s.color}22`,
                            border:      `1px solid ${s.color}44`,
                            color:        s.color,
                            animation:   `fadeUp 0.3s ease ${si * 0.03}s both`,
                          }}
                        >
                          {s.short}
                        </div>
                      ) : (
                        <div className="timetable-empty-cell" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
