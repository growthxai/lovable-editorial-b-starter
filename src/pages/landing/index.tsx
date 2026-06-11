import { Header01 } from "./components/header";
import { Hero01 } from "./components/hero-01";
import { FeatureShowcase, type Feature } from "./components/feature-showcase-01";
import { Testimonial01 } from "./components/testimonial-01";
import { Cta02 } from "./components/cta-02";
import { AutomateMockup, AnalyzeMockup, ActMockup } from "./components/mockups";
import { quoteTestimonials } from "@/data/landing";

const features: Feature[] = [
  {
    key: "automate",
    label: "Automate",
    heading: "Run complex, multi-step processes",
    mockup: <AutomateMockup />,
  },
  {
    key: "analyze",
    label: "Analyze",
    heading: "Turn data into live dashboards and reports",
    mockup: <AnalyzeMockup />,
  },
  {
    key: "act",
    label: "Act",
    heading: "Take instant actions across your tools",
    mockup: <ActMockup />,
  },
];

export default function Landing() {
  return (
    <>
      <Header01 />
      <Hero01 />
      <div id="features">
        <FeatureShowcase
          features={features}
          backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
        />
      </div>
      <div id="testimonials">
        <Testimonial01 testimonials={quoteTestimonials} />
      </div>
      <Cta02
        heading="Ready to get started?"
        subtitle="Join thousands of teams already accelerating their work with a single platform."
        primaryCta={{ label: "Get started", href: "/app" }}
        secondaryCta={{ label: "Learn more", href: "#features" }}
      />
      <footer className="border-t border-border py-6">
        <div className="mx-auto flex max-w-page items-center justify-between px-6 lg:px-8">
          <span className="font-heading text-[21px] font-semibold leading-6 tracking-tight text-foreground">Acme</span>
          <span className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </>
  );
}
