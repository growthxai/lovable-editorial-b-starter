import { Header01 } from "./components/header";
import { Hero01 } from "./components/hero-01";
import { Hero02 } from "./components/hero-02";
import { Hero03 } from "./components/hero-03";
import { Hero04 } from "./components/hero-04";
import { Features03 } from "./components/features-03";
import { FeatureShowcase, type Feature } from "./components/feature-showcase-01";
import { Testimonial01 } from "./components/testimonial-01";
import { Testimonial04 } from "./components/testimonial-04";
import { Testimonial05 } from "./components/testimonial-05";
import { Testimonial06 } from "./components/testimonial-06";
import { Cta01 } from "./components/cta-01";
import { Cta02 } from "./components/cta-02";
import { Cta03 } from "./components/cta-03";
import { Cta04 } from "./components/cta-04";
import { AutomateMockup, AnalyzeMockup, ActMockup } from "./components/mockups";
import { quoteTestimonials, partnerLogos } from "@/data/landing";

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
      <Hero02
        heading="Ship faster with less complexity"
        subtitle="One platform for your entire workflow. Replace disconnected tools with a single surface your whole team actually uses."
        mockup={<AutomateMockup />}
      />
      <Hero03
        eyebrow="Trusted by 10,000+ teams worldwide"
        heading={
          <>
            Accelerate work with AI agents{" "}
            <span className="text-muted-foreground">
              that collaborate, automate, and think alongside your teams —
              from first draft to final&nbsp;delivery.
            </span>
          </>
        }
        primaryCta={{ label: "Get started", href: "/app" }}
        secondaryCta={{ label: "View demo", href: "/app" }}
        logos={partnerLogos}
      />
      <Hero04
        heading="Deploy to the cloud with confidence"
        subtitle="One command to ship. Zero infrastructure to manage. Built for teams that move fast and break nothing."
        badge={{ label: "What's new", announcement: "Just shipped v1.0", href: "#" }}
        primaryCta={{ label: "Get started", href: "/app" }}
        secondaryCta={{ label: "Learn more", href: "#features" }}
        screenshot={
          <figure className="relative overflow-hidden rounded-xl ring-1 ring-border shadow-2xl">
            <img
              src="/browser-chrome.svg"
              alt=""
              className="pointer-events-none relative z-[1] w-[76rem]"
            />
            <div
              className="absolute z-[2] w-full overflow-hidden bg-card [&>*]:h-full"
              style={{ top: "4.75%", height: "95.25%" }}
            >
              <AutomateMockup />
            </div>
          </figure>
        }
      />
      <Features03
        eyebrow="Everything you need"
        heading="No server? No problem."
        subtitle="Replace your patchwork of tools with a single platform that handles deployment, security, and scaling out of the box."
        screenshot={
          <figure className="relative overflow-hidden rounded-xl ring-1 ring-border shadow-2xl">
            <img
              src="/browser-chrome.svg"
              alt=""
              className="pointer-events-none relative z-[1] w-full"
            />
            <div
              className="absolute z-[2] w-full overflow-hidden bg-card [&>*]:h-full"
              style={{ top: "4.75%", height: "95.25%" }}
            >
              <AnalyzeMockup />
            </div>
          </figure>
        }
      />
      <div id="features">
        <FeatureShowcase
          features={features}
          backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
        />
      </div>
      <div id="testimonials">
        <Testimonial01 testimonials={quoteTestimonials} />
      </div>

      <Testimonial04
        quote="This tool transformed how our team collaborates. We shipped 3x faster in the first quarter and haven't looked back."
        name="Sarah Chen"
        title="VP Engineering at Acme"
        avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        initials="SC"
      />
      <Testimonial05
        quote="We evaluated 6 tools before choosing this one. The integration was seamless and our operational costs dropped 40% in the first month. The ROI speaks for itself."
        name="David Kim"
        title="Head of Ops at Umbrella"
        avatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        initials="DK"
      />
      <Testimonial06
        eyebrow="Testimonials"
        heading="Loved by teams everywhere"
        testimonials={[
          { quote: "Shipped 3x faster in our first quarter. The collaboration tools are unmatched.", name: "Sarah Chen", handle: "sarachen", initials: "SC", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
          { quote: "The AI features handle repetitive work so we can focus on strategy. Feels like magic.", name: "Marcus Rivera", handle: "marcusrivera", initials: "MR", avatarUrl: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
          { quote: "We evaluated 6 tools before this one. Integration was seamless.", name: "Emma Johansson", handle: "emmajohansson", initials: "EJ", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
          { quote: "Operational costs dropped 40% in the first month. The ROI speaks for itself.", name: "David Kim", handle: "davidkim", initials: "DK", avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
          { quote: "The analytics dashboard alone was worth the investment. Finally, data we can act on.", name: "Aisha Patel", handle: "aishapatel", initials: "AP", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
          { quote: "Onboarding new analysts went from 3 weeks to 3 days. A complete game-changer.", name: "Tom Cook", handle: "tomcook", initials: "TC", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
        ]}
      />

      <Cta01
        heading="Boost your productivity. Start using our app today."
        primaryCta={{ label: "Get started", href: "/app" }}
        secondaryCta={{ label: "Learn more", href: "#features" }}
      />
      <Cta02
        heading="Ready to get started?"
        subtitle="Join thousands of teams already accelerating their work with a single platform."
        primaryCta={{ label: "Get started", href: "/app" }}
        secondaryCta={{ label: "Learn more", href: "#features" }}
      />
      <Cta03
        heading="Boost your productivity today"
        subtitle="Join thousands of teams already accelerating their work with a single platform."
        primaryCta={{ label: "Get started", href: "/app" }}
        secondaryCta={{ label: "Learn more", href: "#features" }}
      />
      <Cta04
        heading="Boost your productivity. Start using our app today."
        subtitle="Join thousands of teams already accelerating their work with a single platform."
        primaryCta={{ label: "Get started", href: "/app" }}
        secondaryCta={{ label: "Learn more", href: "#features" }}
      />

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
