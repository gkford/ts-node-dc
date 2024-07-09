import * as dotenv from "dotenv";
import { auth } from "express-oauth2-jwt-bearer";

dotenv.config({ path: '.env.local' });

export const validateAccessToken = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
});