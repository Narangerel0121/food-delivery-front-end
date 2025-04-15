import { FoodList } from "@/app/_components/FoodList";
import { CategoryList } from "./_components/CategoryList";
import { Header } from "./_components/Header";

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <div className="bg-neutral-700 w-full h-fit px-12 py-8">
        <CategoryList />
        <FoodList />
      </div>
    </div>
  );
}
