const jwt = require('jsonwebtoken');

const verifyToken= (req, res, next) => {
const token = req.header('Authorization');
if(token){
    const decodedToken = jwt.verify(token, 'your-secret-key');
    
    if(decodedToken){
        next();
    }else{
        res.status(401).json({ error: 'Invalid token' });
    }
}else{
    res.status(401).json({ error: 'no token found' });
}

}

module.exports = verifyToken;