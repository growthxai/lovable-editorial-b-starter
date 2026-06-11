import { type ReactNode } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { Button } from "@/components/base/button";

interface Hero04Props {
  heading: string;
  subtitle: string;
  badge?: { label: string; announcement: string; href: string };
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  screenshot?: ReactNode;
}

export function Hero04({
  heading,
  subtitle,
  badge,
  primaryCta,
  secondaryCta,
  screenshot,
}: Hero04Props) {
  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-page px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        {/* Left — content */}
        <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8">
          {badge && (
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href={badge.href} className="inline-flex items-center gap-6">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary ring-1 ring-primary/25 ring-inset">
                  {badge.label}
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <span>{badge.announcement}</span>
                  <IconChevronRight className="size-4 text-muted-foreground" />
                </span>
              </a>
            </div>
          )}

          <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-foreground sm:text-6xl">
            {heading}
          </h1>
          <p className="mt-8 text-pretty text-lg text-muted-foreground">
            {subtitle}
          </p>

          <div className="mt-10 flex items-center gap-6">
            <Button asChild>
              <a href={primaryCta.href}>{primaryCta.label}</a>
            </Button>
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                className="text-sm font-semibold text-foreground transition-colors hover:text-muted-foreground"
              >
                {secondaryCta.label} <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>
        </div>

        {/* Right — screenshot */}
        {screenshot && (
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              {screenshot}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
