import subCategories from '../models/subCategories.js';

const createSubCategory = async ({ categories_id, seller_id, sub_categories_name }) => {
    console.log(sub_categories_name);
    console.log(categories_id);

    const subCategorie = await subCategories.create({
        seller_id,
        categories_id,
        sub_categories_name,
    });
    return subCategorie;
};
export{
    createSubCategory
}
