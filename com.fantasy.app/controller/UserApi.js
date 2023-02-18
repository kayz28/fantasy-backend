const { checkUserPassword } = require('../service/UserService');
const UserService = require('../service/UserService');


const UserController = {

    getUserById : async (req, res) => {
        const id = req.params.id;
        try {
            const user = await UserService.getUser(id);
            console.log(user);
            return res.status(200).json(user);
        } catch(error) {
            return res.status(400).json('Bad Request');
        }
    },

    createUser : async (req, res) => {
        const body = req.body;
        try {
           const userId = await UserService.createUser(body);
            return res.status(200).json(userId);
        } catch(error) {
            return res.status(400).json('Bad Request');
        }
    },

    checkUserPassword : async (req, res) => {
        const body = req.query;
        try {
            const check = await UserService.checkUserPassword(body.username, body.password);
            return res.status(check.status).json(check);
        } catch(error) {
            return res.status(400).json({'message': 'Bad request'});
        }
    }

}

module.exports = UserController;