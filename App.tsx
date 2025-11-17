

import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- SVG Icon Components ---
const IconWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`inline-flex items-center justify-center ${className}`}>
        {children}
    </div>
);

const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.32 1.011l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .32-1.011l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>;
const FireIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 3.75 3.75 0 0 0-1.993-2.158A5.25 5.25 0 0 0 8.25 12a7.5 7.5 0 0 0 7.5 7.5 8.953 8.953 0 0 0-3.255-5.25Z" /></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>;
const VideoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4"><path d="M5 4.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v2.426a2.25 2.25 0 0 1-.94 1.838l-2.5 1.667a.5.5 0 0 1-.56 0l-2.5-1.667A2.25 2.25 0 0 1 5 6.926V4.5Zm1 .5v1.926c0 .414.223.79.56.981l2.5 1.667a.5.5 0 0 0 .56 0l2.5-1.667a1.25 1.25 0 0 0 .56-.981V5H6Z" /><path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12.5v-9ZM3.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-9Z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18" /></svg>;
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" /></svg>;
const RoiIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" /></svg>;
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 0 1-2.25 2.25h-1.5a2.25 2.25 0 0 1-2.25-2.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" /></svg>;


const ChevronIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`w-5 h-5 ${className}`}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-teal-400"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z" clipRule="evenodd" /></svg>;
const MinusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /></svg>;

const icons: { [key: string]: React.FC } = {
    'prod-upgrades': () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.82m5.84-2.56a6 6 0 0 0-5.84-7.38v4.82m5.84 2.56V8.53a6 6 0 0 0 5.84 7.38v-4.82a6 6 0 0 0-5.84-7.38v-2.06a8.25 8.25 0 0 0 8.25 8.25v-2.06a8.25 8.25 0 0 0-8.25-8.25V2.25a6 6 0 0 0-6 6v.75a6 6 0 0 0 6 6v.75a6 6 0 0 0-6 6v.75a6 6 0 0 0 6 6v.75a6 6 0 0 0 6-6Z" /></svg>,
    'content-expansion': () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h12A2.25 2.25 0 0 0 20.25 14.25V5.25A2.25 2.25 0 0 0 18 3H6A2.25 2.25 0 0 0 3.75 3Zm-1.5 0h16.5v11.25c0 1.242-1.008 2.25-2.25 2.25H6.375c-1.242 0-2.25-1.008-2.25-2.25V3Zm19.5 0v.243a2.25 2.25 0 0 1-1.03 1.957 2.25 2.25 0 0 1-2.22-.007v.002a2.25 2.25 0 0 1-1.03-1.956V3h4.5ZM3.75 18h16.5a2.25 2.25 0 0 1 2.25 2.25v.001a2.25 2.25 0 0 1-2.25 2.25H3.75a2.25 2.25 0 0 1-2.25-2.25v-.001a2.25 2.25 0 0 1 2.25-2.25Z" /></svg>,
    'creative-styling': () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.998 15.998 0 0 1 3.388-1.62m0 0a4.5 4.5 0 0 0 6.364-6.364m-6.364 6.364a12 12 0 0 1-3.388-1.62m0 0a12 12 0 0 0-3.388-1.62m6.364 0a12 12 0 0 0 3.388 1.62m-3.388-1.62a12 12 0 0 1 3.388 1.62m0 0a21.333 21.333 0 0 0 3.388 1.62m-3.388-1.62a21.333 21.333 0 0 1-3.388-1.62m-6.364 0a12 12 0 0 1 3.388-1.62m0 0a12 12 0 0 0 3.388-1.62" /></svg>,
    'deliverables': () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5-3.75v3.75" /></svg>,
    'business-boosters': () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" /></svg>,
    'payment': () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15A2.25 2.25 0 0 0 2.25 6.75v10.5A2.25 2.25 0 0 0 4.5 19.5Z" /></svg>,
};


// --- Data Structures ---
const packages = [
  {
    icon: <StarIcon />,
    title: 'Starter',
    tag: 'For testing pro content',
    price: 350,
    priceDetail: 'Per content package',
    valueSentence: 'Get your first set of clean, scroll-stopping visuals.',
    features: [
      '10 professionally edited product photos',
      'Multiple angles to show details and textures',
      'Files optimized for Instagram, website, Facebook & print',
      'Turnaround: 3–5 days',
    ],
    bonusLine: 'Includes: Holiday video bonus (5 clips + 1 vertical video, CA$250 value)',
    isPopular: false,
  },
  {
    icon: <FireIcon />,
    title: 'Essentials',
    tag: 'For growing brands',
    price: 500,
    priceDetail: 'Per content package',
    valueSentence: 'A full narrative set of photos that sells your brand story.',
    features: [
      '20 magazine-level product & lifestyle photos',
      'Mix of lifestyle, detail, and hero shots',
      'Delivered ready for social, website & ads',
      'Turnaround: 5–7 days',
    ],
    bonusLine: 'Includes: Holiday video bonus (15 clips + 3 vertical videos, CA$450 value)',
    isPopular: true,
  },
  {
    icon: <SparklesIcon />,
    title: 'Complete',
    tag: 'For full holiday takeover',
    price: 1000,
    priceDetail: 'Per content package',
    valueSentence: 'A full campaign toolkit for every channel.',
    features: [
      '30+ billboard-quality product & lifestyle photos',
      'Multiple creative styling concepts',
      'Every key angle for social, site, email & ads',
      'Turnaround: 5–7 days',
    ],
    bonusLine: 'Includes: Massive holiday video bundle (15 clips + 6 vertical videos + animations, CA$900 value)',
    isPopular: false,
  },
];

const comparisonFeatures = [
    { feature: 'Edited Photos', values: ['10', '20', '30+'] },
    { feature: 'Styling Concepts', values: ['Basic', 'Brand-Aligned', 'Multiple'] },
    { feature: 'Shot Types', values: ['Product Focused', 'Hero & Lifestyle', 'Hero, Lifestyle & Flat Lay'] },
    { feature: 'Vertical Videos', values: ['1', '3', '6+'] },
    { feature: 'Animation / Stop-motion', values: [false, false, true] },
    { feature: 'Promotional Graphics', values: [false, false, true] },
    { feature: 'Best For', values: ['New Launches', 'Small Collections', 'Full Campaigns'] },
];

const whyInvestItems = [
    {
        icon: <CalendarIcon />,
        label: "DECEMBER IS DECISION MONTH",
        body: "Shoppers choose brands that look trustworthy and premium."
    },
    {
        icon: <PlayIcon />,
        label: "VIDEO WINS ATTENTION",
        body: "Short-form product videos dramatically boost reach and engagement."
    },
    {
        icon: <RoiIcon />,
        label: "A HIGH-ROI ASSET",
        body: "One good shoot can feed your website, ads, and socials for months."
    }
];

const testimonials = [
    {
        quote: "The photos were game-changing. Our holiday sales jumped 40% compared to last year. The quality immediately built trust with new customers.",
        name: "Jessica Vance",
        brand: "Glow & Co. Skincare",
        image: "https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=256&h=256&fit=crop"
    },
    {
        quote: "I was blown away. They captured our brand's vibe perfectly and delivered a ton of content we've been using across all our channels. The video clips were a huge bonus!",
        name: "Mark Chen",
        brand: "Artisan Roast Coffee",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop"
    },
    {
        quote: "The Complete package made us look like a major brand overnight. The consistency and quality across all assets elevated our entire marketing presence. Worth every penny.",
        name: "Samantha Riley",
        brand: "Nomad Travel Gear",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&fit=crop"
    }
];

const addonCategories = [
    { id: 'prod-upgrades', icon: icons['prod-upgrades'], title: 'Production Upgrades', items: [
        { name: 'Rush VIP Delivery (24–48 hrs)', price: 200, description: 'Jump to the front of the queue – ideal for last-minute launches.' },
        { name: 'Extended Showcase Video (60–90 sec)', price: 150, description: 'Perfect for product pages, brand stories, or YouTube.' },
        { name: 'Premium Cinematic Package', price: 300, description: '3 extended videos with cinematic transitions and pro color grading.' },
    ]},
    { id: 'content-expansion', icon: icons['content-expansion'], title: 'Content Expansion', items: [
        { name: 'Additional Photos (10+)', price: 30, description: 'Great for more angles/variations. (Base price CA$45).' },
        { name: 'Lifestyle / Model Integration', price: 250, description: 'Real people using your products = higher conversion.' },
        { name: 'On-Location Shoot', price: 300, description: 'Restaurants, retail, studios, or custom sets. Travel within Vancouver included.' },
    ]},
    { id: 'creative-styling', icon: icons['creative-styling'], title: 'Creative Styling & Premium Details', items: [
        { name: 'Custom Styled Setup', price: 100, description: 'Christmas, Valentine’s, etc. Brand-specific props, colors, and mood.' },
        { name: 'Premium Props & Backdrops', price: 125, description: 'Luxury materials, florals, custom surfaces. Ideal for premium products.' },
        { name: 'Advanced Editing & Retouching', price: 75, description: 'Magazine-level retouching or complex background swaps.' },
    ]},
    { id: 'business-boosters', icon: icons['business-boosters'], title: 'Business Boosters', items: [
        { name: 'Brand Marketing Designs', price: 250, description: 'Social + ad templates designed using your fonts, colors, and visual direction.' },
        { name: '30-Day Content Calendar', price: 150, description: 'What to post, when to post. Includes caption ideas.' },
    ]},
];

// --- Helper Components ---
const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 ${className}`}>
        {children}
    </section>
);

const SectionTitle: React.FC<{ children: React.ReactNode; }> = ({ children }) => (
    <h2 className="text-3xl font-semibold text-center text-[#E9E4FF] tracking-tight">{children}</h2>
);


// --- Main App Component ---
const App: React.FC = () => {
    const [openAccordion, setOpenAccordion] = useState<string | null>('prod-upgrades');
    const [selectedAddons, setSelectedAddons] = useState<{ [key: string]: boolean }>({});
    const [activePackage, setActivePackage] = useState('Essentials');
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const toastTimeoutRef = useRef<number | null>(null);

    const nextTestimonial = () => {
        setCurrentTestimonial(current => (current + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial(current => (current - 1 + testimonials.length) % testimonials.length);
    };

    const toggleAccordion = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    const handleAddonToggle = (addonName: string) => {
        setSelectedAddons(prev => ({ ...prev, [addonName]: !prev[addonName] }));
    };

    const fullMessageString = useMemo(() => {
        const chosenAddons = Object.keys(selectedAddons).filter(key => selectedAddons[key]);
        let base = `I'm interested in the ${activePackage} package`;

        if (chosenAddons.length === 1) {
            base += ` with ${chosenAddons[0]}`;
        } else if (chosenAddons.length > 1) {
            const last = chosenAddons.pop();
            base += ` with ${chosenAddons.join(', ')} and ${last}`;
        }

        base += `. Here’s a quick description of my products…`;
        return base;
    }, [activePackage, selectedAddons]);

    const handleCopy = () => {
        navigator.clipboard.writeText(fullMessageString).then(() => {
            setShowToast(true);
            if (toastTimeoutRef.current) {
                clearTimeout(toastTimeoutRef.current);
            }
            toastTimeoutRef.current = window.setTimeout(() => {
                setShowToast(false);
            }, 2000);
        });
    };

    useEffect(() => {
        return () => {
            if (toastTimeoutRef.current) {
                clearTimeout(toastTimeoutRef.current);
            }
        };
    }, []);
    
    const MessageDisplay = () => {
        const chosenAddons = Object.keys(selectedAddons).filter(key => selectedAddons[key]);
        let addonsText = '';
        if (chosenAddons.length === 1) {
            addonsText = ` with ${chosenAddons[0]}`;
        } else if (chosenAddons.length > 1) {
            const last = chosenAddons.pop();
            addonsText = ` with ${chosenAddons.join(', ')} and ${last}`;
        }
    
        return (
            <p>"I’m interested in the <span className="font-semibold text-[#B394FF]">{activePackage}</span> package{addonsText}. Here’s a quick description of my products..."</p>
        );
    };

    return (
        <div className="bg-[#05060A] text-gray-200 font-sans antialiased min-h-screen" style={{ backgroundImage: 'radial-gradient(ellipse 70% 80% at top right, #141827, #05060A)' }}>
            <header className="min-h-[90vh] flex items-center py-16 md:py-0">
                <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-16 items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Left: Text Content */}
                    <div className="w-full md:w-6/12 text-left">
                        <p className="text-sm font-medium uppercase tracking-[0.1em] text-[#7C8191] animate-fade-in-up" style={{ animationDelay: '200ms', opacity: 0 }}>
                            HOLIDAY BOOKING WINDOW • Christmas content for product brands
                        </p>
                        <h1 className="text-4xl sm:text-5xl md:text-[56px] font-semibold text-[#E9E4FF] tracking-tighter leading-tight mt-6 animate-fade-in-up" style={{ animationDelay: '400ms', opacity: 0 }}>
                            Most brands lose the sale<br/>before anyone sees the price.
                        </h1>
                        <p className="text-lg md:text-xl text-[#D7DBE7] mt-8 max-w-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: '600ms', opacity: 0 }}>
                            Blurry, DIY photos kill trust. Clean, premium visuals make people stop, click, and buy.
                        </p>
                    </div>
                    {/* Right: Visual Anchor */}
                    <div className="w-full md:w-6/12">
                        <div className="relative h-80 md:h-96 w-full max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '500ms', opacity: 0 }}>
                            <div className="absolute top-0 left-0 w-32 h-48 md:w-48 md:h-64 bg-gray-700 rounded-xl md:rounded-2xl bg-cover bg-center shadow-2xl transition-transform duration-500 hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=512&auto=format&fit=crop')", transform: 'rotate(-8deg)', filter: 'blur(1px)' }}></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-64 md:w-56 md:h-80 bg-gray-700 rounded-xl md:rounded-2xl bg-cover bg-center shadow-2xl z-10 transition-transform duration-500 hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542291026-7eec264c27ab?q=80&w=512&auto=format&fit=crop')", transform: 'rotate(2deg)' }}></div>
                            <div className="absolute bottom-0 right-0 w-28 h-40 md:w-40 md:h-56 bg-gray-700 rounded-xl md:rounded-2xl bg-cover bg-center shadow-2xl transition-transform duration-500 hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=512&auto=format&fit=crop')", transform: 'rotate(10deg)', filter: 'blur(1px)' }}></div>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <Section>
                    <div className="text-center max-w-3xl mx-auto">
                        <SectionTitle>Holiday Content Packages</SectionTitle>
                        <p className="text-lg text-[#D7DBE7] mt-4 leading-relaxed">Stop-the-scroll product content, shot and directed for your holiday sales push.</p>
                        <p className="text-sm text-[#7C8191] mt-2">Every package includes complimentary video content.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-12 items-center">
                        {packages.map((pkg) => (
                            <div key={pkg.title} className={`group relative rounded-3xl p-8 transition-all duration-300 ease-in-out h-full flex flex-col bg-gradient-to-b from-[#121520] to-[#070910] shadow-[0_16px_40px_rgba(0,0,0,0.6)] ${pkg.isPopular ? 'md:scale-105 md:z-10' : 'md:hover:-translate-y-2'}`}
                                // FIX: Cast style object to React.CSSProperties to allow custom CSS properties.
                                style={{'--tw-shadow-color': pkg.isPopular ? 'rgba(179, 148, 255, 0.15)' : 'transparent', boxShadow: '0 0 0 1px rgba(255,255,255,0.04) inset, 0 20px 50px -10px var(--tw-shadow-color)'} as React.CSSProperties}>
                                {pkg.isPopular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#B394FF] text-black text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase">Most Booked</div>}
                                
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#E9E4FF]">{pkg.title}</h3>
                                        <p className="text-sm text-[#7C8191] tracking-wide">{pkg.tag}</p>
                                    </div>
                                    <IconWrapper className="text-[#A071FF] bg-white/5 p-2 rounded-full">{pkg.icon}</IconWrapper>
                                </div>
                                
                                <div className="my-4">
                                    <p className="text-4xl font-semibold text-white">
                                        <span className="text-2xl font-medium text-gray-400 align-baseline pr-1">CA$</span>{pkg.price}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">{pkg.priceDetail}</p>
                                </div>
                                
                                <p className="text-base text-[#D7DBE7] leading-relaxed mb-6">{pkg.valueSentence}</p>
                                
                                <div className="border-t border-white/10 my-6"></div>

                                <ul className="space-y-3 text-sm text-gray-300 leading-normal flex-grow">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <CheckIcon />
                                            <span className="ml-3">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-8">
                                    <div className="bg-[#55E6C1]/10 text-[#55E6C1] text-xs font-medium rounded-full p-3 flex items-center justify-center space-x-2">
                                        <VideoIcon />
                                        <span>{pkg.bonusLine}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-lg text-[#D7DBE7] mt-16 max-w-3xl mx-auto">Video gets shared up to <span className="font-semibold text-white">1200% more</span> than photos. That’s why every package includes a complimentary holiday video bundle.</p>
                </Section>
                
                <Section>
                    <SectionTitle>Compare Packages</SectionTitle>
                    <div className="mt-12 bg-gradient-to-b from-[#121520] to-[#070910] rounded-3xl p-4 md:p-8" style={{boxShadow: '0 0 0 1px rgba(255,255,255,0.04) inset, 0 16px 40px rgba(0,0,0,0.6)'}}>
                        <div className="grid grid-cols-4 gap-2 text-center font-semibold text-sm md:text-base">
                            <div className="text-left sr-only md:not-sr-only">Feature</div>
                            {packages.map(p => <div key={p.title} className="text-white p-3">{p.title}</div>)}
                        </div>
                        {comparisonFeatures.map((feat, idx) => (
                            <div key={idx} className={`grid grid-cols-4 gap-2 items-center text-center text-sm rounded-lg`}>
                                <div className="font-medium text-gray-300 text-left p-3">{feat.feature}</div>
                                {feat.values.map((val, valIdx) => (
                                    <div key={valIdx} className={`text-gray-200 h-full flex items-center justify-center p-3 rounded-md ${packages[valIdx].isPopular ? 'bg-white/5' : ''}`}>
                                        {typeof val === 'boolean' ? (val ? <CheckIcon /> : <MinusIcon />) : <span className="text-xs md:text-sm">{val}</span>}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </Section>
                
                <Section>
                    <SectionTitle>Why Investing Now Matters</SectionTitle>
                     <div className="max-w-3xl mx-auto grid md:grid-cols-1 gap-4 mt-8">
                        {whyInvestItems.map((item) => (
                            <div key={item.label} className="p-5 rounded-2xl bg-gradient-to-b from-[#10121A] to-[#080A10] border border-white/5">
                                <div className="flex items-center">
                                    <IconWrapper className="text-gray-400 mr-4 w-5 h-5">{item.icon}</IconWrapper>
                                    <h3 className="text-sm font-medium text-[#E3E1F5] uppercase tracking-[0.1em]">
                                        {item.label}
                                    </h3>
                                </div>
                                <div className="w-8 h-px bg-white/10 my-2.5 ml-[36px]"></div>
                                <p className="text-sm text-gray-400 leading-relaxed ml-[36px]">
                                    {item.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </Section>
                
                <Section>
                    <SectionTitle>Trusted by Brands Like Yours</SectionTitle>
                    <p className="text-center text-lg text-gray-400 mt-4">A few notes from teams who booked holiday shoots.</p>
                     <div className="relative mt-12 max-w-2xl mx-auto">
                        <div className="overflow-hidden rounded-3xl">
                            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                                {testimonials.map((t, index) => (
                                    <div key={index} className="w-full flex-shrink-0">
                                        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-[#121520] to-[#070910] h-full flex flex-col justify-center" style={{boxShadow: '0 0 0 1px rgba(255,255,255,0.04) inset, 0 16px 40px rgba(0,0,0,0.6)', minHeight: '300px'}}>
                                            <p className="text-base md:text-lg text-gray-300 leading-relaxed flex-grow text-center italic">"{t.quote}"</p>
                                            <div className="flex flex-col items-center mt-6">
                                                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                                                <div className="mt-4 text-center">
                                                    <p className="font-semibold text-sm text-white">{t.name}</p>
                                                    <p className="text-sm text-[#A071FF]">{t.brand}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button onClick={prevTestimonial} aria-label="Previous testimonial" className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 bg-white/5 hover:bg-white/10 text-white rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#A071FF] z-10">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                        </button>
                        <button onClick={nextTestimonial} aria-label="Next testimonial" className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 bg-white/5 hover:bg-white/10 text-white rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#A071FF] z-10">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                        </button>
                        
                        <div className="flex justify-center gap-2 mt-6">
                            {testimonials.map((_, index) => (
                                <button key={index} onClick={() => setCurrentTestimonial(index)} aria-label={`Go to testimonial ${index + 1}`} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentTestimonial === index ? 'bg-white w-5' : 'bg-white/20 hover:bg-white/40'}`} />
                            ))}
                        </div>
                    </div>
                </Section>

                <Section>
                    <div className="text-center max-w-3xl mx-auto">
                        <SectionTitle>Supercharge Your Package</SectionTitle>
                        <p className="text-lg text-gray-400 mt-4">Pick optional upgrades to dial in exactly what you need.</p>
                    </div>
                    <div className="max-w-3xl mx-auto mt-12 space-y-3">
                        {addonCategories.map(category => {
                            const CategoryIcon = category.icon;
                            return (
                                <div key={category.id} className="bg-[#0C0F16] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300">
                                    <button onClick={() => toggleAccordion(category.id)} className="w-full flex justify-between items-center p-5 text-left hover:bg-white/5 transition-colors" aria-expanded={openAccordion === category.id}>
                                        <div className="flex items-center">
                                            <IconWrapper className="mr-4 text-[#A071FF]"><CategoryIcon /></IconWrapper>
                                            <span className="font-semibold text-white text-base md:text-lg">{category.title}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                          <span className="text-xs text-gray-500 hidden sm:inline">From +CA${Math.min(...category.items.map(i => i.price))}</span>
                                          <ChevronIcon className={`transition-transform duration-300 ${openAccordion === category.id ? 'rotate-180' : ''}`} />
                                        </div>
                                    </button>
                                    {openAccordion === category.id && (
                                        <div className="px-5 pb-5 bg-black/20">
                                            <div className="border-t border-white/10 pt-5 space-y-5">
                                                {category.items.map((item, index) => (
                                                    <label key={index} className="flex items-start cursor-pointer group">
                                                         <div className="mt-1 mr-4 flex items-center">
                                                            <input type="checkbox" className="sr-only peer" checked={!!selectedAddons[item.name]} onChange={() => handleAddonToggle(item.name)} />
                                                            <div className="w-5 h-5 bg-gray-800 rounded-md border-2 border-gray-600 flex items-center justify-center peer-checked:bg-[#A071FF] peer-checked:border-[#A071FF] transition-all duration-200">
                                                                <svg className="w-3 h-3 text-black hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow">
                                                            <div className="flex justify-between items-start gap-4">
                                                                <p className="font-medium text-gray-200 text-base leading-snug group-hover:text-white transition-colors">{item.name}</p>
                                                                <p className="font-mono text-base text-[#B394FF] whitespace-nowrap">+CA${item.price}</p>
                                                            </div>
                                                            <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{item.description}</p>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </Section>
                
                <Section>
                     <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#402269] to-[#27123E] border border-[#B394FF]/30 shadow-2xl shadow-[#B394FF]/10">
                        <h2 className="text-2xl font-bold text-white text-center mb-2">Limited-Time December Offer</h2>
                        <p className="text-base text-gray-300 text-center mb-8">Book before <span className="font-semibold text-white">November 25th</span> and stack these bonuses:</p>
                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-base text-gray-200 max-w-2xl mx-auto mb-10">
                            <div className="flex items-center"><CheckIcon /><span className="ml-3"><strong>15% OFF</strong> any package (save up to CA$150)</span></div>
                            <div className="flex items-center"><CheckIcon /><span className="ml-3"><strong>FREE</strong> express delivery (CA$100 value)</span></div>
                            <div className="flex items-center"><CheckIcon /><span className="ml-3"><strong>PRIORITY</strong> scheduling in the shoot calendar</span></div>
                            <div className="flex items-center"><CheckIcon /><span className="ml-3"><strong>FREE</strong> social caption templates (CA$75 value)</span></div>
                        </div>
                        <div className="text-center">
                            <div className="inline-block bg-[#F6C26E]/20 border border-[#F6C26E]/50 text-[#F6C26E] text-sm font-semibold text-center py-2 px-5 rounded-full">
                                Only 8 spots left for guaranteed pre-Christmas delivery.
                            </div>
                        </div>
                     </div>
                </Section>
                
                <Section className="text-center">
                    <SectionTitle>Ready for Your Best Holiday Season Yet?</SectionTitle>
                    <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Reply with your chosen package and a bit about your products. I’ll handle the visuals that sell them.</p>
                     <div className="mt-8 flex justify-center items-center gap-2">
                        {packages.map(p => (
                            <button key={p.title} onClick={() => setActivePackage(p.title)} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 ${activePackage === p.title ? 'bg-[#A071FF] text-black' : 'bg-white/5 hover:bg-white/10 text-white'}`}>
                                {p.title}
                            </button>
                        ))}
                    </div>
                    <div className="max-w-lg mx-auto mt-6">
                        <p className="text-xs text-gray-500 mb-2">Tap to copy and paste into Messenger, Instagram, or email.</p>
                        <div onClick={handleCopy} className="cursor-pointer text-left text-sm text-gray-400 border border-white/10 bg-[#10121A] rounded-xl p-4 flex justify-between items-center gap-4 group hover:border-white/20 transition-colors">
                            <div className="flex-grow">
                                <MessageDisplay />
                            </div>
                            <div className="flex flex-col items-center text-gray-500 group-hover:text-white transition-colors flex-shrink-0">
                                <CopyIcon />
                                <span className="text-xs mt-1">Copy</span>
                            </div>
                        </div>
                    </div>
                </Section>
            </main>
            {showToast && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white text-black text-sm font-semibold py-2 px-4 rounded-full shadow-lg z-50">
                    Copied to clipboard
                </div>
            )}
        </div>
    );
};

export default App;
