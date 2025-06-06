
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        {/* Site Info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">साहित्यिक संघार</h2>
          <p className="text-sm">
            नेपाली साहित्य, कविता, उपन्यास र विचारहरू समेटिएको एक साहित्यिक यात्रा।
          </p>
        </div>

        {/* Navigation */}
        <div>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">गृहपृष्ठ</a></li>
            <li><a href="/categories" className="hover:text-white">श्रेणीहरू</a></li>
            <li><a href="/about" className="hover:text-white">हाम्रो बारेमा</a></li>
            <li><a href="/contact" className="hover:text-white">सम्पर्क</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">हाम्रा सामाजिक सञ्जाल</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm">
        © {new Date().getFullYear()} साहित्यिक संघार सबै अधिकार सुरक्षित।
      </div>
    </footer>
  );
};

export default Footer;
