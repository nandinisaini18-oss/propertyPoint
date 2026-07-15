import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-10">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl" style={{ fontFamily: "'Instrument Serif', serif" }}>360Views</h3>
            <p className="text-sm text-white/60 mt-3">India's Premier Property Platform</p>
            <div className="flex gap-3 mt-6">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map(social => (
                <button key={social} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#B8C4A3] transition-colors group">
                  <span className="text-xs text-white/70 group-hover:text-[#1A1A1A]">{social[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[13px] uppercase tracking-[0.06em] text-white/50 font-medium">Quick Links</h4>
            <div className="mt-4 flex flex-col gap-3">
              {[
                { label: 'Buy Property', path: '/properties' },
                { label: 'Sell Property', path: '/sell-properties' },
                { label: 'Locations', path: '/locations' },
                { label: 'Contact Us', path: '/contact' },
              ].map(link => (
                <Link key={link.path} to={link.path} className="text-[15px] text-white/70 hover:text-white transition-colors">{link.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[13px] uppercase tracking-[0.06em] text-white/50 font-medium">Property Types</h4>
            <div className="mt-4 flex flex-col gap-3">
              {["Apartment",
    "Flat",
    "Villa",
    "Plots",
    "Office",
    "Shop",
    "Warehouse"].map(type => (
                <Link key={type} to={`/buy?type=${type}`} className="text-[15px] text-white/70 hover:text-white transition-colors">{type}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[13px] uppercase tracking-[0.06em] text-white/50 font-medium">Contact Us</h4>
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[15px] text-white/70">
                <Mail size={16} className="text-[#B8C4A3] shrink-0" />
                info@360views.in
              </div>
              <div className="flex items-center gap-3 text-[15px] text-white/70">
                <Phone size={16} className="text-[#B8C4A3] shrink-0" />
                +91 98765 43210
              </div>
              <div className="flex items-start gap-3 text-[15px] text-white/70">
                <MapPin size={16} className="text-[#B8C4A3] shrink-0 mt-0.5" />
                Bhopal, Madhya Pradesh, India
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-white/50">&copy; 2025 360Views. All rights reserved.</p>
          <div className="flex gap-4 text-[13px] text-white/50">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>&middot;</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
