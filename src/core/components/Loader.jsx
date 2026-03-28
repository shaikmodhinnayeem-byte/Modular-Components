import './Loader.css';

/**
 * Loader
 * Props:
 *   size   {number} - spinner diameter in px (default 32)
 *   label  {string} - text below spinner
 */
export default function Loader({ size = 32, label = 'Loading...' }) {
  return (
    <div className="loader">
      <div
        className="loader__spinner"
        style={{ width: size, height: size, borderWidth: 2 }}
      />
      <span className="loader__label">{label}</span>
    </div>
  );
}
