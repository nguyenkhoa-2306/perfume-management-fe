import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 bg-gray-800 text-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          © {new Date().getFullYear()} PerfumeHub. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <a className="text-sm hover:text-white" href="#">
            Privacy
          </a>
          <a className="text-sm hover:text-white" href="#">
            Terms
          </a>
          <a className="text-sm hover:text-white" href="#">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
