import { MerchCard } from "@/components/ui/merch-card";
import { Reveal } from "@/components/ui/reveal";

const products = [
  {
    category: "Headwear",
    title: "Classic Cap",
    tagline: "Khaki crown with a forest green brim. The everyday piece that gets people talking.",
    image: "/images/merch/merch-cap.png",
    imageAlt: "V4ME branded khaki and forest green cap",
  },
  {
    category: "Apparel",
    title: "Pullover Hoodie",
    tagline: "Our most loved piece. Heavyweight cotton, made for cool mornings.",
    image: "/images/merch/merch-hoodie.png",
    imageAlt: "V4ME forest green pullover hoodie with sleeve print",
  },
  {
    category: "Accessories",
    title: "Canvas Tote Bag",
    tagline: "Strong enough for market runs, groceries, and everything in between.",
    image: "/images/merch/merch-tote.png",
    imageAlt: "V4ME natural canvas tote bag",
  },
  {
    category: "Outerwear",
    title: "Bomber Jacket",
    tagline: "A statement piece for supporters who want to make an entrance.",
    image: "/images/merch/merch-bomber.png",
    imageAlt: "V4ME cream and forest green bomber jacket on a hanger",
  },
  {
    category: "Apparel",
    title: "Classic Tee",
    tagline: "Breathable cotton for everyday wear, rain or shine.",
    image: "/images/merch/merch-tee.png",
    imageAlt: "A close look at the V4ME logo print on a cream tee",
  },
  {
    category: "Accessories",
    title: "Insulated Bottle",
    tagline: "Steel that keeps you hydrated through a full day of outreach.",
    image: "/images/merch/merch-bottle.png",
    imageAlt: "V4ME forest green insulated water bottle",
  },
  {
    category: "Outerwear",
    title: "Windbreaker",
    tagline: "Light enough to pack, tough enough for field days.",
    image: "/images/merch/merch-windbreaker.png",
    imageAlt: "V4ME cream, black, and green windbreaker jacket on a hanger",
  },
  {
    category: "Apparel",
    title: "Polo Shirt",
    tagline: "Sharp enough for the office, easy enough for the weekend.",
    image: "/images/merch/merch-polo.png",
    imageAlt: "V4ME polo shirts in forest green and white",
  },
  {
    category: "Apparel",
    title: "Crewneck Sweatshirt",
    tagline: "Our message on your back, quite literally: People. Planet. A Brighter Future.",
    image: "/images/merch/merch-sweatshirt.png",
    imageAlt: "V4ME olive green crewneck sweatshirt with back print",
  },
] as const;

export function MerchGrid() {
  return (
    <section className="bg-white py-20 sm:py-24 dark:bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.title} delay={(i % 3) * 0.06}>
              <MerchCard {...product} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
