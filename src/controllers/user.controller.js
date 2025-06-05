import {
    findUser,
    updateUser,
    resetUserPassword,
} from '../services/user.service.js';

const getUserController = async (req, res) => {
    
    try {
    
        const user = await findUser(req.user.id);
    
        return res.status(200).json({
            error: false,
            message: 'User get successfully!',
            data: { user }
        });
    
    }
    
    catch (error) {
    
        throw Error(error);
    
    }
};

const updateUserController = async (req, res) => {

    try {

        const updateResult = await updateUser({ id: req.user.id, ...req.body });

        res.status(200).json({
            error: false,
            message: "Update successful",
            data: updateResult
        });

    } catch (error) {

        throw Error(error);

    }
};

const resetPasswordController = async (req, res) => {
  
    try {
  
        if (!req.body.oldPassword || !req.body.newPassword) {
  
            return res.json({ message: 'Old password and new password are required' });
  
        }
  
        const resetPassword = await resetUserPassword({ userId: req.user.id, ...req.body });
  
        res.status(200).json({
            error: false,
            message: "Reset password successful",
            data: resetPassword
        });
  
    } catch (error) {
  
        throw Error(error);
  
    }
};

export {
    getUserController,
    resetPasswordController,
    updateUserController,
};










