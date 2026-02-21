const User = require("../models/user.model")
const bcrypt = require("bcryptjs")

const register = async(req, res) => {
    try {
        // lấy data
        const {username, password, fullname} = req.body;
        const existingUser = await User.findOne({ username })

        // ktra sự tồn tại của username
        if (existingUser){
            return res.status(400).json({
                message: "Username already exists"
            });
        }
 
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = await User.create({
            username,
            password: hashedPassword,
            fullname
        });

        return res.status(201).json(newUser)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.send("Wrong password");

  req.session.userId = user._id;
  res.redirect("/v3");
};

module.exports = {
    register,
    login
}