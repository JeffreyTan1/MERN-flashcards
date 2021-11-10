import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization?.split(" ");
    // console.log(bearer, token)
    let decodedData;
    if(token && bearer == `Bearer`) {
      try {
        decodedData = jwt.verify(token, process.env.JWT_SECRET)
      } catch (error) {
        console.error(error)
        return res.status(401).json({error: "Unauthorized token or token is expired." }) 
      }
      
      req.user_id = decodedData?._id;
      next()
    } else {
      return res.status(401).json({error: "No authorization header specified." }) 
    }

  } catch (error) {
    console.error(error)
  }

}

export default auth