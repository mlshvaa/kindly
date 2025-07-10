import { getAllReviews } from '@/entities/review/model/reviewThunks';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import React, { useEffect } from 'react';

function ReviewsCard(): React.JSX.Element {
  const { reviews } = useAppSelector((store) => store.review);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getAllReviews());
  }, [dispatch]);

  return (
    <>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="oneReviewCard">
            <div className="parentInfo">
              <h5>{review.parent.user?.name}</h5>
              <p>
                {review.parent.user?.role === 'parent' && review.parent.children.length > 0
                  ? `Ребенок: ${review.parent.children[0].name} (${review.parent.children[0].age} лет)`
                  : ''}
              </p>
            </div>
            <div className="reviewParagraph">
              <p>{review.text} 🎨💫💕</p>
            </div>
          </div>
        ))
      ) : (
        <p>Отзывы отсутствуют</p>
      )}
    </>
  );
}

export default ReviewsCard;
