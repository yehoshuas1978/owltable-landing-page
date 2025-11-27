import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import UserInfoDemo from '@/components/UserInfoDemo';
import PaymentDemo from '@/components/PaymentDemo';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />
      <Hero />
      <UserInfoDemo />
      <PaymentDemo />

      <footer className="py-8 bg-black border-t border-zinc-900 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} OwlTable. All rights reserved.</p>
      </footer>
    </main>
  );
}
