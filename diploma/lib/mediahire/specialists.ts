export type SpecialistProject = {
    title: string;
    image: string;
    category: string;
  };
  
  export type SpecialistProfile = {
    id: string;
    name: string;
    status: string;
    location: string;
    email: string;
    role: string;
    experience: string;
    avatar: string;
    cover: string;
    skills: string[];
    software: string[];
    projects: SpecialistProject[];
  };
  
  export const specialists: SpecialistProfile[] = [
    {
      id: "alex",
      name: "Alex",
      status: "Available for photography projects",
      location: "Astana, Kazakhstan",
      email: "alex@mediahire.com",
      role: "Photographer",
      experience: "4 years experience",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=90",
      cover:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=90",
      skills: ["Photography", "Portrait Shooting", "Lighting", "Photo Editing"],
      software: ["Adobe Photoshop", "Lightroom", "Capture One"],
      projects: [
        {
          title: "Editorial Photography",
          category: "Photography",
          image:
            "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=90",
        },
        {
          title: "Portrait Photography",
          category: "Photography",
          image:
            "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=90",
        },
      ],
    },
    {
      id: "dimash",
      name: "Dimash",
      status: "Available for 3D animation projects",
      location: "Almaty, Kazakhstan",
      email: "dimash@mediahire.com",
      role: "3D Animator",
      experience: "3 years experience",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=90",
      cover:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1600&q=90",
      skills: ["3D Animation", "Motion Design", "Modeling", "Rendering"],
      software: ["Blender", "Cinema 4D", "After Effects"],
      projects: [
        {
          title: "3D Character Animation",
          category: "3D Animation",
          image:
            "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=900&q=90",
        },
        {
          title: "Motion Graphics Reel",
          category: "3D Animation",
          image:
            "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&w=900&q=90",
        },
      ],
    },
  ];