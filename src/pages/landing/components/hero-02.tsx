import { type ReactNode } from "react";

interface Hero02Props {
  heading: string;
  subtitle: string;
  mockup?: ReactNode;
}

export function Hero02({ heading, subtitle, mockup }: Hero02Props) {
  return (
    <section className="landing py-24">
      <div className="mx-auto max-w-page px-6 lg:px-8">
        <hgroup className="max-w-4xl">
          <h1 className="display text-balance">{heading}</h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            {subtitle}
          </p>
        </hgroup>

        {mockup && (
          <figure className="relative mt-16 overflow-hidden rounded-xl ring-1 ring-border shadow-2xl">
            <img
              src="/browser-chrome.svg"
              alt=""
              className="pointer-events-none relative z-[1] w-full"
            />
            <div
              className="absolute z-[2] w-full overflow-hidden bg-card [&>*]:h-full"
              style={{ top: "4.75%", height: "95.25%" }}
            >
              {mockup}
            </div>
          </figure>
        )}
      </div>
    </section>
  );
}
