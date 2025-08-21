import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FiGlobe, 
  FiShoppingCart, 
  FiCode, 
  FiDollarSign, 
  FiCheck,
  FiArrowRight,
  FiUsers,
  FiZap,
  FiShield,
  FiTrendingUp
} from "react-icons/fi";

const plans = [
  {
    name: "Starter Plan",
    price: "$25",
    description: "Simple 1-page website",
    idealFor: "Small businesses, portfolios",
    features: [
      "Responsive design",
      "Contact form",
      "1 revision",
      "Basic SEO setup",
      "Mobile optimized"
    ],
    popular: false,
    icon: <FiGlobe className="text-2xl text-emerald-600" />
  },
  {
    name: "Business Plan",
    price: "$75",
    description: "Multi-page site + contact form",
    idealFor: "Growing businesses",
    features: [
      "Up to 5 pages",
      "Contact form",
      "2 revisions",
      "Social media integration",
      "Advanced SEO",
      "Analytics setup"
    ],
    popular: true,
    icon: <FiTrendingUp className="text-2xl text-emerald-600" />
  },
  {
    name: "Booking/Shop Plan",
    price: "$150",
    description: "Basic booking or e-commerce",
    idealFor: "Service providers or small shops",
    features: [
      "Up to 8 pages",
      "Booking system",
      "Payment integration",
      "Inventory management",
      "3 revisions",
      "Customer portal"
    ],
    popular: false,
    icon: <FiShoppingCart className="text-2xl text-emerald-600" />
  },
  {
    name: "Custom Plan",
    price: "Quote",
    description: "Full-stack app or advanced features",
    idealFor: "Tailored web apps",
    features: [
      "Custom functionality",
      "Database design",
      "API integration",
      "Advanced features",
      "Unlimited revisions",
      "Priority support"
    ],
    popular: false,
    icon: <FiCode className="text-2xl text-emerald-600" />
  }
];

const valueProps = [
  {
    icon: <FiUsers className="text-2xl text-emerald-600" />,
    title: "Personal Attention",
    description: "Work directly with the developer building your site"
  },
  {
    icon: <FiDollarSign className="text-2xl text-emerald-600" />,
    title: "Affordable, One-Time Fee",
    description: "$25–$150 for websites, no monthly payments"
  },
  {
    icon: <FiCode className="text-2xl text-emerald-600" />,
    title: "Full-Stack Capability",
    description: "Frontend, backend, and databases handled by one expert"
  },
  {
    icon: <FiTrendingUp className="text-2xl text-emerald-600" />,
    title: "Future-Proof",
    description: "Websites built to scale, with optional maintenance"
  },
  {
    icon: <FiShield className="text-2xl text-emerald-600" />,
    title: "No Watermarks / CMS Limitations",
    description: "Full ownership, no branding restrictions"
  }
];

const processSteps = [
  {
    step: "1",
    title: "Pick a Plan",
    description: "Choose the plan that fits your needs"
  },
  {
    step: "2",
    title: "Consultation",
    description: "Quick call or message to discuss your goals"
  },
  {
    step: "3",
    title: "Development",
    description: "I build your site or app"
  },
  {
    step: "4",
    title: "Launch & Support",
    description: "Your site goes live, with optional ongoing support"
  }
];

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>
          Web Development Services by Elijah Farrell – Affordable Custom Websites & Apps
        </title>
        <meta
          name="description"
          content="Professional web development services including custom websites, e-commerce solutions, and technical consulting. Affordable pricing starting at $25."
        />
        <meta
          name="keywords"
          content="web development, custom websites, e-commerce, technical consulting, affordable web design, React, TypeScript"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://elijahfarrell.com/services" />
      </Helmet>

      <main className="mt-14">
        <div id="services">
          {/* Hero Section */}
          <section className="py-12 px-6 text-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Affordable, Custom Websites & Apps for Businesses & Individuals
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                I help small businesses and individuals get online fast with responsive websites, e-commerce solutions, and technical consulting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-3"
                  onClick={() => {
                    const element = document.getElementById("contact");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  Get Started <FiArrowRight className="ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-3"
                  onClick={() => {
                    const element = document.getElementById("pricing");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  See Plans
                </Button>
              </div>
            </div>
          </section>

          {/* Plans & Pricing */}
          <section id="pricing" className="py-12 px-6 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Plans & Pricing</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Simple, transparent pricing with no hidden fees. Choose the plan that fits your needs.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((plan, index) => (
                  <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-emerald-500 shadow-lg' : ''}`}>
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        {plan.icon}
                      </div>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <div className="text-3xl font-bold text-emerald-600">{plan.price}</div>
                      <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
                      <p className="text-sm text-gray-500">Ideal for: {plan.idealFor}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2">
                            <FiCheck className="text-emerald-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full" 
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => {
                          const element = document.getElementById("contact");
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }}
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Why Work With Me */}
          <section className="py-12 px-6 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Why Work With Me</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  I provide a different approach to web development - personal, affordable, and focused on your success.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {valueProps.map((prop, index) => (
                  <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-center mb-4">
                      {prop.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{prop.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{prop.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-12 px-6 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Simple, straightforward process from concept to launch.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-emerald-600">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Additional Services */}
          <section className="py-12 px-6 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Additional Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-white dark:bg-gray-900 rounded-lg">
                  <FiGlobe className="text-3xl text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Domain & Hosting Guidance</h3>
                  <p className="text-gray-600 dark:text-gray-400">Help you choose the right domain and hosting for your needs</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-900 rounded-lg">
                  <FiZap className="text-3xl text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Maintenance & Updates</h3>
                  <p className="text-gray-600 dark:text-gray-400">Keep your site secure and up-to-date with ongoing support</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-900 rounded-lg">
                  <FiCode className="text-3xl text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Technical Consulting</h3>
                  <p className="text-gray-600 dark:text-gray-400">Get expert advice on your tech strategy and implementation</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
