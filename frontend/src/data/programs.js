// src/data/programs.js

export const mockPrograms = [
    {
        id: "prog_1",
        title: {
            ar: "سحر القاهرة القديمة",
            en: "Magic of Old Cairo"
        },
        description: {
            ar: "استكشف أهرامات الجيزة، والمتحف المصري، وخان الخليلي في جولة لا تُنسى.",
            en: "Explore the Giza Pyramids, the Egyptian Museum, and Khan el-Khalili in an unforgettable tour."
        },
        duration: 3,
        price: 4500,
        discount: 10,
        locations: [
            { ar: "القاهرة", en: "Cairo" },
            { ar: "الجيزة", en: "Giza" }
        ],
        images: [
            "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=2070&auto=format&fit=crop", // Pyramids
            "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80&w=2070&auto=format&fit=crop"  // Cairo street
        ],
        rating: 4.8,
        featured: true
    },
    {
        id: "prog_2",
        title: {
            ar: "رحلة النيل الخالدة: الأقصر وأسوان",
            en: "Eternal Nile Cruise: Luxor & Aswan"
        },
        description: {
            ar: "استمتع برحلة نيلية فاخرة واكتشف معابد الكرنك، حتشبسوت، ومعبد فيلة الرائع.",
            en: "Enjoy a luxury Nile cruise and discover Karnak temples, Hatshepsut, and the amazing Philae Temple."
        },
        duration: 5,
        price: 8500,
        discount: 0,
        locations: [
            { ar: "الأقصر", en: "Luxor" },
            { ar: "أسوان", en: "Aswan" }
        ],
        images: [
            "https://images.unsplash.com/photo-1600521605536-31b34c264d50?q=80&w=2070&auto=format&fit=crop", // Luxor temple
            "https://images.unsplash.com/photo-1621532585292-1dc3bdc72475?q=80&w=2070&auto=format&fit=crop"  // Nile river
        ],
        rating: 4.9,
        featured: true
    },
    {
        id: "prog_3",
        title: {
            ar: "مغامرة شرم الشيخ وسفاري الصحراء",
            en: "Sharm El Sheikh Adventure & Desert Safari"
        },
        description: {
            ar: "غوص في البحر الأحمر المذهل، واستمتع برحلات السفاري المثيرة والعشاء البدوي.",
            en: "Dive into the stunning Red Sea, enjoy thrilling desert safaris and Bedouin dinners."
        },
        duration: 4,
        price: 6200,
        discount: 15,
        locations: [
            { ar: "شرم الشيخ", en: "Sharm El Sheikh" },
            { ar: "جنوب سيناء", en: "South Sinai" }
        ],
        images: [
            "https://images.unsplash.com/photo-1623190861114-11002eec8b36?q=80&w=2070&auto=format&fit=crop", // Red Sea
            "https://images.unsplash.com/photo-1549886326-8c46fb7a72d7?q=80&w=2070&auto=format&fit=crop"  // Safari
        ],
        rating: 4.7,
        featured: false
    },
    {
        id: "prog_4",
        title: {
            ar: "استرخاء في عروس البحر الأبيض",
            en: "Relaxation in the Pearl of the Mediterranean"
        },
        description: {
            ar: "يومان من الاسترخاء في الإسكندرية مع زيارة لمكتبة الإسكندرية وقلعة قايتباي.",
            en: "Two days of relaxation in Alexandria, visiting the Library of Alexandria and Qaitbay Citadel."
        },
        duration: 2,
        price: 2800,
        discount: 0,
        locations: [
            { ar: "الإسكندرية", en: "Alexandria" }
        ],
        images: [
            "https://images.unsplash.com/photo-1560693952-6aedb04f7a22?q=80&w=2070&auto=format&fit=crop", // Alexandria view
            "https://images.unsplash.com/photo-1579565551988-7579f166a9e8?q=80&w=2070&auto=format&fit=crop"  // Library/citadel style
        ],
        rating: 4.5,
        featured: false
    },
    {
        id: "prog_5",
        title: {
            ar: "الغردقة والجزر الساحرة",
            en: "Hurghada & The Magical Islands"
        },
        description: {
            ar: "رحلات بحرية إلى جزيرة الجفتون، الغطس مع الدلافين، والاستمتاع بالشواطئ الرملية.",
            en: "Boat trips to Giftun Island, snorkeling with dolphins, and enjoying sandy beaches."
        },
        duration: 5,
        price: 7500,
        discount: 5,
        locations: [
            { ar: "الغردقة", en: "Hurghada" },
            { ar: "جزيرة الجفتون", en: "Giftun Island" }
        ],
        images: [
            "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?q=80&w=2069&auto=format&fit=crop", // Hurghada beach
            "https://images.unsplash.com/photo-1568843940179-c56aebc1b35b?q=80&w=2069&auto=format&fit=crop"  // Dolphin/snorkeling
        ],
        rating: 4.6,
        featured: true
    },
    {
        id: "prog_6",
        title: {
            ar: "اكتشاف واحة سيوة وبحر الرمال الأعظم",
            en: "Discover Siwa Oasis & Great Sand Sea"
        },
        description: {
            ar: "تجربة فريدة في قلب الصحراء، الاستحمام في عيون المياه الكبريتية وتأمل النجوم.",
            en: "A unique experience in the heart of the desert, bathing in sulfur springs and stargazing."
        },
        duration: 6,
        price: 9200,
        discount: 20,
        locations: [
            { ar: "سيوة", en: "Siwa Oasis" },
            { ar: "الصحراء الغربية", en: "Western Desert" }
        ],
        images: [
            "https://images.unsplash.com/photo-1616086776185-3e284a1d4b68?q=80&w=2070&auto=format&fit=crop", // Desert oasis
            "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2076&auto=format&fit=crop"  // Desert sunset
        ],
        rating: 4.9,
        featured: false
    }
];
