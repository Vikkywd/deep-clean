import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50 py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">SparkleClean</span>
            </div>
            <p className="text-sm text-gray-500">
              Professional property cleaning services with skilled workers and advanced equipment.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Residential Cleaning
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Commercial Cleaning
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Deep Cleaning
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Move In/Out Cleaning
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-sm hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-sm hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} SparkleClean. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
