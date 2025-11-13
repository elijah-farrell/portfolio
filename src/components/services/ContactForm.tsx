import React, { useState } from "react";
import { Button } from "@/components/ui/common/form/button";
import { Input } from "@/components/ui/common/form/input";
import { Label } from "@/components/ui/common/form/label";
import { Textarea } from "@/components/ui/common/form/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/common/form/select";
import { FiSend } from "react-icons/fi";
import { toast } from "@/hooks/use-toast";

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

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_KEY;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration missing");
      }

      // Load EmailJS dynamically
      const { default: emailjs } = await import('@emailjs/browser');
      
      const result = await emailjs.send(
        serviceId,
        templateId,
        formData as unknown as Record<string, unknown>,
        publicKey
      );

      if (result.status === 200) {
        // Show different messages based on consultation preference
        if (formData.consultation === "Yes") {
          toast({
            title: "Message sent successfully!",
            description: "Cal.com opened in new tab - schedule your consultation!",
          });
          // Open Cal.com in new tab
          window.open("https://cal.com/elijahfarrell/30min", "_blank");
        } else {
          toast({
            title: "Message sent successfully!",
            description: "I'll get back to you within 24 hours.",
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
        
        // Close modal after a short delay to show the toast
        setTimeout(() => {
          onClose?.();
        }, 500);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly.",
        variant: "destructive",
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
                className="bg-gray-100 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 placeholder:text-gray-400 dark:placeholder:text-neutral-500"
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
                className="bg-gray-100 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 placeholder:text-gray-400 dark:placeholder:text-neutral-500"
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
              placeholder="(555) 123-4567"
              className="bg-gray-100 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 placeholder:text-gray-400 dark:placeholder:text-neutral-500"
            />
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
                  <SelectItem value="ASAP" className="hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">ASAP</SelectItem>
                  <SelectItem value="1-2 weeks" className="hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">1-2 weeks</SelectItem>
                  <SelectItem value="1 month" className="hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">1 month</SelectItem>
                  <SelectItem value="2-3 months" className="hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">2-3 months</SelectItem>
                  <SelectItem value="Flexible" className="hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">Flexible</SelectItem>
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
                  <SelectItem value="Under $100" className="hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">Under $100</SelectItem>
                  <SelectItem value="$100-500" className="hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">$100-500</SelectItem>
                  <SelectItem value="$500-1000" className="hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">$500-1000</SelectItem>
                  <SelectItem value="$1000+" className="hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">$1000+</SelectItem>
                  <SelectItem value="To be discussed" className="hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">To be discussed</SelectItem>
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
                <SelectItem value="Yes" className="hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">Yes</SelectItem>
                <SelectItem value="No, email or message is fine" className="hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">No, email or message is fine</SelectItem>
              </SelectContent>
            </Select>
          </div>


          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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
