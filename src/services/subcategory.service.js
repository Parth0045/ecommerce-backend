import subCategories from '../models/subCategories.js';

const createSubCategory = async ({ category_id, seller_id, sub_category_name }) => {
    const subCategorie = await subCategories.create({
        seller_id,
        category_id,
        sub_category_name,
    });
    return subCategorie;
};
const getSubCategory = async (seller_id) => {
    const sellerID = seller_id.seller_id;
    const categories = await subCategories.findAll({
        where: {
            seller_id: sellerID,
        },
    });
    // console.log(categories);
    // console.log("hello");
    return categories;
};
const updateSubCategory = async ({ seller_id, subCategorieId, updatedSubCategoryName }) => {
    const sellerID = seller_id.seller_id;
    console.log("Service ", updatedSubCategoryName);
    console.log("Service ", subCategorieId);
    const result = await subCategories.update({ sub_category_name: updatedSubCategoryName }, { where: { id: subCategorieId } });
    console.log(result);
    return result;
};
const deleteSubCategory = async ({ subCategorieId }) => {
    console.log("Service ", subCategorieId);
    const result = await subCategories.destroy({
        where: {
            id: subCategorieId,
        },
    });
    console.log(result);
    return result;
};
const fatchSubCategory = async () => {
    const subCategory = await subCategories.findAll();
    console.log(subCategory);
    console.log("display cat service");
    return subCategory;
};

export {
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    fatchSubCategory
}
