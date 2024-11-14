import { FaTrash } from "react-icons/fa";
import { Review } from "../types/types";
import RatingsComponent from "../components/ratings";

const ReviewCard = ({
  review,
  userId,
  handleDeleteReview,
}: {
  userId?: string;
  review: Review;
  handleDeleteReview: (reviewId: string) => void;
}) => (
  <div className=" border-white border shadow-md p-2 rounded-xl">
    <div className="flex items-center gap-2 py-2">
      <img src={review.user.photo} alt="User" className="size-6" />
      <small>{review.user.name}</small>
    </div>
    <RatingsComponent value={review.rating} />
    <p className="py-2 text-sm">{review.comment}</p>
    {userId === review.user._id && (
      <button onClick={() => handleDeleteReview(review._id)}>
        <FaTrash />
      </button>
    )}
  </div>
);

export default ReviewCard;
