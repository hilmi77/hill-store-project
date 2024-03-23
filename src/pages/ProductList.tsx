import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../features/favorites/favoritesSlice";
import { RootState } from "../app/store";
import { useProductsPage } from "../hooks/useProductsPage";
import { Link } from "react-router-dom";
import { FaRegHeart, FaStar, FaRegStar, FaHeart } from "react-icons/fa";
import HeaderCategories from "../components/HeaderCategories";

type Product = {
  id: number;
  title: string;
  descritpion?: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const isFavorite = (product: Product, favorites: Product[]) => {
  return favorites.some((fav) => fav.id === product.id);
};

const ProductList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.value);

  const [category, setCategory] = React.useState<string>("All");
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useProductsPage(category);

  const handleFavoriteToggle = (product: Product) => {
    if (isFavorite(product, favorites)) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  console.log("favorites", favorites);

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  // Rating için yıldızları render eden fonksiyon
  const renderRating = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= Math.ceil(rate) ? (
          <FaStar key={i} className="text-yellow-500" />
        ) : (
          <FaRegStar key={i} className="text-gray-300" />
        )
      );
    }
    return <div className="flex">{stars}</div>; // Merkezden sola hizalama için justify-center kaldırıldı
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <HeaderCategories onCategorySelect={handleCategoryChange} />
      <div className="py-8 flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((product: Product) => (
                <div
                  key={product.id}
                  className="w-[300px] border rounded-lg overflow-hidden shadow-lg relative flex flex-col transition duration-500 hover:scale-110"
                >
                  <button
                    className="absolute top-0 right-0 p-2 bg-white rounded-full"
                    style={{
                      margin: "10px",
                      background: "rgba(255, 255, 255, 0.6)",
                    }}
                    onClick={() => handleFavoriteToggle(product)}
                  >
                    {isFavorite(product, favorites) ? (
                      <FaHeart className="text-xl text-red-500" /> // Favorilerdeyse dolu kalp
                    ) : (
                      <FaRegHeart className="text-xl text-gray-800" /> // Favorilerde değilse boş kalp
                    )}
                  </button>

                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="ml-16 mt-2 w-[150px] h-[100px]  transition duration-500 hover:scale-110"
                    />
                  </Link>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-2 truncate">
                      {product.title}
                    </h3>
                    <div className="flex flex-col mb-3">
                      <p className="from-neutral-600">
                        {product.price} <span className="font-normal">$</span>
                      </p>
                      {/* Dinamik olarak rating.rate değerine göre yıldızları render ediyoruz */}
                      {renderRating(product.rating.rate)}
                    </div>
                    <button
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 self-center"
                      onClick={() => console.log("Sepete eklendi:", product.id)}
                    >
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
        {hasNextPage && (
          <div className="text-center mt-8">
            <button
              onClick={() => fetchNextPage()}
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              Daha Fazla Yükle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
