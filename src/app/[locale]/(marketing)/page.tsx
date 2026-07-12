import { Hero } from '@/components/marketing/Hero';
import { AppShowcase } from '@/components/marketing/AppShowcase';
import { TrustBadges } from '@/components/marketing/TrustBadges';
import { FeatureBlock } from '@/components/marketing/FeatureBlock';
import { AiBlock } from '@/components/marketing/AiBlock';
import { PersonaCarousel } from '@/components/marketing/PersonaCarousel';
import { B2BTeaser } from '@/components/marketing/B2BTeaser';
import { SecurityCallout } from '@/components/marketing/SecurityCallout';
import { FreeBanner } from '@/components/marketing/FreeBanner';
import { FaqTeaser } from '@/components/marketing/FaqTeaser';
import { FinalCta } from '@/components/marketing/FinalCta';

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
      <B2BTeaser />
      <SecurityCallout />
      <FreeBanner />
      <FaqTeaser />
      <FinalCta />
    </main>
  );
}
