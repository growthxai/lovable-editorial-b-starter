import TypographyH1 from "@/components/base/typography/typography-h1";
import TypographyH2 from "@/components/base/typography/typography-h2";
import TypographyH3 from "@/components/base/typography/typography-h3";
import TypographyH4 from "@/components/base/typography/typography-h4";

export default function Landing() {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-4">
          <TypographyH1>Heading 1</TypographyH1>
          <TypographyH2>Heading 2</TypographyH2>
          <TypographyH3>Heading 3</TypographyH3>
          <TypographyH4>Heading 4</TypographyH4>
        </div>

        <div className="border-t border-border pt-6 space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Type scale</p>
          <p className="text-xs">text-xs — 12px/16px</p>
          <p className="text-sm">text-sm — 13px/18px</p>
          <p className="text-base">text-base — 14px/20px</p>
          <p className="text-lg">text-lg — 16px/24px</p>
          <p className="text-xl">text-xl — 18px/28px</p>
          <p className="text-2xl">text-2xl — 20px/36px</p>
          <p className="text-3xl tracking-tight">text-3xl — 24px/32px</p>
          <p className="text-4xl tracking-tight">text-4xl — 32px/40px</p>
          <p className="text-5xl tracking-tight">text-5xl — 40px/48px</p>
          <p className="text-6xl tracking-tight">text-6xl — 48px/56px</p>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            Routes: <a href="/" className="text-primary underline underline-offset-4">/ landing</a>{" "}
            · <a href="/app" className="text-primary underline underline-offset-4">/app</a>{" "}
            · <a href="/workspace" className="text-primary underline underline-offset-4">/workspace</a>
          </p>
        </div>
      </div>
    </div>
  );
}
