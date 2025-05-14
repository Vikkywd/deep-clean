import { Button, Image } from "antd"
import { Link } from "react-router-dom"
import homeService from '../../../images/homepage2.jpeg'

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Professional Property Cleaning Services
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Our skilled team and advanced equipment deliver spotless results for homes and businesses.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="#contact">
                <Button size="lg" className="px-8">
                  Get a Free Quote
                </Button>
              </Link>
              <Link href="#services">
                <Button size="lg" variant="outline" className="px-8">
                  Our Services
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
            src={homeService}
              // src="https://kzmp6v81cdn7jyceo19r.lite.vusercontent.net/placeholder.svg?height=550&width=550"
              width={550}
              height={550}
              alt="Professional cleaning team"
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
