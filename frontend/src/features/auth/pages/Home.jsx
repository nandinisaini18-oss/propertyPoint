import Navbar from "../../home/components/Navbar";
import HeroCarousel from "../../home/components/HeroCarousel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../../property/components/SearchBar"
import FeaturedProperties from "../../home/components/FeaturedProperties";
import BrowseByCategory from "../../home/components/BrowseByCategory";
import BrowseByCity from "../../home/components/BrowseByCity";
import Locations from "../../locations/pages/Locations";

const Home = () => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useState({
        city: "",
        category: "",
        budget: "",
    });

    const handleSearchChange = (field, value) => {
        setSearchParams(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSearchSubmit = () => {
        const params = new URLSearchParams();

        if (searchParams.city)
            params.append("city", searchParams.city);

        if (searchParams.category)
            params.append("category", searchParams.category);

        if (searchParams.budget)
            params.append("maxPrice", searchParams.budget);

        navigate(`/properties?${params.toString()}`);
    };

    return (
        <>
            <Navbar />
            <HeroCarousel />

            <SearchBar
                searchParams={searchParams}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
            />

            <FeaturedProperties />
            <BrowseByCity />
            <BrowseByCategory />
        </>
    );
};

export default Home;