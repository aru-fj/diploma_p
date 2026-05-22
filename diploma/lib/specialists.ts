export type SpecialistProject = {
    title: string;
    image: string;
  };
  
  export type SpecialistProfile = {
    id: string;
    name: string;
    status: string;
    location: string;
    role: string;
    experience: string;
    email: string;
    avatar: string;
    cover: string;
    skills: string[];
    software: string[];
    projects: SpecialistProject[];
  };
  
  export const specialists: SpecialistProfile[] = [
    {
      id: "alex-fernandez",
      name: "Alex Fernández",
      status: "Available for Freelance",
      location: "Madrid, Spain",
      role: "Photographer / Cinematographer",
      experience: "3+ years of experience",
      email: "alexfernandezdp@gmail.com",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      cover:
        "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1600&q=90",
      skills: [
        "photography & videography",
        "color grading",
        "retouching",
        "video editing",
        "creative direction",
        "content creation",
      ],
      software: ["Adobe Photoshop", "Adobe Lightroom", "Adobe Premiere Pro"],
      projects: [
        {
          title: "Tales from the River",
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
        },
        {
          title: "Tales of Shanghai",
          image:
            "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=900&q=85",
        },
        {
          title: "Hong Kong",
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
        },
        {
          title: "Chongqing River",
          image:
            "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=85",
        },
        {
          title: "Observations",
          image:
            "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=85",
        },
        {
          title: "Crossing Morocco",
          image:
            "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=85",
        },
        {
          title: "A Passion for Sound",
          image:
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=85",
        },
        {
          title: "Leaving Chicago",
          image:
            "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=85",
        },
        {
          title: "A Winter Morning",
          image:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=85",
        },
        {
          title: "City of Edinburgh",
          image:
            "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=85",
        },
        {
          title: "Under Two Bridges",
          image:
            "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=900&q=85",
        },
        {
          title: '"Letter from Paris"',
          image:
            "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=85",
        },
      ],
    },
  ];