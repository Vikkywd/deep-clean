import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { Link as ScrollLink } from 'react-scroll'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    const linkProps = {
        spy: true,
        smooth: true,
        offset: -60, // adjust if header overlaps
        duration: 500,
        activeClass: 'text-primary',
      }

    const menuItems = (
        <>
            <ScrollLink  to="services" {...linkProps}  className="text-sm font-medium hover:text-primary">Services</ScrollLink >
            <ScrollLink to="about" {...linkProps} className="text-sm font-medium hover:text-primary">About Us</ScrollLink>
            <ScrollLink to="testimonials" {...linkProps} className="text-sm font-medium hover:text-primary">Testimonials</ScrollLink>
            <ScrollLink to="pricing" {...linkProps} className="text-sm font-medium hover:text-primary">Pricing</ScrollLink>
            <ScrollLink to="contact" {...linkProps} className="text-sm font-medium hover:text-primary">Contact</ScrollLink>
        </>
    )

    return (
        <header className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
            isScrolled ? 'bg-green-100' : 'bg-green-200'
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
