import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WorkClient from './WorkClient';
import { getPortfolio } from '@/lib/supabase/queries';

export const metadata = {
  title: 'Our Work | The Story Circuit',
  description: 'A curated collection of brand films, social reels, and visual identities crafted for brands that mean business.',
};

export default async function WorkPage() {
  const portfolio = await getPortfolio();

  return (
    <>
      <Navbar />
      <WorkClient portfolio={portfolio} />
      <Footer />
    </>
  );
}
