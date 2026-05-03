import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Phone, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { trackQuoteFormSubmission, trackBookConsultation, trackPhoneClick, type QuoteFormPlatform } from "@/lib/ga4";

const CAL_LINK = "https://cal.com/garland-brent-wa1zbs/15min";

const leadSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100),
  company: z.string().trim().min(1, { message: "Company is required" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  phone: z.string().trim().min(1, { message: "Phone is required" }).max(20),
  platforms: z.string().min(1, { message: "Please select platforms needed" })
});

const PLATFORM_LABELS: Record<string, QuoteFormPlatform> = {
  isnetworld: "ISNetworld",
  avetta: "Avetta",
  veriforce: "Veriforce",
  pec: "PEC Premier",
  browz: "BROWZ",
  multiple: "Multiple",
  "not-sure": "Other",
};

const LeadForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    platforms: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      leadSchema.parse(formData);
      setIsSubmitting(true);
      
      // Send via existing edge function
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: `Phone: ${formData.phone}\nPlatforms Needed: ${formData.platforms}`
        }
      });

      if (error) throw error;

      toast({
        title: "Request received!",
        description: "We'll contact you within 24 hours with a quote."
      });
      trackQuoteFormSubmission(PLATFORM_LABELS[formData.platforms] ?? "Other", "home");

      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        platforms: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Please fill in all fields",
          description: error.errors[0].message,
          variant: "destructive"
        });
      } else {
        console.error('Error sending lead:', error);
        toast({
          title: "Error submitting request",
          description: "Please try again or call us at 601-647-1201",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-form" className="py-20 md:py-24 bg-primary" aria-labelledby="lead-form-heading">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Left Content */}
          <div className="text-primary-foreground animate-fade-in">
            <h2 id="lead-form-heading" className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Get a Free Compliance Quote
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
              Tell us about your compliance needs and we'll send you a personalized quote within 24 hours. No obligation, no pressure.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold">Prefer to talk?</div>
                  <a 
                    href={CAL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground/80 hover:text-primary-foreground underline"
                    onClick={trackBookConsultation}
                  >
                    Book a 15-minute consultation
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold">Call us directly</div>
                  <a 
                    href="tel:601-647-1201"
                    onClick={trackPhoneClick}
                    className="text-primary-foreground/80 hover:text-primary-foreground"
                  >
                    601-647-1201
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold">Email us</div>
                  <a 
                    href="mailto:garland@cornerstoneriskmgt.com"
                    className="text-primary-foreground/80 hover:text-primary-foreground"
                  >
                    garland@cornerstoneriskmgt.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Form */}
          <Card className="border-0 shadow-2xl animate-slide-up">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Request a Quote</CardTitle>
              <CardDescription>We'll respond within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <Input 
                    id="name" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe" 
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company *
                  </label>
                  <Input 
                    id="company" 
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your Company Name" 
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input 
                      id="email" 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com" 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone *
                    </label>
                    <Input 
                      id="phone" 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 123-4567" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="platforms" className="block text-sm font-medium mb-2">
                    Platforms Needed *
                  </label>
                  <Select 
                    value={formData.platforms}
                    onValueChange={(value) => setFormData({ ...formData, platforms: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select compliance platform(s)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="isnetworld">ISNetworld®</SelectItem>
                      <SelectItem value="avetta">Avetta®</SelectItem>
                      <SelectItem value="veriforce">Veriforce®</SelectItem>
                      <SelectItem value="pec">PEC Premier</SelectItem>
                      <SelectItem value="browz">BROWZ</SelectItem>
                      <SelectItem value="multiple">Multiple Platforms</SelectItem>
                      <SelectItem value="not-sure">Not Sure - Need Guidance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mt-2"
                >
                  {isSubmitting ? "Sending..." : "Get My Quote"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  No spam. We'll only contact you about your compliance needs.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
