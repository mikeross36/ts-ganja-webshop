import { Helmet } from "react-helmet-async";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getError } from "../utils/getError";
import { ApiError } from "../types/ApiError";
import CategoryCard from "../components/CategoryCard";
import { CategoryType } from "../types/CategoryTypes";
import { CategoryActionType } from "../state/actions/category";
import { useEffect } from "react";
import { getAllCategoriesAction } from "../state/action-creators/categoryActions";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";

const Categories = () => {
  const { categories, loading, error } = useAppSelector(
    (state) => state.getAllCategories
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategoriesAction() as unknown as CategoryActionType);
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{getError(error as unknown as ApiError)}</Message>
      ) : (
        <section className="categories section container">
          <h2 className="section__title">choose by category</h2>
          <ul className="categories__wrapper">
            {categories!.map((category: CategoryType) => {
              return <CategoryCard key={category._id} category={category} />;
            })}
          </ul>
        </section>
      )}
    </>
  );
};

export default Categories;
