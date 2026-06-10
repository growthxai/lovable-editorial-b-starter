import { TextRotator } from "./components/text-rotator";
import { PartnerLogoGrid } from "./components/partner-logo-grid";

const logos = [
  { key: "vercel", src: "/logos/vercel.svg", alt: "Vercel" },
  { key: "stripe", src: "/logos/stripe.svg", alt: "Stripe" },
  { key: "supabase", src: "/logos/supabase.svg", alt: "Supabase" },
  { key: "cursor", src: "/logos/cursor.svg", alt: "Cursor" },
  { key: "raycast", src: "/logos/raycast.svg", alt: "Raycast" },
  { key: "posthog", src: "/logos/posthog.svg", alt: "PostHog" },
  { key: "webflow", src: "/logos/webflow.svg", alt: "Webflow" },
  { key: "resend", src: "/logos/resend.svg", alt: "Resend" },
  { key: "clerk", src: "/logos/clerk.svg", alt: "Clerk" },
  { key: "asana", src: "/logos/asana.svg", alt: "Asana" },
  { key: "slack", src: "/logos/slack.svg", alt: "Slack" },
  { key: "sanity", src: "/logos/sanity.svg", alt: "Sanity" },
  { key: "shopify", src: "/logos/shopify.svg", alt: "Shopify" },
  { key: "replit", src: "/logos/replit.svg", alt: "Replit" },
];

export default function Landing() {
  return (
    <div className="landing flex min-h-screen flex-col items-center justify-center text-center">
      <div className="mx-auto max-w-3xl">
        <h1 className="display">
          <TextRotator
            words="Real work,Advanced analysis,Repetitive tasks,Deep research,Meeting prep,Data insights"
            speed={1200}
          />
          ,{"\n"}done with&nbsp;AI
        </h1>
      </div>
      <aside className="mx-auto mt-16 w-full max-w-5xl" aria-label="Trusted by">
        <PartnerLogoGrid logos={logos} />
      </aside>
    </div>
  );
}
