import review from '../models/review.js';

const createReview = async (reviewData) => {
    return await review.create({ ...reviewData });
};

const getSellerReviews = async ({ seller_id }) => {

    return await review.findAll({
        where: {
            seller_id
        }
    });
};

const getReviewsByProduct = async (productId) => {
  
    return await review.findAll({
        where: {
            product_id: productId
        }
    });
};

const deleteReviewByBuyer = async ({ reviewId, buyerId }) => {

    const deleted = await review.destroy({
        where: {
            id: reviewId,
            buyer_id: buyerId
        }
    });
   
    return deleted > 0;
};

const deleteReviewBySeller = async (reviewId, sellerId) => {
  
    const deleted = await review.destroy({
        where: {
            id: reviewId,
            seller_id: sellerId
        }
    });
   
    return deleted > 0;
};

const updateReviewByBuyer = async (reviewId, buyerId, updateData) => {
    
    const updatedCount = await review.update(updateData, {
        where: {
            id: reviewId,
            buyer_id: buyerId
        }
    });
    
    return updatedCount[0] > 0;
};

export {
    createReview,
    getSellerReviews,
    getReviewsByProduct,
    deleteReviewByBuyer,
    deleteReviewBySeller,
    updateReviewByBuyer
};