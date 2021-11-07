import UsersDAO from '../dao/usersDAO.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const apiPostLogin= async (req, res, next) => {
  const {email, password} = req.body

  try{
    const existingUser = await UsersDAO.getUser(email)
    if (!existingUser) {return res.status(404).json({message: "User does not exist."})} // client side says no existing user
    
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {return res.status(400).json({ message: "Invalid credentials" })};

    const token = jwt.sign({ email: existingUser.email, _id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    return res.status(200).json({result: existingUser, token}) 
  } catch (error) {
    return res.status(500).json({message: "Something went wrong."}) 
  }
}

export const apiPostSignUp= async (req, res, next) => {
  const {email, password, confirmPassword} = req.body
  try{
    const existingUser = await UsersDAO.getUser(email)
    if (existingUser) {return res.status(400).json({message: "User already exists."})} // client side says already exists
    
    if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password))) 
    {return res.status(400).json({ message: "Password does not match pattern." })};
    
    if (password != confirmPassword) 
    {return res.status(400).json({ message: "Passwords do not match." })};

    const salt = bcrypt.genSaltSync(12)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const result = await UsersDAO.addUser({email, hashedPassword})

    if(result) {res.status(200).json({message: "User successfully created"}) }
    else {throw Error}
  } catch (error) {
    res.status(500).json({message: "Something went wrong."}) 
  }
}
