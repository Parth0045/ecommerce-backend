import { createSubCategory } from '../services/subcategory.service.js';

const createSubCategoryController = async (req, res) => {
    try {
        const userId = req.user.id;
        const seller_id = userId;
        const categories_id = req.body.categories_id;
        console.log(categories_id);
        const sub_categories_name = req.body.sub_categories_name;
        const categorie = await createSubCategory({seller_id, sub_categories_name, categories_id }) ;
        res.json({ message: 'subCategories add successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
};
export{
createSubCategoryController
}