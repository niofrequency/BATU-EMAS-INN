import React from 'react';
import { HOTEL_AMENITIES } from '../data/rooms';
import { useLanguage } from '../context/LanguageContext';
import { 
  Wifi, 
  Waves, 
  UtensilsCrossed, 
  Clock, 
  Sparkles, 
  Car, 
  Star, 
  ExternalLink 
} from 'lucide-react';

export const AboutAmenities: React.FC = () => {
  const { lang } = useLanguage();

  const text = {
    en: {
      badge: "Sanctuary of Refined Luxury",
      heading: "A Golden Haven Built on Tradition & Modern Comfort",
      paragraph1: "Named after our iconic handcrafted glossy yellow floor tiles that gleam like polished amber in the morning sun, **BATU EMAS INN** offers guests an unforgettable blend of tropical tranquility and premier five-star hospitality.",
      paragraph2: "Whether you are relaxing in our Royal Emas Suite, dining at our waterfront restaurant, or unwinding in our infinity gold pool, our attentive staff ensures every moment of your stay exceeds expectations.",
      suitesLabel: "Luxury Suites",
      guestRatingLabel: "Google Guest Rating",
      reviewsCount: "Based on verified reviews",
      conciergeLabel: "Concierge",
      amenitiesBadge: "Resort Facilities",
      amenitiesHeading: "Curated Amenities for Your Stay",
      amenitiesSub: "Every detail is meticulously considered to provide comfort, relaxation, and bespoke hospitality.",
      googleReviewAction: "View Google Reviews"
    },
    id: {
      badge: "Suaka Kemewahan Berkelas",
      heading: "Surga Emas yang Dibangun atas Tradisi & Kenyamanan Modern",
      paragraph1: "Dinamai dari ubin lantai kuning mengkilap buatan tangan ikonik kami yang berkilau seperti amber yang dipoles di pagi matahari, **BATU EMAS INN** menawarkan kepada para tamu perpaduan tak terlupakan antara ketenangan tropis dan keramahtamahan bintang lima.",
      paragraph2: "Baik Anda bersantai di Suite Royal Emas kami, bersantap di restoran tepi laut kami, atau bersantai di kolam renang emas infinity kami, staf penuh perhatian kami memastikan setiap momen masa inap Anda melampaui harapan.",
      suitesLabel: "Suite Mewah",
      guestRatingLabel: "Rating Tamu Google",
      reviewsCount: "Berdasarkan ulasan terverifikasi",
      conciergeLabel: "Pramutamu",
      amenitiesBadge: "Fasilitas Resor",
      amenitiesHeading: "Fasilitas Pilihan untuk Masa Inap Anda",
      amenitiesSub: "Setiap detail dipertimbangkan dengan cermat untuk memberikan kenyamanan, relaksasi, dan keramahtamahan khusus.",
      googleReviewAction: "Lihat Ulasan Google"
    }
  }[lang];

  // Map string icon identifiers to Lucide components
  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wifi': return <Wifi className="w-6 h-6 text-amber-600" />;
      case 'Waves': return <Waves className="w-6 h-6 text-amber-600" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-6 h-6 text-amber-600" />;
      case 'Clock': return <Clock className="w-6 h-6 text-amber-600" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-600" />;
      case 'Car': return <Car className="w-6 h-6 text-amber-600" />;
      default: return <Sparkles className="w-6 h-6 text-amber-600" />;
    }
  };

  // Google Travel / Maps link provided
  const googleMapsReviewsUrl = "https://www.google.com/travel/search?q=batu%20emas%20inn&g2lb=4965990%2C72471280%2C72560029%2C72573224%2C72647020%2C72686036%2C72803964%2C72882230%2C73064764%2C73249150%2C121529350%2C121738283%2C121762713&hl=en-ID&gl=id&cs=1&ssta=1&ts=CAEaSQopEicyJTB4NjgyMzc3MzBlZGMwMzU2NToweDQ3NmZlMmRmZTFmOTFmNTkSHBIUCgcI6g8QBxgfEgcI6g8QCBgBGAEyBAgAEAAqBwoFOgNJRFI&qs=CAEyE0Nnb0kyYjdral83Yi1MZEhFQUU4AkIJCVkf-eHf4m9HQgkJWR_54d_ib0dIAA&ap=MAC6AQdyZXZpZXdz&ictx=111";

  return (
    <section id="overview" className="py-24 bg-stone-50 w-full overflow-hidden">
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 space-y-20">
        
        {/* About Intro Box */}
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{text.badge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            {text.heading}
          </h2>

          <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed font-light">
            <p dangerouslySetInnerHTML={{ __html: text.paragraph1 }} />
            <p>{text.paragraph2}</p>
          </div>

          {/* Key Metrics Bar including Real Google Rating Widget */}
          <div className="pt-8 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
            
            {/* Suites Stat */}
            <div>
              <div className="font-serif text-4xl sm:text-5xl font-extrabold text-amber-700">48+</div>
              <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mt-1">{text.suitesLabel}</div>
            </div>

            {/* Google Verified Rating Widget */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs hover:border-amber-400 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 font-serif text-3xl sm:text-4xl font-extrabold text-stone-900">
                  <span>4.9</span>
                  <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                </div>
                <a
                  href={googleMapsReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors"
                  title={text.googleReviewAction}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="text-xs font-bold text-stone-800 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {text.guestRatingLabel}
              </div>
              <div className="text-[10px] text-stone-400 mt-0.5">{text.reviewsCount}</div>
            </div>

            {/* Concierge Stat */}
            <div>
              <div className="font-serif text-4xl sm:text-5xl font-extrabold text-amber-700">24/7</div>
              <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mt-1">{text.conciergeLabel}</div>
            </div>

          </div>
        </div>

        {/* Resort Amenities Grid */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest px-3 py-1 bg-amber-50 rounded-full border border-amber-200">
              {text.amenitiesBadge}
            </span>
            <h3 className="font-serif text-3xl font-bold text-stone-900">
              {text.amenitiesHeading}
            </h3>
            <p className="text-stone-600 text-sm">
              {text.amenitiesSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOTEL_AMENITIES.map((amenity, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 space-y-4 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-stone-950 transition-all">
                  {getAmenityIcon(amenity.icon)}
                </div>

                <h4 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                  {amenity.title}
                </h4>

                <p className="text-stone-600 text-sm leading-relaxed font-light">
                  {amenity.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
