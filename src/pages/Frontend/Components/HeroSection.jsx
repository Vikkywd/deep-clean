import { Button, Image } from "antd"
import { Link } from "react-router-dom"
import homeService from '../../../images/homepage2.jpeg'

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Professional Property Cleaning Services
              </h1>
              <p className="text-gray-500 md:text-xl">
                Our skilled team and advanced equipment deliver spotless results for homes and businesses.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-6 gap-4">
              <Link to="#contact" className="w-full sm:w-auto">
                <Button size="large" className="w-full sm:w-auto px-8">
                  Get a Free Quote
                </Button>
              </Link>
              <Link to="#services" className="w-full sm:w-auto">
                <Button size="large" type="default" className="w-full sm:w-auto px-8">
                  Our Services
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Image
              src={homeService}
              alt="Professional cleaning team"
              className="rounded-lg object-cover"
              width="100%"
              height="auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
