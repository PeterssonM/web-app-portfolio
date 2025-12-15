'use client'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold">Maximilian Petersson</h2>
          <p className="text-sm">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        <div className="text-center md:text-right space-y-1 text-sm">
          <p>
            Email: <a href="mailto:maxi.petersson@gmail.com" className="hover:underline text-blue-400">maxi.petersson@gmail.com</a>
          </p>
          <p>
            GitHub: <a href="https://github.com/peterssonM" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-400">peterssonM</a>
          </p>
          <p>
            LinkedIn: <a href="https://www.linkedin.com/in/maximilianpetersson" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-400">Maximilian Petersson</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
