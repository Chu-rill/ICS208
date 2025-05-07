import React from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Fingerprint } from "lucide-react";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote:
        "Since implementing GateKeeper, unauthorized campus entries have dropped by 95%. The biometric system is particularly impressive.",
      name: "Dr. Sarah Johnson",
      title: "Chief Security Officer",
      university: "Northwestern State University",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      quote:
        "The visitor management system has transformed how we handle campus guests. The QR code system is efficient and secure.",
      name: "Prof. Michael Chen",
      title: "Dean of Student Affairs",
      university: "Eastwood College",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      quote:
        "The AI surveillance system detected several tailgating attempts in the first week alone. It's like having extra security staff.",
      name: "Robert Williams",
      title: "Campus Security Director",
      university: "Westlake University",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
    },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold mb-4">
            What Universities Say
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Hear from security professionals who've transformed campus safety
            with our solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="security-card">
              <CardContent className="pt-6">
                <Fingerprint className="h-10 w-10 text-primary mb-4" />
                <blockquote className="text-lg mb-6">
                  {testimonial.quote}
                </blockquote>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">
                      {testimonial.title}
                    </p>
                    <p className="text-sm text-slate-500">
                      {testimonial.university}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
