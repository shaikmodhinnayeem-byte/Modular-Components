import './StatusCard.css';
import { T } from '../utils/constants';

const VARIANT_COLORS = {
  default: T.accentSoft,
  success: T.success,
  danger:  T.danger,
  warn:    T.warn,
  info:    T.info,
};

/**
 * StatusCard
 * Props:
 *   label    {string}  - uppercase metric label
 *   value    {any}     - big number/text to display
 *   sub      {string}  - optional small subtitle
 *   variant  {string}  - 'default' | 'success' | 'danger' | 'warn' | 'info'
 *   glow     {boolean} - enable glow-pulse animation
 *   delay    {number}  - animation delay in seconds
 */
export default function StatusCard({ label, value, sub, variant = 'default', glow = false, delay = 0 }) {
  const color = VARIANT_COLORS[variant] || VARIANT_COLORS.default;

  return (
    <div
      className={`status-card${glow ? ' status-card--glow' : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className="status-card__glow-bg"
        style={{ background: `radial-gradient(circle at top right, ${color}22, transparent)` }}
      />
      <div className="status-card__label">{label}</div>
      <div className="status-card__value" style={{ color }}>{value}</div>
      {sub && <div className="status-card__sub">{sub}</div>}
    </div>
  );
}
