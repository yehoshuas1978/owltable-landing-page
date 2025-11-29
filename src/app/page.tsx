import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import UseCases from '@/components/UseCases';
import UserInfoDemo from '@/components/UserInfoDemo';
import PaymentDemo from '@/components/PaymentDemo';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import FeatureRequestForm from '@/components/FeatureRequestForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <AnnouncementBanner />
      <Navbar />
      <Hero />
      <Features />
      <UseCases />
      <UserInfoDemo />
      <PaymentDemo />
      <FeatureRequestForm />

      <footer className="py-8 bg-black border-t border-zinc-900 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} OwlTable. All rights reserved.</p>
      </footer>
    </main>
  );
}
