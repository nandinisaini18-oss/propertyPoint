import React from 'react';
import { useSelector } from "react-redux";
import {formatPrice} from "../../../utils/formatPrice"
import { useAuth } from "../../auth/hook/useAuth";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./PropertyCard.css"
import { Link } from 'react-router-dom';
const PropertyCard = ({ property }) => {
//   const [favorites, setFavorites] = useState(...)
//   const favorites = useSelector(
//   state => state.auth.favorites || []
// );
// console.log(useSelector(state => state.auth));
// console.log(property);

// const {
//     handleAddFavorite,
//     handleRemoveFavorite
// } = useAuth();
// console.log("favorites:", favorites);
// console.log("type:", typeof favorites);
// console.log("isArray:", Array.isArray(favorites));

// const isFavorite = (id) => {
//     console.log("Checking favorites:", favorites);

//     return favorites.some((fav, index) => {
//         console.log(index, fav);
//         return fav?._id === id;
//     });
// };
// const toggleFavorite = async (id) => {

//     if (isFavorite(id)) {

//         await handleRemoveFavorite(id);

//     } else {

//         await handleAddFavorite(property._id);

//     }

// };
const favorites = useSelector(state => state.auth.favorites);

favorites?.forEach((f, index) => {
    console.log(index, f);
});

const {
    handleAddFavorite,
    handleRemoveFavorite,
} = useAuth();

const isFavorite = (id) =>
    favorites.some(fav => fav._id === id);

const toggleFavorite = async (id) => {
    if (isFavorite(id)) {
        await handleRemoveFavorite(id);
    } else {
        await handleAddFavorite(id);
    }
};
  return (
    <div className="property-card">
      <div className="property-card__image-wrapper">
       <img
          src={property.propertyImages?.[0]}
          alt={property.title}
          className="property-card__image"
        />

<button
  className="property-card__favorite"
  onClick={() => toggleFavorite(property._id)}
>
  {isFavorite(property._id) ? (
    <FaHeart color="red" size={22} />
  ) : (
    <FaRegHeart color="#444" size={22} />
  )}
</button>


        <div className="property-card__badges">
          <span className="property-card__badge">{property.status}</span>
          <span className="property-card__badge">{property.category}</span>
        </div>
      </div>
      
      <div className="property-card__content">
        <div className="property-card__price">{formatPrice(property.price)}</div>
        <h3 className="property-card__title">{property.title}</h3>
        <div className="property-card__location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {property.city}
        </div>
        
        <div className="property-card__details">
          {property.bedrooms > 0 && (
            <div className="property-card__detail-item">
              <span>🛏</span> {property.bedrooms} Bed
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="property-card__detail-item">
              <span>🛁</span> {property.bathrooms} Bath
            </div>
          )}
          {property.area > 0 && (
            <div className="property-card__detail-item">
              <span>📐</span> {property.area} {property.areaUnit}
            </div>
          )}
        </div>
        
        <div className="property-card__amenities">
          {property.amenities.slice(0, 3).join(' • ')}
          {property.amenities.length > 3 && ' • ...'}
        </div>
        
        <div className="property-card__footer">
          <Link to={`/properties/${property._id || property.id}`} className="property-card__btn" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
