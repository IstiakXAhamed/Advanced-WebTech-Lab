import PropTypes from 'prop-types';

export default function StatBadge({ label, value }) {
  return (
    <div className="bg-white/5 px-4 py-2 rounded-xl flex flex-col items-center border border-white/10">
      <span className="text-xs uppercase tracking-wider text-slate-400">{label}</span>
      <span className="text-2xl font-bold text-indigo-400">{value}</span>
    </div>
  );
}

StatBadge.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
