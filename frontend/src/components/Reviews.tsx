import { getGanjaAction } from "../state/action-creators/ganjaActions";
import { ReviewActionType } from "../state/actions/review";
import { useEffect } from "react";
import { ReviewType } from "../types/ReviewType";
import { RootState } from "../state";
import Review from "./Review";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

export const Reviews = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGanjaAction(id) as unknown as ReviewActionType);
  }, [dispatch, id]);

  const { ganja } = useAppSelector((state: RootState) => state.getGanja);
  // console.log(ganja);

  const reviewsNum = ganja?.reviews?.length;

  return (
    <section className="reviews">
      {reviewsNum === 0 ? (
        <h4 className="reviews__title">{`No reviews for ${ganja!.name}!`}</h4>
      ) : (
        <h4 className="reviews__title">user reviews</h4>
      )}
      <ul className="reviews__list">
        {ganja?.reviews?.map((review: ReviewType) => {
          return <Review key={review._id} review={review} />;
        })}
      </ul>
    </section>
  );
};
