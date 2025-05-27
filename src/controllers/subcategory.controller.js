import { createSubCategory, getSubCategory, updateSubCategory, deleteSubCategory, fatchSubCategory } from '../services/subcategory.service.js';

const createSubCategoryController = async (req, res) => {
    try {
        const userId = req.user.id;
        const seller_id = userId;
        const category_id = req.body.category_id;
        console.log(category_id);
        const sub_category_name = req.body.sub_category_name;
        const subCategory = await createSubCategory({ seller_id, sub_category_name, category_id });
        res.json({ message: 'subCategories add successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
};

const getSubCategoryController = async (req, res) => {
    try {

        const userId = req.user.id;
        const seller_id = userId;
        console.log(seller_id);
        const categories = await getSubCategory({ seller_id });
        res.json(categories);
    } catch (err) {
        res.json({ message: err.message });
    }
};
const updateSubCategoryController = async (req, res) => {
    try {

        const userId = req.user.id;
        const subCategorieId = req.params.id;
        const updatedSubCategoryName = req.body.sub_category_name;
        const seller_id = userId;
        const categorie = await updateSubCategory({ seller_id, subCategorieId, updatedSubCategoryName });
        res.send({ message: 'subCategorie updated successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
};
const deleteSubCategoryController = async (req, res) => {
    try {

        const subCategorieId = req.params.id;
        const subCategories = await deleteSubCategory({ subCategorieId });
        res.send({ message: 'subCategory deleted successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
};

const fatchCategoryController = async (req, res) => {
    try {
        console.log("hello fatch sunbcategory");
        
        const subCategories = await fatchSubCategory();
        
        res.json(subCategories);
    } catch (err) {
        res.json({ message: err.message });
    }
};


export {
    createSubCategoryController,
    getSubCategoryController,
    updateSubCategoryController,
    deleteSubCategoryController,
    fatchCategoryController
}