
import { FaFacebookF, FaTwitter, FaInstagram,FaEnvelope } from 'react-icons/fa';

import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {/* Site Info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">साहित्यिक सङ्घार</h2>
          <p className="text-sm">
            नेपाली साहित्य, कविता, उपन्यास र विचारहरू समेटिएको एक साहित्यिक यात्रा।
          </p>
        </div>

        {/* Navigation */}
        <div>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">गृहपृष्ठ</Link></li>
            <li><Link to="/about-us" className="hover:text-white">हाम्रो बारेमा</Link></li>
            <li><Link to="/contact" className="hover:text-white ">सम्पर्क</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className='flex flex-col'>
          <h3 className="text-lg font-semibold text-white mb-3 underline">हाम्रा सामाजिक सञ्जालहरू :</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
          </div>
          <div className='mt-3'>
            <h3 className="text-lg font-semibold text-white mb-2 underline">सम्पर्क :</h3>
            <div className="flex space-x-2 text-sm">
              <FaEnvelope/><span>Email: saahityiksanghaar@gmail.com</span>
            </div>
          </div>

        </div>
      </div>
      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm">
        © {new Date().getFullYear()} साहित्यिक सँघारमा सबै अधिकार सुरक्षित छ।
      </div>
    </footer>
  );
};

export default Footer;
