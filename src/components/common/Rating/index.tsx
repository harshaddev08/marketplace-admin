import { Star } from "lucide-react";

interface RatingProps {
  rating: number;
  reviewsCount?: number;
  showReviews?: boolean;
}

export const Rating = ({
  rating,
  reviewsCount = 0,
  showReviews = true,
}: RatingProps) => {
  if (rating === 0 && reviewsCount === 0) {
    return <span className="text-muted-foreground">No reviews</span>;
  }

  return (
    <div className="flex items-center gap-1">
      <Star className="w-4 h-4 fill-warning text-warning" />
      <span className="font-medium">{rating}</span>
      {showReviews && reviewsCount > 0 && (
        <span className="text-sm text-muted-foreground">({reviewsCount})</span>
      )}
    </div>
  );
};
