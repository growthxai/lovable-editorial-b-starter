import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial05Props {
  quote: string;
  name: string;
  title: string;
  avatarUrl?: string;
  initials?: string;
  stars?: number;
}

export function Testimonial05({
  quote,
  name,
  title,
  avatarUrl,
  initials,
  stars = 5,
}: Testimonial05Props) {
  return (
    <section className="py-24">
      <figure className="mx-auto max-w-2xl px-6 lg:px-8">
        <div className="flex gap-1 text-primary">
          {Array.from({ length: stars }, (_, i) => (
            <Star key={i} className="size-4 fill-current" />
          ))}
        </div>
        <blockquote className="mt-10 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          <p className="text-pretty">&ldquo;{quote}&rdquo;</p>
        </blockquote>
        <figcaption className="mt-10 flex items-center gap-4">
          <Avatar className="size-12">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <div className="font-semibold text-foreground">{name}</div>
            <div className="mt-0.5 text-muted-foreground">{title}</div>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
