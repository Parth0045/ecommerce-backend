import categories from '../models/categories.js';

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
    console.log("Service ", deleteCategoryId);

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

export {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    fatchAllCategory
}

