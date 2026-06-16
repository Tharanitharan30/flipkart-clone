type Props = { rating: number; reviews?: number; size?: "sm" | "md" | "lg"; showReviews?: boolean };

export function StarRating({ rating, reviews, size = "sm", showReviews = true }: Props) {
  const px = size === "lg" ? "text-sm px-2 py-1" : size === "md" ? "text-xs px-1.5 py-0.5" : "text-[11px] px-1.5 py-0.5";
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex items-center gap-1 rounded bg-fk-green text-white font-semibold ${px}`}>
        {rating.toFixed(1)}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      </span>
      {showReviews && reviews !== undefined && (
        <span className="text-xs text-fk-muted">({reviews.toLocaleString("en-IN")})</span>
      )}
    </div>
  );
}
