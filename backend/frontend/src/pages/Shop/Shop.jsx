import React, { useEffect, useState } from "react";
import useProductStore from "../../stores/useProductStore";
import { ImPlus } from "react-icons/im";
import { motion } from "framer-motion";

const Shop = () => {
  const { products, loading, fetchAllProducts } = useProductStore();
  const [filters, setFilters] = useState({
    category: "",
    color: "",
    brand: "",
    priceRange: [0, 1000],
  });
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const [showColors, setShowColors] = useState(true);
  const [showBrands, setShowBrands] = useState(true);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items per page

  // Fetch products on component mount
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !filters.category || product.category === filters.category;
    const matchesColor = !filters.color || product.color === filters.color;
    const matchesBrand = !filters.brand || product.brand === filters.brand;
    const matchesPriceRange =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];
    return matchesCategory && matchesColor && matchesBrand && matchesPriceRange;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle filter changes
  const handleCategoryChange = (category) => {
    setFilters((prev) => ({ ...prev, category }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleColorChange = (color) => {
    setFilters((prev) => ({ ...prev, color }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleBrandChange = (brand) => {
    setFilters((prev) => ({ ...prev, brand }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePriceRangeChange = (min, max) => {
    setFilters((prev) => ({ ...prev, priceRange: [min, max] }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Toggle sidenav on small screens
  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  // Data for filters
  const categories = [
    { _id: 990, title: "New Arrivals", icons: true },
    { _id: 991, title: "Gudgets" },
    { _id: 992, title: "Accessories", icons: true },
    { _id: 993, title: "Electronics" },
    { _id: 994, title: "Others" },
  ];

  const colors = [
    { _id: 9001, title: "Green", base: "#22c55e" },
    { _id: 9002, title: "Gray", base: "#a3a3a3" },
    { _id: 9003, title: "Red", base: "#dc2626" },
    { _id: 9004, title: "Yellow", base: "#f59e0b" },
    { _id: 9005, title: "Blue", base: "#3b82f6" },
  ];

  const brands = [
    { _id: 9006, title: "Apple" },
    { _id: 9007, title: "Ultron" },
    { _id: 9008, title: "Unknown" },
    { _id: 9009, title: "Shoppers Home" },
    { _id: 9010, title: "Hoichoi" },
  ];

  const priceList = [
    { _id: 950, priceOne: 0.0, priceTwo: 49.99 },
    { _id: 951, priceOne: 50.0, priceTwo: 99.99 },
    { _id: 952, priceOne: 100.0, priceTwo: 199.99 },
    { _id: 953, priceOne: 200.0, priceTwo: 399.99 },
    { _id: 954, priceOne: 400.0, priceTwo: 599.99 },
    { _id: 955, priceOne: 600.0, priceTwo: 1000.0 },
  ];

  return (
    <div className="flex mt-10">
      {/* Sidenav */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          isSideNavOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64`}
      >
        <div className="p-4">
          {/* Category Filter */}
          <div className="w-full mb-6">
            <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
            <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
              {categories.map(({ _id, title, icons }) => (
                <li
                  key={_id}
                  className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between"
                >
                  {title}
                  {icons && (
                    <span
                      onClick={() => setShowSubCatOne(!showSubCatOne)}
                      className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                    >
                      <ImPlus />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Color Filter */}
          <div className="mb-6">
            <div
              onClick={() => setShowColors(!showColors)}
              className="cursor-pointer"
            >
              <h2 className="text-xl font-bold mb-4">Shop by Color</h2>
            </div>
            {showColors && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
                  {colors.map((item) => (
                    <li
                      key={item._id}
                      className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2"
                      onClick={() => handleColorChange(item.title)}
                    >
                      <span
                        style={{ background: item.base }}
                        className={`w-3 h-3 bg-gray-500 rounded-full`}
                      ></span>
                      {item.title}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Brand Filter */}
          <div className="mb-6">
            <div
              onClick={() => setShowBrands(!showBrands)}
              className="cursor-pointer"
            >
              <h2 className="text-xl font-bold mb-4">Shop by Brand</h2>
            </div>
            {showBrands && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
                  {brands.map((item) => (
                    <li
                      key={item._id}
                      className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
                      onClick={() => handleBrandChange(item.title)}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Price Filter */}
          <div>
            <h2 className="text-xl font-bold mb-4">Shop by Price</h2>
            <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
              {priceList.map((item) => (
                <li
                  key={item._id}
                  className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
                  onClick={() =>
                    handlePriceRangeChange(item.priceOne, item.priceTwo)
                  }
                >
                  ${item.priceOne.toFixed(2)} - ${item.priceTwo.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Toggle Button for Small Screens */}
        <button
          onClick={toggleSideNav}
          className="fixed top-4 left-4 bg-gray-800 text-white p-2 rounded-lg lg:hidden z-50"
        >
          {isSideNavOpen ? "Close" : "Filters"}
        </button>

        {/* Product Grid */}
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">Shop</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentItems.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <p className="text-lg font-bold text-gray-800">
                    ${product.price}
                  </p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  {product.isFeatured && (
                    <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full mt-2">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8">
            {Array.from(
              { length: Math.ceil(filteredProducts.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`mx-1 px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;