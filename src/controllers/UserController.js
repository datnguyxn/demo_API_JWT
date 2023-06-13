import User from '../models/user.js';

class UserController  {
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
    async deleteUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            // await user.delete();
            res.status(200).json({ message: 'User deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
}

export default new UserController();