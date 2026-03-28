import { useState } from 'react';
import './AlertBanner.css';

const TYPE_CONFIG = {
  info:    { color: '#1e90ff', icon: 'ℹ' },
  success: { color: '#2ed573', icon: '✓' },
  danger:  { color: '#ff4757', icon: '✕' },
  warn:    { color: '#ffa502', icon: '⚠' },
};

/**
 * AlertBanner
 * Props:
 *   type     {string}   - 'info' | 'success' | 'danger' | 'warn'
 *   title    {string}   - optional bold title
 *   message  {string}   - body text
 *   onClose  {function} - if provided, shows × button and calls this on dismiss
 */
export default function AlertBanner({ type = 'info', title, message, onClose }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const { color, icon } = TYPE_CONFIG[type] || TYPE_CONFIG.info;

  return (
    <div
      className="alert-banner"
      style={{
        background:  `${color}15`,
        border:      `1px solid ${color}44`,
        borderLeft:  `3px solid ${color}`,
      }}
    >
      <span className="alert-banner__icon" style={{ color }}>{icon}</span>
      <div className="alert-banner__body">
        {title && <div className="alert-banner__title" style={{ color }}>{title}</div>}
        <div className="alert-banner__message">{message}</div>
      </div>
      {onClose && (
        <button
          className="alert-banner__close"
          onClick={() => { setVisible(false); onClose?.(); }}
        >×</button>
      )}
    </div>
  );
}
