import { Link } from 'react-router-dom';
import { Button } from 'antd'
import { useEffect, useState } from 'react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
            isScrolled ? 'bg-green-100' : 'bg-green-200'
        }`}>
            <div className="container flex h-16 items-center justify-between py-4">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary">Deep-Clean</span>
                </div>
                <nav className="hidden md:flex gap-6">
                    <Link href="#services" className="text-sm font-medium hover:text-primary">
                        Services
                    </Link>
                    <Link href="#about" className="text-sm font-medium hover:text-primary">
                        About Us
                    </Link>
                    <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
                        Testimonials
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium hover:text-primary">
                        Pricing
                    </Link>
                    <Link href="#contact" className="text-sm font-medium hover:text-primary">
                        Contact
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="#contact" className="hidden md:block">
                        <Button>Get a Quote</Button>
                    </Link>
                    <Button variant="outline" size="icon" className="md:hidden">
                        <span className="sr-only">Toggle menu</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                        >
                            <line x1="4" x2="20" y1="12" y2="12" />
                            <line x1="4" x2="20" y1="6" y2="6" />
                            <line x1="4" x2="20" y1="18" y2="18" />
                        </svg>
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Header