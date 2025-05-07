import { User } from "../models/User.model.js";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    if (!(email || password)) {
      return res.status(401).json({ message: "email or username is required" });
    }

    const user = await User.findOne({
      email: email,
    });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "this user does not exist" });
    }
    const correctPassword = await user.isPasswordCorrect(password);
    // console.log(correctPassword);
    if (!correctPassword) {
      return res.status(401).json({ message: "Incorrect Credentials" });
    }

    const token = await user.generateAuthToken();

    return res.status(200).json({token, message:"User logged in successfully"});
  } catch (error) {
    return res.status(400).json({message:"User Cannot logged in successfully"});
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const newUser = new User({
      email,
      password,
    });

    const user = await newUser.save();

    return res.status(201).json({
      success: true,
      user: { _id: user._id, email: user.email },
      message: 'User is registered',
    });

  } catch (error) {
    console.error('registerUser error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export { loginUser, registerUser };
