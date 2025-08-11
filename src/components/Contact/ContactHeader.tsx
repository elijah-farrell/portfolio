import { motion } from 'framer-motion';
import { FadeInOnScroll } from '@/components/ScrollReveal';
import PhoneBoothCanvas from '@/components/Contact/PhoneBooth/PhoneBoothCanvas';

interface ContactHeaderProps {
  currentColor: string;
}

export default function ContactHeader({ currentColor }: ContactHeaderProps) {

  return (
    <section className="relative w-full min-h-screen mx-auto bg-white dark:bg-black pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh]">
          {/* Left Side - Text Content */}
          <FadeInOnScroll direction="left" duration={800} delay={200} elementId="contact-header-text">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex items-center gap-3 sm:gap-4"
                >
                  <div 
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full" 
                    style={{ backgroundColor: currentColor }}
                  />
                  <div 
                    className="w-16 h-1 sm:w-20 sm:h-1 rounded-full" 
                    style={{ backgroundColor: currentColor }}
                  />
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight"
                >
                  Get In{' '}
                  <span style={{ color: currentColor }}>Touch</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  Let's work together
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="space-y-4 sm:space-y-6"
              >
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Ready to bring your ideas to life? Whether you have a project in mind or just want to chat about technology, 
                  I'm here to help. Let's create something amazing together.
                </p>
                
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 sm:px-8 py-3 sm:py-4 text-white rounded-lg font-semibold hover:shadow-lg transform transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                    style={{ backgroundColor: currentColor }}
                    onClick={() => {
                      const contactSection = document.getElementById('contact-form');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    Start a Conversation
                  </motion.button>
                  
                  <motion.a
                    href="mailto:elijah5003@gmail.com"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-neutral-700 transform transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    Send Email
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </FadeInOnScroll>

          {/* Right Side - 3D Phone Booth */}
          <FadeInOnScroll direction="right" duration={800} delay={400} elementId="contact-header-3d">
            <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full">
              <PhoneBoothCanvas currentColor={currentColor} />
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
} 