import HeroSection from '../components/landing/HeroSection'
import FrameworkSection from '../components/landing/FrameworkSection'
import ParallaxImageSection from '../components/landing/ParallaxImageSection'
import CaseSnippetsSection from '../components/landing/CaseSnippetsSection'
import CertifiedPartnersSection from '../components/landing/CertifiedPartnersSection'
import LeadCaptureSection from '../components/landing/LeadCaptureSection'

export default function ClientLanding() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans antialiased selection:bg-[var(--accent)] selection:text-white pb-32">
      <HeroSection />
      
      {/* 02 // THE REALITY - Process/Framework Section */}
      <FrameworkSection />
      <ParallaxImageSection />
      <CaseSnippetsSection />
      <CertifiedPartnersSection />
      <LeadCaptureSection />
    </div>
  )
}
