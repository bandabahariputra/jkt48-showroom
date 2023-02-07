import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-slate-800/90 backdrop-blur border-b border-slate-700 shadow sticky top-0 z-10">
    <div className="max-w-4xl mx-auto px-6 py-6">
      <Link to="/">
        <h1 className="font-bold text-2xl text-neutral-50">JKT48 x Showroom</h1>
      </Link>
    </div>
  </header>
);

export default Header;
