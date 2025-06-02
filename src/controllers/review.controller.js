import {
    createReview,
    getSellerReviews,
    getReviewsByProduct,
    deleteReviewByBuyer,
    deleteReviewBySeller,
    updateReviewByBuyer
} from '../services/review.service.js';

const createReviewFromOrderController = async (req, res) => {
    try {
        const newReview = await createReview(req.body);
        return res.status(201).json({
            error: false,
            message: "Review submitted successfully!",
            data: newReview
        });
    } catch (error) {
        throw Error(error);
    }
};

const getAllSellerReviewsController = async (req, res) => {
  try {
    const reviews = await getSellerReviews({ seller_id: req.user.id });

    return res.status(200).json({
      error: false,
      message: "Seller reviews fetched successfully!",
      data: reviews
    });
  } catch (error) {
    throw Error(error);
  }
};


const getProductReviewsController = async (req, res) => {
    try {
        const reviews = await getReviewsByProduct( req.params.productId );

        return res.status(200).json({
            error: false,
            message: "Product reviews fetched successfully!",
            data: reviews
        });
    } catch (error) {
        throw Error(error);
    }
};

const deleteOwnReviewController = async (req, res) => {
    try {
        const deleted = await deleteReviewByBuyer({ reviewId: req.params.id, buyerId: req.user.id });
        return res.status(200).json({
            error: false,
            message: "Review deleted successfully!"
        });
    } catch (error) {
        throw Error(error);
    }
};

const deleteSellerReviewController = async (req, res) => {
    try {

        const deleted = await deleteReviewByBuyer(req.params.reviewId, req.user.id);

        return res.status(200).json({
            error: false,
            message: "Review removed successfully!",
            data:deleted
        });
    } catch (error) {
        throw Error(error);
    }
};


const updateOwnReviewController = async (req, res) => { 
    try {
        const success = await updateReviewByBuyer(req.params.id, req.user.id, req.body);
        return res.status(200).json({
            error: false,
            message: "Review updated successfully!"
        });
    } catch (error) {
        throw Error(error);
    }
};

export {
    createReviewFromOrderController,
    getAllSellerReviewsController,
    getProductReviewsController,
    deleteOwnReviewController,
    deleteSellerReviewController,
    updateOwnReviewController
};


