import React from "react";
import { useProductsPage } from "../hooks/useProductsPage";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa"; // Boş kalp ikonu için

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const ProductList = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useProductsPage();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
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
                  onClick={() => console.log("Favorilere eklendi:", product.id)}
                >
                  <FaRegHeart className="text-xl text-gray-800" />
                </button>
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="ml-16 mt-2 w-[150px] h-[100px] transition duration-500 hover:scale-110"
                  />
                </Link>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg mb-2 text-center">
                    {product.title}
                  </h3>
                  <p className="font-bold text-center mb-4 flex-grow">
                    {product.price} $
                  </p>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 self-center"
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
            className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-blue-600"
          >
            Daha Fazla Yükle
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
