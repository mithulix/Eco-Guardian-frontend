import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import CategoryCard from "../mulitUse/CategoryCard";

export default function CategorySection() {
  const { data } = useGetCategoriesQuery({ limit: 1000 });

  const categories = data?.data?.map((category: any) => ({
    id: category?._id,
    title: category?.title,
  }));

  return (
    <div className="section-padding">
      <div className="card_div">
        {categories?.map((category: any) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            title={category.title}
          />
        ))}
      </div>
    </div>
  );
}