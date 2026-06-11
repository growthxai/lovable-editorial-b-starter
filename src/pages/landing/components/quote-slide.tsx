import { cn } from "@/lib/utils";

interface QuoteSlideProps {
  quote: string;
  author: string;
  title: string;
  company?: string;
  imageUrl?: string;
  rotation?: number;
  centered?: boolean;
  className?: string;
}

export function QuoteSlide({
  quote,
  author,
  title,
  company,
  imageUrl,
  rotation = 0,
  centered = false,
  className,
}: QuoteSlideProps) {
  return (
    <article
      className={cn(
        "landing flex flex-col",
        centered && "items-center text-center",
        className,
      )}
    >
      {imageUrl && (
        <div
          className={cn(
            "mb-6 aspect-square overflow-hidden",
            centered ? "w-[21rem]" : "w-full",
          )}
          style={{
            borderRadius: "3.2rem",
            transform: rotation ? `rotate(${rotation}deg)` : undefined,
          }}
        >
          <img
            src={imageUrl}
            alt=""
            draggable={false}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <h3
        className={cn(
          "mb-4 text-balance",
          centered && "mx-auto max-w-[76rem]",
        )}
      >
        &ldquo;{quote}&rdquo;
      </h3>
      <p className="text-sm text-muted-foreground">
        {author} &middot; {title}
        {company ? `, ${company}` : ""}
      </p>
    </article>
  );
}
