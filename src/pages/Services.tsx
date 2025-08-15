import { useState, useEffect } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import { FadeInOnScroll } from "@/components/ScrollReveal";
import Threads from "@/components/Threads";

export default function Services() {
  const { darkMode, currentColor } = useSettings();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    description: '',
    timeline: '',
    budget: '',
    existingSystems: '',
    industry: '',
    preferredContact: 'email'
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can add email functionality or redirect to contact page
    console.log('Form submitted:', formData);
    // For now, just show an alert
    alert('Thank you! I\'ll get back to you soon to discuss your project.');
  };

  return (
    <div className="min-h-screen w-full font-['Inter'] transition-colors duration-300 bg-white dark:bg-black">
      <Navigation />
      <main className="pt-16">
                {/* Hero Section */}
        <section className="min-h-[60vh] bg-white dark:bg-black relative overflow-hidden">
          <div className="relative z-10">
            {/* Content */}
            <div className="max-w-4xl mx-auto text-center pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
              <FadeInOnScroll direction="up" duration={1000} delay={200} initialOpacity={0} elementId="services-hero">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  Services
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  Full-stack development and technical consulting to bring your ideas to life
                </p>
              </FadeInOnScroll>
            </div>
          </div>
          
          {/* Threads Below Text - Responsive positioning and sizing */}
          <div className="absolute inset-0 top-0 left-0 w-full h-full pointer-events-none">
            <div className="relative w-full h-full">
              <Threads
                color={darkMode ? [1, 1, 1] : [0.9, 0.9, 0.9]}
                amplitude={1.5}
                distance={0}
                enableMouseInteraction={false}
              />
            </div>
          </div>
        </section>

        {/* Buffer div to ensure proper spacing */}
        <div className="h-4 sm:h-6 md:h-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-900"></div>

        {/* Services Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-900 relative z-10">
          <div className="max-w-6xl mx-auto">


            {/* Services Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {/* Web Development */}
              <FadeInOnScroll direction="up" duration={1000} delay={600} initialOpacity={0} elementId="web-development">
                <div className="p-8 rounded-2xl border-2 border-gray-200 dark:border-neutral-700 bg-gradient-to-br from-gray-50 to-white dark:from-neutral-800 dark:to-neutral-900 hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl mb-6">
                    <div className="relative w-20 h-20">
                      {/* 3D Sphere */}
                      <div 
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700"
                        style={{
                          transform: 'perspective(1000px) rotateY(15deg) rotateX(5deg)',
                          boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                          filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                        }}
                      />
                      
                      {/* Icon inside sphere */}
                      <svg 
                        className="absolute inset-0 w-12 h-12 m-auto text-white drop-shadow-lg" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Web Development
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    I build responsive, fast-loading websites and web applications that work perfectly on all devices.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      Responsive websites
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      Full-stack web applications
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      E-commerce solutions
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      Progressive Web Apps (PWAs)
                    </li>
                  </ul>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Starting from $25 for simple sites
                  </div>
                </div>
              </FadeInOnScroll>

              {/* Backend & Database */}
              <FadeInOnScroll direction="up" duration={1000} delay={800} initialOpacity={0} elementId="backend-database">
                <div className="p-8 rounded-2xl border-2 border-gray-200 dark:border-neutral-700 bg-gradient-to-br from-gray-50 to-white dark:from-neutral-800 dark:to-neutral-900 hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl mb-6">
                    <div className="relative w-20 h-20">
                      {/* 3D Sphere */}
                      <div 
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700"
                        style={{
                          transform: 'perspective(1000px) rotateY(15deg) rotateX(5deg)',
                          boxShadow: '0 20px 40px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                          filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                        }}
                      />
                      
                      {/* Icon inside sphere */}
                      <svg 
                        className="absolute inset-0 w-12 h-12 m-auto text-white drop-shadow-lg" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Backend & Database
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    I design and build robust backend systems, APIs, and databases that power your applications.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      API development & integration
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      Database design & optimization
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      Server-side logic & business rules
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mr-2">✓</span>
                      System integration, automation & analysis
                    </li>
                  </ul>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Scalable solutions that grow with your needs
                  </div>
                </div>
              </FadeInOnScroll>
            </div>



            {/* Additional Services */}
            <FadeInOnScroll direction="up" duration={1000} delay={1200} initialOpacity={0} elementId="additional-services">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                                 {[
                   {
                     title: "Technical Consulting",
                     description: "Get expert advice on architecture, code reviews, and technical decisions.",
                     icon: "👨‍💻"
                   },
                  {
                    title: "Performance & Optimization",
                    description: "Speed up slow applications, improve user experience, and optimize for better performance.",
                    icon: "⚡"
                  },
                  {
                    title: "Maintenance & Support",
                    description: "Ongoing updates, bug fixes, security patches, and technical support for your applications.",
                    icon: "🛠️"
                  }
                ].map((service, index) => (
                                     <div 
                     key={service.title}
                     className="p-6 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-black hover:shadow-lg transition-all duration-300"
                   >
                                         <div className="text-3xl mb-4">
                         <div className="relative w-16 h-16">
                                                       {/* 3D Sphere for Technical Consulting */}
                            {service.title === "Technical Consulting" && (
                              <>
                                <div 
                                  className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700"
                                  style={{
                                    transform: 'perspective(1000px) rotateY(15deg) rotateX(5deg)',
                                    boxShadow: '0 15px 30px rgba(147, 51, 234, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))'
                                  }}
                                />
                                <svg className="absolute inset-0 w-8 h-8 m-auto text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                              </>
                            )}
                           
                           {/* 3D Sphere for Performance & Optimization */}
                           {service.title === "Performance & Optimization" && (
                             <>
                               <div 
                                 className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-700"
                                 style={{
                                   transform: 'perspective(1000px) rotateY(15deg) rotateX(5deg)',
                                   boxShadow: '0 15px 30px rgba(234, 179, 8, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                                   filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))'
                                 }}
                               />
                               <svg className="absolute inset-0 w-8 h-8 m-auto text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                                 <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.05.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
                               </svg>
                             </>
                           )}
                           
                           {/* 3D Sphere for Maintenance & Support */}
                           {service.title === "Maintenance & Support" && (
                             <>
                               <div 
                                 className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 dark:from-orange-500 dark:to-orange-700"
                                 style={{
                                   transform: 'perspective(1000px) rotateY(15deg) rotateX(5deg)',
                                   boxShadow: '0 15px 30px rgba(249, 115, 22, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                                   filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))'
                                 }}
                               />
                               <svg className="absolute inset-0 w-8 h-8 m-auto text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                                 <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                               </svg>
                             </>
                           )}
                         </div>
                       </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </FadeInOnScroll>

            {/* Schedule a Call Button */}
            <FadeInOnScroll direction="up" duration={1000} delay={1400} initialOpacity={0} elementId="schedule-call">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Ready to start your next project?
                </h3>
                <a
                  href="https://cal.com/elijahfarrell"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
                  style={{ backgroundColor: currentColor, '--tw-ring-color': currentColor } as React.CSSProperties}
                >
                  Schedule a Call →
                </a>
                <p className="text-gray-600 dark:text-gray-400 mt-4">
                  Book a free consultation or paid service meeting directly
                </p>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* Contact Form Section - Hidden by default */}
        {showForm && (
          <section className="py-20 px-4 sm:px-6 bg-gray-50 dark:bg-neutral-900">
            <div className="max-w-4xl mx-auto">
              <FadeInOnScroll direction="up" duration={1000} delay={200} initialOpacity={0} elementId="contact-form">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    Let's Build Something Together
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Tell me about your project and I'll get back to you with a personalized solution.
                  </p>
                  <button
                    onClick={() => setShowForm(false)}
                    className="mt-4 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    ← Back to services
                  </button>
                </div>
              </FadeInOnScroll>

              <FadeInOnScroll direction="up" duration={1000} delay={400} initialOpacity={0} elementId="form">
                <form onSubmit={handleSubmit} className="bg-white dark:bg-black rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-neutral-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      What type of project are you looking for? *
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select project type</option>
                      <option value="simple-website">Simple Website</option>
                      <option value="custom-website">Custom Website</option>
                      <option value="web-application">Web Application</option>
                      <option value="ecommerce">E-commerce Solution</option>
                      <option value="api-development">API Development</option>
                      <option value="database-design">Database Design</option>
                      <option value="consulting">Technical Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Describe your project *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Tell me about what you want to build, your goals, and any specific features you need..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP</option>
                        <option value="1-2-weeks">1-2 weeks</option>
                        <option value="1-month">1 month</option>
                        <option value="2-3-months">2-3 months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-100">Under $100</option>
                        <option value="100-500">$100 - $500</option>
                        <option value="500-1000">$500 - $1,000</option>
                        <option value="1000-5000">$1,000 - $5,000</option>
                        <option value="5000-plus">$5,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Do you have existing systems or websites?
                    </label>
                    <textarea
                      name="existingSystems"
                      value={formData.existingSystems}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="Describe any existing websites, systems, or platforms you're using..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      What industry is your business in?
                    </label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      placeholder="e.g., Restaurant, Healthcare, Education, E-commerce..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="text-center">
                                         <button
                       type="submit"
                       className="px-8 py-4 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                       style={{ backgroundColor: currentColor, '--tw-ring-color': currentColor } as React.CSSProperties}
                     >
                      Send Project Details
                    </button>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                      I'll get back to you within 24 hours to discuss your project!
                    </p>
                  </div>
                </form>
              </FadeInOnScroll>
            </div>
          </section>
        )}
      </main>
      <Footer currentColor={currentColor} />
    </div>
  );
} 