import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const dfwAreas1 = [
  'Dallas', 'Arlington', 'Plano', 'Grapevine', 'Roanoke', 'Southlake', 'Haslet', 'Prosper', 'Flower Mound'
]
const dfwAreas2 = [
  'Fort Worth', 'Irving', 'Richardson', 'Denton', 'Coppell', 'Keller', 'Argyle', 'Justin', 'Trophy Club'
]
const popularServices = [
  'Cloud Management', 'Cybersecurity', 'Backup & Disaster Recovery'
]
const aboutLinks = [
  'Our Company', 'Testimonials', 'FAQ', 'Blog', 'Privacy Policy', 'Terms & Conditions'
]

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0A0F] text-white py-16 px-6 relative z-10 border-t border-[var(--border-secondary)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 text-sm pt-8">
        
        {/* Brand Column (Left) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 drop-shadow-md">
                <svg viewBox="0 0 56 48" className="w-full h-full">
                  <path d="M37.8223 0.549805C37.732 1.45903 37.6856 2.3816 37.6855 3.31445L37.6904 3.85059C37.9043 15.0773 44.8151 24.666 54.5957 28.7871L55.1182 29.0068L44.3477 47.6611L43.8955 47.3184C39.4033 43.9073 33.8367 41.8389 27.791 41.7129L27.2041 41.707C21.2019 41.7071 15.648 43.6208 11.1172 46.8711L10.6689 47.1924L0.276367 29.1904L0 28.7129L0.501953 28.4854C9.92022 24.2093 16.5138 14.8042 16.7178 3.83789L16.7227 3.31445C16.7226 2.38127 16.6772 1.45867 16.5869 0.549805L16.5322 0H37.877L37.8223 0.549805ZM33.0967 23.9375C31.915 26.455 30.525 28.8549 28.9463 31.1143C32.85 36.213 37.8039 40.4631 43.4814 43.5508L51.127 30.3057C45.7502 27.0029 39.6406 24.7785 33.0967 23.9375ZM21.3086 23.9375C15.0278 24.7452 9.14764 26.8292 3.93066 29.916L11.5918 43.1826C16.9903 40.1287 21.7087 36.0122 25.459 31.1143C23.8804 28.8549 22.4902 26.455 21.3086 23.9375ZM27.2041 33.4551C25.5128 35.5907 23.6458 37.5805 21.625 39.4033C23.4341 39.0684 25.2989 38.8926 27.2041 38.8926L27.6895 38.8965C29.4253 38.9236 31.126 39.0971 32.7803 39.4033C30.7602 37.5806 28.8948 35.5903 27.2041 33.4551ZM26.2861 23.5684C25.6185 23.5817 24.9543 23.6098 24.2939 23.6514C25.1585 25.3906 26.132 27.0663 27.2031 28.6719C28.2736 27.0667 29.2461 25.3913 30.1104 23.6523C29.1492 23.5918 28.1801 23.5596 27.2041 23.5596L26.2861 23.5684ZM17.793 13.4873C16.5326 17.0417 14.6301 20.2903 12.2266 23.0977C14.7799 22.2713 17.4259 21.6516 20.1445 21.2559C19.153 18.7612 18.3629 16.165 17.793 13.4873ZM36.6113 13.4893C36.0414 16.1662 35.2521 18.7617 34.2607 21.2559C36.9795 21.6514 39.6254 22.2713 42.1787 23.0977C39.7757 20.2907 37.8716 17.0429 36.6113 13.4893ZM19.5371 3.31445L19.541 3.91016C19.618 9.93443 20.8635 15.676 23.0527 20.9238C24.421 20.8078 25.8056 20.7451 27.2041 20.7451L28.3438 20.7588C29.3551 20.7825 30.3586 20.8395 31.3535 20.9238C33.615 15.5031 34.8701 9.55609 34.8701 3.31445L34.8643 2.80469H19.5439C19.5416 2.97486 19.5371 3.14473 19.5371 3.31445Z" fill="var(--accent)" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white hover:text-[var(--accent)] transition-colors cursor-pointer">
                Aligned|TP
              </span>
          </div>
          <p className="text-[#a1a1a1] mt-2 max-w-xs leading-relaxed hidden lg:block">
            Structured infrastructure and strategic guidance. We align technology with your mission.
          </p>
        </div>

        {/* DFW Areas We Serve */}
        <div className="lg:col-span-1">
          <h4 className="font-semibold text-white mb-6">DFW Areas We Serve</h4>
          <div className="flex gap-8">
            <ul className="flex flex-col gap-3">
              {dfwAreas1.map(area => (
                <li key={area}>
                  <a href="#" className="flex items-center text-[#999999] hover:text-[var(--accent)] transition-colors text-[13px]">
                    <span className="w-1 h-1 rounded-full bg-[#333] mr-2"></span>
                    {area}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-3">
              {dfwAreas2.map(area => (
                <li key={area}>
                  <a href="#" className="flex items-center text-[#999999] hover:text-[var(--accent)] transition-colors text-[13px]">
                    <span className="w-1 h-1 rounded-full bg-[#333] mr-2"></span>
                    {area}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Popular Services */}
        <div className="lg:col-span-1">
          <h4 className="font-semibold text-white mb-6">Popular Services</h4>
          <ul className="flex flex-col gap-3">
            {popularServices.map(service => (
               <li key={service}>
                 <a href="#" className="flex items-center text-[#999999] hover:text-[var(--accent)] transition-colors text-[13px]">
                   <span className="w-1 h-1 rounded-full bg-[#333] mr-2"></span>
                   {service}
                 </a>
               </li>
            ))}
          </ul>
        </div>

        {/* About Aligned|TP */}
        <div className="lg:col-span-1 flex flex-col justify-between">
          <div>
            <h4 className="font-semibold text-white mb-6">About Aligned|TP</h4>
            <ul className="flex flex-col gap-3">
              {aboutLinks.map(link => (
                 <li key={link}>
                   <a href="#" className="flex items-center text-[#999999] hover:text-[var(--accent)] transition-colors text-[13px]">
                     <span className="w-1 h-1 rounded-full bg-[#333] mr-2"></span>
                     {link}
                   </a>
                 </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-4 mt-8 lg:mt-0 pb-2">
            <a href="#" className="w-8 h-8 rounded bg-[var(--accent)] text-white flex items-center justify-center hover:bg-orange-600 transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z" /></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded bg-[var(--accent)] text-white flex items-center justify-center hover:bg-orange-600 transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79v-.55a5.97 5.97 0 0 0 1.43-1.5c-.65.29-1.35.48-2.09.57.75-.45 1.33-1.16 1.6-2z" /></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded bg-[var(--accent)] text-white flex items-center justify-center hover:bg-orange-600 transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
            </a>
          </div>
        </div>

        {/* Contact Us */}
        <div className="lg:col-span-1">
          <h4 className="font-semibold text-white mb-6">Contact Us</h4>
          <ul className="flex flex-col gap-6">
            <li className="flex items-start gap-4">
               <MapPin className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
               <div className="text-[13px] text-[#999999] leading-relaxed">
                 <p className="text-white mb-1">1415 Cannon Pkwy, Suite 120</p>
                 <p>Roanoke, Texas 76262</p>
               </div>
            </li>
            <li className="flex items-center gap-4">
               <Phone className="w-5 h-5 text-[var(--accent)] shrink-0" />
               <a href="tel:8173066106" className="text-[13px] text-[#999999] hover:text-[var(--accent)] transition-colors">
                 817-306-6106
               </a>
            </li>
            <li className="flex items-center gap-4">
               <Mail className="w-5 h-5 text-[var(--accent)] shrink-0" />
               <a href="mailto:support@alignedtp.com" className="text-[13px] text-[#999999] hover:text-[var(--accent)] transition-colors break-all">
                 support@alignedtp.com
               </a>
            </li>
            <li className="flex items-start gap-4 mt-2">
               <Clock className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
               <div className="text-[13px] text-[#999999] leading-relaxed">
                 <p className="text-white mb-1 font-semibold">OFFICE HOURS</p>
                 <p>Monday – Friday: 7:30 AM – 7:00 PM</p>
                 <p>Weekends: 7:30 AM – 5:00 PM</p>
               </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#222] flex flex-col md:flex-row items-center justify-between text-xs text-[#666]">
        <p>Copyright © {new Date().getFullYear()} Aligned|TP. All Rights Reserved.</p>
        <p className="mt-2 md:mt-0 font-mono tracking-widest uppercase opacity-50">System V2</p>
      </div>
    </footer>
  )
}
