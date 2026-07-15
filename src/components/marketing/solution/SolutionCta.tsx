import { Container } from '@/components/ui/Container';
import { StoreBadges } from '../StoreBadges';

export function SolutionCta({ title, body }: { title: string; body: string }) {
  return (
    <section className="bg-white pb-20 pt-6 md:pb-24">
      <Container>
        <div className="rounded-dali-xl bg-foret-800 px-8 py-14 text-center text-ivoire md:py-20">
          <h2 className="mx-auto max-w-2xl text-3xl md:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-ivoire/80">{body}</p>
          <div className="mt-8 flex justify-center">
            <StoreBadges className="justify-center" />
          </div>
        </div>
      </Container>
    </section>
  );
}
