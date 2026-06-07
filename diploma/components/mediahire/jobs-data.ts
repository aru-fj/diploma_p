export type MediaHireCompany = {
  description: string;
  id: string;
  location: string;
  logo: string;
  name: string;
};

export type MediaHireJob = {
  companyId: string;
  companyLogo: string;
  companyName: string;
  description: string;
  id: string;
  level: string;
  location: string;
  offer: string[];
  postedAt: string;
  responsibilities: string[];
  salary: string;
  tags: string[];
  title: string;
  type: string;
};

export const mediaHireCompanies: MediaHireCompany[] = [
  {
    id: "kaspi-kz",
    name: "Kaspi.kz",
    logo: "/photo/logo-company/kaspi.jpg",
    location: "Astana",
    description:
      "Kaspi.kz is one of the leading fintech and technology companies in Kazakhstan. The company provides digital banking, online shopping, payment, and financial services used daily by millions of people. Kaspi.kz focuses on innovation, convenience, and creating modern digital ecosystems for users across the country.",
  },
  {
    id: "qazaq-animation-studio",
    name: "Qazaq Animation Studio",
    logo: "/photo/logo-company/QazaqAnimation.jpg",
    location: "Shymkent, Kazakhstan",
    description:
      "Qazaq Animation Studio is a creative production company focused on 3D animation, character design, and digital storytelling. The studio works with brands, media companies, and entertainment projects to create high-quality animated content for online platforms and advertising.",
  },
  {
    id: "choco-group",
    name: "Choco Group",
    logo: "/photo/logo-company/ChocoGroup.jpg",
    location: "Almaty, Kazakhstan",
    description:
      "Choco Group is a technology company in Kazakhstan that develops digital services in food delivery, travel, entertainment, and online platforms. The company focuses on user-friendly digital products, creative marketing, and convenient services for everyday life.",
  },
  {
    id: "steppe-film-production",
    name: "Steppe Film Production",
    logo: "/photo/logo-company/SteppeFilm.jpg",
    location: "Astana, Kazakhstan",
    description:
      "Steppe Film Production is a local creative studio focused on short films, commercials, documentary projects, and social media videos. The company works with young directors, producers, and media specialists to create emotional and visually strong content.",
  },
  {
    id: "luna-fashion-store",
    name: "Luna Fashion Store",
    logo: "/photo/logo-company/LunaFashion.png",
    location: "Shymkent, Kazakhstan",
    description:
      "Luna Fashion Store is a fashion brand that creates modern clothing collections for young and stylish audiences. The company focuses on strong visual identity, high-quality content, and attractive digital presentation across social media and online platforms.",
  },
  {
    id: "soprano-karaoke",
    name: "Soprano Karaoke",
    logo: "/photo/logo-company/Soprano.png",
    location: "Astana, Kazakhstan",
    description:
      "Soprano Karaoke is an entertainment venue in Astana that combines music, events, food, and social atmosphere. The company actively develops its online presence through video content, creative campaigns, and collaborations with local brands.",
  },
  {
    id: "nomad-film-group",
    name: "Nomad Film Group",
    logo: "/photo/logo-company/NomadFilm.jpg",
    location: "Almaty, Kazakhstan",
    description:
      "Nomad Film Group is a production company that works on commercials, short films, documentaries, music videos, and branded content. The company focuses on strong organization, creative storytelling, and professional production quality.",
  },
  {
    id: "digital-media-astana",
    name: "Digital Media Astana",
    logo: "/photo/logo-company/DigitalMedia.jpg",
    location: "Astana, Kazakhstan",
    description:
      "Digital Media Astana is a media agency that creates video content, social media campaigns, interviews, event videos, and advertising materials for local businesses. The company helps brands improve their online presence through modern and engaging content.",
  },
  {
    id: "pixel-motion-studio",
    name: "Pixel Motion Studio",
    logo: "/photo/logo-company/PixelMotion.png",
    location: "Almaty, Kazakhstan",
    description:
      "Pixel Motion Studio is a creative studio specializing in motion graphics, digital animation, animated branding, and promotional videos. The studio works with companies that need dynamic visual content for advertising, product presentation, and social media.",
  },
  {
    id: "almaty-vision-studio",
    name: "Almaty Vision Studio",
    logo: "/photo/logo-company/Vision.jpg",
    location: "Almaty, Kazakhstan",
    description:
      "Almaty Vision Studio is a creative video production studio based in Almaty. The studio works on commercials, music videos, brand stories, social campaigns, and cinematic content for local businesses and creative brands. The company focuses on modern visuals, strong storytelling, and high-quality production.",
  },
  {
    id: "mediapro",
    name: "MediaPro",
    logo: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?auto=format&fit=crop&w=300&q=90",
    location: "Astana, Kazakhstan",
    description:
      "MediaPro creates social media layouts, posters, simple brand materials, and visual content for digital platforms.",
  },
];

export const mediaHireJobs: MediaHireJob[] = [
  {
    id: "product-designer-kaspi",
    companyId: "kaspi-kz",
    companyName: "Kaspi.kz",
    companyLogo: "/photo/logo-company/kaspi.jpg",
    title: "Graphic Designer",
    location: "Astana, Kazakhstan",
    salary: "600$ / Month",
    postedAt: "3 days ago",
    type: "Full-Time",
    level: "Mid-level",
    description:
      "A Graphic Designer creates modern visual materials for digital campaigns, social media, presentations, and brand communication.",
    responsibilities: [
      "Create social media visuals, banners, and promotional graphics.",
      "Design presentation materials and digital layouts.",
      "Work with typography, colors, composition, and brand guidelines.",
      "Prepare visual concepts for advertising campaigns.",
      "Adapt designs for different digital formats.",
      "Collaborate with marketing and product teams.",
    ],
    offer: [
      "Competitive salary and performance bonuses",
      "Modern office in Astana",
      "Career growth opportunities",
      "Flexible working environment",
      "Friendly and creative team",
      "Access to professional courses and workshops",
    ],
    tags: [
      "Contract",
      "Remote",
      "Full-Time",
      "Mid-level",
      "English",
      "Kazakh",
      "Russian",
    ],
  },
  {
    id: "3d-animator-qazaq-animation",
    companyId: "qazaq-animation-studio",
    companyName: "Qazaq Animation Studio",
    companyLogo: "/photo/logo-company/QazaqAnimation.jpg",
    title: "3D Animator",
    location: "Shymkent, Kazakhstan",
    salary: "600 000₸ / Month",
    postedAt: "4 days ago",
    type: "Full-Time",
    level: "High-level",
    description:
      "A 3D Animator creates animated characters, product videos, and 3D scenes for digital media, advertising, and entertainment projects.",
    responsibilities: [
      "Create 3D character animation and movement cycles.",
      "Work with rigged characters, objects, and 3D scenes.",
      "Prepare animated product videos and short promotional clips.",
      "Set up lighting, camera angles, and rendering scenes.",
      "Collaborate with modelers, designers, and directors.",
      "Improve animation timing, movement, and visual rhythm.",
    ],
    offer: [
      "Creative animation projects",
      "Modern production tools",
      "Flexible schedule",
      "Professional development opportunities",
      "Friendly creative team",
      "Opportunity to work on local and international projects",
    ],
    tags: [
      "Contract",
      "Remote",
      "High-level",
      "3D Animation",
      "Character Animation",
      "Rendering",
      "English",
      "Russian",
    ],
  },
  {
    id: "marketing-specialist-choco-group",
    companyId: "choco-group",
    companyName: "Choco Group",
    companyLogo: "/photo/logo-company/ChocoGroup.jpg",
    title: "Marketing Specialist",
    location: "Almaty, Kazakhstan",
    salary: "100 000₽ / Month",
    postedAt: "6 days ago",
    type: "Full-Time",
    level: "Mid-level",
    description:
      "A Marketing Specialist develops campaigns, content strategies, and promotional ideas to increase brand awareness and audience engagement.",
    responsibilities: [
      "Develop marketing campaigns for digital platforms.",
      "Prepare content plans and promotional ideas.",
      "Analyze target audience and competitor activity.",
      "Work with social media content and advertising materials.",
      "Coordinate campaigns with designers and copywriters.",
      "Track campaign results and prepare reports.",
    ],
    offer: [
      "Competitive salary",
      "Career growth in a digital company",
      "Creative work environment",
      "Flexible work format",
      "Training and workshops",
      "Friendly marketing team",
    ],
    tags: [
      "Full-Time",
      "Hybrid",
      "Mid-level",
      "Marketing",
      "SMM",
      "Campaign Planning",
      "English",
      "Russian",
    ],
  },
  {
    id: "screenwriter-steppe-film-production",
    companyId: "steppe-film-production",
    companyName: "Steppe Film Production",
    companyLogo: "/photo/logo-company/SteppeFilm.jpg",
    title: "Screenwriter",
    location: "Astana, Kazakhstan",
    salary: "300 000₸ / Month",
    postedAt: "3 days ago",
    type: "Part-Time",
    level: "Junior",
    description:
      "A Screenwriter creates scripts, dialogues, story concepts, and narrative structures for films, commercials, social media videos, and digital content.",
    responsibilities: [
      "Write scripts for short films, ads, and online videos.",
      "Develop story ideas, characters, and scene structure.",
      "Create dialogues and narration texts.",
      "Adapt scripts for social media and commercial formats.",
      "Work with directors, producers, and creative teams.",
      "Edit and improve scripts based on feedback.",
    ],
    offer: [
      "Creative film and media projects",
      "Flexible working schedule",
      "Remote work opportunity",
      "Participation in production process",
      "Professional feedback from directors",
      "Opportunity to build a strong portfolio",
    ],
    tags: [
      "Part-Time",
      "Remote",
      "Junior",
      "Screenwriting",
      "Script",
      "Film",
      "Kazakh",
      "Russian",
    ],
  },
  {
    id: "photographer-cinematographer-luna-fashion",
    companyId: "luna-fashion-store",
    companyName: "Luna Fashion Store",
    companyLogo: "/photo/logo-company/LunaFashion.png",
    title: "Photographer / Cinematographer",
    location: "Shymkent, Kazakhstan",
    salary: "300 000₸ / Month",
    postedAt: "4 days ago",
    type: "Full-Time",
    level: "Junior",
    description:
      "A Photographer / Cinematographer creates fashion photos, product visuals, lifestyle shots, and cinematic content for brand promotion.",
    responsibilities: [
      "Shoot fashion lookbooks, portraits, and product photos.",
      "Create lifestyle visuals for social media and website use.",
      "Work with models, stylists, and creative directors.",
      "Set up lighting and composition for indoor and outdoor shoots.",
      "Edit and retouch photo materials.",
      "Support video shooting for fashion campaigns.",
    ],
    offer: [
      "Creative fashion projects",
      "Studio and equipment support",
      "Flexible working schedule",
      "Career growth in a fashion brand",
      "Friendly creative team",
      "Opportunity to work on seasonal campaigns",
    ],
    tags: [
      "Contract",
      "Onsite",
      "Senior",
      "Photography",
      "Cinematography",
      "Fashion",
      "English",
      "Russian",
    ],
  },
  {
    id: "videographer-soprano-karaoke",
    companyId: "soprano-karaoke",
    companyName: "Soprano Karaoke",
    companyLogo: "/photo/logo-company/Soprano.png",
    title: "Videographer",
    location: "Astana, Kazakhstan",
    salary: "700$ / Month",
    postedAt: "2 days ago",
    type: "Full-Time",
    level: "Senior",
    description:
      "A Videographer films promotional videos, event content, interviews, and short social media videos with strong composition and cinematic style.",
    responsibilities: [
      "Film event videos, reels, and promotional content.",
      "Work with camera angles, lighting, and composition.",
      "Capture atmosphere, guests, details, and brand elements.",
      "Prepare video materials for editing and publication.",
      "Collaborate with marketing and content teams.",
      "Support creative ideas for video campaigns.",
    ],
    offer: [
      "Creative and dynamic projects",
      "Modern shooting environment",
      "Flexible working hours",
      "Opportunity to build a strong portfolio",
      "Friendly team",
      "Participation in events and campaigns",
    ],
    tags: [
      "Contract",
      "Onsite",
      "Mid-level",
      "Videography",
      "Camera Work",
      "Event Video",
      "Kazakh",
      "Russian",
    ],
  },
  {
    id: "producer-nomad-film-group",
    companyId: "nomad-film-group",
    companyName: "Nomad Film Group",
    companyLogo: "/photo/logo-company/NomadFilm.jpg",
    title: "Producer",
    location: "Almaty, Kazakhstan",
    salary: "750$ / Month",
    postedAt: "4 days ago",
    type: "Full-Time",
    level: "Senior",
    description:
      "A Producer manages creative media projects, production schedules, budgets, teams, locations, and communication between clients and specialists.",
    responsibilities: [
      "Plan and organize video and media production projects.",
      "Manage schedules, budgets, teams, and locations.",
      "Communicate with clients, directors, and creative specialists.",
      "Coordinate casting, equipment, and shooting preparation.",
      "Control deadlines and production documents.",
      "Support the project from pre-production to final delivery.",
    ],
    offer: [
      "Large creative projects",
      "Project-based bonuses",
      "Career growth opportunities",
      "Work with professional production teams",
      "Travel opportunities",
      "Creative and responsible work environment",
    ],
    tags: [
      "Full-Time",
      "Onsite",
      "Senior",
      "Production",
      "Project Management",
      "Film",
      "Kazakh",
      "Russian",
    ],
  },
  {
    id: "video-editor-digital-media-astana",
    companyId: "digital-media-astana",
    companyName: "Digital Media Astana",
    companyLogo: "/photo/logo-company/DigitalMedia.jpg",
    title: "Video Editor",
    location: "Astana, Kazakhstan",
    salary: "650$ / Month",
    postedAt: "3 days ago",
    type: "Full-Time",
    level: "Mid-level",
    description:
      "A Video Editor creates clean and dynamic video edits for social media, events, interviews, YouTube, advertising, and brand content.",
    responsibilities: [
      "Edit videos for Instagram, YouTube, TikTok, and presentations.",
      "Select the best moments from raw footage.",
      "Work with music, transitions, subtitles, and sound sync.",
      "Prepare vertical and horizontal video formats.",
      "Add basic color correction and motion elements.",
      "Collaborate with videographers and content managers.",
    ],
    offer: [
      "Remote or hybrid work format",
      "Stable flow of creative projects",
      "Flexible deadlines",
      "Friendly media team",
      "Professional growth",
      "Access to editing tools and project materials",
    ],
    tags: [
      "Part-Time",
      "Remote",
      "Mid-level",
      "Video Editing",
      "Post-production",
      "Reels",
      "Russian",
      "English",
    ],
  },
  {
    id: "motion-designer-pixel-motion-studio",
    companyId: "pixel-motion-studio",
    companyName: "Pixel Motion Studio",
    companyLogo: "/photo/logo-company/PixelMotion.png",
    title: "Motion Designer",
    location: "Almaty, Kazakhstan",
    salary: "750$ / Month",
    postedAt: "6 days ago",
    type: "Full-Time",
    level: "Mid-level",
    description:
      "A Motion Designer creates animated graphics, logo animations, typography motion, social media animations, and promotional video elements.",
    responsibilities: [
      "Create motion graphics for ads, social media, and presentations.",
      "Animate logos, typography, icons, and visual elements.",
      "Prepare storyboards and animation concepts.",
      "Work with designers and marketing teams.",
      "Adapt animations for different screen formats.",
      "Export final files for web, social media, and video platforms.",
    ],
    offer: [
      "Creative motion design projects",
      "Remote work opportunity",
      "Modern software and tools",
      "Professional development",
      "Friendly creative team",
      "Opportunity to work with different brands",
    ],
    tags: [
      "Contract",
      "Remote",
      "Mid-level",
      "Motion Design",
      "Animation",
      "After Effects",
      "English",
      "Russian",
    ],
  },
  {
    id: "director-almaty-vision-studio",
    companyId: "almaty-vision-studio",
    companyName: "Almaty Vision Studio",
    companyLogo: "/photo/logo-company/Vision.jpg",
    title: "Director",
    location: "Almaty, Kazakhstan",
    salary: "800 000₸ / Month",
    postedAt: "5 days ago",
    type: "Full-Time",
    level: "Senior",
    description:
      "A Director creates visual concepts, directs scenes, works with actors and production teams, and controls the storytelling style of video projects.",
    responsibilities: [
      "Develop creative concepts and visual direction.",
      "Direct scenes, actors, camera movement, and mood.",
      "Work with producers, cinematographers, editors, and clients.",
      "Prepare shot lists, references, and scene plans.",
      "Control storytelling, pacing, and emotional tone.",
      "Present creative ideas to the production team and client.",
    ],
    offer: [
      "Work on brand and commercial video projects",
      "Creative control during production",
      "Professional media production team",
      "Project-based bonuses",
      "Career growth in creative direction",
      "Opportunity to work with different local brands",
    ],
    tags: [
      "Full-Time",
      "Onsite",
      "Senior",
      "Directing",
      "Film",
      "Creative Direction",
      "Kazakh",
      "Russian",
    ],
  },
  {
    id: "graphic-designer-mediapro",
    companyId: "mediapro",
    companyName: "MediaPro",
    companyLogo:
      "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?auto=format&fit=crop&w=300&q=90",
    title: "Graphic Designer",
    location: "Astana, Kazakhstan",
    salary: "300$ / Month",
    postedAt: "10 days ago",
    type: "Part-Time",
    level: "Junior",
    description:
      "MediaPro needs a part-time Graphic Designer for social layouts, posters, and simple brand materials.",
    responsibilities: [
      "Design social media posts",
      "Create posters and banners",
      "Adapt templates for campaigns",
      "Prepare files for publishing",
    ],
    offer: [
      "Part-time creative workflow",
      "Remote-friendly design tasks",
      "Social media design experience",
      "Portfolio development",
      "Flexible working schedule",
    ],
    tags: [
      "Remote",
      "Kazakh, Russian",
      "Not required",
      "Graphic Design",
      "Canva",
      "Figma",
    ],
  },
];

export function getMediaHireJob(id: string) {
  return mediaHireJobs.find((job) => job.id === id);
}

export function getMediaHireCompany(id: string) {
  return mediaHireCompanies.find((company) => company.id === id);
}

export function getJobsByCompany(companyId: string) {
  return mediaHireJobs.filter((job) => job.companyId === companyId);
}

export function getSimilarJobs(jobId: string) {
  return mediaHireJobs.filter((job) => job.id !== jobId);
}