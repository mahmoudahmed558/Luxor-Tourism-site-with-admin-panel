import { useState, useEffect } from 'react';
import PublicLayout from '../Layouts/PublicLayout';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Badge,
  Alert,
  Button,
  Navbar,
  Nav,
  Dropdown,
  Modal,
  Spinner,
  FloatingLabel
} from 'react-bootstrap';
import SEDAN from '../assets/SEDAN_temp.jpeg';
import SUV from '../assets/SUV_temp.jpeg';
import MINIBUS from '../assets/MINIBUS.jpg';
import TripCard from '../Components/TripCard';
import { usePage, router } from "@inertiajs/react";
import {
  FaMapMarkedAlt,
  FaSearch,
  FaInfoCircle,
  FaRoute,
  FaGlobe,
  FaCar,
  FaArrowRight,
  FaBus,
  FaUndo,
  FaUser,
  FaPhone,
  FaIdCard,
  FaUsers,
  FaCalendarCheck,
  FaClock,
  FaMoneyBillWave,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const Home = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromPoint, setFromPoint] = useState('');
  const [toPoint, setToPoint] = useState('');
  const [lang, setLang] = useState('ar');
  const [isLoading, setIsLoading] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [bookingData, setBookingData] = useState({
    name: '',
    nationality: '',
    phone: '',
    passengers: 1
  });
  const { trips = [], cities = [] } = usePage().props;
  // const [trips, setTrips] = useState([]);
  // const [cities, setCities] = useState([]);

  // Color scheme
  const colors = {
    primary: '#4F46E5',    // Indigo
    secondary: '#10B981',  // Emerald
    accent: '#F59E0B',     // Amber
    light: '#F3F4F6',      // Gray 100
    dark: '#1F2937',       // Gray 800
    background: '#F9FAFB'  // Gray 50
  };

  const [notifications, setNotifications] = useState([]);

  // Vehicle types data
  const vehicleTypes = {
    sedan: {
      name: { ar: "سيدان", en: "Sedan", cn: "轿车" },
      image: SEDAN,
      capacity: 5,
      priceMultiplier: 1,
      description: {
        ar: "سيارة مريحة لـ 5 ركاب",
        en: "Comfortable car for 5 passengers",
        cn: "舒适轿车，可容纳5人"
      }
    },
    suv: {
      name: { ar: "SUV", en: "SUV", cn: "越野车" },
      image: SUV,
      capacity: 3,
      priceMultiplier: 1.5,
      description: {
        ar: "سيارة دفع رباعي فاخرة لـ 3 ركاب",
        en: "Luxury SUV for 3 passengers",
        cn: "豪华越野车，可容纳3人"
      }
    },
    minibus: {
      name: { ar: "ميكروباص", en: "Minibus", cn: "小巴" },
      image: MINIBUS,
      capacity: 10,
      priceMultiplier: 2,
      description: {
        ar: "مركبة كبيرة لـ 10 ركاب",
        en: "Large vehicle for 10 passengers",
        cn: "大型车辆，可容纳10人"
      }
    }
  };

  // Translations
  const translations = {
    ar: {
      appName: "خط سير رحلات مصر",
      tagline: "اكتشف المدن المصرية، اختر رحلتك، واستمتع بالطريق 🚗",
      bestService: "أفضل خدمة نقل في مصر",
      searchTitle: "اختر مسار رحلتك",
      searchButton: "ابحث عن الرحلات",
      searching: "جاري البحث...",
      from: "من",
      to: "إلى",
      resultsFound: (count) => `تم العثور على ${count} رحلة${count > 1 ? '' : ''}`,
      noTrips: "لا توجد رحلات متاحة للاختيارات المحددة.",
      bookingHint: "انقر على البطاقة للحجز",
      noTripsTitle: "لا توجد رحلات متاحة",
      noTripsMessage: "جرب تغيير محطات المغادرة أو الوصول",
      resetSearch: "إعادة تعيين البحث",
      bookingTitle: "تأكيد الحجز",
      nameLabel: "الاسم الكامل",
      nationalityLabel: "الجنسية",
      phoneLabel: "رقم الهاتف",
      passengersLabel: "عدد الركاب",
      totalPrice: "السعر الإجمالي",
      currency: "جنيه",
      cancel: "إلغاء",
      confirmBooking: "تأكيد الحجز",
      bookingConfirmation: (from, to, time, name, price) =>
        `تم تأكيد حجز السيد/ة ${name} لرحلة من ${from} إلى ${to} في الساعة ${time} بمبلغ ${price} جنيه`,
      vehicleTypesTitle: "أنواع المركبات المتاحة",
      aboutUs: "من نحن",
      languages: {
        ar: "العربية",
        en: "الإنجليزية",
        cn: "الصينية"
      }
    },
    en: {
      appName: "Egypt Travel Routes",
      tagline: "Explore Egyptian cities, choose your trip, and enjoy the journey 🚗",
      bestService: "Best transportation service in Egypt",
      searchTitle: "Choose Your Route",
      searchButton: "Search Trips",
      searching: "Searching...",
      from: "From",
      to: "To",
      resultsFound: (count) => `Found ${count} trip${count > 1 ? 's' : ''}`,
      noTrips: "No trips available for your selection.",
      bookingHint: "Click card to book",
      noTripsTitle: "No trips available",
      noTripsMessage: "Try changing departure or arrival stations",
      resetSearch: "Reset Search",
      bookingTitle: "Booking Confirmation",
      nameLabel: "Full Name",
      nationalityLabel: "Nationality",
      phoneLabel: "Phone Number",
      passengersLabel: "Number of Passengers",
      totalPrice: "Total Price",
      currency: "USD",
      cancel: "Cancel",
      confirmBooking: "Confirm Booking",
      bookingConfirmation: (from, to, time, name, price) =>
        `Booking confirmed for Mr/Ms ${name} from ${from} to ${to} at ${time} for ${price} USD`,
      vehicleTypesTitle: "Available Vehicle Types",
      aboutUs: "About Us",
      languages: {
        ar: "Arabic",
        en: "English",
        cn: "Chinese"
      }
    },
    cn: {
      appName: "埃及旅行路线",
      tagline: "探索埃及城市，选择您的旅程，享受旅途 🚗",
      bestService: "埃及最佳交通服务",
      searchTitle: "选择您的路线",
      searchButton: "搜索行程",
      searching: "搜索中...",
      from: "出发",
      to: "到达",
      resultsFound: (count) => `找到 ${count} 条路线`,
      noTrips: "没有可用的行程。",
      bookingHint: "点击卡片预订",
      noTripsTitle: "没有可用的行程",
      noTripsMessage: "尝试更改出发站或到达站",
      resetSearch: "重置搜索",
      bookingTitle: "预订确认",
      nameLabel: "全名",
      nationalityLabel: "国籍",
      phoneLabel: "电话号码",
      passengersLabel: "乘客人数",
      totalPrice: "总价",
      currency: "埃及镑",
      cancel: "取消",
      confirmBooking: "确认预订",
      bookingConfirmation: (from, to, time, name, price) =>
        `${name} 先生/女士的预订已确认，从 ${from} 到 ${to}，时间 ${time}，价格 ${price} 埃及镑`,
      vehicleTypesTitle: "可用车辆类型",
      aboutUs: "关于我们",
      languages: {
        ar: "阿拉伯语",
        en: "英语",
        cn: "中文"
      }
    }
  };

  const t = translations[lang] || translations['ar'];

  // Safe json translation helper
  const localizeStr = (val) => {
    if (!val) return '';
    if (typeof val === 'object' && !Array.isArray(val)) {
      return val[lang] || val.en || val.ar || '';
    }
    return val;
  };

  const localizeArr = (val) => {
    if (!val) return [];
    if (typeof val === 'object' && !Array.isArray(val)) {
      return val[lang] || val.en || val.ar || [];
    }
    return Array.isArray(val) ? val : [];
  };

  // Transform trips for current language safely
  const localizedTrips = trips.map((trip) => ({
    ...trip,
    from: localizeStr(trip.from),
    to: localizeStr(trip.to),
    fromPoints: localizeArr(trip.fromPoints),
    toPoints: localizeArr(trip.toPoints),
    carModel: localizeStr(trip.carModel),
    time: localizeStr(trip.time),
    duration: localizeStr(trip.duration),
    amenities: localizeArr(trip.amenities),
  }));

  const filteredTrips = localizedTrips.filter((trip) => {
    return (!from || trip.from === from) && (!to || trip.to === to);
  });

  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications([...notifications, { id, message, type }]);

    setTimeout(() => {
      setNotifications(notifications.filter(n => n.id !== id));
    }, 5000);
  };

  const handleBookingClick = (trip) => {
    // Instead of opening a broken local modal, redirect to the actual programs page
    router.visit('/programs');
  };

  const calculatePrice = () => {
    if (!selectedTrip) return 0;
    const basePrice = selectedTrip.price;
    const vehicleType = selectedTrip.vehicleType || 'sedan';
    const vehicle = vehicleTypes[vehicleType];
    return basePrice * vehicle.priceMultiplier * bookingData.passengers;
  };

  const confirmBooking = () => {
    if (!selectedTrip || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const reservationData = {
        trip_id: selectedTrip.id,
        from: fromPoint ? `${typeof selectedTrip.from === 'object' ? (selectedTrip.from[lang] || selectedTrip.from.en) : selectedTrip.from} (${fromPoint})` : (typeof selectedTrip.from === 'object' ? (selectedTrip.from[lang] || selectedTrip.from.en) : selectedTrip.from),
        to: toPoint ? `${typeof selectedTrip.to === 'object' ? (selectedTrip.to[lang] || selectedTrip.to.en) : selectedTrip.to} (${toPoint})` : (typeof selectedTrip.to === 'object' ? (selectedTrip.to[lang] || selectedTrip.to.en) : selectedTrip.to),
        time: selectedTrip.time,
        vehicle_type: selectedTrip.vehicleType || 'sedan',
        base_price: selectedTrip.price,
        passenger_name: bookingData.name,
        nationality: bookingData.nationality,
        phone: bookingData.phone,
        passenger_count: bookingData.passengers,
        total_price: calculatePrice(),
      };

      router.post('/bookings', reservationData, {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
            addNotification(
                t.bookingConfirmation(
                    reservationData.from,
                    reservationData.to,
                    reservationData.time,
                    reservationData.passenger_name,
                    reservationData.total_price
                )
            );
            setShowBookingModal(false);
            setIsSubmitting(false);
        },
        onError: (err) => {
            console.error("Error adding reservation: ", err);
            addNotification("Failed to complete booking", "danger");
            setIsSubmitting(false);
        }
      });
    } catch (error) {
      console.error("Error formatting reservation: ", error);
      addNotification("Failed to complete booking process", "danger");
      setIsSubmitting(false);
    }
  };

  const handleCitySelection = (fullLocation, type) => {
    const match = fullLocation.match(/^(.*?)(?:\s*\((.*)\))?$/);
    const cityName = match[1];
    const point = match[2] || '';

    if (type === 'from') {
      setFrom(cityName);
      setFromPoint(point);
    } else {
      setTo(cityName);
      setToPoint(point);
    }
  };

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const resetSearch = () => {
    setFrom('');
    setTo('');
    setFromPoint('');
    setToPoint('');
  };

  return (
    <div className="min-vh-100" style={{
      backgroundColor: colors.background,
      backgroundImage: 'radial-gradient(at 40% 20%, hsla(240,100%,90%,0.3) 0px, transparent 50%)',
      position: 'relative'
    }}>

      {/* Notifications */}
      {notifications.map(notification => (
        <Alert
          key={notification.id}
          variant={notification.type}
          className="position-fixed top-0 end-0 m-3"
          style={{ zIndex: 9999, minWidth: '300px' }}
          onClose={() => setNotifications(notifications.filter(n => n.id !== notification.id))}
          dismissible
        >
          {notification.message}
        </Alert>
      ))}

      {/* Navigation */}
      <Navbar expand="lg" className="shadow-sm" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)'
      }}>
        <Container>
          <Navbar.Brand className="fw-bold" style={{ color: colors.primary }}>
            <FaBus className="me-2" />
            {t.appName}
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/about" className="me-3">
              {t.aboutUs}
            </Nav.Link>
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-primary"
                id="language-dropdown"
                className="d-flex align-items-center"
                style={{ borderColor: colors.primary, color: colors.primary }}
              >
                <FaGlobe className="me-2" />
                {t.languages[lang]}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => setLang('ar')}
                  active={lang === 'ar'}
                  style={{ color: lang === 'ar' ? colors.primary : colors.dark }}
                >
                  {t.languages.ar}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setLang('en')}
                  active={lang === 'en'}
                  style={{ color: lang === 'en' ? colors.primary : colors.dark }}
                >
                  {t.languages.en}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setLang('cn')}
                  active={lang === 'cn'}
                  style={{ color: lang === 'cn' ? colors.primary : colors.dark }}
                >
                  {t.languages.cn}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div className="hero-section py-5 text-center" style={{ position: 'relative', overflow: 'hidden' }}>
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Badge bg="primary" className="mb-3 px-3 py-2 rounded-pill fs-6 shadow-sm">
            {t.bestService}
          </Badge>
          <h1 className="display-4 fw-bold mb-4" style={{ color: colors.dark }}>
            {t.tagline}
          </h1>
          
          {/* Search Card */}
          <Card className="shadow-lg border-0 rounded-4 mx-auto" style={{ maxWidth: '800px', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
            <Card.Body className="p-4 p-md-5">
              <h3 className="mb-4 text-start fw-bold" style={{ color: colors.primary }}>
                <FaSearch className="me-2" />
                {t.searchTitle}
              </h3>
              
              <Row className="g-3">
                <Col md={5}>
                  <FloatingLabel controlId="fromSelect" label={t.from}>
                     <Form.Select 
                       value={fromPoint ? `${from} (${fromPoint})` : from}
                       onChange={(e) => handleCitySelection(e.target.value, 'from')}
                       className="border-0 bg-light"
                       style={{ height: '60px' }}
                     >
                       <option value="">{lang === 'ar' ? 'اختر مدينة الانطلاق' : 'Select Departure City'}</option>
                       {cities.map((city, idx) => {
                         const cityName = localizeStr(city.name);
                         return (
                           <optgroup key={idx} label={cityName}>
                             <option value={cityName}>{cityName}</option>
                             {localizeArr(city.gatheringPlaces)?.map((place, i) => {
                               const placeName = localizeStr(place);
                               return (
                                 <option key={i} value={`${cityName} (${placeName})`}>
                                   {cityName} - {placeName}
                                 </option>
                               );
                             })}
                           </optgroup>
                         );
                       })}
                     </Form.Select>
                  </FloatingLabel>
                </Col>
                
                <Col md={2} className="d-flex align-items-center justify-content-center">
                  <div className="bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '40px', height: '40px' }}>
                    <FaArrowRight style={{ color: colors.accent }} />
                  </div>
                </Col>

                <Col md={5}>
                  <FloatingLabel controlId="toSelect" label={t.to}>
                     <Form.Select 
                       value={toPoint ? `${to} (${toPoint})` : to}
                       onChange={(e) => handleCitySelection(e.target.value, 'to')}
                       className="border-0 bg-light"
                       style={{ height: '60px' }}
                     >
                       <option value="">{lang === 'ar' ? 'اختر مدينة الوصول' : 'Select Arrival City'}</option>
                       {cities.map((city, idx) => {
                         const cityName = localizeStr(city.name);
                         return (
                           <optgroup key={idx} label={cityName}>
                             <option value={cityName}>{cityName}</option>
                             {localizeArr(city.dropOffPlaces)?.map((place, i) => {
                               const placeName = localizeStr(place);
                               return (
                                 <option key={i} value={`${cityName} (${placeName})`}>
                                   {cityName} - {placeName}
                                 </option>
                               );
                             })}
                           </optgroup>
                         );
                       })}
                     </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>

              <div className="d-flex gap-2 justify-content-end mt-4">
                {(from || to) && (
                  <Button variant="outline-secondary" onClick={resetSearch} className="px-4 rounded-pill">
                    <FaUndo className="me-2" />
                    {t.resetSearch}
                  </Button>
                )}
                <Button 
                  variant="primary" 
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="px-5 rounded-pill fw-bold"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, border: 'none' }}
                >
                  {isLoading ? <Spinner size="sm" /> : <><FaSearch className="me-2" />{t.searchButton}</>}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>

      {/* Trips Section */}
      <Container className="py-5">
        <div className="mb-4 d-flex justify-content-between align-items-center border-bottom pb-3">
          <h3 className="fw-bold m-0" style={{ color: colors.dark }}>
            <FaRoute className="me-2" style={{ color: colors.primary }} />
            {lang === 'ar' ? 'الرحلات المتاحة' : 'Available Trips'}
          </h3>
          <Badge bg="info" text="dark" className="px-3 py-2 rounded-pill shadow-sm">
            {t.resultsFound(filteredTrips.length)}
          </Badge>
        </div>

        {isLoading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
            <p className="mt-3 text-muted">{t.searching}</p>
          </div>
        ) : filteredTrips.length > 0 ? (
          <Row className="g-4">
            {filteredTrips.map((trip) => (
              <Col key={trip.id} lg={4} md={6}>
                <TripCard 
                  trip={trip} 
                  vehicleTypes={vehicleTypes}
                  onBook={() => handleBookingClick(trip)} 
                  lang={lang} 
                />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm">
            <div className="mb-4">
              <FaMapMarkedAlt size={64} className="text-muted opacity-50" />
            </div>
            <h4 className="fw-bold mb-3" style={{ color: colors.dark }}>{t.noTripsTitle}</h4>
            <p className="text-muted mb-4">{t.noTripsMessage}</p>
            <Button variant="outline-primary" onClick={resetSearch} className="rounded-pill px-4">
              <FaUndo className="me-2" />
              {t.resetSearch}
            </Button>
          </div>
        )}
      </Container>


      {/* Booking Modal */}
      <Modal
        show={showBookingModal}
        onHide={() => setShowBookingModal(false)}
        size="lg"
        centered
        backdrop="static"
        className="fade modal-xl"
        style={{
          animation: 'fadeIn 0.3s ease-out',
          backdropFilter: 'blur(5px)'
        }}
      >
        <Modal.Header
          closeButton
          className="border-0"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
          }}
        >
          <Modal.Title className="text-white">
            <FaCalendarCheck className="me-2" />
            {t.bookingTitle}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4" style={{ backgroundColor: colors.background }}>
          {selectedTrip && (
            <Row className="g-4">
              {/* Trip Summary Card */}
              <Col md={6}>
                <Card className="border-0 shadow-sm h-100"
                  style={{
                    transition: 'transform 0.3s ease',
                    ':hover': { transform: 'translateY(-5px)' }
                  }}
                >
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-3">
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: `${colors.primary}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '15px'
                      }}>
                        <FaRoute style={{ color: colors.primary, fontSize: '1.5rem' }} />
                      </div>
                      <div>
                        <h4 className="mb-0" style={{ color: colors.dark }}>
                          {selectedTrip.from} <FaArrowRight style={{ color: colors.accent }} /> {selectedTrip.to}
                        </h4>
                        <small className="text-muted">{selectedTrip.date}</small>
                      </div>
                    </div>

                    <div className="mb-3 p-3 rounded"
                      style={{ backgroundColor: `${colors.primary}10` }}>
                      <div className="d-flex justify-content-between mb-2">
                        <span style={{ color: colors.dark }}>
                          <FaClock className="me-2" />
                          {lang === 'ar' ? 'الوقت' : 'Time'}:
                        </span>
                        <strong>{selectedTrip.time}</strong>
                      </div>

                      <div className="d-flex justify-content-between mb-2">
                        <span style={{ color: colors.dark }}>
                          <FaCar className="me-2" />
                          {lang === 'ar' ? 'نوع المركبة' : 'Vehicle Type'}:
                        </span>
                        <strong>
                          {vehicleTypes[selectedTrip.vehicleType || 'sedan'].name[lang]}
                        </strong>
                      </div>

                      <div className="d-flex justify-content-between">
                        <span style={{ color: colors.dark }}>
                          <FaMoneyBillWave className="me-2" />
                          {lang === 'ar' ? 'السعر الأساسي' : 'Base Price'}:
                        </span>
                        <strong>
                          {selectedTrip.price} {t.currency}
                        </strong>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Badge pill bg="light" text="dark" className="w-100 py-2">
                        <FaInfoCircle className="me-2" />
                        {lang === 'ar' ? 'سيتم تأكيد الحجز خلال دقائق' : 'Booking will be confirmed within minutes'}
                      </Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Booking Form */}
              <Col md={6}>
                <Form className="h-100">
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="floatingName" label={t.nameLabel}>
                      <Form.Control
                        type="text"
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                        placeholder={t.nameLabel}
                        className="border-0 shadow-sm"
                        style={{ height: '58px' }}
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="floatingNationality" label={t.nationalityLabel}>
                      <Form.Select
                        value={bookingData.nationality}
                        onChange={(e) => setBookingData({ ...bookingData, nationality: e.target.value })}
                        className="border-0 shadow-sm"
                        style={{ height: '58px' }}
                        required
                      >
                        <option value="">{lang === 'ar' ? 'اختر الجنسية' : 'Select Nationality'}</option>
                        <option value="Egyptian">{lang === 'ar' ? 'مصري' : 'Egyptian'}</option>
                        <option value="Saudi">{lang === 'ar' ? 'سعودي' : 'Saudi'}</option>
                        <option value="Emirati">{lang === 'ar' ? 'إماراتي' : 'Emirati'}</option>
                        <option value="Other">{lang === 'ar' ? 'أخرى' : 'Other'}</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="floatingPhone" label={t.phoneLabel}>
                      <PhoneInput
                        international
                        defaultCountry="EG"
                        value={bookingData.phone}
                        onChange={(phone) => setBookingData({ ...bookingData, phone })}
                        className="border-0 shadow-sm"
                        inputStyle={{
                          width: '100%',
                          height: '58px',
                          border: 'none'
                        }}
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <FloatingLabel controlId="floatingPassengers" label={t.passengersLabel}>
                      <Form.Control
                        type="number"
                        min="1"
                        max={vehicleTypes[selectedTrip.vehicleType || 'sedan'].capacity}
                        value={bookingData.passengers}
                        onChange={(e) => {
                          const value = Math.min(
                            parseInt(e.target.value) || 1,
                            vehicleTypes[selectedTrip.vehicleType || 'sedan'].capacity
                          );
                          setBookingData({ ...bookingData, passengers: value });
                        }}
                        className="border-0 shadow-sm"
                        style={{ height: '58px' }}
                        required
                      />
                    </FloatingLabel>
                    <Form.Text className="text-muted">
                      {lang === 'ar' ? 'الحد الأقصى' : 'Max'}: {vehicleTypes[selectedTrip.vehicleType || 'sedan'].capacity}
                    </Form.Text>
                  </Form.Group>

                  <Alert variant="light" className="border-0 shadow-sm">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{t.totalPrice}</h6>
                        <small className="text-muted">
                          {lang === 'ar' ? 'يشمل جميع الضرائب' : 'Includes all taxes'}
                        </small>
                      </div>
                      <h4 className="mb-0" style={{ color: colors.primary }}>
                        {calculatePrice()} {t.currency}
                      </h4>
                    </div>
                  </Alert>
                </Form>
              </Col>
            </Row>
          )}
        </Modal.Body>

        <Modal.Footer className="border-0 d-flex justify-content-between">
          <Button
            variant="outline-secondary"
            onClick={() => setShowBookingModal(false)}
            className="rounded-pill px-4 py-2"
            style={{
              borderColor: colors.primary,
              color: colors.primary,
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 4px 8px ${colors.primary}20`
              }
            }}
          >
            <FaTimes className="me-2" />
            {t.cancel}
          </Button>

          <Button
            variant="primary"
            onClick={confirmBooking}
            disabled={!bookingData.name || !bookingData.phone || !bookingData.nationality || isSubmitting}
            className="rounded-pill px-4 py-2 fw-bold"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              border: 'none',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 4px 12px ${colors.primary}40`
              },
              ':disabled': {
                opacity: 0.7
              }
            }}
          >
            {isSubmitting ? (
              <>
                <Spinner as="span" animation="border" size="sm" className="me-2" />
                {lang === 'ar' ? 'جاري الحجز...' : 'Processing...'}
              </>
            ) : (
              <>
                <FaCheck className="me-2" />
                {t.confirmBooking}
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

Home.layout = page => <PublicLayout>{page}</PublicLayout>;

export default Home;
