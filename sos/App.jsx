// src/App.jsx

import { Navbar }             from '@/sections/Navbar';
import { Hero }               from '@/sections/Hero';
import { EmergencyContacts }  from '@/sections/EmergencyContacts';
import { DocumentTemplates }  from '@/sections/DocumentTemplates';
import { AIAgent }            from '@/sections/AIAgent';
import { TrustBanner }        from '@/sections/TrustBanner';
import { Footer }             from '@/sections/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <EmergencyContacts />
        <DocumentTemplates />
        <AIAgent />
        <TrustBanner />
      </main>
      <Footer />
    </>
  );
}
