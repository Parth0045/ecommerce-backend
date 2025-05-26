import { createSubCategory } from '../services/subcategory.service.js';

const createSubCategoryController = async (req, res) => {
    try {
        const userId = req.user.id;
        const seller_id = userId;
        const category_id = req.body.category_id;
        console.log(category_id);
        const sub_category_name = req.body.sub_category_name;
        const categorie = await createSubCategory({seller_id, sub_category_name, category_id }) ;
        res.json({ message: 'subCategories add successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
};
export{
createSubCategoryController
}