import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Droplets,
  Factory,
  Fish,
  Flame,
  Gavel,
  GraduationCap,
  HandCoins,
  Handshake,
  HeartPulse,
  Recycle,
  TreePine,
  TrendingUp,
  Equal,
  Wheat,
  Zap,
} from "lucide-react";

export type Sdg = {
  number: number;
  name: string;
  /** Official UN SDG color for this goal. */
  color: string;
  icon: LucideIcon;
  /** How this goal connects to a specific V4ME program. */
  connection: string;
  /** A real photo (or, for the 5 goals added after the original 11, a
   *  supplied illustrated badge) representing this goal. */
  image: string;
  /** Which of the UN's five broad pillars this goal sits under. */
  pillar: "People" | "Planet" | "Prosperity" | "Peace" | "Partnership";
};

// 16 of the UN's 17 SDGs: the original 11 from the client's content
// blueprint, plus 5 more added once V4ME supplied artwork for them.
// Only Goal 5 (Gender Equality) is still pending real imagery.
//
// Colors are the UN's official per goal brand colors, used here as a
// color+icon badge rather than the official SDG pictogram artwork, which
// is UN-trademarked and requires separate permission to reproduce.
export const sdgs: Sdg[] = [
  {
    number: 1,
    name: "No Poverty",
    color: "#E5243B",
    icon: HandCoins,
    connection: "Advanced through our Poverty Relief programs.",
    image: "/images/icons/aim-poverty-relief.jpg",
    pillar: "People",
  },
  {
    number: 2,
    name: "Zero Hunger",
    color: "#DDA63A",
    icon: Wheat,
    connection: "Supported through food security and livelihood work.",
    image: "/images/community/aid-distribution.jpg",
    pillar: "People",
  },
  {
    number: 3,
    name: "Good Health & Wellbeing",
    color: "#4C9F38",
    icon: HeartPulse,
    connection: "Advanced through our Health outreach programs.",
    image: "/images/hero/hero-health-outreach.jpg",
    pillar: "People",
  },
  {
    number: 4,
    name: "Quality Education",
    color: "#C5192D",
    icon: GraduationCap,
    connection: "Advanced through our Quality Education programs.",
    image: "/images/icons/aim-education.jpg",
    pillar: "People",
  },
  {
    number: 6,
    name: "Clean Water & Sanitation",
    color: "#26BDE2",
    icon: Droplets,
    connection: "Supported through our Health & clean water initiatives.",
    image: "/images/icons/aim-health-water.jpg",
    pillar: "Planet",
  },
  {
    number: 7,
    name: "Affordable & Clean Energy",
    color: "#FCC30B",
    icon: Zap,
    connection: "Advanced through our Clean Energy programs.",
    image: "/images/icons/aim-climate-energy.jpg",
    pillar: "Prosperity",
  },
  {
    number: 8,
    name: "Decent Work & Economic Growth",
    color: "#A21942",
    icon: TrendingUp,
    connection: "Supported through livelihood training within our Poverty Relief programs.",
    image: "/images/sdgs/sdg-8-decent-work.jpg",
    pillar: "Prosperity",
  },
  {
    number: 9,
    name: "Industry, Innovation & Infrastructure",
    color: "#FD6925",
    icon: Factory,
    connection: "A goal we're building toward as our Clean Energy work and digital operations grow.",
    image: "/images/sdgs/sdg-9-industry-innovation.jpg",
    pillar: "Prosperity",
  },
  {
    number: 10,
    name: "Reduced Inequalities",
    color: "#DD1367",
    icon: Equal,
    connection: "Advanced through Poverty Relief and IDP Support centered on the communities furthest behind.",
    image: "/images/sdgs/sdg-10-reduced-inequalities.jpg",
    pillar: "Prosperity",
  },
  {
    number: 11,
    name: "Sustainable Cities & Communities",
    color: "#FD9D24",
    icon: Building2,
    connection: "Supported through waste management & climate resilience work.",
    image: "/images/community/community-gathering.jpg",
    pillar: "Prosperity",
  },
  {
    number: 12,
    name: "Responsible Consumption & Production",
    color: "#BF8B2E",
    icon: Recycle,
    connection: "Advanced through our Waste Management programs.",
    image: "/images/icons/aim-responsible-consumption.jpg",
    pillar: "Planet",
  },
  {
    number: 13,
    name: "Climate Action",
    color: "#3F7E44",
    icon: Flame,
    connection: "Advanced through our Climate Action programs.",
    image: "/images/hero/hero-tree-planting-climate-action.jpg",
    pillar: "Planet",
  },
  {
    number: 14,
    name: "Life Below Water",
    color: "#0A97D9",
    icon: Fish,
    connection: "Supported through Waste Management drives that keep plastic out of local waterways before it reaches the sea.",
    image: "/images/sdgs/sdg-14-life-below-water.jpg",
    pillar: "Planet",
  },
  {
    number: 15,
    name: "Life on Land",
    color: "#56C02B",
    icon: TreePine,
    connection: "Advanced through our Tree Planting programs.",
    image: "/images/icons/aim-environmental-protection.jpg",
    pillar: "Planet",
  },
  {
    number: 16,
    name: "Peace, Justice & Strong Institutions",
    color: "#00689D",
    icon: Gavel,
    connection: "Advanced through our Board's commitment to legal compliance, sound governance, and institutional accountability.",
    image: "/images/sdgs/sdg-16-peace-justice.jpg",
    pillar: "Peace",
  },
  {
    number: 17,
    name: "Partnerships for the Goals",
    color: "#19486A",
    icon: Handshake,
    connection: "Advanced by partnering with communities, donors & allies.",
    image: "/images/icons/aim-partnerships.jpg",
    pillar: "Partnership",
  },
];
