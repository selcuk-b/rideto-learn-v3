export interface Lesson {
  id: string;
  title: string;
}

export interface Module {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string; // lucide icon name
  lessons: Lesson[];
}

export const modules: Module[] = [
  {
    id: "highway-code-essentials",
    number: 1,
    title: "Highway Code Essentials",
    description: "Master the road signs, junctions, and rules you'll need",
    icon: "MapPin",
    lessons: [
      { id: "road-signs", title: "Road Signs & Markings" },
      { id: "junctions", title: "Junctions & Roundabouts" },
      { id: "right-of-way", title: "Right of Way Rules" },
      { id: "speed-limits", title: "Speed Limits & Zones" },
    ],
  },
  {
    id: "cbt-day",
    number: 2,
    title: "What to Expect on CBT Day",
    description: "Walk through each stage of your CBT training",
    icon: "ClipboardList",
    lessons: [
      { id: "element-a", title: "Element A: Introduction & Eyesight Check" },
      { id: "element-b", title: "Element B: Practical On-Site Training" },
      { id: "element-c", title: "Element C: On-Site Riding" },
      { id: "element-d", title: "Elements D & E: On-Road Riding" },
    ],
  },
  {
    id: "gear-and-documentation",
    number: 3,
    title: "Gear & Documentation",
    description: "Know exactly what to bring and wear",
    icon: "CheckSquare",
    lessons: [
      { id: "required-gear", title: "Required Safety Gear" },
      { id: "documents", title: "Documents You Must Bring" },
      { id: "what-to-wear", title: "What to Wear on the Day" },
    ],
  },
  {
    id: "confidence-builder",
    number: 4,
    title: "Confidence Builder",
    description: "Tips and advice from experienced riders",
    icon: "Star",
    lessons: [
      { id: "mindset", title: "Getting in the Right Mindset" },
      { id: "common-nerves", title: "Common Nerves & How to Handle Them" },
      { id: "tips-from-riders", title: "Tips from Experienced Riders" },
    ],
  },
];

export const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
