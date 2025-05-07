import React, { useState, useEffect } from "react";
import { IoBagOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";

// Free placeholder images
import image1 from "../../assets/homepage1.png";
import image2 from "../../assets/homepage2.png";
import image3 from "../../assets/homepage3.png";
import image4 from "../../assets/homepage4.png";
import droneImage from '../../assets/homeleft.jpg';

const categories = ["Top 30", "Propellers", "Battery", "Wings", "Stand", "Camera"];

const products = [
    {
        title: "DJI Battery",
        brand: "DJI Mini",
        category: "Battery",
        price: 4029.50,
        oldPrice: 8029.50,
        tag: "NEW",
        tags: "BEST SELLER",
        image: image1,
    },
    {
        title: "TVT Cam",
        brand: "Camera",
        category: "Camera",
        price: 4029.50,
        oldPrice: 9099.50,
        tag: "NEW",
        tags: "BEST SELLER",
        image: image2,
    },
    {
        title: "Omni Cam",
        brand: "Camera",
        category: "Camera",
        price: 3529.50,
        oldPrice: 6029.50,
        tag: "NEW",
        tags: "BEST SELLER",
        image: image3,
    },
    {
        title: "Mi Air3s",
        brand: "Airpod",
        category: "Propellers",
        price: 4029.50,
        oldPrice: 8029.50,
        tag: "NEW",
        tags: "BEST SELLER",
        image: image4,
    },
];

export default function DronePartsCarousel() {
    const [activeCategory, setActiveCategory] = useState("Top 30");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(3);

    useEffect(() => {
        const updateItemsToShow = () => {
            const width = window.innerWidth;
            if (width < 640) {
                // Mobile
                setItemsToShow(1);
            } else if (width >= 640 && width < 1024) {
                // Tablet
                setItemsToShow(2);
            } else {
                // Desktop
                setItemsToShow(3);
            }
        };

        updateItemsToShow(); // initial check
        window.addEventListener("resize", updateItemsToShow); // resize listener

        return () => window.removeEventListener("resize", updateItemsToShow);
    }, []);

    // Filter based on selected tab
    const filteredProducts =
        activeCategory === "Top 30"
            ? products
            : products.filter((product) => product.category === activeCategory);

    // Navigation functions
    const nextSlide = () => {
        setCurrentIndex(prevIndex =>
            prevIndex + 1 >= filteredProducts.length ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex(prevIndex =>
            prevIndex === 0 ? Math.max(0, filteredProducts.length - 1) : prevIndex - 1
        );
    };

    // Calculate the visible products (with looping)
    const getVisibleProducts = () => {
        const visibleItems = [];
        const totalItems = filteredProducts.length;

        if (totalItems === 0) return [];

        for (let i = 0; i < Math.min(itemsToShow, totalItems); i++) {
            const index = (currentIndex + i) % totalItems;
            visibleItems.push(filteredProducts[index]);
        }

        return visibleItems;
    };

    return (
        <div className="flex flex-col md:flex-row w-full  h-auto font-[system-ui] gap-8 py-16 bg-white">
            {/* Left Section */}
            <div
                className="md:w-1/3 w-full bg-gray-50 p-6 rounded-3xl shadow-sm flex flex-col bg-cover bg-center"
                style={{ backgroundImage: `url(${droneImage})` }}
            >
                <div className="bg-opacity-80 p-4 rounded-xl">
                    <h2 className="lg:text-3xl md:text-2xl text-xl font-bold text-[#1E3473]">Drones Parts</h2>
                    <p className="text-[#39AEF2] font-semibold lg:text-3xl md:text-2xl text-xl mb-2">Parts</p>
                    <p className="text-[#F7941D] mt-2 text-sm font-medium">
                        ENJOY FLYING ALL DAY WITH DJI PHANTOM.
                    </p>
                </div>
                <button className="bg-[#1e3473] text-white py-3 px-6 rounded-full font-medium self-start mt-auto md:text-[18px] text-[12px]">
                    BROWSE CATEGORY
                </button>
            </div>

            {/* Right Section */}
            <div className="md:w-2/3 w-full overflow-hidden">
                {/* Tabs */}
                <div className="flex gap-4 text-[16px] mb-6 border-b pb-2 flex-wrap">
                    {categories.map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                setActiveCategory(item);
                                setCurrentIndex(0); // Reset to first slide on category change
                            }}
                            className={`px-4 py-1 rounded-full ${activeCategory === item
                                ? "border border-[#F7941D] text-gray-800 font-medium"
                                : "text-gray-700"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Carousel Container */}
                <div className="relative mt-8 px-4 w-full">
                    {/* Navigation Buttons */}
                    {filteredProducts.length > itemsToShow && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 border border-gray-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 border border-gray-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Carousel Cards */}
                    <div className={`grid gap-4 ${itemsToShow === 1 ? 'grid-cols-1' : itemsToShow === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                        {getVisibleProducts().map((product, index) => (
                            <div
                                key={index}
                                className="group border border-[#c2c2c2] rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 h-[300px]  hover:h-[315px] cursor-pointer"
                            >
                                <div className="p-4 flex flex-col items-start relative h-full">
                                    <p className="text-[10px] font-semibold text-[#D9D3D3] mb-1">
                                        {product.brand}
                                    </p>
                                    <h2 className="md:text-[18px] text-[12px] font-bold text-[#1E3473] mb-2">
                                        {product.title}
                                    </h2>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-24 object-contain mb-4"
                                    />
                                    <div className="flex items-center flex-wrap gap-2 mb-2">
                                        <span className="bg-[#f7941d] text-white md:text-[14px] text-[10px] font-semibold px-3 py-1 rounded-full">
                                            {product.tag}
                                        </span>
                                        <span className="bg-gray-200 px-3 py-1 text-[12px] rounded-full">
                                            {product.tags}
                                        </span>
                                    </div>
                                    <div className=" w-full flex  justify-between items-center  mb-2">

                                        <div className="flex items-center gap-2">
                                            <p className="lg:text-[15px] text-[12px]  font-bold text-[#000000]">
                                                ₹{product.price.toLocaleString("en-IN")}
                                            </p>
                                            <p className="text-sm line-through text-gray-400">
                                                ₹{product.oldPrice.toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                        <div className="flex justify-end items-end">
                                            <span className="rounded-full group-hover:bg-[#336570] justify-between py-3 px-3  bg-white border border-[#797979]">
                                                <IoBagOutline
                                                    size={15}
                                                    className="group-hover:text-white text-black"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="absolute bottom-4 gap-1 left-0 w-full border-t border-gray-200 bg-white text-[#5D5D5D] px-4 py-2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-900 rounded-b-2xl">
                                        <button className="flex items-center text-sm hover:text-black">
                                            <span className="mr-1"><CiHeart size={16} /></span> Add to Wishlist
                                        </button>
                                        <button className="flex items-center text-sm hover:text-black">
                                            <span className="mr-1">🛒</span> Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}