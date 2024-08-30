const express=require("express");

const router = express.Router();

router.route("/")
    .get(async (req, res) => {
        const allDbUsers = await User.find({});
        return res.json(allDbUsers);
    })
    .post(async (req, res) => {
        const body = req.body;
        if (!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
            return res.status(200).json({ msg: "All fields are required" });
        }
        const result = await User.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            gender: body.gender,
            job_title: body.job_title
        });
        console.log("result", result);
        return res.status(201).json({ msg: "success" });
    });

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

    router.route("/:id")
    .get(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "user not found" });
        return res.json(user);
    })
    .patch(async (req, res) => {
        await User.findByIdAndUpdate(req.params.id, { last_name: "Changed" });
        return res.json({ status: "Success" });
    })
    .delete(async (req, res) => {
        await User.deleteOne({ _id: req.params.id });
        return res.json({ status: "Success" });
    });

    module.exports=router;