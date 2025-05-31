import review from '../models/review.js';

const createReview = async (...reviewData) => {
   
    const reviews = review.create(...reviewData);
    return reviews;

};
export{
    createReview
}