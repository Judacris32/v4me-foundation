import Image from "next/image";
import { ArrowRight, Landmark, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

// Real Board of Trustees and operations team, replacing the earlier
// placeholder role tiles. Bios are tightened summaries of the fuller
// biographies supplied for each person.
const trustees = [
  {
    name: "Barrister Gambo Umaru, LLB, BL",
    title: "Legal & Compliance Advisor",
    bio: "Founder and Principal Consultant of Delu Consulting Firm, he gives the Foundation legal guidance and helps keep its governance, compliance and accountability sound.",
    photo: "/images/team/trustee-gambo-umaru.jpg",
  },
  {
    name: "Alhaji Innayatu Jubril Mohammed",
    title: "Trustee · CEO, Honey Acres Farmland",
    bio: "An industrial chemist with more than 30 years in quality control at Kaduna Refining and Petrochemical Company. He now leads Honey Acres Farmland and champions tree planting and cutting carbon footprints as practical climate action.",
    photo: "/images/team/trustee-innayatu-mohammed.jpg",
  },
  {
    name: "Christie Ekwujuru",
    title: "Trustee · CEO, De Nelly Diamond Global",
    bio: "A human resources professional with postgraduate studies in Conflict, Peace and Strategic Studies. She is a committed advocate for clean water, sanitation and sustainable communities.",
    photo: "/images/team/trustee-christie-ekwujuru.jpg",
  },
  {
    name: "Mrs. Ijeoma Santos-Okpe",
    title: "Board Secretary",
    bio: "A Registered Nurse and nursing professor in New York with over 23 years in the U.S. health sector. She brings deep healthcare and philanthropic experience, with a focus on ending hunger and on good health and wellbeing.",
    photo: "/images/team/trustee-ijeoma-santos-okpe.jpg",
  },
  {
    name: "Joy Ekwujuru",
    title: "Financial Officer",
    bio: "An accounting professional and financial broker with Unicoke Star Ventures. She also founded the GoldenJoy4Kids Initiative and is a strong advocate for quality education.",
    photo: "/images/team/trustee-joy-ekwujuru.jpg",
  },
  {
    name: "Sonia Nkechi Christopher, B.NSc.",
    title: "Trustee & Team Member",
    bio: "A nursing graduate of Novena University, Delta State. She is passionate about patient care, mental health nursing and nursing education, and volunteers regularly in her community.",
    photo: "/images/team/trustee-sonia-christopher.jpg",
  },
  {
    name: "Bernard Emeka Afulike, BSc, MSc, FCIFC, FCILRM",
    title: "Trustee · CEO, Brain Hive Ltd",
    bio: "An economist and consultant in education and finance management, with over 10 years in education and 8 in finance and banking. He is a Fellow of FCIFC and FCILRM and cares deeply about quality education.",
    photo: "/images/team/trustee-bernard-afulike.jpg",
  },
] as const;

const teamMembers = [
  {
    name: "Anthony Onyi Uwandu",
    title: "Head of Administration & Operations",
    bio: "A Business Management graduate and entrepreneur, and CEO of LaVisa Links Communications and De Nero Green Farms. He brings years of leadership and organisational experience to the way V4ME runs day to day.",
    photo: "/images/team/team-anthony-uwandu.jpg",
  },
  {
    name: "Jude Iyelumi",
    title: "Full Stack Developer",
    bio: "Jude designed and built V4ME's website from the ground up. He believes good technology should make good work easier to find and support, and he continues to lead the Foundation's digital development.",
    photo: "/images/team/team-jude-iyelumi.png",
  },
  {
    name: "Lawrence Wisdom",
    title: "Creative Design Director",
    bio: "A Computer Science graduate with a real love for visual identity. He leads V4ME's graphic design, interface design and creative direction, giving the Foundation a look that is clear, consistent and intentional.",
    photo: "/images/team/lawrence-wisdom.jpg",
  },
  {
    name: "Emmanuel Christopher",
    title: "Photography & Visual Documentation Officer",
    bio: "A pharmacy undergraduate at Novena University with a passion for photography. He documents V4ME's projects, campaigns and field days, helping tell the Foundation's story in pictures.",
    photo: "/images/team/emmanuel-christopher.jpg",
  },
  {
    name: "Raymond Munachi Christopher",
    title: "ICT & Technical Support Officer",
    bio: "A Cybersecurity undergraduate at the Federal University of Applied Sciences Kachia (FUASK). He looks after V4ME's digital equipment and technology and keeps our digital habits safe and responsible.",
    photo: "/images/team/raymond-christopher.jpg",
  },
] as const;

type Person = {
  name: string;
  title: string;
  bio: string;
  photo: string;
};

// Flex rows (not a grid) so a short last row sits centred.
const cardWidth = "w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]";

const ringTones = [
  "ring-primary-400",
  "ring-secondary-400",
  "ring-accent-400",
];
const titleTones = [
  "text-primary-600 dark:text-primary-400",
  "text-secondary-600 dark:text-secondary-400",
  "text-accent-700 dark:text-accent-400",
];

function PersonCard({ name, title, bio, photo, index }: Person & { index: number }) {
  const t = index % 3;
  return (
    <div className="group flex h-full flex-col items-center rounded-3xl bg-surface p-7 text-center shadow-sm ring-1 ring-border-subtle transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary-950/10">
      <div
        className={`relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-4 ring-offset-4 ring-offset-surface transition-transform duration-500 group-hover:scale-105 ${ringTones[t]}`}
      >
        <Image src={photo} alt={name} fill sizes="112px" className="object-cover" />
      </div>
      <h3 className="mt-6 text-lg leading-snug font-semibold text-primary-950 dark:text-white">{name}</h3>
      <p className={`font-script mt-1 text-lg leading-tight font-bold ${titleTones[t]}`}>{title}</p>
      <p className="mt-3 text-sm leading-relaxed text-foreground/65">{bio}</p>
    </div>
  );
}

export function BoardOfTrustees() {
  return (
    <section id="trustees" className="scroll-mt-24 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow color="primary" icon={Landmark} align="center">
            The people
          </Eyebrow>
          <h2 className="mt-5 text-4xl text-primary-950 sm:text-5xl dark:text-white">
            Board of <em className="accent-word text-eco">trustees</em>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground/70">
            Professionals from healthcare, law, finance, education and industry, brought together by one shared
            commitment to V4ME&apos;s mission.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {trustees.map((person, i) => (
            <Reveal key={person.name} delay={(i % 3) * 0.06} className={cardWidth}>
              <PersonCard {...person} index={i} />
            </Reveal>
          ))}
        </div>

        <div className="mt-24 rounded-[2.5rem] bg-gradient-to-br from-secondary-50 to-primary-50 px-5 py-14 sm:px-10 dark:from-secondary-950/50 dark:to-primary-950">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow color="secondary" icon={Wrench} align="center">
              Behind the scenes
            </Eyebrow>
            <h3 className="mt-5 text-3xl font-semibold text-primary-950 sm:text-4xl dark:text-white">
              The operations <em className="accent-word text-sky">team</em>
            </h3>
          </Reveal>

          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {teamMembers.map((person, i) => (
              <Reveal key={person.name} delay={(i % 3) * 0.06} className={cardWidth}>
                <PersonCard {...person} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-[2rem] border-2 border-dashed sm:rounded-full border-primary-300 bg-primary-50 px-8 py-6 text-center sm:flex-row sm:text-left dark:border-primary-500/40 dark:bg-primary-500/10">
            <p className="text-base font-medium text-primary-800 dark:text-primary-100">
              Want to be part of the team behind this work? We are always glad to meet passionate volunteers
              and collaborators.
            </p>
            <Button href="/get-involved#volunteer" variant="primary" size="md" className="shrink-0" icon={<ArrowRight className="h-4 w-4" />}>
              Get involved
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
