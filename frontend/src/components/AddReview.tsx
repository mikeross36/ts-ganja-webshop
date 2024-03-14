import { useState } from "react";
import { addReviewAction } from "../state/action-creators/reviewActions";
import { toast } from "react-toastify";
import { ReviewActionType } from "../state/actions/review";
import { useAppDispatch } from "../hooks/useAppDispatch";

const AddReview = ({ id }: { id: string }) => {
  const [content, setContent] = useState("");

  const dispatch = useAppDispatch();

  const handleAddReview = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) {
      toast.error("Review content is mandatory");
      return;
    }
    setContent("");
    dispatch(addReviewAction(id, content) as unknown as ReviewActionType);
    window.location.reload();
  };
  return (
    <section className="add__review">
      <div className="review__form-bcg">
        <form className="review__form" onSubmit={handleAddReview}>
          <div className="form__control">
            <label htmlFor="review-content" className="form__label">
              add review
            </label>
            <textarea
              className="form__input"
              name=""
              id="review-content"
              cols={4}
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button button--mid">
            save
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddReview;
