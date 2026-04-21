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
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 text-sm pt-8">
        
        {/* Brand Column (Left) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 drop-shadow-md">
                <svg viewBox="0 0 1121 974" className="w-full h-full">
                  <path d="M1088.98 745.654L1121 691.207C977.139 471.994 832.804 233.21 732.232 0H680.76C578.646 226.567 453.642 445.423 309.9 648.147C284.164 648.859 258.428 649.926 232.692 651.35C376.197 452.659 500.014 223.008 608.77 0H545.557C434.548 225.974 306.342 455.032 160.583 655.858C134.136 657.518 107.451 660.009 81.1219 662.263C227.355 460.132 354.256 227.041 464.79 0H401.696C286.654 234.633 151.57 471.52 0 680.056L26.2104 724.539C274.201 698.561 525.869 695.833 773.86 721.218C787.736 743.756 801.968 766.057 816.437 788.239C586.236 760.6 311.679 772.225 62.3832 785.985L94.8794 841.025C348.682 827.621 621.697 818.369 857.473 849.803L899.694 911.842C665.342 882.068 388.531 889.897 131.527 903.302L164.023 958.461C429.092 945.768 709.935 941.735 954.724 974L980.816 929.636C837.311 726.674 706.258 509.597 604.145 283.268C615.767 261.679 627.271 239.971 638.42 218.145C715.628 403.906 885.936 664.398 1016.75 868.427L1049.13 813.387C914.044 603.19 749.191 348.628 671.628 151.717C682.064 130.483 696.178 100.354 706.496 78.7646C804.103 302.603 950.099 534.626 1088.98 745.654ZM737.213 660.721C618.614 650.045 499.184 645.419 379.873 646.724C447.238 548.98 512.112 448.389 570.225 344.714C620.63 452.422 676.371 558.232 737.213 660.721Z" fill="var(--accent)" />
                </svg>
              </div>
              <span className="flex items-center gap-1.5 leading-none">
                <span className="text-lg font-semibold tracking-tight text-white">Aligned</span>
                <span className="text-lg font-light" style={{ color: 'var(--accent)' }}>|</span>
                <span className="flex flex-col text-[0.6rem] font-light leading-[1.15] tracking-wide text-white">
                  <span>Technology</span>
                  <span>Partners</span>
                </span>
              </span>
          </div>
          <p className="text-[#a1a1a1] mt-2 max-w-xs leading-relaxed hidden lg:block">
            Structured infrastructure and strategic guidance. We align technology with your mission.
          </p>
        </div>

        {/* DFW Areas We Serve */}
        <div className="lg:col-span-1">
          <h4 className="font-semibold text-white mb-6">DFW Areas We Serve</h4>
          <div className="grid grid-cols-2 gap-4">
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

        {/* About Aligned Technology Partners */}
        <div className="lg:col-span-1 flex flex-col justify-between">
          <div>
            <h4 className="font-semibold text-white mb-6">About Aligned Technology Partners</h4>
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
        <p>Copyright © {new Date().getFullYear()} Aligned Technology Partners. All Rights Reserved.</p>
        <p className="mt-2 md:mt-0 font-mono tracking-widest uppercase opacity-50">System V2</p>
      </div>
    </footer>
  )
}
