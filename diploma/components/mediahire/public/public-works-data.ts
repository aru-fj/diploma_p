export type PublicWorkMedia =
  | {
      type: "image";
      src: string;
      alt?: string;
    }
  | {
      type: "youtube";
      src: string;
      title: string;
    }
  | {
      type: "pdf";
      src: string;
      title: string;
    };

export type PublicWork = {
  slug: string;
  title: string;
  author: string;
  authorSlug: string;
  role: string;
  company: string;
  category: string;
  type: string;
  location: string;
  createdAt: string;
  coverImage: string;
  authorAvatar?: string;
  gallery: PublicWorkMedia[];
  description: string;
  responsibilities: string[];
  tools: string[];
};

export const publicWorks: PublicWork[] = [
  {
    slug: "tales-from-the-river",
    title: "Tales from the River",
    author: "Alex Fernández",
    authorSlug: "alex-fernandez",
    role: "Film Director",
    company: "Independent Creator",
    category: "Production",
    type: "Project-based",
    location: "Shanghai, China",
    createdAt: "October 23, 2025",
    coverImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=90",
    authorAvatar:
      
      
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=90",
    gallery: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=90",
        alt: "Tales from the River main scene",
      },
      {
        type: "youtube",
        src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Tales from the River trailer",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=90",
        alt: "Tales from the River city scene",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1400&q=90",
        alt: "Tales from the River portrait scene",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=90",
        alt: "Tales from the River poster",
      },
    ],
    description:
      "A young woman who dreams, a man who hesitates, and an old man who remembers -- three echoes of a life shaped by time and the quiet pursuit of meaning.",
    responsibilities: [
      "Film concept development",
      "Visual storytelling",
      "Scene direction and editing",
    ],
    tools: ["Premiere Pro", "DaVinci Resolve", "Camera", "Color Grading"],
  },
  {
    slug: "chubby-characters",
    title: "Chubby Characters",
    author: "Dimash Karim",
    authorSlug: "dimash-karim",
    role: "3D Artist",
    company: "MediaHire Studio",
    category: "3D / Animation",
    type: "Freelance",
    location: "Astana, Kazakhstan",
    createdAt: "April 2026",
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1400&q=90",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=90",
    gallery: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1400&q=90",
        alt: "3D character render",
      },
      {
        type: "youtube",
        src: "https://youtu.be/dQw4w9WgXcQ",
        title: "Chubby Characters animation preview",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1400&q=90",
        alt: "3D abstract character style",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=1400&q=90",
        alt: "3D creative visual",
      },
    ],
    description:
      "A playful 3D character design project with rounded shapes, bright lighting, and friendly visual language.",
    responsibilities: [
      "Character modeling",
      "Lighting and material setup",
      "Final render preparation",
    ],
    tools: ["Blender", "Cinema 4D", "Figma", "Rendering"],
  },
  {
    slug: "fashion-lookbook",
    title: "Fashion Lookbook",
    author: "Dana Murat",
    authorSlug: "dana-murat",
    role: "Art Director",
    company: "Frame Production",
    category: "Production",
    type: "Part-time",
    location: "Almaty, Kazakhstan",
    createdAt: "March 2026",
    coverImage:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=90",
    authorAvatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=90",
    gallery: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=90",
        alt: "Fashion lookbook cover",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=90",
        alt: "Fashion editorial photo",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=90",
        alt: "Fashion styling",
      },
      {
        type: "pdf",
        src: "/projects/project-pdf.pdf",
        title: "Fashion Lookbook PDF",
      },
    ],
    description:
      "A clean fashion lookbook created for a local clothing brand with studio photography, styling, and editorial composition.",
    responsibilities: [
      "Moodboard and visual planning",
      "Studio production coordination",
      "Editorial layout and final presentation",
    ],
    tools: ["Figma", "Photoshop", "Studio Lighting", "Art Direction"],
  },
  {
    slug: "minimal-brand-identity",
    title: "Minimal Brand Identity",
    author: "Madina Omar",
    authorSlug: "madina-omar",
    role: "Graphic Designer",
    company: "Softline Creative",
    category: "Graphic Design",
    type: "Freelance",
    location: "Online",
    createdAt: "January 2026",
    coverImage:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1400&q=90",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=90",
    gallery: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1400&q=90",
        alt: "Brand identity design",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?auto=format&fit=crop&w=1400&q=90",
        alt: "Graphic design layout",
      },
      {
        type: "pdf",
        src: "/projects/project-pdf.pdf",
        title: "Brand Guideline PDF",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1400&q=90",
        alt: "Typography system",
      },
    ],
    description:
      "A minimal brand identity project with logo, typography, color system, and social media templates for a modern creative business.",
    responsibilities: [
      "Logo design",
      "Typography and color system",
      "Brand guideline preparation",
    ],
    tools: ["Figma", "Illustrator", "Brand Strategy", "Typography"],
  },
  {
    slug: "urban-media-campaign",
    title: "Urban Media Campaign",
    author: "Arman Nurlan",
    authorSlug: "arman-nurlan",
    role: "Marketing Designer",
    company: "Bright Agency",
    category: "Marketing",
    type: "Full-time",
    location: "Astana, Kazakhstan",
    createdAt: "February 2026",
    coverImage:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=90",
    authorAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=90",
    gallery: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=90",
        alt: "Campaign visual",
      },
      {
        type: "youtube",
        src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Urban Media Campaign video",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=90",
        alt: "Office campaign process",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1400&q=90",
        alt: "Marketing campaign team",
      },
    ],
    description:
      "A digital marketing campaign for an urban lifestyle brand. The project includes social media visuals, banners, and campaign identity materials.",
    responsibilities: [
      "Campaign visual concept",
      "Social media design",
      "Banner and promotional layout design",
    ],
    tools: ["Illustrator", "Photoshop", "Figma", "Branding"],
  },
  {
    slug: "product-photo-set",
    title: "Product Photo Set",
    author: "Nika Lee",
    authorSlug: "nika-lee",
    role: "Product Photographer",
    company: "Object Studio",
    category: "Photography",
    type: "Project-based",
    location: "Almaty, Kazakhstan",
    createdAt: "December 2025",
    coverImage:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=90",
    authorAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=90",
    gallery: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=90",
        alt: "Product photo set",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1400&q=90",
        alt: "Product photo detail",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=90",
        alt: "Commercial product photo",
      },
    ],
    description:
      "A commercial product photography set for online stores and advertising. The work focuses on clean lighting, sharp details, and modern product presentation.",
    responsibilities: [
      "Product shooting",
      "Lighting setup",
      "Retouching and export for web",
    ],
    tools: ["Lightroom", "Photoshop", "Studio Lighting", "Retouching"],
  },
  {
    slug: "music-video-production",
    title: "Music Video Production",
    author: "Ruslan Aitov",
    authorSlug: "ruslan-aitov",
    role: "Video Producer",
    company: "Wave Studio",
    category: "Production",
    type: "Project-based",
    location: "Almaty, Kazakhstan",
    createdAt: "November 2025",
    coverImage:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1400&q=90",
    authorAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=90",
    gallery: [
      {
        type: "youtube",
        src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Music Video Production",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1400&q=90",
        alt: "Music video stage",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=90",
        alt: "Music production",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1400&q=90",
        alt: "Concert scene",
      },
    ],
    description:
      "A dynamic music video project built around stage lighting, rhythm, movement, and cinematic editing for a young music artist.",
    responsibilities: [
      "Pre-production planning",
      "Video shooting and direction",
      "Editing and color correction",
    ],
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Camera"],
  },
  {
    slug: "social-media-visuals",
    title: "Social Media Visuals",
    author: "Aruzhan Saten",
    authorSlug: "aruzhan-saten",
    role: "Content Designer",
    company: "Digital Room",
    category: "Marketing",
    type: "Part-time",
    location: "Online",
    createdAt: "September 2025",
    coverImage:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1400&q=90",
    authorAvatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=90",
    gallery: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1400&q=90",
        alt: "Social media visuals",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1400&q=90",
        alt: "Digital content design",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1400&q=90",
        alt: "Content design screen",
      },
      {
        type: "pdf",
        src: "/projects/project-pdf.pdf",
        title: "Social Media Visuals PDF",
      },
    ],
    description:
      "A set of social media visuals designed for brand communication, including posts, stories, banners, and promotional content.",
    responsibilities: [
      "Content layout design",
      "Social media post templates",
      "Visual adaptation for multiple formats",
    ],
    tools: ["Figma", "Canva", "Photoshop", "Content Design"],
  },
];

export function getPublicWorkBySlug(slug: string) {
  return publicWorks.find((work) => work.slug === slug);
}

export const publicAuthLinks = {
    login: "/auth-required",
    signup: "/auth-required",
  };
