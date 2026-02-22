import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/common/button";
import { Input } from "@/components/ui/common/form/input";
import { Label } from "@/components/ui/common/form/label";
import { Textarea } from "@/components/ui/common/form/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/common/form/select";
import { FiSend } from "react-icons/fi";
import { toast } from "@/lib/toast";

interface ContactFormData {
  from_name: string;
  from_email: string;
  phone: string;
  description: string;
  timeline: string;
  budget: string;
  consultation: string;
}

interface ContactFormProps {
  onClose?: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    from_name: "",
    from_email: "",
    phone: "",
    description: "",
    timeline: "",
    budget: "",
    consultation: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [phoneError, setPhoneError] = useState<string>("");

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear phone error when user starts typing
    if (field === "phone") {
      setPhoneError("");
    }
  };

  const validatePhoneNumber = (phone: string): boolean => {
    if (!phone || phone.trim() === "") {
      return true; // Empty is valid since it's optional
    }
    
    // Allow plus sign only at the start (for international format like +1, +44, etc.)
    const hasPlus = phone.trim().startsWith('+');
    let cleaned = phone.trim();
    
    if (hasPlus) {
      cleaned = cleaned.substring(1); // Remove the plus for validation
    }
    
    // Remove common phone formatting characters (spaces, dashes, parentheses, dots)
    cleaned = cleaned.replace(/[\s\-().]/g, '');
    
    // Check if it contains only digits (after removing formatting)
    if (!/^\d+$/.test(cleaned)) {
      return false; // Contains non-digit characters (like letters)
    }
    
    // Check length: 7-15 digits (covers most international formats)
    // 7 digits: some local numbers
    // 10 digits: US/Canada standard
    // 11-15 digits: international with country code
    if (cleaned.length < 7 || cleaned.length > 15) {
      return false;
    }
    
    return true;
  };

  const handlePhoneBlur = () => {
    if (formData.phone && !validatePhoneNumber(formData.phone)) {
      setPhoneError("Please enter a valid phone number (7-15 digits, formatting allowed)");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Explicit validation for required fields
    if (!formData.from_name.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your name.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    if (!formData.from_email.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your email address.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.from_email.trim())) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    if (!formData.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Please describe your project.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }
    
    // Validate phone number if provided
    if (formData.phone && !validatePhoneNumber(formData.phone)) {
      setPhoneError("Please enter a valid phone number (7-15 digits, formatting allowed)");
      toast({
        title: "Validation Error",
        description: "Please enter a valid phone number or leave it blank.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Use client-side EmailJS (standard approach)
      // Security: Set up domain restrictions in EmailJS dashboard (free feature)
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Check for missing configuration
      const missingVars: string[] = [];
      if (!serviceId) missingVars.push('VITE_EMAILJS_SERVICE_ID');
      if (!templateId) missingVars.push('VITE_EMAILJS_TEMPLATE_ID');
      if (!publicKey) missingVars.push('VITE_EMAILJS_PUBLIC_KEY');

      if (missingVars.length > 0) {
        const errorMsg = `EmailJS configuration missing: ${missingVars.join(', ')}. Please configure environment variables in Vercel.`;
        if (import.meta.env.DEV) console.error(errorMsg);
        throw new Error(errorMsg);
      }

      const { default: emailjs } = await import('@emailjs/browser');
      
      // Type-safe conversion for EmailJS
      const emailParams: Record<string, string> = {
        from_name: formData.from_name.trim(),
        from_email: formData.from_email.trim(),
        phone: formData.phone.trim() || "",
        description: formData.description.trim(),
        timeline: formData.timeline || "",
        budget: formData.budget || "",
        consultation: formData.consultation || "",
      };
      
      const result = await emailjs.send(
        serviceId,
        templateId,
        emailParams,
        publicKey
      );

      if (result.status !== 200) {
        throw new Error(`EmailJS returned status ${result.status}: ${result.text || 'Unknown error'}`);
      }

      // Success - show toast and handle modal
      // Close modal immediately
      onClose?.();
      
      // Show different messages based on consultation preference
      if (formData.consultation === "Yes") {
          // Show toast with link to schedule consultation (better UX than auto-opening)
          // Never auto-dismiss - user must manually close so they can schedule
          toast({
            title: "Message sent successfully!",
            duration: Infinity, // Never auto-dismiss - user must click X to close
            actionUrl: "https://cal.com/elijahfarrell/30min",
            actionLabel: "Schedule Consultation",
          });
        } else {
          // For "No" consultation - auto-dismiss after 8 seconds
          toast({
            title: "Message sent successfully!",
            description: "I'll get back to you within 24 hours.",
            duration: 8000, // 8 seconds
          });
        }
        
      // Reset form
      setFormData({
        from_name: "",
        from_email: "",
        phone: "",
        description: "",
        timeline: "",
        budget: "",
        consultation: "",
      });
    } catch (error: unknown) {
      // Log full error for debugging (only in development or if it's a configuration error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      const isConfigError = errorMessage.includes("configuration") || errorMessage.includes("missing");
      
      if (import.meta.env.DEV || isConfigError) {
        console.error("EmailJS Error:", error);
        console.error("Error details:", {
          serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ? "✓ Set" : "✗ Missing",
          templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ? "✓ Set" : "✗ Missing",
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ? "✓ Set" : "✗ Missing",
        });
      }
      
      // More helpful error message for users
      let userMessage = "Please try again or contact me directly.";
      if (errorMessage.includes("Failed to fetch") || errorMessage.includes("network")) {
        userMessage = "Network error. Please check your connection and try again.";
      } else if (errorMessage.includes("configuration") || errorMessage.includes("missing")) {
        userMessage = "Email service is not configured. Please contact me directly at your email address.";
      } else if (errorMessage.includes("status")) {
        userMessage = "There was an issue sending your message. Please try again or contact me directly.";
      }
      
      toast({
        title: "Error sending message",
        description: userMessage,
        variant: "destructive",
        duration: 8000, // 8 seconds for errors - gives time to read
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <style>{`
        @keyframes paper-plane {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-2px) rotate(-10deg);
          }
          50% {
            transform: translateY(-4px) rotate(0deg);
          }
          75% {
            transform: translateY(-2px) rotate(10deg);
          }
        }
        .paper-plane-animate {
          animation: paper-plane 2s ease-in-out infinite;
        }
      `}</style>
      <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="from_name">Name *</Label>
              <Input
                id="from_name"
                name="from_name"
                autoComplete="name"
                value={formData.from_name}
                onChange={(e) => handleInputChange("from_name", e.target.value)}
                required
                placeholder="Your full name"
                className="bg-gray-100 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 placeholder:text-gray-400 dark:placeholder:text-neutral-500 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
              />
            </div>
            <div>
              <Label htmlFor="from_email">Email *</Label>
              <Input
                id="from_email"
                name="from_email"
                type="email"
                autoComplete="email"
                value={formData.from_email}
                onChange={(e) => handleInputChange("from_email", e.target.value)}
                required
                placeholder="your.email@example.com"
                className="bg-gray-100 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 placeholder:text-gray-400 dark:placeholder:text-neutral-500 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              onBlur={handlePhoneBlur}
              placeholder="(555) 123-4567 or +1 555 123 4567"
              className={`bg-gray-100 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 placeholder:text-gray-400 dark:placeholder:text-neutral-500 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 ${
                phoneError ? "border-red-500 dark:border-red-500" : ""
              }`}
              aria-invalid={phoneError ? "true" : "false"}
              aria-describedby={phoneError ? "phone-error" : undefined}
            />
            {phoneError && (
              <p id="phone-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                {phoneError}
              </p>
            )}
          </div>

          {/* Project Details */}
          <div>
            <Label htmlFor="description">Project Description *</Label>
            <Textarea
              id="description"
              name="description"
              autoComplete="off"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
              placeholder="Describe your project, goals, and any specific requirements..."
              rows={4}
              className="bg-gray-100 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 placeholder:text-gray-400 dark:placeholder:text-neutral-500"
            />
          </div>

          {/* Timeline & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timeline">Timeline</Label>
              <Select
                name="timeline"
                value={formData.timeline}
                onValueChange={(value) => handleInputChange("timeline", value)}
              >
                <SelectTrigger id="timeline" className="bg-gray-100 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-white data-[placeholder]:text-gray-400 dark:data-[placeholder]:text-neutral-500">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-700">
                  <SelectItem value="ASAP" className="hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer focus:bg-gray-200 dark:focus:bg-neutral-800">ASAP</SelectItem>
                  <SelectItem value="1-2 weeks" className="hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer focus:bg-gray-200 dark:focus:bg-neutral-800">1-2 weeks</SelectItem>
                  <SelectItem value="1 month" className="hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer focus:bg-gray-200 dark:focus:bg-neutral-800">1 month</SelectItem>
                  <SelectItem value="2-3 months" className="hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer focus:bg-gray-200 dark:focus:bg-neutral-800">2-3 months</SelectItem>
                  <SelectItem value="Flexible" className="hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer focus:bg-gray-200 dark:focus:bg-neutral-800">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="budget">Budget Range</Label>
              <Select
                name="budget"
                value={formData.budget}
                onValueChange={(value) => handleInputChange("budget", value)}
              >
                <SelectTrigger id="budget" className="bg-gray-100 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-white data-[placeholder]:text-gray-400 dark:data-[placeholder]:text-neutral-500">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-700">
                  <SelectItem value="Under $100" className="hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer focus:bg-gray-200 dark:focus:bg-neutral-800">Under $100</SelectItem>
                  <SelectItem value="$100-500" className="hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer focus:bg-gray-200 dark:focus:bg-neutral-800">$100-500</SelectItem>
                  <SelectItem value="$500-1000" className="hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer focus:bg-gray-200 dark:focus:bg-neutral-800">$500-1000</SelectItem>
                  <SelectItem value="$1000+" className="hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer focus:bg-gray-200 dark:focus:bg-neutral-800">$1000+</SelectItem>
                  <SelectItem value="To be discussed" className="hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer focus:bg-gray-200 dark:focus:bg-neutral-800">To be discussed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Consultation */}
          <div>
            <Label htmlFor="consultation">Free Consultation</Label>
            <Select
              name="consultation"
              value={formData.consultation}
              onValueChange={(value) => handleInputChange("consultation", value)}
            >
              <SelectTrigger id="consultation" className="bg-gray-100 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-white data-[placeholder]:text-gray-400 dark:data-[placeholder]:text-neutral-500">
                <SelectValue placeholder="Would you like a free consultation?" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-700">
                <SelectItem value="Yes" className="hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer focus:bg-gray-200 dark:focus:bg-neutral-800">Yes</SelectItem>
                <SelectItem value="No, email or message is fine" className="hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer focus:bg-gray-200 dark:focus:bg-neutral-800">No, email or message is fine</SelectItem>
              </SelectContent>
            </Select>
          </div>


          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="default"
            className="w-full rounded-2xl transition-[transform,shadow] duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] focus-visible:ring-0 focus-visible:ring-offset-0"
            style={{
              backgroundColor: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
              color: isDark ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
            }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = isDark ? 'rgb(229, 231, 235)' : 'rgb(38, 38, 38)'; // gray-200 for dark, neutral-800 for light
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
              }
            }}
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className={`animate-spin rounded-full h-4 w-4 border-b-2 mr-2 ${isDark ? 'border-black' : 'border-white'}`}></div>
                Sending...
              </>
            ) : (
              <>
                <FiSend className="mr-2 paper-plane-animate" />
                Send Message
              </>
            )}
          </Button>
        </form>
    </div>
  );
}