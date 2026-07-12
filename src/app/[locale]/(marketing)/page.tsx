import { Hero } from '@/components/marketing/Hero';
import { AppShowcase } from '@/components/marketing/AppShowcase';
import { TrustBadges } from '@/components/marketing/TrustBadges';
import { FeatureBlock } from '@/components/marketing/FeatureBlock';
import { AiBlock } from '@/components/marketing/AiBlock';
import { PersonaCarousel } from '@/components/marketing/PersonaCarousel';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AppShowcase />
      <TrustBadges />
      <FeatureBlock featureKey="aggregation" side="left" />
      <FeatureBlock featureKey="sms" side="right" />
      <AiBlock />
      <FeatureBlock featureKey="score" side="left" />
      <FeatureBlock featureKey="budgets" side="right" />
      <PersonaCarousel />
    </main>
  );
}
