import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Users, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Strategic Planning",
    description: "Develop comprehensive strategies aligned with your business objectives. We help define clear roadmaps for sustainable growth and competitive advantage.",
  },
  {
    icon: TrendingUp,
    title: "Operational Excellence",
    description: "Optimize processes and systems to improve efficiency. Our experts identify bottlenecks and implement solutions that drive measurable results.",
  },
  {
    icon: Users,
    title: "Change Management",
    description: "Navigate organizational transformation with confidence. We provide frameworks and support to ensure smooth transitions and employee engagement.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Leverage data to make informed decisions. Our analytics solutions provide actionable insights that drive business performance.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions tailored to your unique business challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl font-serif text-primary">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
