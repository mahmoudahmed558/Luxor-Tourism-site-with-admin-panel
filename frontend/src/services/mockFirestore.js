// src/services/mockFirestore.js
// A frontend-only mock mimicking Firebase Firestore SDK functions used by OurTravels and UserTravels

export const db = {}; // Mock db instance

// In-memory mock collections
const mockData = {
    vehicles: [
        {
            id: "v1",
            type: "sedan",
            name: { en: "Sedan", ar: "سيدان" },
            icon: "FaCar",
            capacity: 3,
            price: 500,
            popularity: 90,
            rating: 4.8,
            color: "#3B82F6",
            description: { en: "Comfortable sedan for small groups", ar: "سيدان مريح للمجموعات الصغيرة" },
            features: { en: ["Air Conditioning", "GPS", "WiFi"], ar: ["تكييف", "GPS", "واي فاي"] },
        },
        {
            id: "v2",
            type: "minibus",
            name: { en: "Minivan", ar: "ميني فان" },
            icon: "FaBus",
            capacity: 6,
            price: 800,
            popularity: 85,
            rating: 4.6,
            color: "#10B981",
            description: { en: "Spacious minivan for medium groups", ar: "ميني فان واسع للمجموعات المتوسطة" },
            features: { en: ["Air Conditioning", "GPS", "Luggage Space"], ar: ["تكييف", "GPS", "مساحة أمتعة"] },
        },
        {
            id: "v3",
            type: "minibus",
            name: { en: "Minibus", ar: "ميني باص" },
            icon: "FaBus",
            capacity: 15,
            price: 1500,
            popularity: 80,
            rating: 4.5,
            color: "#F59E0B",
            description: { en: "Large minibus for big groups", ar: "ميني باص كبير للمجموعات الكبيرة" },
            features: { en: ["Air Conditioning", "GPS", "Luggage Space", "USB Charging"], ar: ["تكييف", "GPS", "مساحة أمتعة", "شحن USB"] },
        },
    ],
    locations: [
        { id: "loc1", governorate: { en: "Cairo", ar: "القاهرة" }, city: { en: "Cairo", ar: "القاهرة" }, popularity: 95 },
        { id: "loc2", governorate: { en: "Giza", ar: "الجيزة" }, city: { en: "Giza", ar: "الجيزة" }, popularity: 92 },
        { id: "loc3", governorate: { en: "Red Sea", ar: "البحر الأحمر" }, city: { en: "Hurghada", ar: "الغردقة" }, popularity: 88 },
        { id: "loc4", governorate: { en: "South Sinai", ar: "جنوب سيناء" }, city: { en: "Sharm El-Sheikh", ar: "شرم الشيخ" }, popularity: 85 },
    ],
    routes: [
        { id: "r1", departureGovernorate: "Cairo", destinationGovernorate: "Alexandria", prices: { v1: 1000, v2: 1500, v3: 2500 } },
        { id: "r2", departureGovernorate: "Cairo", destinationGovernorate: "Red Sea", prices: { v1: 2500, v2: 3500, v3: 5000 } },
    ],
    testimonials: [
        { id: "t1", name: "Ahmed S.", rating: 5, comment: { en: "Great service!", ar: "خدمة ممتازة!" }, verified: true, date: "2023-10-01" },
        { id: "t2", name: "Sarah M.", rating: 4, comment: { en: "Very professional.", ar: "احترافية عالية." }, verified: true, date: "2023-10-15" },
    ],
    tours: [
        { id: "tour1", name: { en: "Pyramids Tour", ar: "جولة الأهرامات" }, city: "Giza", duration: 4, price: 50, types: ["historical"], vehicleType: "minivan", popularity: 98, rating: 4.9, shortDescription: { en: "Visit the Great Pyramids", ar: "زيارة الأهرامات العظيمة" } },
        { id: "tour2", name: { en: "Nile Cruise", ar: "كروز النيل" }, city: "Cairo", duration: 3, price: 80, types: ["cultural"], vehicleType: "all", popularity: 85, rating: 4.7, shortDescription: { en: "Enjoy a relaxing cruise", ar: "استمتع برحلة بحرية مريحة" } },
    ],
    bookings: []
};

// Mock SDK Functions
export const collection = (dbInstance, collectionName) => collectionName;

export const query = (col, ...args) => ({ collection: col, args });

export const orderBy = (field, dir) => ({ type: 'orderBy', field, dir });

export const where = (field, op, val) => ({ type: 'where', field, op, val });

export const onSnapshot = (queryObj, onNext, onError) => {
    const colName = typeof queryObj === 'string' ? queryObj : queryObj.collection;
    const data = mockData[colName] || [];

    // Simulate async Firebase behavior
    Promise.resolve().then(() => {
        onNext({
            docs: data.map(item => ({
                id: item.id,
                data: () => item
            }))
        });
    });

    return () => { }; // mock unsubscribe
};

export const getDocs = async (queryObj) => {
    const colName = typeof queryObj === 'string' ? queryObj : queryObj.collection;
    const data = mockData[colName] || [];
    return {
        docs: data.map(item => ({
            id: item.id,
            data: () => item
        }))
    };
};

export const getDoc = async (docRef) => {
    const data = mockData[docRef.collection]?.find(item => item.id === docRef.id);
    if (!data) return { exists: () => false };
    return {
        exists: () => true,
        id: data.id,
        data: () => data
    };
};

export const addDoc = async (colName, data) => {
    const newDoc = { id: `doc_${Date.now()}`, ...data };
    if (!mockData[colName]) mockData[colName] = [];
    mockData[colName].push(newDoc);
    return { id: newDoc.id };
};

export const doc = (dbInstance, collectionName, id) => ({ collection: collectionName, id });

export const updateDoc = async (docRef, data) => {
    const itemIndex = mockData[docRef.collection]?.findIndex(item => item.id === docRef.id);
    if (itemIndex > -1) {
        // Very basic mock update
        mockData[docRef.collection][itemIndex] = { ...mockData[docRef.collection][itemIndex], ...data };
    }
};

export const increment = (val) => val; // Dummy increment

export const serverTimestamp = () => new Date().toISOString();
