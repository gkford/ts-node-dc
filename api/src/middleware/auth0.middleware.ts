import * as dotenv from "dotenv";
import { auth, UnauthorizedError } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";

dotenv.config({ path: '.env' });

const authMiddleware = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
});

export const validateAccessToken = (req: Request, res: Response, next: NextFunction) => {
  console.log('validateAccessToken - Starting token validation');
  console.log('validateAccessToken - Auth0 Domain:', process.env.AUTH0_DOMAIN);
  console.log('validateAccessToken - Auth0 Audience:', process.env.AUTH0_AUDIENCE);

  // Extract and decode the token
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.error('validateAccessToken - Invalid token format');
        return res.status(401).json({ message: 'Invalid token format' });
      }
      const decodedToken = JSON.parse(Buffer.from(parts[1], 'base64').toString());
      console.log('validateAccessToken - Decoded token:', decodedToken);
    } catch (error) {
      console.error('validateAccessToken - Error decoding token:', error);
      return res.status(401).json({ message: 'Error decoding token' });
    }
  } else {
    console.error('validateAccessToken - No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  authMiddleware(req, res, (err: any) => {
    if (err) {
      console.error('validateAccessToken - Token validation failed:', err);
      if (err instanceof UnauthorizedError) {
        console.error('validateAccessToken - Unauthorized error details:', err.headers, err.message);
      }
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.log('validateAccessToken - Token validation successful');
    next();
  });
};
