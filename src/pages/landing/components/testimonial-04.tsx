import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial04Props {
  quote: string;
  name: string;
  title: string;
  avatarUrl?: string;
  initials?: string;
  logoUrl?: string;
}

export function Testimonial04({
  quote,
  name,
  title,
  avatarUrl,
  initials,
  logoUrl,
}: Testimonial04Props) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-4xl lg:px-8">
        {logoUrl && (
          <img src={logoUrl} alt="" className="mx-auto h-12" />
        )}
        <figure className="mt-10">
          <blockquote className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            <p className="text-pretty">&ldquo;{quote}&rdquo;</p>
          </blockquote>
          <figcaption className="mt-10">
            <Avatar className="mx-auto size-10">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
              <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm">
              <span className="font-semibold text-foreground">{name}</span>
              <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-foreground">
                <circle r={1} cx={1} cy={1} />
              </svg>
              <span className="text-muted-foreground">{title}</span>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
