import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../../home/components/Navbar";
import { Footer } from "../../home/components/Footer";

import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/PropertyFilters";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import SortDropdown from "../components/SortDropdown";

import useProperty from "../hook/useProperty";

import "./Properties.css";

const ITEMS_PER_PAGE = 6;

const INITIAL_FILTERS = {
  categories: [],
  minPrice: "",
  maxPrice: "",
  minArea: "",
  bedrooms: "",
  bathrooms: "",
  amenities: [],
};

const Properties = () => {
  const { handleGetAllProperties } = useProperty();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [activeFilters, setActiveFilters] = useState(INITIAL_FILTERS);

  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const searchParams = {
    city: urlSearchParams.get("city") || "",
    category: urlSearchParams.get("category") || "",
    maxPrice: urlSearchParams.get("maxPrice") || "",
  };

  const [searchState, setSearchState] = useState({
    city: "",
    category: "",
    budget: "",
  });

  // Fetch properties
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

  // Sync search bar with URL
  useEffect(() => {
    setSearchState({
      city: searchParams.city,
      category: searchParams.category,
      budget: searchParams.maxPrice,
    });
  }, [
    searchParams.city,
    searchParams.category,
    searchParams.maxPrice,
  ]);

  // Filter + Sort
  useEffect(() => {
    let result = [...properties];

    // URL Search
    if (searchParams.city) {
      result = result.filter((p) =>
        p.city.toLowerCase().includes(searchParams.city.toLowerCase())
      );
    }

    if (searchParams.category) {
      result = result.filter(
        (p) => p.category === searchParams.category
      );
    }

    if (searchParams.maxPrice) {
      result = result.filter(
        (p) => p.price <= Number(searchParams.maxPrice)
      );
    }

    // Sidebar Filters

    if (activeFilters.categories.length > 0) {
      result = result.filter((p) =>
        activeFilters.categories.includes(p.category)
      );
    }

    if (activeFilters.minPrice) {
      result = result.filter(
        (p) => p.price >= Number(activeFilters.minPrice)
      );
    }

    if (activeFilters.maxPrice) {
      result = result.filter(
        (p) => p.price <= Number(activeFilters.maxPrice)
      );
    }

    if (activeFilters.minArea) {
      result = result.filter(
        (p) => p.area >= Number(activeFilters.minArea)
      );
    }

    if (activeFilters.bedrooms) {
      result = result.filter(
        (p) => p.bedrooms >= Number(activeFilters.bedrooms)
      );
    }

    if (activeFilters.bathrooms) {
      result = result.filter(
        (p) => p.bathrooms >= Number(activeFilters.bathrooms)
      );
    }

    if (activeFilters.amenities.length > 0) {
      result = result.filter((p) =>
        activeFilters.amenities.every((a) =>
          p.amenities.includes(a)
        )
      );
    }

    // Sorting

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
        result.sort(
          (a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );
    }

    setFilteredData(result);
    setCurrentPage(1);
  }, [
    properties,
    searchParams.city,
    searchParams.category,
    searchParams.maxPrice,
    activeFilters,
    sortBy,
  ]);

  // SearchBar

  const handleSearchChange = (key, value) => {
    setSearchState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearchSubmit = () => {
    const params = {};

    if (searchState.city) params.city = searchState.city;
    if (searchState.category)
      params.category = searchState.category;
    if (searchState.budget)
      params.maxPrice = searchState.budget;

    setUrlSearchParams(params);
  };

  // Sidebar

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    setActiveFilters(filters);
    setIsMobileFilterOpen(false);
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setActiveFilters(INITIAL_FILTERS);
    setUrlSearchParams({});
  };

  // Pagination

  const totalPages = Math.ceil(
    filteredData.length / ITEMS_PER_PAGE
  );

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredData.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filteredData, currentPage]);

  return (
    <div className="properties">
      <Navbar />

      <section className="properties__hero">
        <div className="properties__hero-content">
          <h1 className="properties__hero-title">
            Find Your Dream Property
          </h1>

          <p className="properties__hero-subtitle">
            Browse thousands of verified properties.
          </p>

          <SearchBar
            searchParams={searchState}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
          />
        </div>

        <div className="properties__hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80"
            alt=""
            className="properties__hero-image"
          />
        </div>
      </section>

      <main className="properties__main">
        <button
          className="properties__mobile-filter-btn"
          onClick={() =>
            setIsMobileFilterOpen(!isMobileFilterOpen)
          }
        >
          {isMobileFilterOpen
            ? "Close Filters"
            : "Show Filters"}
        </button>

        <aside
          className={`properties__sidebar ${
            isMobileFilterOpen ? "open" : ""
          }`}
        >
          <PropertyFilters
            filters={filters}
            onChange={handleFilterChange}
            onApply={applyFilters}
            onReset={resetFilters}
          />
        </aside>

        <section className="properties__content">
          <div className="properties__header">
            <h2>
              Showing {filteredData.length} Properties
            </h2>

            <SortDropdown
              value={sortBy}
              onChange={setSortBy}
            />
          </div>

          {filteredData.length ? (
            <>
              <div className="properties__grid">
                {currentData.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="properties__empty">
              <h2>No Properties Found</h2>

              <button onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Properties;