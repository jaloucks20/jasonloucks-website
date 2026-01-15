import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    const handleNavClick = (e, id) => {
        e?.preventDefault();
        const el = document.getElementById(id);
        if (!el) return;

        // Smoothly scroll the section into the vertical center of the viewport
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Make element focusable, focus it after the animation, then remove tabindex
        // (improves keyboard/screen-reader UX)
        const prevTab = el.getAttribute('tabindex');
        el.setAttribute('tabindex', '-1');
        setTimeout(() => {
            el.focus({ preventScroll: true });
            if (prevTab !== null) el.setAttribute('tabindex', prevTab);
            else el.removeAttribute('tabindex');
        }, 600); // adjust timeout if you change scroll timing

        // close mobile menu if open
        setMobileMenuIsOpen(false);

        // Optionally update URL hash without jumping:
        // history.pushState(null, '', `#${id}`);
    };
    return <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-slate-700/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
                <div className="flex-shrink-0">
                    <a href="#" onClick={(e) => handleNavClick(e, 'hero')} className="text-white font-bold text-xl font-vscode">Jason Loucks</a>
                </div>
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                        <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
                        <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>
                        <a href="#education" onClick={(e) => handleNavClick(e, 'education')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Education</a>
                        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                    </div>
                </div>
                <button className="md:hidden text-gray-300 hover:text-white focus:outline-none focus:text-white" onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}>
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        {mobileMenuIsOpen ? (  
                            <X className="w-5 h-5 sm:w-6 sm:h-6" />
                        ) : ( 
                            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                    </svg>
                </button>
            </div>
        </div>

        {mobileMenuIsOpen && (
            <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 animate-in slide-in-from-top duration-300">
                <div className="px-4 pt-4 sm:py-6 space-y-3 sm:space-y-4">
                    <a href="#about" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={(e) => handleNavClick(e, 'about')}>About</a>
                    <a href="#projects" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
                    <a href="#education" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={(e) => handleNavClick(e, 'education')}>Education</a>
                    <a href="#contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
                </div>
            </div>
        )}
    </nav>;
}