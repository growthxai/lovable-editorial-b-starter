import { Header01 } from "./components/header";
import { Hero } from "./components/hero";
import { FeatureShowcase, type Feature } from "./components/feature-showcase";
import { Testimonial01 } from "./components/testimonial-01";
import { AutomateMockup, AnalyzeMockup, ActMockup } from "./components/mockups";
import { Button } from "@/components/base/button";
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
      <Hero />
      <div id="features">
        <FeatureShowcase
          features={features}
          backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
        />
      </div>
      <div id="testimonials">
        <Testimonial01 testimonials={quoteTestimonials} />
      </div>

      {/* CTA */}
      <section id="pricing" className="landing py-24">
        <div className="mx-auto max-w-page px-6 text-center lg:px-8">
          <h2 className="text-balance">Ready to get started?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Join thousands of teams already accelerating their work.
          </p>
          <div className="mt-6">
            <Button>Get started</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
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
