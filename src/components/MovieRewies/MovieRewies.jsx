import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { reviewsFetcher } from "../../api";
import s from "./MovieRewies.module.css"

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const feedBacks = await reviewsFetcher(movieId);
        setReviews(feedBacks.data.results);
      } catch (error) {
        console.error("Failed to fetch cast:", error);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  if (reviews.length === 0)
    return <p>There are no reviews for this movie yet.</p>;

  return (
    <ul className={s.reviewContainer}>
      {reviews.map((review) => {
        return (
          <li key={review.id} className={s.reviewItem}>
            <p className={s.reviewAuthor}>
              <strong>{review.author}</strong>
            </p>
            <p className={s.reviewText}>{review.content}</p>
          </li>
        );
      })}
      {loading && <Loader />}
    </ul>
  );
};

export default MovieReviews;
