import {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    fatchAllCategory
} from '../services/category.service.js';

const createCategoryController = async (req, res) => {
    try {
        const categories = await createCategory({ seller_id: req.user.id, ...req.body });
        return res.status(200).json({
            error: false,
            message: 'Categories created successfully!',
            data: categories
        });
    } catch (error) {
        throw Error(error);
    }
};

const getCategoryController = async (req, res) => {
    try {

        const categories = await getCategory({ ...req.user });
        return res.status(200).json({
            error: false,
            message: "Categories retrieved successfully!",
            data: categories
        });
    } catch (err) {
        throw Error(error);
    }
};

const updateCategoryController = async (req, res) => {
    try {
        const category = await updateCategory({ ...req.params, ...req.body });
        return res.status(200).json({
            error: false,
            message: "Category updated successfully!",
            data: category
        });
    } catch (error) {
        throw Error(error);
    }
};

const deleteCategoryController = async (req, res) => {
    try {
        const category = await deleteCategory(req.params.id);
        return res.status(200).json({
            error: false,
            message: "Category delete successfully!",
            data: category
        });
    } catch (error) {
        throw Error(error);
    }
};

const fatchAllCategoryController = async (req, res) => {
    try {
        const category = await fatchAllCategory();
        return res.status(200).json({
            error: false,
            message: "All categories retrieved successfully!",
            data: category
        });
    } catch (error) {
        res.json({ message: err.message });
    }
};


export {
    createCategoryController,
    getCategoryController,
    updateCategoryController,
    deleteCategoryController,
    fatchAllCategoryController
};