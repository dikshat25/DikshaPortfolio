import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Github, Linkedin, Send, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { PlayerProvider } from "@/contexts/PlayerContext";

export default function Contact() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    project: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link
    const projectInfo = formData.project ? `%0D%0AInspired by: ${encodeURIComponent(formData.project)}` : '';
    const mailtoLink = `mailto:diksha.thongire257@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}${projectInfo}%0D%0A%0D%0AFrom: ${encodeURIComponent(formData.email)}`;
    
    window.location.href = mailtoLink;
    
    toast({
      title: "Opening email client",
      description: "Your default email app will open with the message."
    });
    
    setFormData({ name: "", email: "", message: "", project: "" });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "diksha.thongire257@gmail.com",
      link: "mailto:diksha.thongire257@gmail.com",
      color: "text-red-400"
    },
    {
      icon: Github,
      title: "GitHub",
      value: "@dikshat25",
      link: "https://github.com/dikshat25",
      color: "text-purple-400"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "Diksha Thongire",
      link: "https://linkedin.com/in/diksha-thongire",
      color: "text-blue-400"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Thane, Maharashtra, India",
      link: null,
      color: "text-emerald-400"
    }
  ];

  return (
    <PlayerProvider>
      <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center h-16 px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Spotify Player Background */}
      <div className="fixed top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="fixed bottom-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Let's Connect
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="p-8 bg-card border-border animate-slide-in">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Which Project Inspired You?
                </label>
                <select
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground"
                >
                  <option value="">Select a project (optional)</option>
                  <option value="MealMatch">MealMatch</option>
                  <option value="BooKaro">BooKaro</option>
                  <option value="Text-to-Speech System">Text-to-Speech System</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message..."
                  rows={6}
                  className="bg-background resize-none"
                />
              </div>

              <Button type="submit" className="w-full gap-2 group">
                <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Methods */}
          <div className="space-y-6 animate-slide-in" style={{ animationDelay: "100ms" }}>
            <h2 className="text-2xl font-bold text-foreground">Contact Methods</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {contactMethods.map((method) => (
                <Card
                  key={method.title}
                  className="p-6 bg-card border-border hover:bg-spotify-hover transition-all duration-300 group cursor-pointer"
                  onClick={() => method.link && window.open(method.link, "_blank")}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform ${method.color}`}>
                      <method.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">
                        {method.title}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {method.value}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Spotify Embed */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold mb-4 text-foreground">Music While You Connect</h3>
              <iframe
                style={{ borderRadius: '12px' }}
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd?utm_source=generator&theme=0"
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </Card>
          </div>
        </div>

        {/* Additional CTA */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="inline-block bg-card border border-border rounded-lg p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Open to Opportunities
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl">
              I'm currently looking for exciting opportunities in ML engineering and full-stack development.
              Let's create something amazing together!
            </p>
            <Button size="lg" asChild>
              <a href="mailto:diksha.thongire257@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Get in Touch
              </a>
            </Button>
          </div>
        </div>
      </div>
      </div>
    </PlayerProvider>
  );
}
