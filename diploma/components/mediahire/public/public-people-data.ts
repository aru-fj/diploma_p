export type PublicPerson = {
    slug: string;
    name: string;
    role: string;
    category: string;
    location: string;
    experience: string;
    projectsCount: number;
    rating: number;
    availability: string;
    avatar: string;
    coverImage: string;
    skills: string[];
    shortBio: string;
    about: string;
    languages: string[];
    featuredWorkSlugs: string[];
  };
  
  export const publicPeople: PublicPerson[] = [
    {
      slug: "amina-saparova",
      name: "Amina Saparova",
      role: "Photographer",
      category: "Photography",
      location: "Almaty, Kazakhstan",
      experience: "3 years experience",
      projectsCount: 14,
      rating: 4.8,
      availability: "Available for projects",
      avatar:
        
      
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=90",
      coverImage:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=90",
      skills: ["Portrait", "Outdoor", "Retouching"],
      shortBio:
        "Creative photographer focused on portraits, lifestyle visuals, and emotional storytelling.",
      about:
        "Amina creates soft, emotional photography for portraits, lifestyle campaigns, and outdoor visual stories. Her work focuses on natural light, clean composition, and a calm cinematic mood.",
      languages: ["Kazakh", "Russian", "English"],
      featuredWorkSlugs: [],
    },
    {
      slug: "dimash-karim",
      name: "Dimash Karim",
      role: "3D Artist",
      category: "3D / Animation",
      location: "Astana, Kazakhstan",
      experience: "4 years experience",
      projectsCount: 22,
      rating: 4.9,
      availability: "Open to freelance",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=90",
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1400&q=90",
      skills: ["Blender", "Characters", "Animation"],
      shortBio:
        "3D specialist creating characters, product visuals, and animation-ready models.",
      about:
        "Dimash works with 3D modeling, stylized characters, playful visual concepts, and animation-ready objects. He focuses on friendly shapes, expressive colors, and clean presentation.",
      languages: ["Kazakh", "Russian", "English"],
      featuredWorkSlugs: ["chubby-characters"],
    },
    {
      slug: "madina-omar",
      name: "Madina Omar",
      role: "Graphic Designer",
      category: "Graphic Design",
      location: "Online",
      experience: "5 years experience",
      projectsCount: 31,
      rating: 5.0,
      availability: "Available this week",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=90",
      coverImage:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1400&q=90",
      skills: ["Branding", "Typography", "Figma"],
      shortBio:
        "Graphic designer specializing in minimal branding, identity systems, and social media visuals.",
      about:
        "Madina designs brand identities, logo systems, typography rules, and social media templates. Her style is minimal, structured, and suitable for modern digital businesses.",
      languages: ["Kazakh", "Russian", "English"],
      featuredWorkSlugs: ["minimal-brand-identity"],
    },
    {
      slug: "ruslan-aitov",
      name: "Ruslan Aitov",
      role: "Video Producer",
      category: "Production",
      location: "Almaty, Kazakhstan",
      experience: "6 years experience",
      projectsCount: 27,
      rating: 4.7,
      availability: "Busy, but open",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=90",
      coverImage:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1400&q=90",
      skills: ["Video", "Editing", "Color"],
      shortBio:
        "Video producer working with music videos, commercials, interviews, and cinematic editing.",
      about:
        "Ruslan helps creators and brands produce video content from idea to final edit. He works with music videos, campaign clips, color grading, and short cinematic stories.",
      languages: ["Kazakh", "Russian"],
      featuredWorkSlugs: ["music-video-production"],
    },
    {
      slug: "aruzhan-saten",
      name: "Aruzhan Saten",
      role: "Content Designer",
      category: "Marketing",
      location: "Astana, Kazakhstan",
      experience: "2 years experience",
      projectsCount: 18,
      rating: 4.6,
      availability: "Part-time available",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=90",
      coverImage:
        "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1400&q=90",
      skills: ["SMM", "Canva", "Content"],
      shortBio:
        "Content designer creating social media visuals, campaign posts, stories, and digital layouts.",
      about:
        "Aruzhan creates visual content for social media, including posts, stories, campaign banners, and simple brand communication layouts for online platforms.",
      languages: ["Kazakh", "Russian", "English"],
      featuredWorkSlugs: ["social-media-visuals"],
    },
    {
      slug: "nika-lee",
      name: "Nika Lee",
      role: "Product Photographer",
      category: "Photography",
      location: "Almaty, Kazakhstan",
      experience: "4 years experience",
      projectsCount: 25,
      rating: 4.8,
      availability: "Available for shooting",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=90",
      coverImage:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=90",
      skills: ["Product", "Studio", "Retouch"],
      shortBio:
        "Commercial photographer focused on product photos, catalog visuals, and clean studio lighting.",
      about:
        "Nika works with product photography for online stores, catalogs, advertising, and brand presentations. Her focus is clean lighting, sharp detail, and polished retouching.",
      languages: ["Russian", "English"],
      featuredWorkSlugs: ["product-photo-set"],
    },
    {
      slug: "alex-fernandez",
      name: "Alex Fernández",
      role: "Film Director",
      category: "Production",
      location: "Shanghai, China",
      experience: "5 years experience",
      projectsCount: 1,
      rating: 4.9,
      availability: "Available for projects",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=90",
      coverImage:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=90",
      skills: ["Film Direction", "Editing", "Color Grading"],
      shortBio:
        "Film director focused on cinematic visual stories, emotional scenes, and creative production.",
      about:
        "Alex works with short films, visual storytelling, editing, and cinematic direction. His projects focus on emotion, atmosphere, and strong visual rhythm.",
      languages: ["Spanish", "English"],
      featuredWorkSlugs: ["tales-from-the-river"],
    },
    {
      slug: "dana-murat",
      name: "Dana Murat",
      role: "Art Director",
      category: "Production",
      location: "Almaty, Kazakhstan",
      experience: "4 years experience",
      projectsCount: 1,
      rating: 4.8,
      availability: "Available for production",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=90",
      coverImage:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=90",
      skills: ["Art Direction", "Styling", "Production"],
      shortBio:
        "Art director creating fashion, editorial, and visual production concepts.",
      about:
        "Dana works with fashion lookbooks, production planning, styling, and editorial visual concepts for creative brands.",
      languages: ["Kazakh", "Russian", "English"],
      featuredWorkSlugs: ["fashion-lookbook"],
    },
    {
      slug: "arman-nurlan",
      name: "Arman Nurlan",
      role: "Marketing Designer",
      category: "Marketing",
      location: "Astana, Kazakhstan",
      experience: "3 years experience",
      projectsCount: 1,
      rating: 4.7,
      availability: "Open to campaigns",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=90",
      coverImage:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=90",
      skills: ["Campaign Design", "Branding", "Social Media"],
      shortBio:
        "Marketing designer focused on campaign visuals, digital banners, and brand communication.",
      about:
        "Arman creates digital campaign materials, social media visuals, and promotional design systems for modern brands.",
      languages: ["Kazakh", "Russian"],
      featuredWorkSlugs: ["urban-media-campaign"],
    },
  ];
  
  export function getPublicPersonBySlug(slug: string) {
    return publicPeople.find((person) => person.slug === slug);
  }