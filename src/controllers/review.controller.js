import {
    createReview
} from '../services/review.service.js';

const createReviewController = async (req, res) => {
    try {
        const newReview = createReview(req.body);
        return res.status(201).json({
            error: false,
            message: "Review submitted successfully!",
            data: newReview
        });
    } catch (error) {
        throw Error(error);
    }
};
export {
createReviewController  
};
