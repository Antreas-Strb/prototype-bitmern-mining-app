import React from 'react';
import Link from 'next/link';
import { 
  Bitcoin, 
  ChevronRight, 
  BarChart3, 
  HardDrive, 
  Server, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Navigation */}
      <nav className="bg-dark-800 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bitcoin className="h-8 w-8 text-accent-500 mr-3" />
              <span className="text-xl font-bold text-light-500">MiningVerse</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-light-700 hover:text-light-500 transition-colors">Features</a>
              <a href="#services" className="text-light-700 hover:text-light-500 transition-colors">Services</a>
              <a href="#pricing" className="text-light-700 hover:text-light-500 transition-colors">Pricing</a>
              <a href="#about" className="text-light-700 hover:text-light-500 transition-colors">About</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/register" 
                className="btn btn-primary px-6 py-2"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-dark-800 opacity-50 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Professional <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">Bitcoin Mining</span> Management
              </h1>
              <p className="text-xl text-light-700 mb-8 max-w-lg">
                Monitor your miners, track performance, and maximize your ROI with our comprehensive Bitcoin mining platform.
              </p>
              <div className="flex space-x-4">
                <Link 
                  href="/register" 
                  className="btn btn-primary px-8 py-3 flex items-center"
                >
                  Start Mining
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
                <a 
                  href="#demo" 
                  className="btn btn-outline px-8 py-3"
                >
                  Watch Demo
                </a>
              </div>
              <div className="mt-8 flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-dark-900 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-medium">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-light-700">
                  <span className="text-light-500 font-medium">500+</span> miners are already using our platform
                </p>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl opacity-30 blur-lg"></div>
                <div className="relative bg-dark-800 border border-dark-700 rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Bitcoin Mining Facility" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-900 to-transparent p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-light-700 text-sm">Active Miners</p>
                        <p className="text-light-500 text-xl font-bold">324 units</p>
                      </div>
                      <div>
                        <p className="text-light-700 text-sm">Total Hashrate</p>
                        <p className="text-light-500 text-xl font-bold">24.6 PH/s</p>
                      </div>
                      <div>
                        <p className="text-light-700 text-sm">Daily Rewards</p>
                        <p className="text-light-500 text-xl font-bold">0.0034 BTC</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section id="features" className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose MiningVerse</h2>
            <p className="text-light-700 max-w-2xl mx-auto">
              Our platform offers everything you need to manage your Bitcoin mining operations effectively and profitably.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BarChart3 className="h-8 w-8 text-primary-500" />,
                title: 'Real-time Monitoring',
                description: 'Track your miners\' performance with comprehensive real-time data and alerts.'
              },
              {
                icon: <HardDrive className="h-8 w-8 text-primary-500" />,
                title: 'Hardware Marketplace',
                description: 'Buy, sell, and trade mining equipment with trusted vendors and other miners.'
              },
              {
                icon: <Server className="h-8 w-8 text-primary-500" />,
                title: 'Professional Hosting',
                description: 'Secure facilities with optimal conditions for maximum mining efficiency.'
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-primary-500" />,
                title: 'Secure Management',
                description: 'Enterprise-grade security protocols to keep your mining operation safe.'
              }
            ].map((feature, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow">
                <div className="mb-4 p-3 bg-dark-700 rounded-lg inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-light-700">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/register" className="btn btn-primary inline-flex items-center">
              Explore All Features
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-900 to-secondary-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Optimize Your Mining Operation?</h2>
          <p className="text-light-700 max-w-2xl mx-auto mb-10">
            Join hundreds of miners who are already using MiningVerse to maximize their Bitcoin mining profits.
          </p>
          <Link href="/register" className="btn bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 text-lg font-medium">
            Get Started Now
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-dark-900 border-t border-dark-700 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-4">
                <Bitcoin className="h-8 w-8 text-accent-500 mr-3" />
                <span className="text-xl font-bold">MiningVerse</span>
              </div>
              <p className="text-light-700 mb-4">
                Professional Bitcoin mining management platform for miners of all sizes.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-light-700 hover:text-light-500">
                  <span className="sr-only">Twitter</span>
                  {/* Icon would go here */}
                </a>
                <a href="#" className="text-light-700 hover:text-light-500">
                  <span className="sr-only">LinkedIn</span>
                  {/* Icon would go here */}
                </a>
                <a href="#" className="text-light-700 hover:text-light-500">
                  <span className="sr-only">GitHub</span>
                  {/* Icon would go here */}
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Product</h3>
              <ul className="space-y-3 text-light-700">
                <li><a href="#" className="hover:text-light-500">Features</a></li>
                <li><a href="#" className="hover:text-light-500">Pricing</a></li>
                <li><a href="#" className="hover:text-light-500">Marketplace</a></li>
                <li><a href="#" className="hover:text-light-500">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-3 text-light-700">
                <li><a href="#" className="hover:text-light-500">Documentation</a></li>
                <li><a href="#" className="hover:text-light-500">Blog</a></li>
                <li><a href="#" className="hover:text-light-500">Knowledge Base</a></li>
                <li><a href="#" className="hover:text-light-500">Tutorials</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-3 text-light-700">
                <li><a href="#" className="hover:text-light-500">About Us</a></li>
                <li><a href="#" className="hover:text-light-500">Careers</a></li>
                <li><a href="#" className="hover:text-light-500">Contact</a></li>
                <li><a href="#" className="hover:text-light-500">Partners</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-dark-700 flex flex-col md:flex-row md:justify-between md:items-center">
            <p className="text-light-700 mb-4 md:mb-0">
              &copy; 2025 MiningVerse. All rights reserved.
            </p>
            <div className="flex space-x-6 text-light-700">
              <a href="#" className="hover:text-light-500">Privacy Policy</a>
              <a href="#" className="hover:text-light-500">Terms of Service</a>
              <a href="#" className="hover:text-light-500">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;