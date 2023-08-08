const User = require('../model/user');
const Jwt = require('jsonwebtoken');
const Validator = require('validator');
const Bcrypt = require('bcrypt');
const cookie = require('cookie');


const userSignup = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        if (!Validator.isEmail(email)) {
            return res.status(403).send({ error: 'an invalid email format' });
        }
        if (password.length < 6) {
            return res.status(403).send({ error: 'A password must be 6 characters long or more' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email already exists' });
        }
        const hashedPassword = await Bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword });
        let result = await user.save();

        return res.status(201).send({ message: 'Signup successful' });
    }
    catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).send({ error: 'Server error' });
    }
};


const userLogin = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        if (!Validator.isEmail(email)) {
            return res.status(403).send({ error: 'an invalid email format' });
        }
        if (Validator.isEmpty(password)) {
            return res.status(403).send({ error: 'can not be empty' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }

        const passwordMatch = await Bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }

        Jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                return res.send({ result: "Something went wrong, Please try again after sometime" })
            }
            res.cookie('token', token, { httpOnly: true });
            return res.status(200).send({ userId: user._id, auth: token });
        })

    }
    catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send({ error: 'Server error' });
    }

}

const userLogout = async (req, res) => {

    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
}

module.exports = { userSignup, userLogin, userLogout };