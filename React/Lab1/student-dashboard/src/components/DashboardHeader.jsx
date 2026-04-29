import PropTypes from 'prop-types';

export default function DashboardHeader({ title, tagline }) {
  return (
    <header className="mb-8 pb-4 border-b border-slate-700">
      <h1 className="text-3xl font-extrabold text-indigo-500 mb-2">{title}</h1>
      <p className="text-slate-400 m-0">{tagline}</p>
    </header>
  );
}

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
};
