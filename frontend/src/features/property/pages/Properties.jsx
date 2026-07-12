import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../../home/components/Navbar';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import SortDropdown from '../components/SortDropdown';
import useProperty from "../hook/useProperty";
import './Properties.css';

const ITEMS_PER_PAGE = 6;

const INITIAL_FILTERS = {
  categories: [],
  minPrice: '',
  maxPrice: '',
  minArea: '',
  bedrooms: '',
  bathrooms: '',
  amenities: []
};

const Properties = () => {
  const { handleGetAllProperties } = useProperty();
  const [properties, setProperties] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
        try {
            const data = await handleGetAllProperties();

            if (data.success) {
                setProperties(data.properties);
            }
        } catch (err) {
            console.log(err);
        }
    };

    fetchProperties();
}, []);
  
  // Search state
  const [searchParams, setSearchParams] = useState({
    city: '',
    category: '',
    budget: ''
  });
  
  // Filters state
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [activeFilters, setActiveFilters] = useState(INITIAL_FILTERS);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Sort and Pagination
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Apply Search and Filters together
  useEffect(() => {
    let result = [...properties];

    // 1. Search Bar Filtering
    if (searchParams.city) {
      result = result.filter(p => p.city.toLowerCase().includes(searchParams.city.toLowerCase()));
    }
    if (searchParams.category) {
      result = result.filter(p => p.category === searchParams.category);
    }
    if (searchParams.budget) {
      result = result.filter(p => p.price <= Number(searchParams.budget));
    }

    // 2. Sidebar Filters
    if (activeFilters.categories.length > 0) {
      result = result.filter(p => activeFilters.categories.includes(p.category));
    }
    if (activeFilters.minPrice) {
      result = result.filter(p => p.price >= Number(activeFilters.minPrice));
    }
    if (activeFilters.maxPrice) {
      result = result.filter(p => p.price <= Number(activeFilters.maxPrice));
    }
    if (activeFilters.minArea) {
      result = result.filter(p => p.area >= Number(activeFilters.minArea));
    }
    if (activeFilters.bedrooms) {
      result = result.filter(p => p.bedrooms >= Number(activeFilters.bedrooms));
    }
    if (activeFilters.bathrooms) {
      result = result.filter(p => p.bathrooms >= Number(activeFilters.bathrooms));
    }
    if (activeFilters.amenities.length > 0) {
      result = result.filter(p => 
        activeFilters.amenities.every(amenity => p.amenities.includes(amenity))
      );
    }

    // 3. Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;

    case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;

    case "area":
        result.sort((a, b) => b.area - a.area);
        break;

    default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredData(result);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchParams, activeFilters, sortBy, properties]);

  const handleSearchChange = (key, value) => {
    setSearchParams(prev => ({ ...prev, [key]: value }));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setActiveFilters(filters);
    setIsMobileFilterOpen(false);
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setActiveFilters(INITIAL_FILTERS);
    setSearchParams({ city: '', category: '', budget: '' });
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  return (
    <div className="properties">
      {/* Existing Navbar - sticky should be handled in its own CSS */}
      <Navbar />

      {/* Hero Section */}
      <section className="properties__hero">
        <div className="properties__hero-content">
          <h1 className="properties__hero-title">Find Your Dream Property</h1>
          <p className="properties__hero-subtitle">
            Browse thousands of verified apartments, villas, houses, plots, offices and commercial spaces.
          </p>
          
          <SearchBar 
            searchParams={searchParams}
            onSearchChange={handleSearchChange}
            onSearchSubmit={() => {}} // Live filtering is active, but we can trigger specific actions here
          />
        </div>
        <div className="properties__hero-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Luxury Home" 
            className="properties__hero-image"
          />
        </div>
      </section>

      {/* Main Layout */}
      <main className="properties__main">
        {/* Mobile Filter Toggle */}
        <button 
          className="properties__mobile-filter-btn"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          {isMobileFilterOpen ? 'Close Filters' : 'Show Filters'}
        </button>

        {/* Sidebar */}
        <aside className={`properties__sidebar ${isMobileFilterOpen ? 'open' : ''}`}>
          <PropertyFilters 
            filters={filters}
            onChange={handleFilterChange}
            onApply={applyFilters}
            onReset={resetFilters}
          />
        </aside>

        {/* Content */}
        <section className="properties__content">
          <div className="properties__header">
            <h2 className="properties__count">
              Showing {filteredData.length} {filteredData.length === 1 ? 'Property' : 'Properties'}
            </h2>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>

          {filteredData.length > 0 ? (
            <>
              <div className="properties__grid">
                {currentData.map(property => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
              console.log(currentData);
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="properties__empty">
              <div className="properties__empty-icon">🔍</div>
              <h3 className="properties__empty-title">No Properties Found</h3>
              <p className="properties__empty-subtitle">Try changing your filters or searching a different area.</p>
              <button className="properties__empty-btn" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Properties;
