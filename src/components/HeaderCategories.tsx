import { useCategories } from "../hooks/useCategories";
const HeaderCategories = ({
  onCategorySelect,
}: {
  onCategorySelect: (category: string) => void;
}) => {
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) return <div>Error loading categories.</div>;

  return (
    <div className="flex flex-wrap justify-center space-x-2 md:space-x-4">
      {["All", ...categories].map((category, i) => (
        <button
          key={i}
          className="px-3 py-1 text-sm text-gray-700 rounded-lg hover:bg-gray-100 mb-2 md:mb-0"
          onClick={() => onCategorySelect(category)}
        >
          {category.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default HeaderCategories;
