import { ReactNode } from "react";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";

type ICategoryCard = {
  title: string;
  id: string;
};

export default function CategoryCard({ title, id }: ICategoryCard) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`categories/${id}`)}
      className="flex flex-col items-center gap-2 bg-orange-300 rounded-md p-6 hover:-translate-y-2 transition-transform"
    >
      <p className="font-bold">{title}</p>
    </div>
  );
}