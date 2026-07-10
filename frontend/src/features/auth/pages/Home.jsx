import Navbar from "../../home/components/Navbar";
import HeroCarousel from "../../home/components/HeroCarousel";
import SearchBar from "../../home/components/SearchBar";
import FeaturedProperties from "../../home/components/FeaturedProperties";
import BrowseByCategory from "../../home/components/BrowseByCategory";
import BrowseByCity from "../../home/components/BrowseByCity";

const Home = () => {
    return (
        <>
            <Navbar />

            <HeroCarousel />

            <SearchBar />

            <FeaturedProperties />

            <BrowseByCity />

            <BrowseByCategory />
        </>
    );
}

export default Home;