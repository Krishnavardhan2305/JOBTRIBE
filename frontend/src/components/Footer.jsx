import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-white text-2xl font-bold">Job<span className='text-[#F83002]'>Tribe</span></h2>
            <p className="text-gray-500 mt-2">
              Your gateway to finding your dream job. Explore thousands of opportunities with us.
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            <div>
              <h3 className="text-white font-semibold">Job<span className='text-[#F83002]'>Tribe</span></h3>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold">Support</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold">Resources</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="https://www.overleaf.com/project" className="hover:text-white">Resume Builder</a></li>
                <li><a href="#" className="hover:text-white">Career Advice</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="mt-6 text-gray-500">
            &copy; {new Date().getFullYear()} Job<span className='text-[#F83002]'>Tribe</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
