import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

/** Public site chrome. The Sanity studio at /studio lives outside this group, so it gets the full screen. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
