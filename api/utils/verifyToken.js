const jwt = require('jsonwebtoken');
const createError = require('./error');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated"));
    }

    jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
        if (err) return next(createError(403, "Token is not valid"));
        req.user = decoded; // Assign decoded data to req.user
        next();
    });
};

const verifyUser = (req,res,next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            if (err) return next(createError(403, "You are not authorized")); 
        }
    })
};

const verifyAdmin= (req,res,next)=>{
    verifyToken(req,res,next, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            if (err) return next(createError(403, "You are not authorized")); 
        }
    })
}

module.exports = { verifyToken,verifyUser,verifyAdmin };



// const verifyUser = (req, res, next) => {
//     const token = req.cookies.token;    //write token
//     if (!token) {           // if token is not available
//       return res.json('Token is missing');
//     } else {                       //token is available
//       jwt.verify(token, 'jwt-secret-key', (err, decoded) => {        //verify the secret key and checks error or decoded
//         if (err) {
//           return res.json('Error with token');
//         } else {
//           if (decoded.role === 'admin') {
//             next();
//           } else {
//             return res.json('not admin');
//           }
//         }
//       });
//     }
//   };