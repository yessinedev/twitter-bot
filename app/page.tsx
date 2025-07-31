import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, Twitter, Zap, Calendar, BarChart2 } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Supercharge Your Twitter Presence
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Generate engaging tweets, schedule your content, and analyze your performance with TweetMaster.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link className='text-black' href="/demo">
                    Watch Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Powerful Features for Twitter Mastery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-yellow-500" />}
                title="AI-Powered Tweet Generation"
                description="Create engaging tweets with our advanced AI technology. Never run out of content ideas again."
              />
              <FeatureCard
                icon={<Calendar className="h-10 w-10 text-green-500" />}
                title="Smart Scheduling"
                description="Schedule your tweets for optimal times to maximize engagement and reach."
              />
              <FeatureCard
                icon={<BarChart2 className="h-10 w-10 text-purple-500" />}
                title="In-depth Analytics"
                description="Track your performance with detailed analytics and insights to refine your Twitter strategy."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Twitter Game?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of users who have already boosted their Twitter presence with TweetMaster.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">
                Start Your Free Trial
                <Twitter className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold">
                TweetMaster
              </Link>
            </div>
            <nav className="flex flex-wrap justify-center md:justify-end gap-4">
              <Link href="/about" className="hover:text-blue-400">About</Link>
              <Link href="/features" className="hover:text-blue-400">Features</Link>
              <Link href="/pricing" className="hover:text-blue-400">Pricing</Link>
              <Link href="/contact" className="hover:text-blue-400">Contact</Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-sm">
            © {new Date().getFullYear()} TweetMaster. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  )
}

