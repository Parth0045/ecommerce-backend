import users from '../models/user.js';

const findUser = async (userId) => {
    return await users.findByPk(userId);
};

const updateUser = async ({ id, ...userBody }) => {
   
    const result = await users.update(
        { ...userBody },
        { where: { id } }
    );
   
    return result[0] > 0 ? true : false;
};

const resetUserPassword = async ({ userId, oldPassword, newPassword }) => {
   
    const user = await users.findByPk(userId);
    const isValid = await user.validPassword(oldPassword);
   
    if (!isValid) {
        return { message: 'Old password is incorrect' };
    }
   
    user.password_hash = newPassword;
   
    await user.save();
    return user;
};

export {
    findUser,
    updateUser,
    resetUserPassword,
};