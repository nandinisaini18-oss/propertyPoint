import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../home/components/Navbar';
import useProperty from '../hook/useProperty';
import { useAuth } from '../../auth/hook/useAuth';
import './PropertyDetails.css';
import {
  Heart, Share2, MapPin, Calendar, Bed, Bath, Maximize, Building, Tag,
  CheckCircle, X, Phone, Mail, Clock, Eye, Users, User, ArrowRight,
  ChevronLeft, ChevronRight, MessageSquare, Briefcase, Map, School,
  Hospital, ShoppingBag, Wifi, Shield, Zap, Sparkles, Star, ChevronDown, ChevronUp, Copy, Check
} from 'lucide-react';

// Grayscale high-quality SVG map component
const GrayscaleMap = ({ address, city }) => (
  <div className="map-placeholder__bg">
    {/* Grayscale grid background */}
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.15 }}>
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#000" strokeWidth="1" />
        </pattern>
        <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#000" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <rect width="100%" height="100%" fill="url(#dots)" opacity="0.3" />
      {/* Abstract roads */}
      <path d="M 0,100 Q 300,120 600,80 T 1200,150" fill="none" stroke="#000" strokeWidth="12" />
      <path d="M 0,280 Q 400,220 800,290 T 1200,260" fill="none" stroke="#000" strokeWidth="16" />
      <path d="M 200,0 Q 250,200 180,400" fill="none" stroke="#000" strokeWidth="10" />
      <path d="M 700,0 Q 650,150 780,400" fill="none" stroke="#000" strokeWidth="14" />
      <path d="M 950,0 C 900,100 1000,300 920,400" fill="none" stroke="#000" strokeWidth="8" />
    </svg>

    {/* Center Pin Indicator */}
    <div className="map-placeholder__pulse"></div>
    <div className="map-placeholder__pin">
      <MapPin size={36} fill="#374151" color="#FFF" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} />
      <div style={{
        background: '#1F2937',
        color: '#FFF',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        marginTop: '6px',
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
      }}>
        {address ? `${address.substring(0, 20)}...` : city}
      </div>
    </div>
  </div>
);

// High-quality luxury property image assets
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
];

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { handleGetPropertyById, handleGetAllProperties } = useProperty();
  const favorites = useSelector(state => state.auth?.favorites || []);
  // const property = useSelector(state=>state.property.property)
  const { handleAddFavorite, handleRemoveFavorite } = useAuth();

  // Page States
  const [property, setProperty] = useState([])
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gallery Active Image Index
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Modals visibility
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [showFullscreenGallery, setShowFullscreenGallery] = useState(false);
  const [isShareTooltipVisible, setIsShareTooltipVisible] = useState(false);

  // Form States (Inquiry)
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [isInquirySubmitted, setIsInquirySubmitted] = useState(false);

  // Form States (Visit Schedule)
  const [visitForm, setVisitForm] = useState({ date: '', timeSlot: '10:00 AM - 12:00 PM', type: 'In-Person' });
  const [isVisitScheduled, setIsVisitScheduled] = useState(false);

  // Read More state
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Click-to-reveal states for seller details
  const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);
  const [isEmailRevealed, setIsEmailRevealed] = useState(false);

  // 1. Fetch Property details
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProperty = async () => {
      setLoading(true);
      setError(null);
      try {
        // Try fetching via hook/API
        
        const apiRes = await handleGetPropertyById(id);
        console.log(apiRes);

        if(!apiRes || !apiRes.success){
            throw new Error("property not found")
        }
        console.log("Property:", apiRes.property);

let resultData = apiRes.property;
        // If it's still null, search within the favorites or standard recommended lists
        if (!resultData) {
            throw new Error("Property not found");
        }

        // Finally, generate a fully populated dynamic structure if a basic object is found
        if (resultData) {
          // Format price if numeric
          const formatted = typeof resultData.price === 'number'
            ? formatPrice(resultData.price)
            : resultData.price;

          const completeProperty = {
    ...resultData,

    priceFormatted: formatPrice(resultData.price),

    pricePerSqft: calculatePricePerSqft(
        resultData.price,
        resultData.area
    ),

    amenities: resultData.amenities || [],
};

setProperty(completeProperty);
        } else {
          // If no property matches, make a random default beautiful luxury property
          if (!resultData) {
              setError("Property not found");
              return;
          }
        }
      } catch (err) {
        setError("Failed to fetch property details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    

    fetchProperty();
    setActiveImageIdx(0);
    setIsPhoneRevealed(false);
    setIsEmailRevealed(false);
  }, [id]);

  // 2. Fetch all properties to show Related Properties
  useEffect(() => {
    const fetchAll = async () => {
      try {
        if (handleGetAllProperties) {
          const data = await handleGetAllProperties();
          if (data && data.properties) {
            setAllProperties(data.properties);
          }
        }
      } catch (err) {
        console.log("Could not load related properties:", err);
      }
    };
    fetchAll();
  }, []);

  // Helper function to format price numerical value to Cr/L Lakhs
  const formatPrice = (priceVal) => {
    if (!priceVal || isNaN(priceVal)) return "Price on Request";
    if (priceVal >= 10000000) {
      return `₹${(priceVal / 10000000).toFixed(1)} Cr`;
    } else if (priceVal >= 100000) {
      return `₹${(priceVal / 100000).toFixed(0)} L`;
    }
    return `₹${priceVal.toLocaleString('en-IN')}`;
  };

  // Helper to calculate price per sq ft
  const calculatePricePerSqft = (priceVal, areaVal) => {
    if (!priceVal || !areaVal || isNaN(priceVal) || isNaN(areaVal) || areaVal <= 0) {
      return "N/A";
    }
    const val = Math.round(priceVal / areaVal);
    return `₹${val.toLocaleString('en-IN')} / sqft`;
  };

  // Helper to fill image array to 5 images for clean gallery layout
  const fillImages = (imagesArray) => {
    const arr = [...imagesArray].filter(Boolean);
    while (arr.length < 5) {
      arr.push(FALLBACK_IMAGES[arr.length % FALLBACK_IMAGES.length]);
    }
    return arr.slice(0, 5);
  };

  // Get similar properties (Exclude current + match city or category, limit 4)
  const getRelatedProperties = () => {
    if (!property) return [];

    return allProperties
        .filter(
            p =>
                p._id !== property._id &&
                p.category === property.category
        )
        .slice(0, 4);
};

  // Favorites hander
  const isFavorite = () => {
    if (!property) return false;
    return favorites.some(fav => fav._id === property._id || String(fav.id) === String(property._id));
  };

  const toggleFavorite = async () => {
    if (!property) return;
    const propId = property._id || property.id;
    if (isFavorite()) {
      if (handleRemoveFavorite) await handleRemoveFavorite(propId);
    } else {
      if (handleAddFavorite) await handleAddFavorite(propId);
    }
  };

  // Share handler
  const handleShare = async () => {
      try {
          await navigator.clipboard.writeText(window.location.href);
          setIsShareTooltipVisible(true);

            setTimeout(()=>{
                setIsShareTooltipVisible(false);
            },2000);
      } catch {
          alert("Couldn't copy link");
      }
  };

  // Modal Handlers
  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setIsInquirySubmitted(true);
    setTimeout(() => {
      setIsInquirySubmitted(false);
      setShowInquiryModal(false);
      setInquiryForm({ name: '', email: '', phone: '', message: '' });
    }, 2000);
  };

  const handleVisitSubmit = (e) => {
    e.preventDefault();
    setIsVisitScheduled(true);
    setTimeout(() => {
      setIsVisitScheduled(false);
      setShowVisitModal(false);
    }, 2000);
  };

  // Lucide Icon mapper for amenities
  const getAmenityIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('park')) return <Shield size={18} />;
    if (lower.includes('garden')) return <Sparkles size={18} />;
    if (lower.includes('pool') || lower.includes('swim')) return <Star size={18} />;
    if (lower.includes('gym')) return <Zap size={18} />;
    if (lower.includes('security')) return <Shield size={18} />;
    if (lower.includes('lift')) return <Building size={18} />;
    if (lower.includes('balcony')) return <Building size={18} />;
    if (lower.includes('wifi')) return <Wifi size={18} />;
    if (lower.includes('power') || lower.includes('backup')) return <Zap size={18} />;
    if (lower.includes('club')) return <Users size={18} />;
    return <Sparkles size={18} />;
  };

  if (loading) {
    return (
      <div className="prop-details-page flex flex-col items-center justify-center min-h-screen">
        <Navbar />
        <div className="spinner border-slate-700 border-t-white w-12 h-12"></div>
        <p className="mt-4 text-slate-500 font-semibold tracking-wider">LOADING LUXURY PROPERTY...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="prop-details-page flex flex-col items-center justify-center min-h-screen">
        <Navbar />
        <div className="text-center p-8 bg-white rounded-2xl shadow-md max-w-md mx-4 border border-stone-100">
          <X className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Property Not Found</h2>
          <p className="text-slate-500 mb-6">{error || "The property you're looking for might have been sold or removed."}</p>
          <Link to="/properties" className="btn-primary" style={{ display: 'inline-flex', padding: '12px 24px', width: 'auto' }}>
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const relatedList = getRelatedProperties();

  return (
    <div className="prop-details-page">
      <Navbar />

      <div className="prop-details-container">
        
        {/* ─── Gallery Section ─── */}
        <section className="prop-gallery">
          {/* Main Display Left */}
          <div className="prop-gallery__main-wrap">
            <img
              src={property.propertyImages[activeImageIdx]}
              alt={property.title}
              className="prop-gallery__main-img"
              onClick={() => setShowFullscreenGallery(true)}
              style={{ cursor: 'zoom-in' }}
            />
            <div className="prop-gallery__counter">
              {activeImageIdx + 1} / {property.propertyImages.length}
            </div>

            {/* Gallery Buttons */}
            <div className="prop-gallery__actions">
              <button
                className={`prop-gallery__btn ${isFavorite() ? 'prop-gallery__btn--active' : ''}`}
                onClick={toggleFavorite}
                title={isFavorite() ? "Remove from Favorites" : "Add to Favorites"}
              >
                <Heart size={20} fill={isFavorite() ? "currentColor" : "none"} />
              </button>

              <div className="tooltip-container">
                <button className="prop-gallery__btn" onClick={handleShare} title="Share Property">
                  <Share2 size={20} />
                </button>
                {isShareTooltipVisible && (
                  <span className="tooltip-bubble">Link Copied!</span>
                )}
              </div>

              <button className="prop-gallery__btn" onClick={() => setShowFullscreenGallery(true)} title="View Fullscreen">
                <Maximize size={20} />
              </button>
            </div>
          </div>

          {/* 4 Thumbnails Right */}
          <div className="prop-gallery__grid">
            {property.propertyImages.slice(0, 5).map((imgUrl, idx) => (
              <div
                key={idx}
                className={`prop-gallery__thumb-wrap ${activeImageIdx === idx ? 'active' : ''}`}
                onClick={() => setActiveImageIdx(idx)}
              >
                <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="prop-gallery__thumb-img" />
                <div className="prop-gallery__thumb-overlay"></div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Two-Column Main Layout ─── */}
        <div className="prop-layout">
          
          {/* LEFT section (70%) */}
          <main className="prop-main-content">
            
            {/* Header / Badges / Price */}
            <div className="prop-header-info">
              <div className="prop-badges">
                <span className="prop-badge prop-badge--category">{property.category}</span>
                <span className="prop-badge prop-badge--approved">
                  <CheckCircle size={14} fill="currentColor" color="#FFF" /> {property.approvalStatus}
                </span>
              </div>

              <div className="prop-title-row">
                <div>
                  <h1 className="prop-title">{property.title}</h1>
                  <div className="prop-meta-row mt-4">
                    <span className="prop-meta-item">
                      <MapPin size={18} />
                      {property.address ? `${property.address}, ${property.city}` : property.city}
                    </span>
                    <span className="prop-meta-item">
                      <Calendar size={18} />
                      Listed On: {new Date(property.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="prop-price-block">
                  <div className="prop-price">{property.priceFormatted}</div>
                  <div className="prop-price-sqft">({property.pricePerSqft})</div>
                </div>
              </div>

              <p className="prop-summary">{property.description.substring(0, 160)}...</p>
            </div>

            {/* Property Overview Card */}
            <section className="prop-card">
              <h3 className="prop-card__title">
                <Building size={20} /> Property Overview
              </h3>
              <div className="overview-grid">
                <div className="overview-item">
                  <div className="overview-icon-box"><Bed size={20} /></div>
                  <div className="overview-details">
                    <span className="overview-label">Bedrooms</span>
                    <span className="overview-value">{property.bedrooms || 'N/A'} BHK</span>
                  </div>
                </div>

                <div className="overview-item">
                  <div className="overview-icon-box"><Bath size={20} /></div>
                  <div className="overview-details">
                    <span className="overview-label">Bathrooms</span>
                    <span className="overview-value">{property.bathrooms || 'N/A'} Baths</span>
                  </div>
                </div>

                <div className="overview-item">
                  <div className="overview-icon-box"><Maximize size={20} /></div>
                  <div className="overview-details">
                    <span className="overview-label">Super Area</span>
                    <span className="overview-value">{property.area} sq ft</span>
                  </div>
                </div>

                <div className="overview-item">
                  <div className="overview-icon-box"><Building size={20} /></div>
                  <div className="overview-details">
                    <span className="overview-label">Property Type</span>
                    <span className="overview-value">{property.category}</span>
                  </div>
                </div>

                <div className="overview-item">
                  <div className="overview-icon-box"><Tag size={20} /></div>
                  <div className="overview-details">
                    <span className="overview-label">Status</span>
                    <span className="overview-value">{property.status}</span>
                  </div>
                </div>

                <div className="overview-item">
                  <div className="overview-icon-box"><Shield size={20} /></div>
                </div>
              </div>
            </section>

            {/* Description Section */}
            <section className="prop-card">
              <h3 className="prop-card__title">
                <Clock size={20} /> About Property
              </h3>
              <div className="description-text">
                {property.description.split('\n').map((paragraph, index) => {
                  if (index > 0 && !isDescriptionExpanded) return null;
                  return <p key={index}>{paragraph}</p>;
                })}
              </div>
              {property.description.split('\n').length > 1 && (
                <button
                  className="description-toggle-btn"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                >
                  {isDescriptionExpanded ? (
                    <>Show Less <ChevronUp size={16} /></>
                  ) : (
                    <>Read More <ChevronDown size={16} /></>
                  )}
                </button>
              )}
            </section>

            {/* Amenities Section */}
            <section className="prop-card">
              <h3 className="prop-card__title">
                <Sparkles size={20} /> Premium Amenities
              </h3>
              <div className="amenities-grid">
                {(property.amenities || [] ).map((amenity, idx) => (
                  <span key={idx} className="amenity-chip">
                    {getAmenityIcon(amenity)}
                    {amenity}
                  </span>
                ))}
              </div>
            </section>

            {/* Location section */}
            <section className="prop-card">
              
              <div className="location-layout">
                <div className="address-text">
                  <MapPin size={20} />
                  <span>
                    <strong>Address:</strong> {property.address || "N/A"}<br />
                    <span className="text-slate-500 text-sm">{property.city}, {property.state || "India"}</span>
                  </span>
                </div>

                {/* Styled Grayscale vector Map placeholder */}
                {/* <div className="map-placeholder">
                  <GrayscaleMap address={property.address} city={property.city} />
                </div> */}
              </div>
            </section>

            {/* Highlights Section */}
            <section className="prop-card">
              <h3 className="prop-card__title">
                <CheckCircle size={20} /> Property Highlights
              </h3>
              <div className="highlights-grid">
                {(property.highlights || []).map((highlight, idx) => (
                  <div key={idx} className="highlight-item">
                    <CheckCircle size={16} fill="currentColor" color="#FFF" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

          </main>

          {/* RIGHT Sidebar Section (30% - Sticky) */}
          <aside className="prop-sidebar-wrap">
            <div className="prop-sidebar">
              
              {/* Premium Seller contact card */}
              <div className="seller-card">
                <div className="seller-profile">
                  <div className="seller-info">
                    <span className="seller-name">
                      {property.createdBy?.fullname}
                    </span>
                    <span className="seller-role">Exclusive Property Partner</span>
                  </div>
                </div>

                {/* Hide and Reveal Contact Buttons */}
                <div className="seller-contacts">
                  <button className="revealer-btn" onClick={() => setIsPhoneRevealed(!isPhoneRevealed)}>
                    <span className="revealer-btn__left">
                      <Phone size={16} />
                      <span>{isPhoneRevealed ? property.createdBy?.contact : "+91 98765 XXXXX"}</span>
                    </span>
                    <span className="revealer-btn__action">
                      {isPhoneRevealed ? "Hide" : "Reveal"}
                    </span>
                  </button>

                  <button className="revealer-btn" onClick={() => setIsEmailRevealed(!isEmailRevealed)}>
                    <span className="revealer-btn__left">
                      <Mail size={16} />
                      <span>{isEmailRevealed ? property.createdBy?.email : "s***@example.com"}</span>
                    </span>
                    <span className="revealer-btn__action">
                      {isEmailRevealed ? "Hide" : "Reveal"}
                    </span>
                  </button>
                </div>

                {/* Sidebar Call to actions */}
                <div className="seller-actions">
                  <button className="sidebar-btn sidebar-btn--primary" onClick={() => setShowInquiryModal(true)}>
                    <MessageSquare size={18} /> Contact Seller
                  </button>
                  <button className="sidebar-btn sidebar-btn--outline" onClick={() => setShowInquiryModal(true)}>
                    Send Inquiry
                  </button>
                  <button className="sidebar-btn sidebar-btn--outline" onClick={() => setShowVisitModal(true)}>
                    Schedule Visit
                  </button>
                  
                  <a
                    href={`https://wa.me/${(property.createdBy?.contact || "").replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(property.createdBy?.fullname)},%20I'm%20interested%20in%20your%20property%20%22${encodeURIComponent(property.title)}%22%20on%20Property%20Point.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sidebar-btn sidebar-btn--whatsapp"
                    style={{ textDecoration: 'none' }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.114-2.905-6.99S14.64 1.132 12.012 1.132c-5.433 0-9.858 4.422-9.863 9.865-.001 1.839.49 3.626 1.42 5.191l-1.03 3.766 3.864-1.013zm11.367-7.461c-.302-.151-1.79-.882-2.057-.979-.268-.097-.463-.147-.658.147-.196.294-.757.979-.929 1.176-.171.196-.341.221-.643.07-1.422-.71-2.339-1.288-3.267-2.873-.244-.418.244-.388.7-.1.408-.258.455-.429.683-.694.07-.151.03-.284-.015-.383-.047-.1-.463-1.117-.635-1.528-.166-.402-.336-.346-.463-.352-.12-.006-.258-.007-.396-.007-.138 0-.363.051-.553.258-.19.206-.723.707-.723 1.724 0 1.017.74 2.003.842 2.14 0 .013 1.457 2.226 3.53 3.12 1.054.454 1.879.626 2.522.684.664.06 1.267-.046 1.745-.118.533-.08 1.63-.666 1.859-1.278.228-.613.228-1.139.16-1.248-.069-.109-.258-.16-.56-.31z"/></svg>
                    WhatsApp Seller
                  </a>
                </div>
              </div>
            </div>
          </aside>

        </div>

        {/* ─── Related Properties ─── */}
        {relatedList.length > 0 && (
          <section className="related-section">
            <h2 className="related-title">Similar Premium Listings</h2>
            <div className="related-grid">
              {relatedList.map((item) => {
                const itemPrice = typeof item.price === 'number' ? formatPrice(item.price) : item.price;
                const itemImg = item.propertyImages?.[0] || item.image || FALLBACK_IMAGES[0];
                return (
                  <div key={item._id || item.id} className="lp-prop-card" style={{ background: '#FFF' }}>
                    <div className="lp-prop-card__img-wrap">
                      <img src={itemImg} alt={item.title} className="lp-prop-card__img" />
                      <span className="lp-prop-card__category">{item.category}</span>
                    </div>

                    <div className="lp-prop-card__body">
                      <div className="lp-prop-card__price">{itemPrice}</div>
                      <div className="lp-prop-card__title" style={{ fontSize: '1.1rem', margin: '8px 0' }}>{item.title}</div>
                      <div className="lp-prop-card__location" style={{ fontSize: '0.85rem' }}>
                        <MapPin size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                        {item.city}
                      </div>

                      <div className="lp-prop-card__pills" style={{ marginTop: '12px' }}>
                        <span className="lp-prop-pill">📐 {item.area} sqft</span>
                        {item.bedrooms > 0 && <span className="lp-prop-pill">🛏 {item.bedrooms} Bed</span>}
                        <span className="lp-prop-pill">🛁 {item.bathrooms} Bath</span>
                      </div>
                    </div>

                    <div className="lp-prop-card__footer">
                      <Link to={`/properties/${item._id || item.id}`} className="sidebar-btn sidebar-btn--primary w-full text-center" style={{ textDecoration: 'none', padding: '10px 14px' }}>
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ─── Bottom CTA Banner ─── */}
        <section className="cta-banner">
          <div className="cta-banner__content">
            <h2 className="cta-banner__title">Looking for similar properties?</h2>
            <p className="cta-banner__subtitle">
              Explore our extensive directory of high-end penthouses, custom villas, and prime business complexes across major metropolitan areas.
            </p>
            <button className="cta-banner__btn" onClick={() => navigate('/properties')}>
              Browse More Properties
            </button>
          </div>
        </section>

      </div>

      {/* ─── Inline Overlay Modals ─── */}

      {/* Contact & Inquiry Modal */}
      {showInquiryModal && (
        <div className="modal-overlay" onClick={() => setShowInquiryModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Send Message to Seller</span>
              <button className="modal-close-btn" onClick={() => setShowInquiryModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {isInquirySubmitted ? (
                <div className="modal-success-state">
                  <div className="modal-success-icon"><CheckCircle size={32} /></div>
                  <h3 className="modal-success-title">Inquiry Sent Successfully!</h3>
                  <p className="modal-success-desc">
                    Thank you for your interest. {property.createdBy?.name} will contact you shortly via email or phone.
                  </p>
                </div>
              ) : (
                <form className="modal-form" onSubmit={handleInquirySubmit}>
                  <div className="modal-form-group">
                    <label className="modal-form-label">Full Name</label>
                    <input
                      type="text"
                      className="modal-form-input"
                      placeholder="Enter your name"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-form-label">Email Address</label>
                    <input
                      type="email"
                      className="modal-form-input"
                      placeholder="Enter your email"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="modal-form-input"
                      placeholder="Enter your phone number"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-form-label">Message</label>
                    <textarea
                      className="modal-form-input modal-form-textarea"
                      placeholder={`I am interested in "${property.title}". Please send more details...`}
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="modal-form-submit">
                    Send Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Schedule Visit Modal */}
      {showVisitModal && (
        <div className="modal-overlay" onClick={() => setShowVisitModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Schedule Property Tour</span>
              <button className="modal-close-btn" onClick={() => setShowVisitModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {isVisitScheduled ? (
                <div className="modal-success-state">
                  <div className="modal-success-icon"><CheckCircle size={32} /></div>
                  <h3 className="modal-success-title">Tour Scheduled!</h3>
                  <p className="modal-success-desc">
                    Your request for an {visitForm.type} tour on <strong>{visitForm.date}</strong> ({visitForm.timeSlot}) has been registered. The agent will confirm the appointment details shortly.
                  </p>
                </div>
              ) : (
                <form className="modal-form" onSubmit={handleVisitSubmit}>
                  <div className="modal-form-group">
                    <label className="modal-form-label">Select Date</label>
                    <input
                      type="date"
                      className="modal-form-input"
                      value={visitForm.date}
                      onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-form-label">Preferred Time Slot</label>
                    <div className="time-slot-grid">
                      {['10:00 AM - 12:00 PM', '12:00 PM - 3:00 PM', '3:00 PM - 6:00 PM'].map((slot) => (
                        <div
                          key={slot}
                          className={`time-slot-option ${visitForm.timeSlot === slot ? 'selected' : ''}`}
                          onClick={() => setVisitForm({ ...visitForm, timeSlot: slot })}
                        >
                          {slot}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-form-label">Tour Type</label>
                    <div className="visit-type-row">
                      <div
                        className={`visit-type-option ${visitForm.type === 'In-Person' ? 'selected' : ''}`}
                        onClick={() => setVisitForm({ ...visitForm, type: 'In-Person' })}
                      >
                        <User size={16} /> In-Person
                      </div>
                      <div
                        className={`visit-type-option ${visitForm.type === 'Video Call' ? 'selected' : ''}`}
                        onClick={() => setVisitForm({ ...visitForm, type: 'Video Call' })}
                      >
                        <MessageSquare size={16} /> Video Call
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="modal-form-submit">
                    Confirm Appointment
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Photo Gallery Modal */}
      {showFullscreenGallery && (
        <div className="fullscreen-gallery">
          <div className="fullscreen-gallery__header">
            <span className="fullscreen-gallery__title">{property.title}</span>
            <button className="fullscreen-gallery__close-btn" onClick={() => setShowFullscreenGallery(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="fullscreen-gallery__main">
            <button
              className="fullscreen-gallery__nav-btn fullscreen-gallery__nav-btn--prev"
              onClick={() => setActiveImageIdx((prev) => (prev - 1 + property.propertyImages.length) % property.propertyImages.length)}
            >
              <ChevronLeft size={32} />
            </button>

            <img
              src={property.propertyImages[activeImageIdx]}
              alt={`Fullscreen ${activeImageIdx + 1}`}
              className="fullscreen-gallery__img"
            />

            <button
              className="fullscreen-gallery__nav-btn fullscreen-gallery__nav-btn--next"
              onClick={() => setActiveImageIdx((prev) => (prev + 1) % property.propertyImages.length)}
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Bottom thumbnail selector inside fullscreen */}
          <div className="fullscreen-gallery__footer">
            {property.propertyImages.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`Thumb ${idx + 1}`}
                className={`fullscreen-gallery__thumb ${activeImageIdx === idx ? 'active' : ''}`}
                onClick={() => setActiveImageIdx(idx)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ─── Premium Footer ─── */}
      <footer className="premium-footer">
        <div className="premium-footer-grid">
          
          <div className="footer-col">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">
                <Building size={18} />
              </div>
              <span className="footer-logo-text">Property Point</span>
            </Link>
            <p className="footer-desc">
              Premium real estate platform delivering exceptional residential and commercial spaces. Crafted with luxury, minimalism, and elegance in mind.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li className="footer-link-item"><Link to="/">Home</Link></li>
              <li className="footer-link-item"><Link to="/properties">Buy Properties</Link></li>
              <li className="footer-link-item"><Link to="/sell-property">Sell Properties</Link></li>
              <li className="footer-link-item"><Link to="/locations">Locations</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li className="footer-link-item"><Link to="/contact">Contact Us</Link></li>
              <li className="footer-link-item"><a href="#">Privacy Policy</a></li>
              <li className="footer-link-item"><a href="#">Terms & Conditions</a></li>
              <li className="footer-link-item"><a href="#">FAQ Directory</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Headquarters</h4>
            <div className="footer-contact-info">
              <span className="footer-contact-item">
                <MapPin size={16} />
                <span>Zone 1, Maharana Pratap Nagar, Bhopal, MP, India</span>
              </span>
              <span className="footer-contact-item">
                <Phone size={16} />
                <span>+91 (755) 482-9011</span>
              </span>
              <span className="footer-contact-item">
                <Mail size={16} />
                <span>concierge@propertypoint.com</span>
              </span>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} Property Point. All Rights Reserved. Designed in grayscale elegance.
          </div>
          <div className="footer-socials">
            <a href="#" className="footer-social-btn"><Star size={16} /></a>
            <a href="#" className="footer-social-btn"><Zap size={16} /></a>
            <a href="#" className="footer-social-btn"><Shield size={16} /></a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default PropertyDetails;
