const db = require("../models/index");
const md5 = require("md5");
const { password } = require("../config/app.config");

const UserService = {
    
    getUser : async (id) => {
        const user = await db.n_d11_user_infos.findAll({
            where : {
                id: id
            }
        }).then((res) => {
            console.log("query executed successfully.");
            return res;
        }).catch(() => {
            console.log("Db error.");
        });
        return user;
    },

    createUser: async (body) => {
            const user = await db.n_d11_user_infos.create({
            fist_name: body.fist_name,
            last_name: body.last_name,
            email_id: body.email_id,
            phone_number: body.phone_number,
            is_verified: body.is_verified ? true : false,
            is_staff: body.is_staff ? true: false,
            came_from_referral: body.came_from_referral ? true: false,
            pan_number: body.pan_number,
            dream11_username: body.dream11_username,
            user_last_active: body.user_last_active,
            balance: 0,
            contest_joined: 0,
            contest_won: 0,
            user_points: 0,
            universal_identification_id: 12123232,
            is_signed_in: true,
            password: md5(body.password),
            created_at: "19:29:11",
            updated_at: "19:29:16",
        }).then((result) => {
            return result;
        }).catch((error) => {
            return error;
        });
        return user;
    },

    checkUserPassword: async (username, password) => {
        const hash = md5(password);
        const booleanres = await db.n_d11_user_infos.findAll({
            where: {
                dream11_username: username
            },
            attributes: ['password'],
            raw: true
        }).then(password => {
            const npassword = password[0].password;
            if(npassword === hash)
            return {result: true, status: 200, message: "Password matched."};

            else return {result: false, status: 200, message: "Password did not match. Try again."};
        }).catch(() => {
            return {status: 500, message: "Internal server error."};
        });

        return booleanres;
    }

    }

module.exports = UserService;