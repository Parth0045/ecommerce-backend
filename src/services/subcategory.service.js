import subCategories from '../models/subCategories.js';

const createSubCategory = async ({ category_id, seller_id, sub_category_name }) => {
    const subCategorie = await subCategories.create({
        seller_id,
        category_id,
        sub_category_name,
    });
    return subCategorie;
};
export{
    createSubCategory
}
