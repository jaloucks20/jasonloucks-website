import { useEffect, useState, useRef } from "react";
import { BriefcaseBusiness, User } from 'lucide-react';

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);
    const nameStr = "Jason Loucks";
    const titleStr = "Software Developer";
    const [typedName, setTypedName] = useState("");
    const [typedTitle, setTypedTitle] = useState("");
    const [showCaretName, setShowCaretName] = useState(true);
    const [showCaretTitle, setShowCaretTitle] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const nameTimerRef = useRef(null);
    const titleTimerRef = useRef(null);
    const buttonTimerRef = useRef(null);
    const typingStartedRef = useRef(false);
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        console.debug('[Hero] setting up IntersectionObserver', { el });
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    console.debug('[Hero] IntersectionObserver entry', { isIntersecting: entry.isIntersecting, ratio: entry.intersectionRatio });
                    if (entry.isIntersecting) {
                        console.debug('[Hero] entry isIntersecting -> setInView(true)');
                        setInView(true);
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        // Fallback: if already visible on load
        const rect = el.getBoundingClientRect();
        console.debug('[Hero] initial rect', rect, 'window.innerHeight', window.innerHeight);
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            console.debug('[Hero] initial visibility true -> setInView(true)');
            setInView(true);
            observer.unobserve(el);
        }
        return () => {
            console.debug('[Hero] disconnecting observer');
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        console.debug('[Hero] typing effect run: inView=', inView, 'typedName length=', typedName.length);
        if (!inView) return;
        if (typingStartedRef.current) { console.debug('[Hero] typing already started'); return; } // prevent starting twice
        typingStartedRef.current = true;
        console.debug('[Hero] starting typing; nameStr, titleStr', nameStr, titleStr);

        // reset typed values and caret
        setTypedName("");
        setTypedTitle("");
        setShowCaretName(true);
        setShowCaretTitle(false);
        setShowButton(false);
        if (nameTimerRef.current) {
            console.debug('[Hero] clearing existing nameTimer', nameTimerRef.current);
            clearTimeout(nameTimerRef.current);
            nameTimerRef.current = null;
        }
        if (buttonTimerRef.current) {
            console.debug('[Hero] clearing existing buttonTimer', buttonTimerRef.current);
            clearTimeout(buttonTimerRef.current);
            buttonTimerRef.current = null;
        }
        if (titleTimerRef.current) {
            console.debug('[Hero] clearing existing titleTimer', titleTimerRef.current);
            clearTimeout(titleTimerRef.current);
            titleTimerRef.current = null;
        }

        // Type the name using timeouts (safer than setInterval)
        let i = 0;
        const typeName = () => {
            console.debug('[Hero] typeName called i=', i);
            if (i < nameStr.length) {
                const char = nameStr.charAt(i);
                console.debug('[Hero] appending char', char, 'i=', i);
                setTypedName((prev) => prev + char);
                i++;
                nameTimerRef.current = setTimeout(typeName, 40);
                console.debug('[Hero] set name timeout id=', nameTimerRef.current, 'next i=', i);
            } else {
                console.debug('[Hero] name complete (current typed):', typedName);
                // After a slight pause, start typing the title
                let j = 0;
                const typeTitle = () => {
                    console.debug('[Hero] typeTitle called j=', j);
                    if (j < titleStr.length) {
                        const char = titleStr.charAt(j);
                        console.debug('[Hero] appending title char', char, 'j=', j);
                        setTypedTitle((prev) => prev + char);
                        j++;
                        titleTimerRef.current = setTimeout(typeTitle, 30);
                        console.debug('[Hero] set title timeout id=', titleTimerRef.current, 'next j=', j);
                    } else {
                        console.debug('[Hero] title complete (current typed):', typedTitle);
                        titleTimerRef.current = null;
                        // hide title caret after short delay, then show the business button
                        setTimeout(() => {
                            setShowCaretTitle(false);
                            console.debug('[Hero] title caret hidden');
                            // schedule button reveal 300ms after caret hides
                            buttonTimerRef.current = setTimeout(() => {
                                setShowButton(true);
                                console.debug('[Hero] showButton true');
                                buttonTimerRef.current = null;
                            }, 300);
                        }, 200);
                    }
                };
                // Hide name caret and show title caret, then start title typing after 300ms
                setShowCaretName(false);
                setShowCaretTitle(true);
                titleTimerRef.current = setTimeout(typeTitle, 100);
                console.debug('[Hero] scheduled title typing, timeout id=', titleTimerRef.current);
                nameTimerRef.current = null;
            }
        };
        nameTimerRef.current = setTimeout(typeName, 80);
        console.debug('[Hero] scheduled name typing, timeout id=', nameTimerRef.current);

        return () => {
            console.debug('[Hero] cleanup typing timers', nameTimerRef.current, titleTimerRef.current, buttonTimerRef.current);
            if (nameTimerRef.current) {
                clearTimeout(nameTimerRef.current);
                nameTimerRef.current = null;
            }
            if (titleTimerRef.current) {
                clearTimeout(titleTimerRef.current);
                titleTimerRef.current = null;
            }
            if (buttonTimerRef.current) {
                clearTimeout(buttonTimerRef.current);
                buttonTimerRef.current = null;
            }
        };
    }, [inView]);
    
    const handleButtonClick = (e, id) => {
        e?.preventDefault();
        const el = document.getElementById(id);
        if (!el) return;

        if (mobileMenuIsOpen) {
            // Smoothly scroll the section into the top of the viewport
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // Smoothly scroll the section into the center of the viewport
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
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

    return <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative z-10">
            <div className="relative inline-flex flex-col items-center justify-center">
                <span aria-hidden className="absolute flex items-center justify-center -translate-y-2">
                    <span className={`absolute rounded-full bg-sky-500/10 h-65 w-65 sm:h-70 sm:w-70 md:h-78 md:w-78 blur-3xl transition-all duration-700 ease-out ${inView ? 'opacity-30 scale-100' : 'opacity-0 scale-95'}`}></span>
                    <span className={`absolute rounded-full bg-sky-500/8 h-50 w-50 sm:h-58 sm:w-58 md:h-66 md:w-66 blur-2xl transition-all duration-700 ease-out ${inView ? 'opacity-25 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: inView ? '150ms' : '0ms' }}></span>
                </span>

                <div className="relative z-10 text-center space-y-5 sm:space-y-7">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-vscode sm:mb-6 md:mb-8"><span className={`typing ${showCaretName ? '' : 'no-caret'} font-consolas`} aria-live="polite">{typedName}</span></h1>
                    <p className="text-lg sm:text-2xl md:text-3xl text-gray-300 max-w-2xl mx-auto"><span className={`typing ${showCaretTitle ? '' : 'no-caret'} font-consolas`} aria-live="polite">{typedTitle}</span></p>
                    <div className={`transform transition-all duration-500 ease-out ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`} aria-hidden={!showButton}>
                        <a href="about" onClick={(e) => handleButtonClick(e, 'about')} tabIndex={showButton ? 0 : -1} className="inline-flex items-center px-8 py-3 sm:px-10 sm:py-4 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-sky-300 text-lg sm:text-xl font-semibold shadow-md transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-gradient-to-b from-blue-400/30 to-blue-900/30">
                            <User className="inline-block mr-3 text-sky-400" />
                            About Me
                        </a>
                    </div>
                    <div className={`transform transition-all duration-500 ease-out delay-100 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`} aria-hidden={!showButton}>
                        <a href="contact" onClick={(e) => handleButtonClick(e, 'contact')} tabIndex={showButton ? 0 : -1} className="inline-flex items-center px-8 py-3 sm:px-10 sm:py-4 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-sky-300 text-lg sm:text-xl font-semibold shadow-md transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-gradient-to-b from-blue-400/30 to-blue-900/30">
                            <BriefcaseBusiness className="inline-block mr-3 text-sky-400" />
                            Business Inquiries
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>;
}