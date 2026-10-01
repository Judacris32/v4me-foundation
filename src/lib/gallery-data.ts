export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type GalleryCategory = {
  key: string;
  title: string;
  description: string;
  images: GalleryImage[];
};

// Every image here is a real photo from V4ME's own people and programs,
// no stock or AI-generated imagery. (The site's hero carousel uses a
// separate set of user-supplied photos and isn't duplicated here.)
export const galleryCategories: GalleryCategory[] = [
  {
    key: "people",
    title: "Board & Team",
    description: "The trustees and team who guide V4ME's work. Put a face to the names.",
    images: [
      {
        src: "/images/team/founder-jennifer.jpg",
        alt: "Jennifer Kelechi Ekwujuru, Founder of Voice for Mother Earth Foundation",
        caption: "Jennifer Kelechi Ekwujuru, Founder",
      },
      {
        src: "/images/team/trustee-gambo-umaru.jpg",
        alt: "Barrister Gambo Umaru, board trustee",
        caption: "Barrister Gambo Umaru",
      },
      {
        src: "/images/team/trustee-innayatu-mohammed.jpg",
        alt: "Alhaji Innayatu Jubril Mohammed, board trustee",
        caption: "Alhaji Innayatu Jubril Mohammed",
      },
      {
        src: "/images/team/trustee-christie-ekwujuru.jpg",
        alt: "Christie Ekwujuru, board trustee",
        caption: "Christie Ekwujuru",
      },
      {
        src: "/images/team/trustee-ijeoma-santos-okpe.jpg",
        alt: "Mrs. Ijeoma Santos-Okpe, board trustee",
        caption: "Mrs. Ijeoma Santos-Okpe",
      },
      {
        src: "/images/team/trustee-joy-ekwujuru.jpg",
        alt: "Joy Ekwujuru, board trustee",
        caption: "Joy Ekwujuru",
      },
      {
        src: "/images/team/trustee-sonia-christopher.jpg",
        alt: "Sonia Nkechi Christopher, board trustee",
        caption: "Sonia Nkechi Christopher, B.NSc.",
      },
      {
        src: "/images/team/trustee-bernard-afulike.jpg",
        alt: "Bernard Emeka Afulike, board trustee",
        caption: "Bernard Emeka Afulike",
      },
      {
        src: "/images/team/team-jude-iyelumi.png",
        alt: "Jude Iyelumi, team member",
        caption: "Jude Iyelumi, Full Stack Developer",
      },
      {
        src: "/images/team/lawrence-wisdom.jpg",
        alt: "Lawrence Wisdom, team member",
        caption: "Lawrence Wisdom, Creative Design Director",
      },
      {
        src: "/images/team/emmanuel-christopher.jpg",
        alt: "Emmanuel Christopher, team member",
        caption: "Emmanuel Christopher, Photography & Visual Documentation Officer",
      },
      {
        src: "/images/team/raymond-christopher.jpg",
        alt: "Raymond Munachi Christopher, team member",
        caption: "Raymond Munachi Christopher, ICT & Technical Support Officer",
      },
      {
        src: "/images/team/team-anthony-uwandu.jpg",
        alt: "Anthony Onyi Uwandu, team member",
        caption: "Anthony Onyi Uwandu, Head of Administration & Operations",
      },
    ],
  },
  {
    key: "programs",
    title: "Community & Impact",
    description: "Moments from our outreach, relief and education work on the ground.",
    images: [
      {
        src: "/images/community/aid-box-handoff.jpg",
        alt: "A volunteer handing over a box of relief supplies to a community member",
        caption: "Relief supplies handed to a family in need",
      },
      {
        src: "/images/community/aid-distribution.jpg",
        alt: "A V4ME volunteer distributing support to mothers and children",
        caption: "Distributing aid to mothers and children",
      },
      {
        src: "/images/community/classroom-lesson.jpg",
        alt: "Students in a classroom during a V4ME program session",
        caption: "A classroom lesson in session",
      },
      {
        src: "/images/community/classroom-mural.jpg",
        alt: "A classroom decorated with a colorful learning mural",
        caption: "A classroom brightened with a learning mural",
      },
      {
        src: "/images/community/classroom-students.jpg",
        alt: "Students engaged in a classroom lesson at a V4ME partner school",
        caption: "Students engaged during a lesson",
      },
      {
        src: "/images/community/community-gathering-fitted.jpg",
        alt: "A community gathered together during a V4ME outreach event",
        caption: "A community gathering during outreach",
      },
      {
        src: "/images/community/community-outreach-banner.jpg",
        alt: "V4ME volunteers engaging with community members during an outreach event",
        caption: "Volunteers engaging with the community",
      },
      {
        src: "/images/community/community-support-outreach.jpg",
        alt: "A V4ME volunteer providing support to a community member during an outreach visit",
        caption: "Support delivered during an outreach visit",
      },
      {
        src: "/images/community/health-outreach-table.jpg",
        alt: "V4ME volunteers conducting a community health outreach session",
        caption: "A community health outreach session",
      },
      {
        src: "/images/community/school-assembly.jpg",
        alt: "Students gathered for an assembly at a V4ME partner school",
        caption: "A school assembly at a partner school",
      },
      {
        src: "/images/community/sdg-awareness-group.jpg",
        alt: "A group gathered for a Sustainable Development Goals awareness session",
        caption: "An SDG awareness session with the community",
      },
      {
        src: "/images/community/sdg-banner-outreach.jpg",
        alt: "V4ME volunteers presenting a Sustainable Development Goals banner during a community outreach",
        caption: "Presenting our SDG commitments during outreach",
      },
    ],
  },
];
