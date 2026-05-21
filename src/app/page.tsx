import { SceneDock } from '@/components/scene-dock';
import { HeroScene } from '@/components/scenes/hero';
import { AboutScene } from '@/components/scenes/about';
import { SkillsScene } from '@/components/scenes/skills';
import { ExperienceScene } from '@/components/scenes/experience';
import { ProjectsScene } from '@/components/scenes/projects';
import { EducationScene } from '@/components/scenes/education';
import { ContactScene } from '@/components/scenes/contact';

export default function Home() {
  return (
    <>
      <SceneDock />
      <main className="relative">
        <HeroScene />
        <AboutScene />
        <SkillsScene />
        <ExperienceScene />
        <ProjectsScene />
        <EducationScene />
        <ContactScene />
      </main>
    </>
  );
}
