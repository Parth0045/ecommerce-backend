import {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    fatchAllCategory,
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    fatchAllSubCategory
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

        const categories = await getCategory({ seller_id: req.user.id });
   
        return res.status(200).json({
            error: false,
            message: "Categories retrieved successfully!",
            data: categories
        });
   
    } catch (error) {
   
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

const createSubCategoryController = async (req, res) => {

    try {

        const subCategory = await createSubCategory({ seller_id: req.user.id, ...req.body });

        return res.status(200).json({
            error: false,
            message: "Subcategory created successfully",
            data: subCategory,
        });

    } catch (error) {

        throw Error(error);

    }
};

const getSubCategoryController = async (req, res) => {

    try {

        const subCategories = await getSubCategory(req.user);

        return res.status(200).json({
            error: false,
            message: "Subcategory retrieved successfully",
            data: subCategories,
        });

    } catch (error) {

        throw Error(error);

    }
};

const updateSubCategoryController = async (req, res) => {

    try {

        const updatedSubCategory = await updateSubCategory({ ...req.params, ...req.body });

        return res.status(200).json({
            error: false,
            message: "Subcategory updated successfully",
            data: updatedSubCategory,
        });

    } catch (error) {

        throw Error(error);

    }
};

const deleteSubCategoryController = async (req, res) => {

    try {

        const deletedSubCategory = await deleteSubCategory(req.params);

        return res.status(200).json({
            error: false,
            message: "Subcategory deleted successfully",
            data: deletedSubCategory,
        });

    } catch (error) {

        throw Error(error);

    }
};

const fatchAllSubCategoryController = async (req, res) => {

    try {

        const fatchAllCategories = await fatchAllSubCategory();
        
        return res.status(200).json({
            error: false,
            message: "All subcategory retrieved successfully",
            data: fatchAllCategories,
        });
   
    } catch (error) {
   
        throw Error(error);
   
    }
};

export {
    createCategoryController,
    getCategoryController,
    updateCategoryController,
    deleteCategoryController,
    fatchAllCategoryController,
    createSubCategoryController,
    getSubCategoryController,
    updateSubCategoryController,
    deleteSubCategoryController,
    fatchAllSubCategoryController
};