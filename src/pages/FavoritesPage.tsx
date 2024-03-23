import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../features/favorites/favoritesSlice";
import { RootState } from "../app/store";
import { Link } from "react-router-dom";

function FavoritesPage() {
  const favorites = useSelector((state: RootState) => state.favorites.value);
  const dispatch = useDispatch();
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Favorilerim</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.length > 0 ? (
          favorites.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg flex flex-col justify-between h-[400px]"
            >
              <div>
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48  mb-2"
                  />
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                </Link>
                <p className="text-gray-800">${product.price}</p>
              </div>
              <button
                onClick={() => dispatch(removeFavorite(product.id))}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 self-start"
              >
                Favorilerden Çıkar
              </button>
            </div>
          ))
        ) : (
          <p>Favori ürününüz bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
