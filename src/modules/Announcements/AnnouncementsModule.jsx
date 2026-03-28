import { useState } from 'react';
import './AnnouncementsModule.css';
import { ANNOUNCEMENTS_INIT, T } from '../../core/utils/constants';
import { usePersist } from '../../core/hooks/useAsyncSimulator';
import { SectionHeader } from '../../core/components/DataTable';

const TYPE_COLORS = {
  Academic: T.accent,
  Event:    '#ff6b9d',
  General:  T.info,
  Urgent:   T.danger,
};

const FILTER_TYPES = ['All', 'Academic', 'Event', 'General', 'Urgent'];

export default function AnnouncementsModule() {
  const [announcements] = usePersist('ann_v2', ANNOUNCEMENTS_INIT);
  const [filter, setFilter] = useState('All');

  const filtered = announcements
    .filter(a => filter === 'All' || a.type === filter)
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <div>
      <SectionHeader title="Announcements" sub="College-wide notices, events, and updates" />

      <div className="ann-filters">
        {FILTER_TYPES.map(t => (
          <button
            key={t}
            className={`ann-filter-btn ${filter === t ? 'ann-filter-btn--active' : 'ann-filter-btn--inactive'}`}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="ann-list">
        {filtered.map((a, i) => {
          const typeColor = TYPE_COLORS[a.type] || T.accentSoft;
          return (
            <div
              key={a.id}
              className="ann-card"
              style={{
                border:    `1px solid ${a.pinned ? T.accent + '55' : T.border}`,
                animation: `fadeUp 0.35s ease ${i * 0.06}s both`,
              }}
            >
              {a.pinned && <div className="ann-pin-badge">PINNED</div>}
              <div className="ann-meta">
                <span
                  className="ann-type-tag"
                  style={{ color: typeColor, background: `${typeColor}22` }}
                >{a.type}</span>
                <span className="ann-date">{a.ts}</span>
              </div>
              <h3 className="ann-title">{a.title}</h3>
              <p className="ann-body">{a.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
