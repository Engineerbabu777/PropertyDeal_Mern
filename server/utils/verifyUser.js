import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

// MIDDLEWARE TO VERIFY AUTHORIZATION TOKEN
export const verifyToken = (req, res, next) => {
  // EXTRACT TOKEN FROM THE AUTHORIZATION HEADER
  const token = req.headers.authorization;

  // LOG THE TOKEN AND REQUEST COOKIES FOR DEBUGGING
  console.log({ token, requestCookies: req.cookies });

  // CHECK IF TOKEN IS MISSING
  if (!token) return next(errorHandler(401, 'Unauthorized'));

  // VERIFY THE TOKEN USING THE SECRET KEY
  jwt.verify(token, 'hvdsgvyuwtwdyutbvas', (err, user) => {
    // HANDLE TOKEN VERIFICATION ERRORS
    if (err) return next(errorHandler(403, 'Forbidden'));

    // ATTACH THE USER OBJECT FROM THE TOKEN TO THE REQUEST OBJECT
    req.user = user;

    // CONTINUE TO THE NEXT MIDDLEWARE OR ROUTE HANDLER
    next();
  });
};
