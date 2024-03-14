import ProductCard from "./ProductCard";
import { GanjaType } from "../types/GanjaTypes";
import { RootState } from "../state";
import { useAppSelector } from "../hooks/useAppSelector";

const Category = () => {
  const { category } = useAppSelector((state: RootState) => state.getCategory);
  // console.log(category);

  return (
    <section className="category__products section container">
      <h2 className="section__title">products by category</h2>
      <ul className="category__products-container">
        {category?.ganjas.map((ganja: GanjaType) => {
          return <ProductCard key={ganja._id} ganja={ganja} />;
        })}
      </ul>
    </section>
  );
};

export default Category;
