import { useState } from "react";
import Star from "./Star";

export type StarProps = {
  maxRating: number;
  color: string;
  size: number;
  defaultRating: number | undefined;
  onSetUserRating: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const RatingStars: React.FC<StarProps> = ({
  maxRating = 5,
  color = "#fcc419",
  size = 40,
  defaultRating = 0,
  onSetUserRating,
}): JSX.Element => {
  const [rating, setRating] = useState<number>(defaultRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleRating = (rating: number): void => {
    setRating(rating);
    onSetUserRating(rating);
  };

  return (
    <div className="rating__stars">
      <div className="rating__stars-container">
        {[...Array(maxRating).keys()].map((_, idx) => {
          return (
            <Star
              key={idx}
              onClickRate={() => handleRating(idx + 1)}
              fullStar={
                hoverRating ? hoverRating >= idx + 1 : rating >= idx + 1
              }
              onHoverIn={() => setHoverRating(idx + 1)}
              onHoverOut={() => setHoverRating(0)}
              color={color}
              size={size}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RatingStars;
