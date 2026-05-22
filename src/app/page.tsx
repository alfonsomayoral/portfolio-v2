import { AboutSection } from '@/components/sections/about-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { EducationSection } from '@/components/sections/education-section';
import { ContactSection } from '@/components/sections/contact-section';

export default function Home() {
  return (
    <main className="relative">
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
}
