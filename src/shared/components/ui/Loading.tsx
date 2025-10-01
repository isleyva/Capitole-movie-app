import { memo } from "react";

interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Loading = memo<LoadingProps>(({ message = "Loading..." }) => {
  return (
    <div className="movie-detail__container">
      <div className="movie-detail__state-container">
        <div className="movie-detail__loading">
          <div className="movie-detail__loading-spinner"></div>
          <h2 className="movie-detail__loading-title">LOADING</h2>
          <p className="movie-detail__loading-message">{message}</p>
        </div>
      </div>
    </div>
  );
});
