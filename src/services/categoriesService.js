import categories from '../models/categories.js';

export const addCategories = async ({ seller_id, categories_name }) => {


    const categorie = await categories.create({
        seller_id,
        categories_name,
    });
    return categorie;
};

export const getCategories = async (seller_id) => {
    // console.log(seller_id);
    const sellerID = seller_id.seller_id;
    // console.log(sellerID);        
    const categorie = await categories.findAll({
        where: {
            seller_id: sellerID,
        },
    });
    console.log(categorie);
    console.log("hello");
    return categorie;
};

export const updateCategorie = async ({ seller_id, categorieId, updatedCategorieName }) => {
    // console.log(seller_id);
    const sellerID = seller_id.seller_id;
    console.log("Service ",updatedCategorieName);
    console.log("Service ",categorieId);

    const result = await categories.update( {categories_name : updatedCategorieName }, { where: { id: categorieId } });
    // const updated = result[0];
    console.log(result);
    
    return result;
};
