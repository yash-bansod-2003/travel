import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DateRangeProvider } from "@/hooks/use-date-range";

type LandingLayoutProps = React.PropsWithChildren;

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="flex flex-col">
      <DateRangeProvider>
        <SiteHeader />
        <main className="container max-w-screen-2xl my-4 flex-1">
          {children}
        </main>
        <SiteFooter />
      </DateRangeProvider>
    </div>
  );
}
