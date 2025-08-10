import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white px-4 py-3 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          <Link to="/">CheckPal</Link>
        </h1>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link
                to="/"
                className="hover:text-gray-300 transition-colors duration-200"
              >
                Productos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
