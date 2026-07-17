import React, { useState } from "react";
import { Bed, Bath, Maximize2, MapPin, Tag, ChevronLeft, ChevronRight, User, Mail, Phone, Eye } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../../auth/hook/useAuth";
import './PropertyCard.css'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PropertyCard({ property, onApprove, onReject, onView, showGallery = false }) {
  const favorites = useSelector(state => state.auth.favorites);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = property.propertyImages || [];
  const hasMultipleImages = images.length > 1;

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const toggleFavorite = async (id) => {
    try {

        if (isFavorite(id)) {

            await handleRemoveFavorite(id);

            setFavorites(prev =>
                prev.filter(fav => fav._id !== id)
            );

        } else {

            await handleAddFavorite(id);

            setFavorites(prev => [
                ...prev,
                property
            ]);

        }

    } catch (err) {

        console.log(err);

    }
};

const isFavorite = (id) => {
    return favorites.some(fav => fav._id === id);
};

console.log(
    property._id,
    isFavorite(property._id)
);
  return (
    <div className="
bg-white
rounded-3xl
overflow-hidden
border
border-stone-200
shadow-sm
hover:shadow-xl
hover:-translate-y-1
transition-all
duration-300
group
">
      {/* Photo / Photo Gallery Section */}
      <div className="relative h-64 overflow-hidden bg-gray-100 flex-shrink-0">
        <img
            src={images[currentImageIndex]}
            alt={property.title}
        />

        {/* Gallery Overlay Navigation */}
        {showGallery && hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-sm hover:scale-105 transition-all z-10"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-sm hover:scale-105 transition-all z-10"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
            <button
                className="
absolute
top-5
right-5
w-11
h-11
rounded-full
bg-white/90
backdrop-blur
shadow-md
flex
items-center
justify-center
transition
hover:scale-110
"
                onClick={() => toggleFavorite(property._id)}
            >
                {isFavorite(property._id)
                    ? <FaHeart color="red" />
                    : <FaRegHeart />}
            </button>
            <div className="absolute bottom-3 right-3 bg-black/65 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}

        {/* Badges Overlay */}
        <div className="absolute top-5 left-5 z-10">
          <StatusBadge status={property.approvalStatus || property.status} />
        </div>

        {/* Shadow Overlay */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
        <p className="
absolute
bottom-4
left-5
text-white
text-2xl
font-bold
tracking-tight
">
         ₹ {property.price?.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Info Content */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Title and Category/Location */}
        <div className="space-y-1.5">
          <h3
            className="font-bold text-gray-900 text-xl
font-semibold
leading-tight
text-stone-900
hover:text-black leading-snug line-clamp-1 cursor-pointer hover:text-blue-600 transition-colors"
            style={{ fontFamily: "'Manrope', sans-serif" }}
            onClick={() => onView && onView(property)}
          >
            {property.title}
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm
text-stone-500 text-gray-500">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.8} />
              {property.category}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.8} />
              {property.city}
            </span>
            {property.date && (
              <span className="text-gray-450 ml-auto">
                Submitted: {property.date}
              </span>
            )}
          </div>
        </div>

        {/* Bedrooms, Bathrooms, Area Row */}
        <div className="flex items-center justify-between">

<div className="flex items-center gap-2">
<Bed className="w-4 h-4 text-stone-400"/>
<span>{property.bedrooms} BHK</span>
</div>

<div className="flex items-center gap-2">
<Bath className="w-4 h-4 text-stone-400"/>
<span>{property.bathrooms}</span>
</div>

<div className="flex items-center gap-2">
<Maximize2 className="w-4 h-4 text-stone-400"/>
<span>{property.area} sqft</span>
</div>

</div>

        {/* Seller Card */}
        {property.seller && (
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-left">
            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Seller Information</p>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10
rounded-full
shadow-md rounded-full bg-stone-100
hover:bg-stone-200 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-600">
                {property.seller.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-gray-800 truncate leading-none">{property.seller}</p>
                <div className="text-[10px] text-gray-400 space-y-0.5 mt-1">
                  {property.sellerEmail && (
                    <p className="flex items-center gap-1 truncate">
                      <Mail className="w-2.5 h-2.5 text-gray-400" />
                      {property.sellerEmail}
                    </p>
                  )}
                  {property.sellerPhone && (
                    <p className="flex items-center gap-1">
                      <Phone className="w-2.5 h-2.5 text-gray-400" />
                      {property.sellerPhone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex gap-2 mt-auto pt-2 border-t border-stone-200">
          {onView && (
            <button
              onClick={() => onView(property)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold
                bg-stone-100
hover:bg-stone-200 hover:bg-stone-100
hover:bg-stone-200 text-gray-700 rounded-2xl transition-all duration-200"
            >
              <Eye className="w-3.5 h-11" />
              Details
            </button>
          )}

          {onApprove && (
            <button
              onClick={() => onApprove(property._id)}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold
                bg-stone-900
hover:bg-black hover:bg-blue-700 text-white rounded-2xl shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98]"
            >
              Approve
            </button>
          )}

          {onReject && (
            <button
              onClick={() => onReject(property._id)}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold
                bg-stone-100
hover:bg-stone-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-all duration-200 active:scale-[0.98]"
            >
              Reject
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
