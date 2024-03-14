import { ReviewType } from "../types/ReviewType";

const apiUrl = import.meta.env.VITE_API_URL;

const Review = ({ review }: { review: ReviewType }) => {
  console.log(review);

  return (
    <li className="review__card">
      <figure className="review__avatar">
        <img
          src={`${apiUrl}/images/users/${review!.user?.photo}`}
          alt="users pic"
          className="review__avatar-img"
        />
        <p className="review__user">{review!.user?.name}</p>
      </figure>
      <p className="review__content">{review.content}</p>
    </li>
  );
};

export default Review;
