import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { scroller } from 'react-scroll';



const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        //header effect on scroll
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = (target) => {
        if (location.pathname === '/') {
            scroller.scrollTo(target, {
                smooth: 'easeInOutQuart', // smoother easing
                duration: 800,             // longer duration
                offset: -60,
            })
        } else {
            navigate('/', { state: { scrollTo: target } })
        }
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    const menuItems = (
        <>
            <button onClick={() => handleNavClick('services')} className="text-sm font-medium hover:text-primary">Services</button >
            <button onClick={() => handleNavClick('about')} className="text-sm font-medium hover:text-primary">About Us</button>
            <button onClick={() => handleNavClick('testimonials')} className="text-sm font-medium hover:text-primary">Testimonials</button>
            <button onClick={() => handleNavClick('pricing')} className="text-sm font-medium hover:text-primary">Pricing</button>
            <button onClick={() => handleNavClick('contact')} className="text-sm font-medium hover:text-primary">Contact</button>
        </>
    )

    return (
        <header className={`sticky top-0 z-40 border-b transition-colors duration-300 ${isScrolled ? 'bg-green-100' : 'bg-green-200'
            }`}>
            <div className="container mx-auto flex h-16 items-center justify-between px-4 py-4">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary"><Link to='/'> Deep-Clean</Link></span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6">
                    {menuItems}
                </nav>

                <div className="flex items-center gap-4">
                    <Link to="/service-booking" className="hidden md:block">
                        <Button type="primary">Get a Quote</Button>
                    </Link>

                    {/* Mobile Menu Button */}
                    <Button
                        type="default"
                        size="middle"
                        className="md:hidden"
                        onClick={toggleMenu}
                        icon={menuOpen ? <CloseOutlined /> : <MenuOutlined />}
                    />
                </div>
            </div>

            {/* Mobile Nav */}
            {menuOpen && (
                <div className="flex flex-col gap-4 px-4 pb-4 md:hidden">
                    {menuItems}
                    <Link to="/service-booking">
                        <Button type="primary" block>Get a Quote</Button>
                    </Link>
                </div>
            )}
        </header>
    )
}

export default Header
