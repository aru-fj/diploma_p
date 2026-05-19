import Image from "next/image";
import Link from "next/link";
import { Bell, ChevronDown, Search, ThumbsUp } from "lucide-react";
import { notFound } from "next/navigation";

const works = {
  "tales-from-the-river": {
    title: "Tales from the River",
    author: "Alex Fernàndez",
    authorAvatar: "/projects/image-1.5.png",
    description:
      "A young woman who dreams, a man who hesitates, an old man who remembers -- three echoes of a life shaped by time and the quiet pursuit of meaning.",
    images: [
      "/projects/image-1.1.png",
      "/projects/image-1.2.png",
      "/projects/image-1.3.png",
      "/projects/image-1.4.png",
      "/projects/image-1.5.png",
    ],
  },

  "festival-of-light": {
    title: "Festival of Light",
    author: "Dimesh Hasenov",
    authorAvatar: "/projects/image-2.1.png",
    description:
      "A colorful visual project about celebration, light, movement, and atmosphere.",
    images: [
      "/projects/image-2.1.png",
      "/projects/image-2.2.png",
      "/projects/image-2.3.png",
      "/projects/image-2.4.png",
      "/projects/image-2.5.png",
    ],
  },

  "chubby-characters": {
    title: "Chubby Characters",
    author: "Aruzhan Kanatkyzy",
    authorAvatar: "/projects/image-3.1.png",
    description:
      "A playful character design project with soft shapes, bright emotions, and expressive visual style.",
    images: [
      "/projects/image-3.1.png",
      "/projects/image-3.2.png",
      "/projects/image-3.3.png",
      "/projects/image-3.4.png",
      "/projects/image-3.5.png",
    ],
  },
} as const;

const comments = [
  {
    name: "Eduardo Sánchez",
    date: "december 9, 2025",
    text: "Gorgeous work !!!",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=85",
  },
  {
    name: "Gena Milyutin",
    date: "november 21, 2025",
    text: "looks so great! 👍",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=85",
  },
  {
    name: "Freddy Fabris",
    date: "november 7, 2025",
    text: "Cooooool",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=85",
  },
];

type WorkPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function WorkPage({ params }: WorkPageProps) {
  const { id } = await params;
  const work = works[id as keyof typeof works];

  if (!work) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-[1180px]">
        <header className="mx-auto flex h-[68px] items-center justify-between rounded-lg border border-slate-200 bg-white px-5 shadow-sm">
          <Link href="/home/jobseeker" className="text-2xl font-black">
            <span className="text-[#0B63E5]">Media</span>
            <span className="text-slate-950">Hire</span>
          </Link>

          <nav className="hidden items-center gap-10 text-sm font-semibold text-slate-950 lg:flex">
            <Link href="/home/jobseeker" className="text-[#0B63E5]">
              Home
            </Link>
            <Link href="/home/jobseeker/search-job">Search Job</Link>
            <Link href="/home/jobseeker/profile">My Profile</Link>
            <Link href="/home/jobseeker/community">Community</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Search size={21} strokeWidth={2} />
            <Bell size={20} strokeWidth={2} />

            <div className="h-8 w-px bg-slate-300" />

            <p className="hidden text-sm font-medium text-slate-600 md:block">
              Job Seeker
            </p>

            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-full">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=85"
                  alt="Dana Muhtarova"
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
              </div>

              <span className="hidden text-sm font-medium text-slate-800 md:inline">
                Dana Muhtarova
              </span>

              <ChevronDown size={17} className="text-[#0B63E5]" />
            </div>
          </div>
        </header>

        <div className="mx-auto mt-14 max-w-[900px]">
          <div className="mb-7 flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-xl">
              <Image
                src={work.authorAvatar}
                alt={work.author}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold leading-none text-[#252525]">
                {work.title}
              </h2>
              <p className="mt-1.5 text-base text-[#252525]">{work.author}</p>
            </div>
          </div>

          <section className="bg-[#eef5ff] px-8 pb-10 pt-9 text-center">
            <h1 className="text-[32px] font-semibold italic leading-tight text-[#0B63E5]">
              {work.title}
            </h1>

            <p className="mx-auto mt-6 max-w-[620px] text-[16px] font-semibold italic leading-[1.9] text-black">
              {work.description}
            </p>

            <div className="mt-8 space-y-5">
              {work.images.map((image, index) => (
                <div key={image} className="mx-auto max-w-[580px]">
                  <Image
                    src={image}
                    alt={`${work.title} ${index + 1}`}
                    width={1000}
                    height={650}
                    className="w-full object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            <div className="mt-9 text-center">
              <p className="text-base font-semibold text-black">
                {work.author}
              </p>

              <h2 className="mt-2 text-[30px] font-semibold italic leading-none text-black">
                {work.title}
              </h2>

              <p className="mt-3 text-sm text-[#252525]">
                Published: October 23, 2025
              </p>

              <button className="mx-auto mt-6 grid h-[46px] w-[46px] place-items-center rounded-full bg-[#2f9ee5] text-white shadow-sm">
                <ThumbsUp size={24} fill="white" strokeWidth={2.2} />
              </button>
            </div>
          </section>

          <section className="mt-10 overflow-hidden rounded-lg border border-[#9b9b9b] bg-white">
            <div className="flex gap-6 border-b border-[#9b9b9b] px-12 py-9">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=85"
                  alt="Current user"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <textarea
                  placeholder="What do you think about the project?"
                  className="h-[88px] w-full resize-none rounded-md border border-[#a5a5a5] px-5 py-4 text-sm outline-none placeholder:text-[#777] focus:border-[#0B63E5]"
                />

                <div className="-mt-1 flex justify-end">
                  <button className="rounded-full bg-[#0B63E5] px-6 py-2 text-sm font-semibold text-white">
                    Post comments
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-8 px-12 py-9">
              {comments.map((comment) => (
                <div key={comment.name} className="flex items-center gap-6">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={comment.avatar}
                      alt={comment.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-black">
                      <span className="font-bold">{comment.name}</span>
                      <span className="mx-2 text-[#b8b8b8]">•</span>
                      <span className="text-[#b8b8b8]">{comment.date}</span>
                    </p>
                    <p className="mt-1.5 text-sm text-[#252525]">
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}