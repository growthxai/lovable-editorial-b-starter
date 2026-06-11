import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TestimonialCard {
  quote: string;
  name: string;
  handle: string;
  avatarUrl?: string;
  initials?: string;
}

interface Testimonial06Props {
  eyebrow: string;
  heading: string;
  testimonials: TestimonialCard[];
}

export function Testimonial06({
  eyebrow,
  heading,
  testimonials,
}: Testimonial06Props) {
  return (
    <section className="landing py-24">
      <div className="mx-auto max-w-page px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">{eyebrow}</p>
          <h2 className="mt-2 text-balance">{heading}</h2>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials.map((t) => (
              <div key={t.handle} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                <figure className="rounded-2xl bg-muted p-8 text-sm">
                  <blockquote className="text-foreground">
                    <p className="text-pretty">&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-4">
                    <Avatar className="size-10">
                      {t.avatarUrl && <AvatarImage src={t.avatarUrl} alt={t.name} />}
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {t.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">{t.name}</div>
                      <div className="text-muted-foreground">@{t.handle}</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
