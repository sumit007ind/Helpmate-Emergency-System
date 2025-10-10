import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

 const slides = [
  {
    id: 1,
    title: "Instant Emergency Response",
    description: "Press and hold the SOS button for 3 seconds...",
    image: "🚨",
    bgImage: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1920&h=1080&fit=crop",
    bgColor: "rgba(239, 68, 68, 0.8)", // red with transparency
  },
  {
    id: 2,
    title: "Health Monitoring",
    description: "AI-powered health monitoring...",
    image: "🏥",
    bgImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&h=1080&fit=crop",
    bgColor: "rgba(59, 130, 246, 0.8)", // blue with transparency
  },
  {
    id: 3,
    title: "Smart Contact Management",
    description: "Organize emergency contacts...",
    image: "📞",
    bgImage: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=1920&h=1080&fit=crop",
    bgColor: "rgba(34, 197, 94, 0.8)", // green with transparency
  },
  {
    id: 4,
    title: "Real-time Location Sharing",
    description: "Automatically share your precise location...",
    image: "📍",
    bgImage: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1920&h=1080&fit=crop",
    bgColor: "rgba(168, 85, 247, 0.8)", // purple with transparency
  },
  {
    id: 5,
    title: "Professional Monitoring",
    description: "24/7 professional monitoring service...",
    image: "👨‍⚕️",
    bgImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1920&h=1080&fit=crop",
    bgColor: "rgba(249, 115, 22, 0.8)", // orange with transparency
  },
];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const features = [
    {
      icon: "🆘",
      title: "One-Touch SOS",
      description:
        "Emergency help is just 3 seconds away with our intuitive SOS button.",
    },
    {
      icon: "👥",
      title: "Emergency Contacts",
      description:
        "Manage unlimited emergency contacts with priority-based notifications.",
    },
    {
      icon: "🏥",
      title: "Health Integration",
      description:
        "Connect health data and medical information for comprehensive emergency response.",
    },
    {
      icon: "📱",
      title: "Mobile & Web App",
      description:
        "Access from anywhere with our responsive web app and mobile PWA.",
    },
    {
      icon: "🤖",
      title: "AI-Powered",
      description:
        "Machine learning algorithms predict and prevent emergency situations.",
    },
    {
      icon: "🔒",
      title: "Privacy Secure",
      description:
        "End-to-end encryption ensures your personal and medical data stays private.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Senior Citizen",
      message:
        "Helpmate gives me confidence to live independently. My family knows I'm safe.",
      avatar: "👵",
    },
    {
      name: "Dr. Michael Chen",
      role: "Emergency Physician",
      message:
        "This system has revolutionized how we receive critical patient information during emergencies.",
      avatar: "👨‍⚕️",
    },
    {
      name: "Lisa Rodriguez",
      role: "Working Mother",
      message:
        "Peace of mind knowing my elderly parents have instant access to help when needed.",
      avatar: "👩‍💼",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-red-600 text-white p-2 rounded-full">
                <span className="text-xl font-bold">🆘</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Helpmate</h1>
                <p className="text-xs text-gray-500">
                  Emergency Response System
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/sos"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >
                SOS Emergency
              </Link>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >
                Profile
              </Link>
              <Link
                to="/contacts"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >
                Contacts
              </Link>
              <Link
                to="/alerts"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >
                Alerts
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                  }`}
                ></span>
                <span
                  className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                  }`}
                ></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/"
                  className="block px-3 py-2 text-gray-700 hover:text-red-600 font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:text-red-600 font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/sos"
                  className="block px-3 py-2 text-gray-700 hover:text-red-600 font-medium"
                >
                  SOS Emergency
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-gray-700 hover:text-red-600 font-medium"
                >
                  Profile
                </Link>
                <Link
                  to="/contacts"
                  className="block px-3 py-2 text-gray-700 hover:text-red-600 font-medium"
                >
                  Contacts
                </Link>
                <Link
                  to="/alerts"
                  className="block px-3 py-2 text-gray-700 hover:text-red-600 font-medium"
                >
                  Alerts
                </Link>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-700 hover:text-red-600 font-medium"
                  >
                    Login
                  </Link>
                 
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Slider */}
      {/* Hero Section with Image Slider */}
<section className="relative overflow-hidden h-[600px]">
  {/* Background Image with Overlay */}
  <div
    className="absolute inset-0 transition-all duration-1000 ease-in-out"
    style={{
      backgroundImage: `url(${slides[currentSlide].bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* Color Overlay */}
    <div
      className="absolute inset-0 transition-colors duration-1000"
      style={{ backgroundColor: slides[currentSlide].bgColor }}
    ></div>
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 h-full flex items-center">
    <div className="text-center text-white w-full">
      <div className="text-8xl mb-6 animate-pulse drop-shadow-2xl">
        {slides[currentSlide].image}
      </div>
      <h2 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
        {slides[currentSlide].title}
      </h2>
      <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
        {slides[currentSlide].description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          to="/signup"
          className="bg-white text-gray-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105 shadow-xl"
        >
          Get Started Free
        </Link>
        <Link
          to="/sos"
          className="border-2 border-white bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-gray-800 transition-colors transform hover:scale-105 shadow-xl"
        >
          Emergency SOS
        </Link>
      </div>
    </div>
  </div>

  {/* Slider Indicators */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentSlide(index)}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          currentSlide === index 
            ? "bg-white w-8" 
            : "bg-white/50 hover:bg-white/75"
        }`}
      />
    ))}
  </div>

  {/* Navigation Arrows */}
  <button
    onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full transition-all"
  >
    ◀
  </button>
  <button
    onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full transition-all"
  >
    ▶
  </button>
</section>

      {/* About Helpmate Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              About Helpmate Emergency System
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Helpmate is a comprehensive emergency response system designed to
              provide instant help when you need it most. Using cutting-edge
              technology, AI-powered monitoring, and real-time communication, we
              ensure that help is always just seconds away. Whether you're a
              senior living independently, a parent concerned about family
              safety, or someone with medical conditions requiring immediate
              attention, Helpmate is your reliable guardian angel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900 p-6 rounded-lg text-center 
    shadow-md hover:shadow-2xl hover:shadow-red-500 
    transition-shadow transform hover:-translate-y-1 duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-50 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-50">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-50 mb-6">
              How Helpmate Works
            </h2>
            <p className="text-xl text-gray-50 max-w-3xl mx-auto">
              Simple, fast, and reliable emergency response in just a few steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Setup Profile</h3>
              <p className="text-gray-300">
                Create your profile with medical information and emergency
                contacts
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Add Contacts</h3>
              <p className="text-gray-300">
                Add family, friends, and medical professionals as emergency
                contacts
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Press SOS</h3>
              <p className="text-gray-300">
                In emergency, hold SOS button for 3 seconds to trigger alert
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Help</h3>
              <p className="text-gray-300">
                Contacts receive instant alerts with your location and medical
                info
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from people who trust Helpmate with their safety
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group bg-gray-50 p-6 rounded-lg shadow-md
                     transition-all duration-300 transform
                     hover:bg-gray-900 hover:shadow-red-700 hover:-translate-y-2"
              >
                <div className="text-4xl mb-4 text-center">
                  {testimonial.avatar}
                </div>
                <p className="text-gray-600 mb-4 italic group-hover:text-gray-200">
                  "{testimonial.message}"
                </p>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-800 group-hover:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 group-hover:text-gray-300">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-50 mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-50 mb-8">
            Join thousands who trust Helpmate for their emergency safety
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/signup"
              className="bg-red-600 text-white p-6 rounded-lg hover:bg-red-700 transition-colors transform hover:scale-105"
            >
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-bold text-lg">Sign Up Free</h3>
              <p className="text-sm opacity-90">Start your safety journey</p>
            </Link>

            <Link
              to="/sos"
              className="bg-orange-600 text-white p-6 rounded-lg hover:bg-orange-700 transition-colors transform hover:scale-105"
            >
              <div className="text-3xl mb-2">🆘</div>
              <h3 className="font-bold text-lg">Emergency SOS</h3>
              <p className="text-sm opacity-90">Quick emergency access</p>
            </Link>

            <Link
              to="/profile"
              className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
            >
              <div className="text-3xl mb-2">👤</div>
              <h3 className="font-bold text-lg">Setup Profile</h3>
              <p className="text-sm opacity-90">Manage your information</p>
            </Link>

            <Link
              to="/contacts"
              className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors transform hover:scale-105"
            >
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-bold text-lg">Add Contacts</h3>
              <p className="text-sm opacity-90">Setup emergency contacts</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-red-600 text-white p-2 rounded-full">
                  <span className="text-lg font-bold">🆘</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Helpmate</h3>
                  <p className="text-sm text-gray-400">
                    Emergency Response System
                  </p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Providing instant emergency response and peace of mind to
                families worldwide.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/dashboard"
                    className="text-gray-400 hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/sos" className="text-gray-400 hover:text-white">
                    Emergency SOS
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="text-gray-400 hover:text-white"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contacts"
                    className="text-gray-400 hover:text-white"
                  >
                    Contacts
                  </Link>
                </li>
                <li>
                  <Link to="/alerts" className="text-gray-400 hover:text-white">
                    Alert History
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>One-Touch SOS</li>
                <li>Health Monitoring</li>
                <li>Location Sharing</li>
                <li>AI-Powered Alerts</li>
                <li>24/7 Monitoring</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📧 support@helpmate.com</li>
                <li>📞 1-800-HELPMATE</li>
                <li>🏠 24/7 Emergency Support</li>
                <li>🌍 Global Coverage</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>
              &copy; 2024 Helpmate Emergency System. All rights reserved. |
              Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
