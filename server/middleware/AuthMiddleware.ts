import jwt from "jsonwebtoken"

export const AuthMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(authHeader===null || authHeader===undefined){
        return res.status(401).json({status:401,message:"Login First"})
    }
    const token=authHeader.split(" ")[1]

    //verify token
    jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{
        if(error) return res.status(401).json({status:401,message:"Unauthorized"})
        req.user=user
        next()
    })
}
export function Authorize(requiredRole) {
    return (req, res, next) => {
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    };
}

