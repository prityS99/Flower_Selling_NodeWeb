import React from 'react';
import Link from 'next/link';
import { Flower2, Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Flower2 className="text-emerald-600 w-8 h-8" />
              <span className="font-bold text-2xl text-gray-800">Florist.</span>
            </div>
            <p className="text-gray-500 leading-relaxed">
              Bringing nature's finest colors directly to your doorstep. Hand-picked, sustainably grown, and delivered with love.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook size={20}/>} />
              <SocialIcon icon={<Instagram size={20}/>} />
              <SocialIcon icon={<Twitter size={20}/>} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-600">
              <li><Link href="/shop" className="hover:text-emerald-600 transition-colors">Our Flowers</Link></li>
              <li><Link href="/offers" className="hover:text-emerald-600 transition-colors">Special Offers</Link></li>
              <li><Link href="/delivery" className="hover:text-emerald-600 transition-colors">Delivery Info</Link></li>
              <li><Link href="/track" className="hover:text-emerald-600 transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Categories</h4>
            <ul className="space-y-4 text-gray-600">
              <li><Link href="/cat/wedding" className="hover:text-emerald-600 transition-colors">Wedding Bouquets</Link></li>
              <li><Link href="/cat/birthday" className="hover:text-emerald-600 transition-colors">Birthday Surprises</Link></li>
              <li><Link href="/cat/indoor" className="hover:text-emerald-600 transition-colors">Indoor Plants</Link></li>
              <li><Link href="/cat/seasonal" className="hover:text-emerald-600 transition-colors">Seasonal Bloom</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Join Our Petals Newsletter</h4>
            <p className="text-gray-500 mb-4 text-sm">Get 10% off your first order and weekly floral tips.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
              <button className="absolute right-2 top-2 bg-emerald-600 text-white p-1.5 rounded-lg hover:bg-emerald-700 transition-colors">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-black-400 text-sm">
            © {new Date().getFullYear()} Florist Inc. Prity Sarkar All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-gray-600">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-600 hover:text-emerald-600 hover:border-emerald-100 hover:shadow-md transition-all active:scale-90">
    {icon}
  </button>
);

export default Footer;