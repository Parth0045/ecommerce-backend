import categories from '../models/categories.js';
import subCategories from '../models/subCategories.js';

const createCategory = async ({ seller_id, category_name }) => {

    const category = await categories.create({
        seller_id,
        category_name,
    });
  
    return category;
};

const getCategory = async (id) => {
  
    const category = await categories.findAll({
        where: {
            seller_id: id.id,
        },
    });
  
    return category;
};

const updateCategory = async ({ id, category_name }) => {
  
    const updateCategory = await categories.update({ category_name: category_name }, { where: { id: id } });
  
    return updateCategory[0] > 0 ? true : false;
};

const deleteCategory = async (deleteCategoryId) => {
  
    const deleteCategory = await categories.destroy({
        where: {
            id: deleteCategoryId,
        },
    });
  
    return deleteCategory;
};

const fatchAllCategory = async () => {
  
    const category = await categories.findAll();
  
    return category;
};


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
  
    const updatedSubCategory = await subCategories.update({ sub_category_name: sub_category_name }, { where: { id: id } });
  
    return updatedSubCategory[0] > 0 ? true : false;
};

const deleteSubCategory = async ({ id }) => {
  
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
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    fatchAllCategory,
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    fatchAllSubCategory
}

