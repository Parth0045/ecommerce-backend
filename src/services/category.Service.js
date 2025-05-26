import categories from '../models/categories.js';

const createCategory = async ({ seller_id, category_name }) => {


    const categorie = await categories.create({
        seller_id,
        category_name,
    });
    return categorie;
};

const getCategory = async (seller_id) => {
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

const updateCategory = async ({ seller_id, categorieId, updatedCategorieName }) => {
    // console.log(seller_id);
    const sellerID = seller_id.seller_id;
    console.log("Service ", updatedCategorieName);
    console.log("Service ", categorieId);

    const result = await categories.update({ categories_name: updatedCategorieName }, { where: { id: categorieId } });
    // const updated = result[0];
    console.log(result);

    return result;
};

const deleteCategory = async ({ categorieId }) => {
    console.log("Service ", categorieId);
    const result = await categories.destroy({
        where: {
            id: categorieId,
        },
    });
    console.log(result);
    return result;
};

const findeCategory = async () => {

    const categorie = await categories.findAll();
    console.log(categorie);
    console.log("display cat service");
    return categorie;
};

export {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    findeCategory
}

