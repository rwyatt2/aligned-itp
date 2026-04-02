import HeroSection from '../components/landing/HeroSection'
import FrameworkSection from '../components/landing/FrameworkSection'
import ParallaxImageSection from '../components/landing/ParallaxImageSection'
import CaseSnippetsSection from '../components/landing/CaseSnippetsSection'
import LeadCaptureSection from '../components/landing/LeadCaptureSection'

export default function ClientLanding() {
  return (
    <div className="w-full flex flex-col items-center">
      <HeroSection />
      <FrameworkSection />
      <ParallaxImageSection />
      <CaseSnippetsSection />
      <LeadCaptureSection />
    </div>
  )
}
