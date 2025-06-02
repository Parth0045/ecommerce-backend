import subCategories from '../models/subCategories.js';

const createSubCategory = async ({ seller_id, ...subCategoryBody }) => {
    const subCategory = await subCategories.create({
        seller_id,
        ...subCategoryBody
    });
    return subCategory;
};

const getSubCategory = async (userId) => {
    const subCategory = await subCategories.findAll({
        where: {
            seller_id: userId.id,
        },
    });
    return subCategory;
};

const updateSubCategory = async ({ id, sub_category_name }) => {
    console.log(id);
    console.log(sub_category_name);
    
    const updatedSubCategory = await subCategories.update({ sub_category_name: sub_category_name }, { where: { id: id } });
    return updatedSubCategory[0] > 0 ? true : false;
};

const deleteSubCategory = async ({ id }) => {
    console.log("Service ", id);
    const deleteSubCategory = await subCategories.destroy({
        where: {
            id: id,
        },
    });
    return deleteSubCategory;
};

const fatchAllSubCategory = async () => {
    const fatchAllCategories = await subCategories.findAll();

    return fatchAllCategories;
};

export {
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    fatchAllSubCategory
}
