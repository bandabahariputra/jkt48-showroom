import { Link } from 'react-router-dom';

const Card = ({ data, to }) => {
  const name = data.url_key.replace('JKT48_', '');

  return (
    <div className="relative z-0 flex flex-col h-full before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-slate-500 before:translate-x-1 before:translate-y-1 before:-z-10">
      <img
        src={data.image_url}
        alt={data.name}
        className="object-cover border-b border-neutral-50"
      />
      <div className="bg-white font-medium text-sm text-neutral-900 h-full px-4 py-2">
        {name}
      </div>
      <Link to={to} className="absolute top-0 left-0 w-full h-full" />
    </div>
  );
};

export default Card;
