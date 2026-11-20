<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Program;
use App\Models\Trip;
use App\Models\City;
use App\Models\Booking;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // ═══════════════════════════════════════════
        // USERS
        // ═══════════════════════════════════════════

        $admin = User::updateOrCreate(['email' => 'admin@sya7a.eg'], [
            'name' => 'مدير النظام',
            'role' => 'admin',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        $tourist = User::updateOrCreate(['email' => 'tourist@sya7a.eg'], [
            'name' => 'سائح تجريبي',
            'role' => 'tourist',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        // ═══════════════════════════════════════════
        // PROGRAMS (from frontend programs.js)
        // ═══════════════════════════════════════════

        $programs = [
            [
                'title' => ['ar' => 'سحر القاهرة القديمة', 'en' => 'Magic of Old Cairo'],
                'description' => ['ar' => 'استكشف أهرامات الجيزة، والمتحف المصري، وخان الخليلي في جولة لا تُنسى.', 'en' => 'Explore the Giza Pyramids, the Egyptian Museum, and Khan el-Khalili in an unforgettable tour.'],
                'duration' => 3,
                'price' => 4500,
                'discount' => 10,
                'locations' => [['ar' => 'القاهرة', 'en' => 'Cairo'], ['ar' => 'الجيزة', 'en' => 'Giza']],
                'images' => [
                    'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80&w=2070&auto=format&fit=crop',
                ],
                'rating' => 4.8,
                'featured' => true,
                'city' => 'Cairo',
                'is_active' => true,
            ],
            [
                'title' => ['ar' => 'رحلة النيل الخالدة: الأقصر وأسوان', 'en' => 'Eternal Nile Cruise: Luxor & Aswan'],
                'description' => ['ar' => 'استمتع برحلة نيلية فاخرة واكتشف معابد الكرنك، حتشبسوت، ومعبد فيلة الرائع.', 'en' => 'Enjoy a luxury Nile cruise and discover Karnak temples, Hatshepsut, and the amazing Philae Temple.'],
                'duration' => 5,
                'price' => 8500,
                'discount' => 0,
                'locations' => [['ar' => 'الأقصر', 'en' => 'Luxor'], ['ar' => 'أسوان', 'en' => 'Aswan']],
                'images' => [
                    'https://images.unsplash.com/photo-1600521605536-31b34c264d50?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1621532585292-1dc3bdc72475?q=80&w=2070&auto=format&fit=crop',
                ],
                'rating' => 4.9,
                'featured' => true,
                'city' => 'Luxor',
                'is_active' => true,
            ],
            [
                'title' => ['ar' => 'مغامرة شرم الشيخ وسفاري الصحراء', 'en' => 'Sharm El Sheikh Adventure & Desert Safari'],
                'description' => ['ar' => 'غوص في البحر الأحمر المذهل، واستمتع برحلات السفاري المثيرة والعشاء البدوي.', 'en' => 'Dive into the stunning Red Sea, enjoy thrilling desert safaris and Bedouin dinners.'],
                'duration' => 4,
                'price' => 6200,
                'discount' => 15,
                'locations' => [['ar' => 'شرم الشيخ', 'en' => 'Sharm El Sheikh'], ['ar' => 'جنوب سيناء', 'en' => 'South Sinai']],
                'images' => [
                    'https://images.unsplash.com/photo-1623190861114-11002eec8b36?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1549886326-8c46fb7a72d7?q=80&w=2070&auto=format&fit=crop',
                ],
                'rating' => 4.7,
                'featured' => false,
                'city' => 'Sharm El Sheikh',
                'is_active' => true,
            ],
            [
                'title' => ['ar' => 'استرخاء في عروس البحر الأبيض', 'en' => 'Relaxation in the Pearl of the Mediterranean'],
                'description' => ['ar' => 'يومان من الاسترخاء في الإسكندرية مع زيارة لمكتبة الإسكندرية وقلعة قايتباي.', 'en' => 'Two days of relaxation in Alexandria, visiting the Library of Alexandria and Qaitbay Citadel.'],
                'duration' => 2,
                'price' => 2800,
                'discount' => 0,
                'locations' => [['ar' => 'الإسكندرية', 'en' => 'Alexandria']],
                'images' => [
                    'https://images.unsplash.com/photo-1560693952-6aedb04f7a22?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1579565551988-7579f166a9e8?q=80&w=2070&auto=format&fit=crop',
                ],
                'rating' => 4.5,
                'featured' => false,
                'city' => 'Alexandria',
                'is_active' => true,
            ],
            [
                'title' => ['ar' => 'الغردقة والجزر الساحرة', 'en' => 'Hurghada & The Magical Islands'],
                'description' => ['ar' => 'رحلات بحرية إلى جزيرة الجفتون، الغطس مع الدلافين، والاستمتاع بالشواطئ الرملية.', 'en' => 'Boat trips to Giftun Island, snorkeling with dolphins, and enjoying sandy beaches.'],
                'duration' => 5,
                'price' => 7500,
                'discount' => 5,
                'locations' => [['ar' => 'الغردقة', 'en' => 'Hurghada'], ['ar' => 'جزيرة الجفتون', 'en' => 'Giftun Island']],
                'images' => [
                    'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?q=80&w=2069&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1568843940179-c56aebc1b35b?q=80&w=2069&auto=format&fit=crop',
                ],
                'rating' => 4.6,
                'featured' => true,
                'city' => 'Hurghada',
                'is_active' => true,
            ],
            [
                'title' => ['ar' => 'اكتشاف واحة سيوة وبحر الرمال الأعظم', 'en' => 'Discover Siwa Oasis & Great Sand Sea'],
                'description' => ['ar' => 'تجربة فريدة في قلب الصحراء، الاستحمام في عيون المياه الكبريتية وتأمل النجوم.', 'en' => 'A unique experience in the heart of the desert, bathing in sulfur springs and stargazing.'],
                'duration' => 6,
                'price' => 9200,
                'discount' => 20,
                'locations' => [['ar' => 'سيوة', 'en' => 'Siwa Oasis'], ['ar' => 'الصحراء الغربية', 'en' => 'Western Desert']],
                'images' => [
                    'https://images.unsplash.com/photo-1616086776185-3e284a1d4b68?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2076&auto=format&fit=crop',
                ],
                'rating' => 4.9,
                'featured' => false,
                'city' => 'Siwa',
                'is_active' => true,
            ],
        ];

        $createdPrograms = [];
        foreach ($programs as $program) {
            $createdPrograms[] = Program::create($program);
        }

        // ═══════════════════════════════════════════
        // TRIPS (from frontend trips.js — all 10 trips)
        // ═══════════════════════════════════════════

        $trips = [
            [
                'from_city' => ['ar' => 'القاهرة', 'en' => 'Cairo', 'cn' => '开罗'],
                'to_city' => ['ar' => 'الإسكندرية', 'en' => 'Alexandria', 'cn' => '亚历山大'],
                'from_points' => ['ar' => ['وسط البلد', 'الجيزة', 'مصر الجديدة'], 'en' => ['Downtown', 'Giza', 'Heliopolis'], 'cn' => ['市中心', '吉萨', '赫利奥波利斯']],
                'to_points' => ['ar' => ['مكتبة الإسكندرية', 'قلعة قايتباي', 'قصر المنتزه'], 'en' => ['Alexandria Library', 'Qaitbay Citadel', 'Montaza Palace'], 'cn' => ['亚历山大图书馆', '凯特贝城堡', '蒙塔扎宫']],
                'car_model' => ['ar' => 'تويوتا كورولا 2022', 'en' => 'Toyota Corolla 2022', 'cn' => '丰田卡罗拉 2022'],
                'time' => ['ar' => '08:00 ص', 'en' => '08:00 AM', 'cn' => '上午08:00'],
                'available' => true,
                'duration' => ['ar' => '3 ساعات', 'en' => '3 hours', 'cn' => '3小时'],
                'price' => 250,
                'amenities' => ['ar' => ['تكييف', 'واي فاي', 'منافذ شحن'], 'en' => ['AC', 'WiFi', 'Charging Ports'], 'cn' => ['空调', '无线网络', '充电口']],
                'rating' => 4.5,
            ],
            [
                'from_city' => ['ar' => 'القاهرة', 'en' => 'Cairo', 'cn' => '开罗'],
                'to_city' => ['ar' => 'الأقصر', 'en' => 'Luxor', 'cn' => '卢克索'],
                'from_points' => ['ar' => ['ميدان التحرير', 'برج القاهرة'], 'en' => ['Tahrir Square', 'Cairo Tower'], 'cn' => ['解放广场', '开罗塔']],
                'to_points' => ['ar' => ['معبد الكرنك', 'وادي الملوك', 'معبد الأقصر'], 'en' => ['Karnak Temple', 'Valley of the Kings', 'Luxor Temple'], 'cn' => ['卡尔纳克神庙', '帝王谷', '卢克索神庙']],
                'car_model' => ['ar' => 'هيونداي إلنترا 2023', 'en' => 'Hyundai Elantra 2023', 'cn' => '现代伊兰特 2023'],
                'time' => ['ar' => '11:00 ص', 'en' => '11:00 AM', 'cn' => '上午11:00'],
                'available' => true,
                'duration' => ['ar' => '9 ساعات', 'en' => '9 hours', 'cn' => '9小时'],
                'price' => 400,
                'amenities' => ['ar' => ['تكييف', 'مقاعد متحركة', 'تلفزيون'], 'en' => ['AC', 'Reclining Seats', 'TV'], 'cn' => ['空调', '可调座椅', '电视']],
                'rating' => 4.2,
            ],
            [
                'from_city' => ['ar' => 'الإسكندرية', 'en' => 'Alexandria', 'cn' => '亚历山大'],
                'to_city' => ['ar' => 'القاهرة', 'en' => 'Cairo', 'cn' => '开罗'],
                'from_points' => ['ar' => ['كوبري ستانلي', 'سيدي جابر'], 'en' => ['Stanley Bridge', 'Sidi Gaber'], 'cn' => ['斯坦利桥', '西迪加贝尔']],
                'to_points' => ['ar' => ['المتحف المصري', 'خان الخليلي'], 'en' => ['Egyptian Museum', 'Khan el-Khalili'], 'cn' => ['埃及博物馆', '哈利利市场']],
                'car_model' => ['ar' => 'نيسان ساني 2021', 'en' => 'Nissan Sunny 2021', 'cn' => '日产阳光 2021'],
                'time' => ['ar' => '05:00 م', 'en' => '05:00 PM', 'cn' => '下午05:00'],
                'available' => false,
                'duration' => ['ar' => '3 ساعات و 30 دقيقة', 'en' => '3 hours 30 mins', 'cn' => '3小时30分钟'],
                'price' => 220,
                'amenities' => ['ar' => ['تكييف', 'مساحة أمتعة'], 'en' => ['AC', 'Luggage Space'], 'cn' => ['空调', '行李空间']],
                'rating' => 3.9,
            ],
            [
                'from_city' => ['ar' => 'الأقصر', 'en' => 'Luxor', 'cn' => '卢克索'],
                'to_city' => ['ar' => 'أسوان', 'en' => 'Aswan', 'cn' => '阿斯旺'],
                'from_points' => ['ar' => ['مطار الأقصر', 'قصر الشتاء'], 'en' => ['Luxor Airport', 'Winter Palace'], 'cn' => ['卢克索机场', '冬宫']],
                'to_points' => ['ar' => ['معبد فيلة', 'السد العالي', 'قرية نوبية'], 'en' => ['Philae Temple', 'High Dam', 'Nubian Village'], 'cn' => ['菲莱神庙', '高坝', '努比亚村']],
                'car_model' => ['ar' => 'كيا سبورتاج 2022', 'en' => 'Kia Sportage 2022', 'cn' => '起亚狮跑 2022'],
                'time' => ['ar' => '02:00 م', 'en' => '02:00 PM', 'cn' => '下午02:00'],
                'available' => true,
                'duration' => ['ar' => '4 ساعات', 'en' => '4 hours', 'cn' => '4小时'],
                'price' => 300,
                'amenities' => ['ar' => ['تكييف', 'واي فاي', 'منافذ USB'], 'en' => ['AC', 'WiFi', 'USB Ports'], 'cn' => ['空调', '无线网络', 'USB接口']],
                'rating' => 4.7,
            ],
            [
                'from_city' => ['ar' => 'الجيزة', 'en' => 'Giza', 'cn' => '吉萨'],
                'to_city' => ['ar' => 'الفيوم', 'en' => 'Fayoum', 'cn' => '法尤姆'],
                'from_points' => ['ar' => ['منطقة الأهرامات', 'حديقة الحيوانات'], 'en' => ['Pyramids Area', 'Giza Zoo'], 'cn' => ['金字塔区', '吉萨动物园']],
                'to_points' => ['ar' => ['وادي الريان', 'قرية تونس'], 'en' => ['Wadi El-Rayan', 'Tunis Village'], 'cn' => ['赖扬谷', '突尼斯村']],
                'car_model' => ['ar' => 'شيفروليه أوبترا 2020', 'en' => 'Chevrolet Optra 2020', 'cn' => '雪佛兰欧宝 2020'],
                'time' => ['ar' => '07:30 ص', 'en' => '07:30 AM', 'cn' => '上午07:30'],
                'available' => true,
                'duration' => ['ar' => 'ساعتان', 'en' => '2 hours', 'cn' => '2小时'],
                'price' => 150,
                'amenities' => ['ar' => ['تكييف'], 'en' => ['AC'], 'cn' => ['空调']],
                'rating' => 3.8,
            ],
            [
                'from_city' => ['ar' => 'الغردقة', 'en' => 'Hurghada', 'cn' => '赫尔格达'],
                'to_city' => ['ar' => 'القاهرة', 'en' => 'Cairo', 'cn' => '开罗'],
                'from_points' => ['ar' => ['مارينا الغردقة', 'الجونة'], 'en' => ['Marina Hurghada', 'El Gouna'], 'cn' => ['赫尔格达码头', '艾尔古纳']],
                'to_points' => ['ar' => ['مدينة نصر', 'القاهرة الجديدة'], 'en' => ['Nasr City', 'New Cairo'], 'cn' => ['纳斯尔城', '新开罗']],
                'car_model' => ['ar' => 'رينو لوجان 2021', 'en' => 'Renault Logan 2021', 'cn' => '雷诺洛根 2021'],
                'time' => ['ar' => '09:00 ص', 'en' => '09:00 AM', 'cn' => '上午09:00'],
                'available' => false,
                'duration' => ['ar' => '6 ساعات', 'en' => '6 hours', 'cn' => '6小时'],
                'price' => 350,
                'amenities' => ['ar' => ['تكييف', 'وجبات خفيفة'], 'en' => ['AC', 'Snacks'], 'cn' => ['空调', '小吃']],
                'rating' => 4.0,
            ],
            [
                'from_city' => ['ar' => 'أسوان', 'en' => 'Aswan', 'cn' => '阿斯旺'],
                'to_city' => ['ar' => 'سوهاج', 'en' => 'Sohag', 'cn' => '索哈杰'],
                'from_points' => ['ar' => ['مطار أسوان', 'جزيرة الفنتين'], 'en' => ['Aswan Airport', 'Elephantine Island'], 'cn' => ['阿斯旺机场', '象岛']],
                'to_points' => ['ar' => ['جامعة سوهاج', 'الدير الأبيض'], 'en' => ['Sohag University', 'White Monastery'], 'cn' => ['索哈杰大学', '白色修道院']],
                'car_model' => ['ar' => 'تويوتا فورتشنر 2022', 'en' => 'Toyota Fortuner 2022', 'cn' => '丰田奔跑者 2022'],
                'time' => ['ar' => '12:00 م', 'en' => '12:00 PM', 'cn' => '中午12:00'],
                'available' => true,
                'duration' => ['ar' => '5 ساعات و 30 دقيقة', 'en' => '5 hours 30 mins', 'cn' => '5小时30分钟'],
                'price' => 280,
                'amenities' => ['ar' => ['تكييف', 'واي فاي', 'زجاجات مياه'], 'en' => ['AC', 'WiFi', 'Water Bottles'], 'cn' => ['空调', '无线网络', '瓶装水']],
                'rating' => 4.3,
            ],
            [
                'from_city' => ['ar' => 'شرم الشيخ', 'en' => 'Sharm El Sheikh', 'cn' => '沙姆沙伊赫'],
                'to_city' => ['ar' => 'السويس', 'en' => 'Suez', 'cn' => '苏伊士'],
                'from_points' => ['ar' => ['خليج نعمة', 'سوق شرم القديم'], 'en' => ['Naama Bay', 'Sharm Old Market'], 'cn' => ['纳马湾', '沙姆老市场']],
                'to_points' => ['ar' => ['قناة السويس', 'بورتوفيق'], 'en' => ['Suez Canal', 'Port Tawfik'], 'cn' => ['苏伊士运河', '陶菲克港']],
                'car_model' => ['ar' => 'فورد فوكس 2023', 'en' => 'Ford Focus 2023', 'cn' => '福特福克斯 2023'],
                'time' => ['ar' => '04:00 م', 'en' => '04:00 PM', 'cn' => '下午04:00'],
                'available' => true,
                'duration' => ['ar' => '3 ساعات و 45 دقيقة', 'en' => '3 hours 45 mins', 'cn' => '3小时45分钟'],
                'price' => 320,
                'amenities' => ['ar' => ['تكييف', 'منافذ شحن'], 'en' => ['AC', 'Charging Ports'], 'cn' => ['空调', '充电口']],
                'rating' => 4.6,
            ],
            [
                'from_city' => ['ar' => 'طنطا', 'en' => 'Tanta', 'cn' => '坦塔'],
                'to_city' => ['ar' => 'القاهرة', 'en' => 'Cairo', 'cn' => '开罗'],
                'from_points' => ['ar' => ['جامعة طنطا', 'مسجد السيد البدوي'], 'en' => ['Tanta University', 'El-Sayed El-Badawi Mosque'], 'cn' => ['坦塔大学', '赛义德巴达维清真寺']],
                'to_points' => ['ar' => ['كايرو فيستيفال سيتي', 'المعادي'], 'en' => ['Cairo Festival City', 'Maadi'], 'cn' => ['开罗节日城', '马迪']],
                'car_model' => ['ar' => 'هوندا سيفيك 2022', 'en' => 'Honda Civic 2022', 'cn' => '本田思域 2022'],
                'time' => ['ar' => '06:30 ص', 'en' => '06:30 AM', 'cn' => '上午06:30'],
                'available' => true,
                'duration' => ['ar' => 'ساعتان و 15 دقيقة', 'en' => '2 hours 15 mins', 'cn' => '2小时15分钟'],
                'price' => 180,
                'amenities' => ['ar' => ['تكييف', 'مجلات'], 'en' => ['AC', 'Magazines'], 'cn' => ['空调', '杂志']],
                'rating' => 4.1,
            ],
            [
                'from_city' => ['ar' => 'المنصورة', 'en' => 'Mansoura', 'cn' => '曼苏拉'],
                'to_city' => ['ar' => 'الإسكندرية', 'en' => 'Alexandria', 'cn' => '亚历山大'],
                'from_points' => ['ar' => ['جامعة المنصورة', 'كورنيش النيل'], 'en' => ['Mansoura University', 'Nile Corniche'], 'cn' => ['曼苏拉大学', '尼罗河滨海路']],
                'to_points' => ['ar' => ['سان ستيفانو', 'سيدي بشر'], 'en' => ['San Stefano', 'Sidi Bishr'], 'cn' => ['圣斯特凡诺', '西迪比什尔']],
                'car_model' => ['ar' => 'سكودا أوكتافيا 2021', 'en' => 'Skoda Octavia 2021', 'cn' => '斯柯达明锐 2021'],
                'time' => ['ar' => '03:00 م', 'en' => '03:00 PM', 'cn' => '下午03:00'],
                'available' => false,
                'duration' => ['ar' => '4 ساعات و 15 دقيقة', 'en' => '4 hours 15 mins', 'cn' => '4小时15分钟'],
                'price' => 270,
                'amenities' => ['ar' => ['تكييف', 'بطانيات'], 'en' => ['AC', 'Blankets'], 'cn' => ['空调', '毯子']],
                'rating' => 4.0,
            ],
        ];

        foreach ($trips as $trip) {
            Trip::create($trip);
        }

        // ═══════════════════════════════════════════
        // CITIES (from frontend cities.js — all 15 cities)
        // ═══════════════════════════════════════════

        $cities = [
            ['name' => ['ar' => 'الاقصر', 'en' => 'Luxor', 'cn' => '卢克索'], 'points' => ['ar' => ['اسنا', 'الاقصر', 'معبد الكرنك', 'وادي الملوك'], 'en' => ['Esna', 'Luxor', 'Karnak Temple', 'Valley of the Kings'], 'cn' => ['伊斯纳', '卢克索', '卡尔纳克神庙', '帝王谷']]],
            ['name' => ['ar' => 'اسوان', 'en' => 'Aswan', 'cn' => '阿斯旺'], 'points' => ['ar' => ['كوم امبو', 'ادفو', 'ابو سمببل', 'جزيرة الفنتين'], 'en' => ['Kom Ombo', 'Edfu', 'Abu Simbel', 'Elephantine Island'], 'cn' => ['孔翁布', '埃德富', '阿布辛贝神庙', '象岛']]],
            ['name' => ['ar' => 'اسكندريه', 'en' => 'Alexandria', 'cn' => '亚历山大'], 'points' => ['ar' => ['المكتبة الاسكندرية', 'قلعة قايتباي', 'عمود السواري'], 'en' => ['Alexandria Library', 'Qaitbay Citadel', "Pompey's Pillar"], 'cn' => ['亚历山大图书馆', '凯特贝城堡', '庞贝柱']]],
            ['name' => ['ar' => 'القاهره', 'en' => 'Cairo', 'cn' => '开罗'], 'points' => ['ar' => ['الاهرامات', 'المتحف المصري', 'قلعة صلاح الدين', 'حي المعز'], 'en' => ['Pyramids', 'Egyptian Museum', 'Citadel of Salah El-Din', 'Al-Muizz Street'], 'cn' => ['金字塔', '埃及博物馆', '萨拉丁城堡', '穆伊兹街']]],
            ['name' => ['ar' => 'الغردقه', 'en' => 'Hurghada', 'cn' => '赫尔格达'], 'points' => ['ar' => ['الجفتون', 'الجونة', 'سفاجا', 'جزيرة الجفتون الكبير'], 'en' => ['Giftun', 'El Gouna', 'Safaga', 'Big Giftun Island'], 'cn' => ['吉夫通岛', '艾尔古纳', '萨法加', '大吉夫通岛']]],
            ['name' => ['ar' => 'مرسي مطروح', 'en' => 'Marsa Matrouh', 'cn' => '马尔萨马特鲁'], 'points' => ['ar' => ['شاطئ عجيبة', 'كهف روميل', 'الضبعة'], 'en' => ['Agiba Beach', 'Rommel Cave', 'El-Dabaa'], 'cn' => ['阿吉巴海滩', '罗梅尔洞', '达巴阿']]],
            ['name' => ['ar' => 'سيوه', 'en' => 'Siwa', 'cn' => '锡瓦'], 'points' => ['ar' => ['واحة سيوة', 'جبل الموتى', 'معبد آمون'], 'en' => ['Siwa Oasis', 'Mountain of the Dead', 'Temple of Amun'], 'cn' => ['锡瓦绿洲', '亡者之山', '阿蒙神庙']]],
            ['name' => ['ar' => 'الواحات', 'en' => 'Oases', 'cn' => '绿洲群'], 'points' => ['ar' => ['الواحات البحرية', 'واحة الفرافرة', 'واحة الداخلة'], 'en' => ['Bahariya Oasis', 'Farafra Oasis', 'Dakhla Oasis'], 'cn' => ['巴哈利亚绿洲', '法拉夫拉绿洲', '达赫拉绿洲']]],
            ['name' => ['ar' => 'قنا', 'en' => 'Qena', 'cn' => '基纳'], 'points' => ['ar' => ['معبد دندرة', 'مدينة قنا', 'معبد هيبونيس'], 'en' => ['Dendera Temple', 'Qena City', 'Temple of Hipponos'], 'cn' => ['丹德拉神庙', '基纳市', '希波诺斯神庙']]],
            ['name' => ['ar' => 'سوهاج', 'en' => 'Sohag', 'cn' => '索哈杰'], 'points' => ['ar' => ['معبد ابو دريس', 'البلينا', 'معبد سيتي الأول'], 'en' => ['Abu Dris Temple', 'El-Balyana', 'Temple of Seti I'], 'cn' => ['阿布德里斯神庙', '巴利亚纳', '塞提一世神庙']]],
            ['name' => ['ar' => 'الجيزة', 'en' => 'Giza', 'cn' => '吉萨'], 'points' => ['ar' => ['أهرامات الجيزة', 'ابو الهول', 'منطقة سقارة'], 'en' => ['Giza Pyramids', 'Sphinx', 'Saqqara Area'], 'cn' => ['吉萨金字塔', '狮身人面像', '萨卡拉地区']]],
            ['name' => ['ar' => 'الفيوم', 'en' => 'Faiyum', 'cn' => '法尤姆'], 'points' => ['ar' => ['وادي الريان', 'قارون', 'مسجد قايتباي'], 'en' => ['Wadi El-Rayan', 'Lake Qarun', 'Qaitbay Mosque'], 'cn' => ['赖扬谷', '卡伦湖', '凯特贝清真寺']]],
            ['name' => ['ar' => 'المنيا', 'en' => 'Minya', 'cn' => '米尼亚'], 'points' => ['ar' => ['تل العمارنة', 'بنى حسن', 'مقابر تونا الجبل'], 'en' => ['Tell el-Amarna', 'Beni Hassan', 'Tuna el-Gebel Tombs'], 'cn' => ['阿马尔纳遗址', '贝尼哈桑', '图娜山墓群']]],
            ['name' => ['ar' => 'بني سويف', 'en' => 'Beni Suef', 'cn' => '贝尼苏韦夫'], 'points' => ['ar' => ['هرم ميدوم', 'وادي النطرون', 'دير الأنبا انطونيوس'], 'en' => ['Meidum Pyramid', 'Wadi El-Natroun', 'Monastery of Saint Anthony'], 'cn' => ['梅杜姆金字塔', '纳特龙谷', '圣安东尼修道院']]],
            ['name' => ['ar' => 'دمياط', 'en' => 'Damietta', 'cn' => '达米埃塔'], 'points' => ['ar' => ['شاطئ رأس البر', 'ميناء دمياط', 'كنيسة العذراء'], 'en' => ['Ras El Bar Beach', 'Damietta Port', 'Virgin Mary Church'], 'cn' => ['拉斯巴尔海滩', '达米埃塔港', '圣母教堂']]],
        ];

        foreach ($cities as $city) {
            City::create($city);
        }

        // ═══════════════════════════════════════════
        // SAMPLE BOOKINGS
        // ═══════════════════════════════════════════

        if (isset($createdPrograms[0])) {
            Booking::create([
                'user_id' => $tourist->id,
                'program_id' => $createdPrograms[0]->id,
                'program_title' => 'Magic of Old Cairo',
                'participants' => 2,
                'total_price' => 8100,
                'passenger_name' => 'سائح تجريبي',
                'phone' => '+201020849387',
                'status' => 'confirmed',
            ]);
        }

        if (isset($createdPrograms[1])) {
            Booking::create([
                'user_id' => $tourist->id,
                'program_id' => $createdPrograms[1]->id,
                'program_title' => 'Eternal Nile Cruise: Luxor & Aswan',
                'participants' => 1,
                'total_price' => 8500,
                'passenger_name' => 'سائح تجريبي',
                'phone' => '+201020849387',
                'status' => 'pending',
            ]);
        }
    }
}
