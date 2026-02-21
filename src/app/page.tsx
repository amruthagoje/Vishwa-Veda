
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search, Activity, Calendar, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImg && (
            <Image
              src={heroImg.imageUrl}
              alt={heroImg.description}
              fill
              className="object-cover brightness-50"
              priority
              data-ai-hint={heroImg.imageHint}
            />
          )}
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight">
              Holistic Healing Through <span className="text-accent">Vishwa Veda</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto">
              Experience the ancient wisdom of Ayurveda combined with modern technology. 
              Personalized therapy plans, expert consultations, and AI-driven wellness at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8" asChild>
                <Link href="/search">Find a Doctor</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/40 hover:bg-white/20 backdrop-blur-sm" asChild>
                <Link href="/dashboard/patient">My Therapy Plan</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Comprehensive Care for Body & Mind</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform connects you with certified practitioners and intelligent tools to streamline your path to health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<Search className="h-8 w-8 text-accent" />}
            title="Doctor Search"
            description="Find top-rated Ayurveda specialists based on city and specific therapy needs."
          />
          <FeatureCard 
            icon={<Calendar className="h-8 w-8 text-accent" />}
            title="Session Reminders"
            description="Never miss a treatment with automated therapy scheduling and daily notifications."
          />
          <FeatureCard 
            icon={<Activity className="h-8 w-8 text-accent" />}
            title="Progress Tracking"
            description="Visualize your recovery journey with detailed graphs and recovery metrics."
          />
          <FeatureCard 
            icon={<ShieldCheck className="h-8 w-8 text-accent" />}
            title="Clinic Certification"
            description="Verified practitioners and clinics with AI-guided onboarding for maximum trust."
          />
        </div>
      </section>

      {/* Therapy Showcase */}
      <section className="bg-secondary/10 py-24">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Discover the Power of Panchakarma</h2>
            <p className="text-lg text-muted-foreground">
              Panchakarma is a multi-day detoxification and rejuvenation therapy. Our system helps doctors 
              create precise schedules, ensuring you get the most out of your healing sessions.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-primary font-medium">
                <ArrowRight className="h-4 w-4 text-accent" /> Personalized detoxification plans
              </li>
              <li className="flex items-center gap-2 text-primary font-medium">
                <ArrowRight className="h-4 w-4 text-accent" /> Real-time monitoring of symptoms
              </li>
              <li className="flex items-center gap-2 text-primary font-medium">
                <ArrowRight className="h-4 w-4 text-accent" /> AI-powered dietary suggestions
              </li>
            </ul>
            <Button className="bg-primary mt-4" asChild>
              <Link href="/search?category=panchakarma">Explore Therapies</Link>
            </Button>
          </div>
          <div className="lg:w-1/2">
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src={PlaceHolderImages.find(img => img.id === 'therapy-1')?.imageUrl || ''} 
                alt="Therapy" 
                fill 
                className="object-cover"
                data-ai-hint="ayurveda massage"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container mx-auto px-4 text-center">
        <div className="glass-card p-12 rounded-3xl space-y-8 border-primary/10">
          <h2 className="text-3xl md:text-5xl font-bold text-primary">Ready to begin your healing journey?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of patients who have transformed their lives through Ayurvedic wisdom and personalized care plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary px-10">Sign Up as Patient</Button>
            <Button size="lg" variant="outline" className="border-primary text-primary px-10 hover:bg-primary/5">Join as Doctor</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="hover:shadow-lg transition-all border-primary/10">
      <CardContent className="p-8 space-y-4">
        <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-primary">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
