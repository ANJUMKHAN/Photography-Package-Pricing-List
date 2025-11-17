
import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- Animation Hooks & Components ---
const useOnScreen = (
  ref: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit & { triggerOnce?: boolean } = { threshold: 0.1, triggerOnce: true }
) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        if (options.triggerOnce && ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return isIntersecting;
};

const useCountUp = (end: number, duration: number, startOnScreen: boolean, start = 0) => {
    const [count, setCount] = useState(start);
    const easeOutCubic = (t: number) => (--t) * t * t + 1;

    useEffect(() => {
        if (startOnScreen) {
            let startTime: number | null = null;
            const animationFrame = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / duration, 1);
                const easedPercentage = easeOutCubic(percentage);
                const currentVal = Math.floor(easedPercentage * (end - start) + start);
                
                setCount(currentVal);

                if (progress < duration) {
                    requestAnimationFrame(animationFrame);
                }
            };
            requestAnimationFrame(animationFrame);
        }
    }, [end, duration, start, startOnScreen]);

    return count;
};

const AnimatedNumber: React.FC<{ value: number; duration?: number; className?: string; prefix?: string; suffix?: string }> = ({ value, duration = 1500, className, prefix, suffix }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isOnScreen = useOnScreen(ref);
    const count = useCountUp(value, duration, isOnScreen);

    return <span ref={ref} className={className}>{prefix}{count.toLocaleString('en-US')}{suffix}</span>;
};


// --- SVG Icon Components ---
const IconWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`inline-flex items-center justify-center ${className}`}>
        {children}
    </div>
);

const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.32 1.011l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .32-1.011l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>;
const FireIcon = () => <svg xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 3.75 3.75 0 0 0-1.993-2.158A5.25 5.25 0 0 0 8.25 12a7.5 7.5 0 0 0 7.5 7.5 8.953 8.953 0 0 0-3.255-5.25Z" /></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18" /></svg>;
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" /></svg>;
const RoiIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" /></svg>;
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 0 1-2.25 2.25h-1.5a2.25 2.25 0 0 1-2.25-2.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" /></svg>;


const ChevronIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`w-5 h-5 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>;
const CheckmarkLineIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-purple-400 shrink-0 mt-1"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>;

const MinusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /></svg>;

const icons: { [key: string]: React.FC } = {
    'prod-upgrades': () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.82m5.84-2.56a6 6 0 0 0-5.84-7.38v4.82m5.84 2.56V8.53a6 6 0 0 0 5.84 7.38v-4.82a6 6 0 0 0-5.84-7.38v-2.06a8.25 8.25 0 0 0 8.25 8.25v-2.06a8.25 8.25 0 0 0-8.25-8.25V2.25a6 6 0 0 0-6 6v.75a6 6 0 0 0 6 6v.75a6 6 0 0 0-6 6v.75a6 6 0 0 0 6 6v.75a6 6 0 0 0 6-6Z" /></svg>,
    'content-expansion': () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h12A2.25 2.25 0 0 0 20.25 14.25V5.25A2.25 2.25 0 0 0 18 3H6A2.25 2.25 0 0 0 3.75 3Zm-1.5 0h16.5v11.25c0 1.242-1.008 2.25-2.25 2.25H6.375c-1.242 0-2.25-1.008-2.25-2.25V3Zm19.5 0v.243a2.25 2.25 0 0 1-1.03 1.957 2.25 2.25 0 0 1-2.22-.007v.002a2.25 2.25 0 0 1-1.03-1.956V3h4.5ZM3.75 18h16.5a2.25 2.25 0 0 1 2.25 2.25v.001a2.25 2.25 0 0 1-2.25 2.25H3.75a2.25 2.25 0 0 1-2.25-2.25v-.001a2.25 2.25 0 0 1 2.25-2.25Z" /></svg>,
    'creative-styling': () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.998 15.998 0 0 1 3.388-1.62m0 0a4.5 4.5 0 0 0 6.364-6.364m-6.364 6.364a12 12 0 0 1-3.388-1.62m0 0a12 12 0 0 0-3.388-1.62m6.364 0a12 12 0 0 0 3.388 1.62m-3.388-1.62a12 12 0 0 1 3.388 1.62m0 0a21.333 21.333 0 0 0 3.388 1.62m-3.388-1.62a21.333 21.333 0 0 1-3.388-1.62m-6.364 0a12 12 0 0 1 3.388-1.62m0 0a12 12 0 0 0 3.388-1.62" /></svg>,
    'business-boosters': () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" /></svg>,
};

// --- Data ---
const packages = [
    {
        name: "Starter",
        icon: StarIcon,
        price: 350,
        description: "For testing pro content",
        promise: "Perfect for small brands testing the waters with professionally shot content.",
        photos: [
            "10 magazine-level product photos",
            "Basic brand-aligned styling",
            "Product focused shots",
            "Delivered ready for social & website",
        ],
        videoBonus: {
            value: 250,
            items: [
                "5 professionally produced clips",
                "1 ready-to-post vertical video (15 sec)",
                "Perfect for a single promo post",
            ],
        },
        bestFor: "Up to 3 products, single promos",
        isMostBooked: false,
    },
    {
        name: "Essentials",
        icon: FireIcon,
        price: 500,
        description: "For growing brands",
        promise: "Most popular for holiday launches and small collections.",
        photos: [
            "20 magazine-level product photos",
            "Creative styling aligned with your brand",
            "Mix of lifestyle, detail & hero shots",
            "Delivered ready for social, website & ads",
        ],
        videoBonus: {
            value: 450,
            items: [
                "15 professionally produced clips",
                "3 ready-to-post vertical videos (15–30 sec)",
                "Enough content for a full week of daily posts",
            ],
        },
        bestFor: "Up to 8 products, small collections & promo campaigns",
        isMostBooked: true,
    },
    {
        name: "Complete",
        icon: SparklesIcon,
        price: 1000,
        description: "For full campaigns",
        promise: "The all-in-one solution for a full holiday campaign rollout.",
        photos: [
            "45 magazine-level product photos",
            "Full creative direction & prop sourcing",
            "Diverse shot list for all marketing channels",
            "Priority delivery for fast-moving campaigns",
        ],
        videoBonus: {
            value: 650,
            items: [
                "30 professionally produced clips",
                "5 ready-to-post vertical videos (15-60 sec)",
                "Full campaign’s worth of video assets",
            ],
        },
        bestFor: "Large collections, multi-platform campaigns",
        isMostBooked: false,
    },
];

const comparisonData = {
    headers: ["Feature", "Starter", "Essentials", "Complete"],
    rows: [
        { feature: "Edited Photos", values: ["10", "20", "45"] },
        { feature: "Styling Concepts", values: ["Basic", "Creative", "Full Direction"] },
        { feature: "Shot Style", values: ["Product focused", "Lifestyle & Hero", "Campaign Diverse"] },
        { feature: "Video Clips", values: ["5", "15", "30"] },
        { feature: "Ready-to-Post Videos", values: ["1", "3", "5"] },
        { feature: "Best For", values: ["Single Promos", "Small Collections", "Full Campaigns"] },
        { feature: "Creative Freedom", values: [<MinusIcon />, <CheckmarkLineIcon />, <CheckmarkLineIcon />] },
        { feature: "Prop Sourcing", values: [<MinusIcon />, <MinusIcon />, <CheckmarkLineIcon />] },
    ],
};

const investmentReasons = [
    { icon: CalendarIcon, label: "DECEMBER IS PEAK SEASON", text: "Capture the highest-intent shoppers of the year." },
    { icon: PlayIcon, label: "VIDEO IS KING", text: "Dominate feeds with scroll-stopping video content." },
    { icon: RoiIcon, label: "MAXIMIZE YOUR ROI", text: "Turn your ad spend into profit with high-converting creative." },
];

const testimonials = [
    { quote: "The holiday campaign photos were stunning and our engagement shot up. We had our best sales month ever!", name: "Jessica Vance", company: "Glow & Co. Skincare", color: "#B394FF" },
    { quote: "I was blown away by the quality. The video content was a game-changer for our Instagram ads.", name: "Mark Chen", company: "Artisan Brews", color: "#55E6C1" },
    { quote: "Finally, a content package that understands e-commerce. The assets were perfect for our website, socials, and ads.", name: "Sarah Kim", company: "Modern Minimalist", color: "#FFC960" },
];

const addonCategories = [
    {
        id: 'prod-upgrades',
        name: 'Production Upgrades',
        items: [
            { name: "Model Add-on", price: 200, description: "Add a professional model to your shoot for lifestyle context." },
            { name: "Location Fee", price: 150, description: "Shoot at a specific location to match your brand's aesthetic." },
        ]
    },
    {
        id: 'content-expansion',
        name: 'Content Expansion',
        items: [
            { name: "+10 Photos", price: 150, description: "Double your photo count for more variety." },
            { name: "+2 Vertical Videos", price: 250, description: "More ready-to-post video content for your feed." },
        ]
    },
    {
        id: 'creative-styling',
        name: 'Creative Styling & Premium Details',
        items: [
            { name: "Custom Styled Setup", price: 100, description: "A fully custom set designed around your product.", includedNote: "Free with Essentials & Complete" },
            { name: "Premium Props & Backdrops", price: 75, description: "Access to our library of high-end props and surfaces.", includedNote: "Free with Essentials & Complete" },
        ]
    },
    {
        id: 'business-boosters',
        name: 'Business Boosters',
        items: [
            { name: "Priority Delivery (48hr)", price: 175, description: "Get your final assets delivered in 2 business days." },
            { name: "Content Strategy Session", price: 250, description: "A 30-min call to plan your content rollout for max impact." },
        ]
    }
];

const offerDetails = {
    title: "Limited-Time December Offer",
    features: [
        "Free Content Strategy Session (CA$250 Value)",
        "20% Off Any Add-on Package",
        "Guaranteed Delivery Before Dec 15th"
    ],
    scarcity: "Only 8 spots left for December shoots."
};

// --- Helper & UI Components ---
const Section: React.FC<{ children: React.ReactNode; className?: string, animated?: boolean }> = ({ children, className = '', animated = false }) => {
    const ref = useRef<HTMLElement>(null);
    const isOnScreen = useOnScreen(ref, { threshold: 0.1, triggerOnce: true });

    return (
        <section
            ref={ref}
            className={`w-full max-w-3xl mx-auto px-4 py-7 md:py-14 transition-all duration-700 ease-out ${className} ${animated ? (isOnScreen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5') : ''}`}
        >
            {children}
        </section>
    );
};


const Accordion: React.FC<{ category: typeof addonCategories[0] }> = ({ category }) => {
    const [isOpen, setIsOpen] = useState(false);
    const Icon = icons[category.id];

    return (
        <div className="border-b border-white/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4 text-left"
            >
                <div className="flex items-center gap-3">
                    <IconWrapper className="text-white/70">{Icon && <Icon />}</IconWrapper>
                    <span className="text-base font-medium text-white/90">{category.name}</span>
                </div>
                <ChevronIcon className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-white/50`} />
            </button>
            <div className={`transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-2 pb-4 space-y-4">
                    {category.items.map((item, index) => (
                        <div key={index} className="pl-9 flex justify-between items-start">
                            <div>
                                <h4 className="text-[15px] font-regular text-white/90 leading-tight flex items-center">{item.name}
                                {item.includedNote &&
                                    <span className="ml-2 text-[11px] font-medium tracking-wide text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full">{item.includedNote}</span>
                                }
                                </h4>
                                <p className="text-[12px] text-white/50 mt-1 leading-snug">{item.description}</p>
                            </div>
                            <p className="text-[15px] font-regular text-white/90 shrink-0 ml-4">
                                +CA${item.price}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const PackageCard: React.FC<{ packageInfo: typeof packages[0], isFeatured?: boolean, delay: number }> = ({ packageInfo, isFeatured = false, delay }) => {
    const { name, icon: Icon, price, description, promise, photos, videoBonus, bestFor, isMostBooked } = packageInfo;
    const cardRef = useRef<HTMLDivElement>(null);
    const isOnScreen = useOnScreen(cardRef, { threshold: 0.2, triggerOnce: true });

    const cardBaseClasses = "rounded-3xl border p-6 md:p-7 flex flex-col transition-all duration-300 transform-gpu space-y-5";
    const featuredClasses = "bg-gradient-to-b from-[#161720] to-[#0A0B12] border-white/10 shadow-2xl shadow-black/70 scale-100 md:scale-105 hover:shadow-purple-500/20";
    const standardClasses = "bg-[#0E0F1A] border-white/5 hover:border-white/15 hover:scale-[1.02]";

    return (
        <div ref={cardRef} className={`${cardBaseClasses} ${isFeatured ? featuredClasses : standardClasses} ${isOnScreen ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: `${delay}ms`}}>
             {isMostBooked && <p className="absolute -top-3 left-1/2 -translate-x-1/2 text-[12px] font-medium tracking-[1.2px] text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full w-fit">MOST BOOKED</p>}
            
            {/* Zone 1: Top Band */}
            <div>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-[#E2E0F0]">{name} Package</h3>
                        <p className="text-xs font-medium text-white/50 tracking-wider mt-1">{description}</p>
                    </div>
                    <IconWrapper className="w-10 h-10 bg-white/5 text-purple-300 rounded-lg">
                        <Icon />
                    </IconWrapper>
                </div>
                <div className="mt-4">
                    <p className="text-3xl font-bold text-[#F7F5FF]">
                        <span className="text-base font-medium text-white/50 align-baseline mr-1">CA$</span>
                        <AnimatedNumber value={price} />
                    </p>
                    <p className="text-xs uppercase font-bold text-white/40 tracking-widest mt-1">Per content package</p>
                </div>
            </div>

            {/* Zone 2: "Who it's for" */}
            <p className="text-sm font-regular leading-relaxed text-white/70 pt-2">{promise}</p>

            <div className="flex-grow space-y-5">
                {/* Zone 3: Photo Block */}
                <div className="border-t border-white/10 pt-5">
                     <h4 className="text-xs uppercase font-bold text-white/40 tracking-widest mb-3">Photo Set</h4>
                    <ul className="space-y-2">
                        {photos.map((item, i) => (
                             <li key={i} className={`flex items-start gap-3 transition-all duration-500 ease-out ${isOnScreen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: `${300 + i * 100}ms` }}>
                                <CheckmarkLineIcon />
                                <span className="text-sm font-regular leading-relaxed text-white/80">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Zone 4: Video Block */}
                 <div className="bg-black/20 border border-white/10 rounded-2xl p-4">
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-xs uppercase font-bold text-white/40 tracking-widest">Holiday Video Bonus</p>
                        <span className="text-xs font-bold text-red-400/70 line-through">
                            CA$<AnimatedNumber value={videoBonus.value} duration={1000} /> value
                        </span>
                    </div>
                    <ul className="space-y-1.5">
                        {videoBonus.items.map((item, i) => (
                             <li key={i} className={`flex items-start gap-3 transition-all duration-500 ease-out ${isOnScreen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: `${600 + i * 100}ms` }}>
                                <CheckmarkLineIcon />
                                <span className="text-sm font-regular leading-relaxed text-white/80">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Zone 5: Footer Strip */}
            <div className="mt-auto pt-5 border-t border-white/10 text-center space-y-3">
                <p className="text-base font-semibold text-purple-300">You save: CA$<AnimatedNumber value={videoBonus.value} duration={1000} /></p>
                <p className="text-xs font-medium text-purple-300 bg-purple-500/20 px-3 py-1.5 rounded-full inline-block">{bestFor}</p>
            </div>
        </div>
    );
};


// --- Main App Component ---
const App = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [copiedPackage, setCopiedPackage] = useState<string | null>(null);

    const handleCopy = (packageName: string) => {
        const message = `I'd like to book the "${packageName}" package.`;
        navigator.clipboard.writeText(message);
        setCopiedPackage(packageName);
        setTimeout(() => setCopiedPackage(null), 2000);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const FADE_IN_CLASSES = 'animate-fade-in-up opacity-0';

    return (
        <main className="bg-black text-white font-sans antialiased overflow-x-hidden">
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-purple-900/40 via-black/0 to-black/0 -z-10"></div>
            {/* Hero */}
            <Section className="text-center pt-20">
                <p style={{'--delay': '0.1s'} as React.CSSProperties} className={`${FADE_IN_CLASSES} text-[12px] font-medium tracking-[2.4px] text-white/55 mb-8`}>• HOLIDAY BOOKING WINDOW • OPEN UNTIL DEC 10TH</p>
                <h1 style={{'--delay': '0.2s'} as React.CSSProperties} className={`${FADE_IN_CLASSES} text-[32px] md:text-4xl font-semibold leading-[1.1] text-[#F7F5FF] -tracking-[1px] max-w-2xl mx-auto`}>Most brands lose the sale before anyone sees the price.</h1>
                <p style={{'--delay': '0.3s'} as React.CSSProperties} className={`${FADE_IN_CLASSES} text-[15px] leading-[1.5] text-white/80 max-w-xl mx-auto mt-8 md:mt-10`}>Blurry, DIY photos kill trust. In a sea of holiday noise, professional content isn’t a luxury—it’s your ticket to getting noticed and getting paid.</p>
            </Section>

            {/* Packages Section */}
            <Section animated className="!py-4">
                <div className="text-center">
                    <h2 className="text-[24px] font-semibold leading-[1.2] text-[#F0EEF8]">Holiday Content Packages</h2>
                    <p className="text-[15px] leading-[1.5] text-white/60 mt-2 max-w-2xl mx-auto">Stop-the-scroll product content, shot and directed for your holiday sales push.</p>
                    <p className="text-xs uppercase font-bold text-purple-300/80 tracking-widest mt-4">Every package includes complimentary holiday video content.</p>
                </div>
            </Section>

            {/* Package Cards */}
            <Section className="!max-w-6xl !pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
                    {packages.map((pkg, index) => (
                        <PackageCard key={index} packageInfo={pkg} isFeatured={pkg.isMostBooked} delay={index * 150} />
                    ))}
                </div>
            </Section>

            {/* Video Stat Summary */}
             <Section animated className="!pt-4">
                <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-5 flex flex-col justify-center text-center max-w-2xl mx-auto">
                    <p className="text-lg font-semibold leading-[1.3] text-[#E2E0F0]">Video content gets shared up to <span className="text-cyan-300"><AnimatedNumber value={1200} suffix="%" /></span> more than photos alone.</p>
                    <p className="text-sm font-regular leading-[1.5] text-white/80 mt-2">That’s why every package includes a complimentary holiday video bundle.</p>
                </div>
            </Section>

            {/* Compare Packages */}
            <Section animated>
                <h2 className="text-center text-[24px] font-semibold leading-[1.2] text-[#F0EEF8] mb-6">Compare Packages</h2>
                <div className="bg-[#0E0F1A] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto scrollbar-hide">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10">
                                    {comparisonData.headers.map((header, i) => (
                                        <th key={i} className={`p-4 text-[12px] font-medium tracking-wider text-white/55 whitespace-nowrap ${i > 0 ? 'text-center' : ''} ${i === 2 ? 'text-purple-300' : ''}`}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.rows.map((row, i) => (
                                    <tr key={i} className="border-b border-white/5 last:border-b-0">
                                        <td className="p-4 text-[15px] font-regular leading-[1.5] text-white/80 whitespace-nowrap">{row.feature}</td>
                                        {row.values.map((val, j) => (
                                            <td key={j} className="p-4 text-center text-[15px] font-regular leading-[1.5] text-white/60 whitespace-nowrap">
                                                <div className={`flex justify-center items-center ${j === 1 ? 'text-purple-300 font-medium' : ''}`}>
                                                    {val}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Section>

            {/* Why Investing Now Matters */}
            <Section animated>
                <h2 className="text-center text-[24px] font-semibold leading-[1.2] text-[#F0EEF8] mb-6">Why Investing Now Matters</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {investmentReasons.map((reason, i) => (
                        <div key={i} className="bg-[#0E0F1A] border border-white/5 rounded-2xl p-5 text-center">
                            <IconWrapper className="w-10 h-10 bg-purple-500/10 text-purple-300 rounded-lg mb-4">
                                <reason.icon />
                            </IconWrapper>
                            <p className="text-[12px] font-medium tracking-[2.4px] text-white/55 mb-1">{reason.label}</p>
                            <div className="w-6 h-[1px] bg-white/20 mx-auto my-2"></div>
                            <p className="text-[15px] font-regular leading-[1.5] text-white/80">{reason.text}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Testimonials */}
            <Section animated>
                <h2 className="text-center text-[24px] font-semibold leading-[1.2] text-[#F0EEF8] mb-2">Trusted by Brands Like Yours</h2>
                <p className="text-center text-[15px] leading-[1.5] text-white/60 mb-6">A few notes from teams who invested in quality.</p>
                <div className="relative h-48">
                    {testimonials.map((testimonial, index) => (
                        <div key={index}
                             className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === activeTestimonial ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div className="bg-[#0E0F1A] border border-white/5 rounded-2xl p-6 h-full flex flex-col justify-center items-center text-center">
                                <p className="text-[18px] font-regular leading-[1.3] text-[#E2E0F0]">"{testimonial.quote}"</p>
                                <div className="mt-4">
                                    <p className="text-[15px] font-semibold leading-[1.5] text-white/80">{testimonial.name}</p>
                                    <p className="text-[12px] font-medium tracking-wider text-purple-300" style={{ color: testimonial.color }}>{testimonial.company}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-2 mt-4">
                    {testimonials.map((_, index) => (
                        <button key={index} onClick={() => setActiveTestimonial(index)} className={`w-2 h-2 rounded-full transition-colors ${index === activeTestimonial ? 'bg-white' : 'bg-white/20 hover:bg-white/40'}`}></button>
                    ))}
                </div>
            </Section>

            {/* Supercharge Your Package */}
            <Section animated>
                <div className="text-center mb-8 mt-6">
                    <h2 className="text-[24px] font-semibold leading-[1.2] text-[#F0EEF8]">Supercharge Your Package</h2>
                    <p className="text-[15px] leading-[1.5] text-white/60 mt-2">Pick optional upgrades to perfectly match your campaign goals.</p>
                </div>
                <div className="bg-[#0E0F1A] border border-white/5 rounded-2xl p-2 md:p-4">
                    {addonCategories.map(category => <Accordion key={category.id} category={category} />)}
                </div>
            </Section>

            {/* Limited-Time Offer */}
            <Section animated>
                <div className="bg-gradient-to-br from-purple-800/50 to-indigo-800/30 border border-purple-400/30 rounded-3xl p-6 md:p-8 text-center relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-yellow-400/80 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-cyan-400/60 rounded-full blur-3xl"></div>
                    <h2 className="text-[24px] font-semibold leading-[1.2] text-[#F0EEF8] mb-4">{offerDetails.title}</h2>
                    <ul className="space-y-2 inline-block text-left mb-4">
                        {offerDetails.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-[15px] font-regular leading-[1.5] text-white/80">
                                <SparklesIcon /> {feature}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 bg-yellow-400/20 border border-yellow-400/50 text-yellow-200 text-base font-semibold px-4 py-2 rounded-lg inline-block">
                        {offerDetails.scarcity}
                    </div>
                </div>
            </Section>

            {/* Final CTA */}
            <Section animated className="text-center">
                <h2 className="text-[32px] font-semibold leading-[1.1] text-[#F7F5FF] -tracking-[1px] max-w-lg mx-auto">Ready for Your Best Holiday Season Yet?</h2>
                <p className="text-[15px] leading-[1.5] text-white/60 mt-4 mb-8 max-w-md mx-auto">Reply with your chosen package to lock in your spot. We'll handle the rest.</p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    {packages.map(pkg => (
                        <button key={pkg.name} onClick={() => handleCopy(`${pkg.name} Package`)} className={`w-full md:w-auto px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200 border-2 ${pkg.isMostBooked ? 'bg-[#B394FF] text-black border-transparent hover:bg-white' : 'bg-transparent border-white/20 text-white/80 hover:bg-white/10 hover:border-white/40'}`}>
                            {copiedPackage === `${pkg.name} Package` ? 'Copied!' : `Book "${pkg.name} Package"`}
                        </button>
                    ))}
                </div>
                <p className="text-[12px] font-medium tracking-wider text-white/55 mt-4">Tap to copy booking message</p>
            </Section>

            {/* Message Card */}
            <Section animated className="pb-20">
                <div className="bg-[#121422] border border-white/10 rounded-2xl p-4 flex items-start gap-3">
                    <IconWrapper className="w-8 h-8 rounded-full bg-slate-700/80 shrink-0">
                        <CopyIcon />
                    </IconWrapper>
                    <div>
                        <p className="text-[15px] font-regular leading-[1.5] text-white/80">
                            I'd like to book the "<span className="font-semibold text-[#B394FF]">Essentials Package</span>".
                        </p>
                        <p className="text-[12px] text-white/50 mt-1">Example message</p>
                    </div>
                </div>
            </Section>
        </main>
    );
};

export default App;
