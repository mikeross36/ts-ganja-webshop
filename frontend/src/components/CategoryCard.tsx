import { Link } from "react-router-dom";
import { CategoryType } from "../types/CategoryTypes";
import Button from "./Button";
import { getCategoryAction } from "../state/action-creators/categoryActions";
import { CategoryActionType } from "../state/actions/category";
import { useAppDispatch } from "../hooks/useAppDispatch";

const apiUrl = import.meta.env.VITE_API_URL;

const CategoryCard = ({ category }: { category: CategoryType }) => {
  const {
    _id,
    coverImage,
    name,
    slug,
    origin,
    description,
    cbdToThcRatio,
    effectsOfUse,
    periodOfUse,
  } = category;

  const dispatch = useAppDispatch();

  const getCategoryDetails = () => {
    dispatch(getCategoryAction(_id) as unknown as CategoryActionType);
  };

  return (
    <li className="category__card">
      <div className="card__image">
        <img
          src={`${apiUrl}/images/categories/${coverImage}`}
          alt="category pic"
          className="category__card-img"
        />
      </div>
      <div className="category__card-body">
        <h4 className="category__card-title">
          {name} <span>{slug}</span>
        </h4>
        <p>Origin: {origin}</p>
        <p>Description: {description}</p>
        <p>Ratio: {cbdToThcRatio}</p>
        <p>Effects: {effectsOfUse}</p>
        <p>To use in: {periodOfUse}</p>
      </div>
      <div className="card__footer">
        <Link to={`/category/${_id}`}>
          <Button
            onClick={getCategoryDetails}
            type="button"
            className="button button--mid"
          >{`Products of ${name}`}</Button>
        </Link>
      </div>
    </li>
  );
};

export default CategoryCard;
