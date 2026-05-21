export interface EducationItem {
  id: string;
  institution: string;
  short: string;
  degree: string;
  period: string;
  location: string;
  honors: string[];
  coursework: string[];
}

export const EDUCATION: EducationItem[] = [
  {
    id: 'uc3m',
    institution: 'Universidad Carlos III de Madrid',
    short: 'UC3M',
    degree: 'BSc Telecommunications Technology Engineering',
    period: 'Sep 2021 — Jun 2026',
    location: 'Madrid, Spain',
    honors: [
      'GPA 8.7 / 10 — top 10 of cohort',
      'Thesis defense: 6 July 2026 — RGB-D nutritional pipeline with iPhone LiDAR + GPT-4o',
    ],
    coursework: [
      'Electronic Systems',
      'Microprocessor-based Digital Systems',
      'Integrated Circuits and Microelectronics',
      'Systems Programming',
      'Systems Architecture',
      'Communication Theory',
      'Digital Communications',
      'Modern Theory of Detection and Estimation',
    ],
  },
  {
    id: 'ucr',
    institution: 'University of California, Riverside',
    short: 'UC Riverside',
    degree: "Exchange Year — Computer Science, Electrical Engineering, Business",
    period: 'Sep 2024 — Jun 2025',
    location: 'Riverside, CA',
    honors: [
      'GPA 4.0 / 4.0',
      "Chancellor's Honor List",
    ],
    coursework: [
      'Natural Language Processing (grad)',
      'Cryptography (grad)',
      'Machine Learning & Data Mining',
      'Computer Vision',
      'Artificial Intelligence',
      'Mobile Wireless Networks',
      'Data Analysis Methods',
    ],
  },
];
