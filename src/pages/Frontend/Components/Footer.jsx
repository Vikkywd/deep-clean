import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll'

export function Footer() {
  const location = useLocation()
const navigate = useNavigate()

const handleNavClick = (id) => {
  if (location.pathname === '/') {
    scroller.scrollTo(id, {
      smooth: 'easeInOutQuart',
      duration: 800,
      offset: -60,
    })
  } else {
    navigate('/', { state: { scrollTo: id } })
  }
}
  return (
    <footer className="w-full border-t bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">Deep Clean</span>
            </div>
            <p className="text-sm text-gray-500">
              Professional property cleaning services with skilled workers and advanced equipment.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              <li><button  className="text-sm hover:text-primary">Residential Cleaning</button></li>
              <li><button to="#" className="text-sm hover:text-primary">Commercial Cleaning</button></li>
              <li><button to="#" className="text-sm hover:text-primary">Deep Cleaning</button></li>
              <li><button to="#" className="text-sm hover:text-primary">Move In/Out Cleaning</button></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleNavClick('about')} className="text-sm text-primary underline hover:no-underline hover:text-primary/80 bg-transparent border-none p-0 m-0 cursor-pointer">About Us</button></li>

              <li><button to="#" className="text-sm text-primary underline hover:no-underline hover:text-primary/80 bg-transparent border-none p-0 m-0 cursor-pointer">Our Team</button></li>

              <li><button to="#" className="text-sm text-primary underline hover:no-underline hover:text-primary/80 bg-transparent border-none p-0 m-0 cursor-pointer">Careers</button></li>
              
              <li><button onClick={() => handleNavClick('contact')} className="text-sm text-primary underline hover:no-underline hover:text-primary/80 bg-transparent border-none p-0 m-0 cursor-pointer">Contact</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="#" className="text-sm hover:text-primary">Terms of Service</Link></li>
              <li><Link to="#" className="text-sm hover:text-primary">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t pt-6">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Deep-Clean. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
