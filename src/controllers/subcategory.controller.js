import {
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    fatchAllSubCategory
} from '../services/subcategory.service.js';

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
        console.log("hello fatch sunbcategory");

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
    createSubCategoryController,
    getSubCategoryController,
    updateSubCategoryController,
    deleteSubCategoryController,
    fatchAllSubCategoryController
}