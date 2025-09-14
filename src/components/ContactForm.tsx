import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiSend, FiCheckCircle } from "react-icons/fi";
import { toast } from "@/hooks/use-toast";

interface FormData {
  from_name: string;
  from_email: string;
  phone: string;
  description: string;
  timeline: string;
  budget: string;
  consultation: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    from_name: "",
    from_email: "",
    phone: "",
    description: "",
    timeline: "",
    budget: "",
    consultation: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
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
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration missing");
      }

      // Load EmailJS dynamically
      const { default: emailjs } = await import('@emailjs/browser');
      
      const result = await emailjs.send(
        serviceId,
        templateId,
        formData,
        publicKey
      );

      if (result.status === 200) {
        setIsSubmitted(true);
        toast({
          title: "Message sent successfully!",
          description: "I'll get back to you within 24 hours.",
        });
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

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-12">
          <FiCheckCircle className="text-6xl text-emerald-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Thank you!</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your message has been sent successfully. I'll get back to you within 24 hours.
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Describe what you need help with.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="from_name">Name *</Label>
              <Input
                id="from_name"
                value={formData.from_name}
                onChange={(e) => handleInputChange("from_name", e.target.value)}
                required
                placeholder="Your full name"
              />
            </div>
            <div>
              <Label htmlFor="from_email">Email *</Label>
              <Input
                id="from_email"
                type="email"
                value={formData.from_email}
                onChange={(e) => handleInputChange("from_email", e.target.value)}
                required
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>

          {/* Project Details */}
          <div>
            <Label htmlFor="description">Project Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
              placeholder="Describe your project, goals, and any specific requirements..."
              rows={4}
            />
          </div>

          {/* Timeline & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timeline">Timeline</Label>
              <Select
                value={formData.timeline}
                onValueChange={(value) => handleInputChange("timeline", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ASAP">ASAP</SelectItem>
                  <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                  <SelectItem value="1 month">1 month</SelectItem>
                  <SelectItem value="2-3 months">2-3 months</SelectItem>
                  <SelectItem value="Flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="budget">Budget Range</Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => handleInputChange("budget", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Under $100">Under $100</SelectItem>
                  <SelectItem value="$100-500">$100-500</SelectItem>
                  <SelectItem value="$500-1000">$500-1000</SelectItem>
                  <SelectItem value="$1000+">$1000+</SelectItem>
                  <SelectItem value="To be discussed">To be discussed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Consultation */}
          <div>
            <Label htmlFor="consultation">Free Consultation</Label>
            <Select
              value={formData.consultation}
              onValueChange={(value) => handleInputChange("consultation", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Would you like a free consultation?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No, email or message is fine">No, email or message is fine</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cal.com Widget - Shows when consultation is selected */}
          {formData.consultation === "Yes" && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700">
              <h4 className="text-lg font-semibold mb-3 text-emerald-800 dark:text-emerald-200">
                Schedule Your Free Consultation
              </h4>
              <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-4">
                Pick a time that works for you.
              </p>
              <div className="w-full h-[600px] bg-white dark:bg-gray-800 rounded border">
                <iframe
                  src="https://cal.com/elijahfarrell/30min"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="rounded"
                  title="Schedule consultation"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <FiSend className="mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
