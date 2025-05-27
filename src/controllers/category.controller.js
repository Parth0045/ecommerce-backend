import {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    fatchCategory
} from '../services/category.service.js';

const createCategoryController = async (req, res) => {
    try {
        const userId = req.user.id;
        const seller_id = userId;
        console.log(seller_id);
        const category_name = req.body.categories_name;
        console.log(category_name);
        const categorie = await createCategory({ seller_id, category_name });
        res.json({ message: 'Categories add successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
};

const getCategoryController = async (req, res) => {
    try {

        const userId = req.user.id;
        const seller_id = userId;
        console.log(seller_id);
        const categorie = await getCategory({ seller_id });
        res.json(categorie);
    } catch (err) {
        res.json({ message: err.message });
    }
};

const updateCategoryController = async (req, res) => {
    try {

        const userId = req.user.id;
        const categorieId = req.params.id;
        const updatedCategorieName = req.body.categories_name;
        const seller_id = userId;
        // console.log(seller_id);
        const categorie = await updateCategory({ seller_id, categorieId, updatedCategorieName });
        res.send({ message: 'Categorie updated successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
};

const deleteCategoryController = async (req, res) => {
    try {

        const categorieId = req.params.id;
        const categorie = await deleteCategory({ categorieId });
        res.send({ message: 'Categorie deleted successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
};

const fatchCategoryController = async (req, res) => {
    try {
        const categorie = await fatchCategory();
        console.log("display controller");

        res.json(categorie);
    } catch (err) {
        res.json({ message: err.message });
    }
};

export {

  createCategoryController ,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
  fatchCategoryController
};