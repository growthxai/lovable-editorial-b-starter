import { Hero } from "./components/hero";
import { FeatureShowcase, type Feature } from "./components/feature-showcase";
import { AutomateMockup, AnalyzeMockup, ActMockup } from "./components/mockups";

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
      <Hero />
      <FeatureShowcase
        features={features}
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
      />
    </>
  );
}
