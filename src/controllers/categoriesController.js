import { addCategories } from '../services/categoriesService.js';
import { getCategories } from '../services/categoriesService.js';
import { updateCategorie } from '../services/categoriesService.js';

export const addNewCategories = async (req, res) => {
    try {
        const userId = req.user.id;
        const seller_id = userId;
        console.log(seller_id);
        const categories_name = req.body.categories_name;
        console.log(categories_name);
        const categorie = await addCategories({seller_id, categories_name }) ;
        res.json({ message: 'Categories add successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }

};

export const getAllcategories = async (req, res) => {
    try {
 
       const userId = req.user.id;
        const seller_id = userId;
        console.log(seller_id);
        const categorie = await getCategories({seller_id }) ;
        res.json(categorie);
    } catch (err) {
        res.json({ message: err.message });
    }
};

export const updateCategories = async (req, res) => {
    try {
 
        const userId = req.user.id;
        const categorieId = req.params.id;
        const updatedCategorieName = req.body.categories_name;
        const seller_id = userId;
        // console.log(seller_id);
        const categorie = await updateCategorie({seller_id, categorieId, updatedCategorieName }) ;
        res.send({ message: 'Categorie updated successfully'});
    } catch (err) {
        res.json({ message: err.message });
    }
};
