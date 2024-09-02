const express=require("express");
const User=require('../models/user');
const {handleGetAllUsers, getUserById, patchUserById, deleteUserById,handleCreateNewUser}= require('../contollers/user');
const router = express.Router();

router.route("/user").get(handleGetAllUsers).post(handleCreateNewUser);


router.route("/:id")
.get(getUserById)
.patch(patchUserById)
.delete(deleteUserById);


// router.route("/users")
// .get(async (req, res) => {
//     const allDbUsers = await User.find({});
//     const html = `
//     <ul>
//     ${allDbUsers.map((user) => `<li>${user.first_name} - ${user.email}</li>`).join("")}
//     </ul>
//     `;
//     res.send(html);
// });


    module.exports=router;