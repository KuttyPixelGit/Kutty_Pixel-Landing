import React, { useState } from 'react';
import InstagramIcon from './icons/InstagramIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import FacebookIcon from './icons/FacebookIcon';
import MailIcon from './icons/MailIcon';
import PhoneIcon from './icons/PhoneIcon';
import LocationIcon from './icons/LocationIcon';
import SendIcon from './icons/SendIcon';

// --- Contact Form Component ---
const ContactForm = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setStatus('submitting');
    try {
      const response = await fetch("https://formsubmit.co/ajax/contact@kuttypixel.ca", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          _subject: `New Contact Form - ${formData.name}`,
          _autoresponse: "Thank you for contacting Kutty Pixel Inc.! We've received your message and will get back to you as soon as possible."
        })
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.success) {
        setStatus('submitted');
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
    }
  };

  const inputClasses = `w-full px-6 py-4 rounded-2xl border-2 backdrop-blur-md transition-all duration-300 focus:outline-none focus:scale-105 ${isDarkMode ? "bg-black/20 border-[#D4AF37]/30 text-white placeholder-gray-400 focus:border-[#D4AF37] focus:bg-black/40" : "bg-white/60 border-[#B8860B]/40 text-black placeholder-gray-500 focus:border-[#B8860B] focus:bg-white/80"}`;
  const boxShadowStyle = { boxShadow: isDarkMode ? "0 0 20px rgba(212, 175, 55, 0.1)" : "0 0 20px rgba(184, 134, 11, 0.2)" };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6" style={{ color: "#D4AF37", textShadow: isDarkMode ? "0 0 14px rgba(212,175,55,0.25)" : "0 0 8px rgba(184,134,11,0.15)", letterSpacing: "0.06em" }}>GET IN TOUCH</h2>
          <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-800"}`} style={{ textShadow: isDarkMode ? "0 1px 2px rgba(0,0,0,0.5)" : "none" }}>Ready to create something amazing together?</p>
        </div>
        {status === 'submitted' ? (
          <div className={`text-center p-8 rounded-3xl backdrop-blur-md border-2 ${isDarkMode ? "bg-green-900/20 border-green-400/30 text-green-300" : "bg-green-50/80 border-green-500/40 text-green-700"}`} style={{ animation: "successPulse 2s ease-in-out infinite" }}>
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
            <p className="text-lg">Thank you for reaching out. We'll get back to you soon!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <input type="hidden" name="_captcha" value="false" />
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className={inputClasses} style={boxShadowStyle} />
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className={inputClasses} style={boxShadowStyle} />
            </div>
            <textarea name="message" placeholder="Your Message (Optional)" value={formData.message} onChange={handleChange} rows={5} className={`${inputClasses} resize-none`} style={boxShadowStyle} />
            <div className="text-center">
              <button type="submit" disabled={status === 'submitting'} className={`px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto ${isDarkMode ? "bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black hover:from-[#FFD700] hover:to-[#FFA500]" : "bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white hover:from-[#DAA520] hover:to-[#FF8C00]"}`} style={{ boxShadow: `0 15px 40px ${isDarkMode ? "rgba(212, 175, 55, 0.4)" : "rgba(184, 134, 11, 0.5)"}`, animation: status === 'submitting' ? "spin 1s linear infinite" : "pulseGlow 2s infinite" }}>
                {status === 'submitting' ? "Sending..." : <><SendIcon /> Send Message</>}
              </button>
            </div>
            {status === 'error' && <p className="mt-4 text-red-500">Submission failed. Please try again.</p>}
          </form>
        )}
      </div>
    </section>
  );
};

// --- Contact Info Components ---
// Fix: Define props for ContactCard to correctly type the icon component.
interface ContactCardProps {
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  isDarkMode: boolean;
  children?: React.ReactNode;
}
const ContactCard: React.FC<ContactCardProps> = ({ href, icon: Icon, title, content, isDarkMode, children }) => {
  const baseClasses = `group flex flex-col items-center p-8 rounded-3xl backdrop-blur-md border-2 transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative z-0`;
  const darkModeClasses = "bg-black/30 border-[#D4AF37]/20 hover:border-[#D4AF37]/60 text-white";
  const lightModeClasses = "bg-white/70 border-[#B8860B]/30 hover:border-[#B8860B]/70 text-black";
  const iconDarkMode = "text-[#D4AF37] group-hover:text-[#FFD700]";
  const iconLightMode = "text-[#B8860B] group-hover:text-[#DAA520]";
  
  const cardContent = (
    <>
      {Icon && <Icon className={`w-12 h-12 mb-4 transition-all duration-300 ${isDarkMode ? iconDarkMode : iconLightMode}`} />}
      {children}
      <span className={`text-lg font-bold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>{title}</span>
      <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{content}</span>
    </>
  );

  const glowEffect = isDarkMode 
    ? "after:content-[''] after:absolute after:inset-0 after:rounded-3xl after:animate-[logoGlowPulse_4s_ease-in-out_infinite_alternate] after:hover:animate-[logoGlowPulse_3s_ease-in-out_infinite_alternate] after:pointer-events-none after:-z-10"
    : "after:content-[''] after:absolute after:inset-0 after:rounded-3xl after:animate-[logoGlowPulseLight_4s_ease-in-out_infinite_alternate] after:hover:animate-[logoGlowPulseLight_3s_ease-in-out_infinite_alternate] after:pointer-events-none after:-z-10";

  const cardClasses = `relative ${baseClasses} ${isDarkMode ? darkModeClasses : lightModeClasses} ${glowEffect} transition-all duration-500`;
  
  if (href) {
    return <a href={href} className={cardClasses}>{cardContent}</a>;
  }
  return <div className={cardClasses}>{cardContent}</div>;
};

// Fix: Update icon prop type to accept a className.
const SocialLink = ({ href, icon: Icon, isDarkMode }: { href:string, icon: React.ComponentType<{ className?: string }>, isDarkMode: boolean}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${isDarkMode ? "hover:bg-[#D4AF37]/20" : "hover:bg-[#B8860B]/20"}`}>
    <Icon className={`w-6 h-6 ${isDarkMode ? "text-[#D4AF37] hover:text-[#FFD700]" : "text-[#B8860B] hover:text-[#DAA520]"}`} />
  </a>
);

const ContactInfo = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <section className="py-20 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ContactCard href="mailto:contact@kuttypixel.ca" icon={MailIcon} title="Email" content="contact@kuttypixel.ca" isDarkMode={isDarkMode} />
        <ContactCard href="tel:+13825779990" icon={PhoneIcon} title="Phone" content="+1 382 577 9990" isDarkMode={isDarkMode} />
        <ContactCard 
          href="https://maps.app.goo.gl/hSqFSchuYbGzGqzu8" 
          icon={LocationIcon} 
          title="Location" 
          content="Toronto, ON, Canada" 
          isDarkMode={isDarkMode} 
        />
        <ContactCard title="Social" content="Follow Us" isDarkMode={isDarkMode}>
          <div className="flex gap-4 mb-4">
            <SocialLink href="https://instagram.com/kutty.pixel" icon={InstagramIcon} isDarkMode={isDarkMode} />
            <SocialLink href="https://www.linkedin.com/company/kuttypixelinc/" icon={LinkedinIcon} isDarkMode={isDarkMode} />
            <SocialLink href="http://facebook.com/kuttypixel" icon={FacebookIcon} isDarkMode={isDarkMode} />
          </div>
        </ContactCard>
      </div>
    </div>
  </section>
);

// --- Copyright Footer ---
const CopyrightFooter = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <footer className="py-12 text-center">
    <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} style={{ textShadow: isDarkMode ? "0 1px 2px rgba(0,0,0,0.5)" : "0 1px 2px rgba(255,255,255,0.8)" }}>
      © 2025 Kutty Pixel Inc. All rights reserved.
    </p>
  </footer>
);

// --- Main Footer Wrapper ---
const Footer: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <>
      <ContactForm isDarkMode={isDarkMode} />
      <ContactInfo isDarkMode={isDarkMode} />
      <CopyrightFooter isDarkMode={isDarkMode} />
    </>
  );
};

export default Footer;