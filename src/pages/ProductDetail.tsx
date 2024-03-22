import React from "react";
import { useParams } from "react-router-dom";
import { useProductDetails } from "../hooks/useProductDetails";
import { FaStar, FaRegStar, FaRegHeart } from "react-icons/fa";

const ProductDetail = () => {
  const { productId } = useParams();

  const {
    data: product,
    isLoading,
    isError,
  } = useProductDetails(Number(productId));

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
    return <div className="flex">{stars}</div>;
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
    <div className="flex justify-center mt-10 p-4">
      <div className="w-[700px] max-w-4xl border rounded-lg overflow-hidden shadow-lg bg-white flex flex-col md:flex-row">
        <div className="md:w-1/2 relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover transition duration-500 hover:scale-110"
          />
          <button
            className="absolute top-0 right-0 m-4"
            onClick={() => console.log("Added to favorites:", product?.id)}
          >
            <FaRegHeart className="text-xl text-gray-800" />
          </button>
        </div>
        <div className="p-8 md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-xl font-bold mb-2">{product?.title}</h1>
            <p className="text-gray-700 mb-4">{product?.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">${product?.price}</span>
              {product?.rating && renderRating(product.rating.rate)}
            </div>
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white w-full rounded hover:bg-blue-600 self-end"
            onClick={() => console.log("Added to cart:", product?.id)}
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
