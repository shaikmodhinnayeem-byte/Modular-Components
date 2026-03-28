import './DataTable.css';
import Loader from './Loader';
import { T } from '../utils/constants';

/* ── DataTable ────────────────────────────────────────────────────────────── */
/**
 * Props:
 *   columns       {Array}    - [{ key, label, render? }]
 *   rows          {Array}    - data rows
 *   onRowClick    {function} - optional row click handler
 *   loading       {boolean}  - show loader instead of table
 *   emptyMessage  {string}   - message when rows is empty
 */
export default function DataTable({ columns, rows, onRowClick, loading, emptyMessage = 'No data' }) {
  if (loading) return <Loader />;
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(c => (
              <th key={c.key + c.label}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="data-table__empty">{emptyMessage}</td>
            </tr>
          ) : rows.map((row, i) => (
            <tr
              key={i}
              className={onRowClick ? 'clickable' : ''}
              onClick={() => onRowClick?.(row)}
              style={{ animation: `fadeUp 0.3s ease ${i * 0.04}s both` }}
            >
              {columns.map(c => (
                <td key={c.key + c.label} style={{ color: c.render ? undefined : T.text }}>
                  {c.render ? c.render(row[c.key], row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Badge ────────────────────────────────────────────────────────────────── */
const BADGE_COLORS = {
  default: [T.accentGlow,               T.accentSoft],
  success: ['rgba(46,213,115,0.15)',     T.success],
  danger:  ['rgba(255,71,87,0.15)',      T.danger],
  warn:    ['rgba(255,165,2,0.15)',      T.warn],
  info:    ['rgba(30,144,255,0.15)',     T.info],
};

export function Badge({ label, variant = 'default' }) {
  const [bg, color] = BADGE_COLORS[variant] || BADGE_COLORS.default;
  return (
    <span className="badge" style={{ background: bg, color }}>{label}</span>
  );
}

/* ── Btn ──────────────────────────────────────────────────────────────────── */
export function Btn({ children, variant = 'primary', onClick, disabled, small, fullWidth, icon }) {
  return (
    <button
      className={[
        'btn',
        `btn--${variant}`,
        small    ? 'btn--sm'   : 'btn--md',
        fullWidth ? 'btn--full' : '',
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

/* ── Card ─────────────────────────────────────────────────────────────────── */
export function Card({ children, title, action, className = '', glowAccent, bare }) {
  return (
    <div className={`card${glowAccent ? ' card--glow' : ''} ${className}`}>
      {title && (
        <div className="card__header">
          <span>{title}</span>
          {action}
        </div>
      )}
      <div className={bare ? 'card__body--bare' : 'card__body'}>{children}</div>
    </div>
  );
}

/* ── SectionHeader ────────────────────────────────────────────────────────── */
export function SectionHeader({ title, sub }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}

/* ── ProgressBar ──────────────────────────────────────────────────────────── */
export function ProgressBar({ value, max = 100, label }) {
  const pct   = Math.min(100, (value / max) * 100);
  const color = pct < 50 ? T.danger : pct < 75 ? T.warn : T.success;
  return (
    <div className="progress-bar-wrap">
      {label && (
        <div className="progress-bar-meta">
          <span>{label}</span>
          <span style={{ color }}>{pct.toFixed(0)}%</span>
        </div>
      )}
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{
            width:      `${pct}%`,
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
            boxShadow:  `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  );
}
