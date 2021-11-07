import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    let decodedData;
    if(token) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET)
      req.user_id = decodedData?._id;
      next()
    } else {
      return res.status(401).json({message: "No authorization header specified"}) 
    }

  } catch (error) {
    console.log(error)
  }
}

export default auth