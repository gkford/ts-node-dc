import { Request, Response } from "express";
import axios from "axios";

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;

export const authProxy = (req: Request, res: Response) => {
  console.log('authProxy - Incoming request query:', req.query);
  const auth0AuthorizeUrl = `https://${AUTH0_DOMAIN}/authorize?${new URLSearchParams(req.query as Record<string, string>)}`;
  console.log('authProxy - Redirecting to:', auth0AuthorizeUrl);
  res.redirect(auth0AuthorizeUrl);
};

export const tokenProxy = async (req: Request, res: Response) => {
  try {
    let rawBody = '';
    req.on('data', chunk => {
      rawBody += chunk.toString();
    });
    req.on('end', async () => {
      console.log('tokenProxy - Raw request body:', rawBody);
      console.log('tokenProxy - Parsed request body:', req.body);
      console.log('tokenProxy - Incoming request headers:', req.headers);

      if (!rawBody && Object.keys(req.body).length === 0) {
        console.error('tokenProxy - Request body is empty');
        return res.status(400).json({ message: "Request body is empty" });
      }

    const requiredFields = ['grant_type', 'client_id', 'client_secret', 'code', 'redirect_uri'];
    const missingFields = requiredFields.filter(field => !(field in req.body));

    if (missingFields.length > 0) {
      console.error(`tokenProxy - Missing required fields: ${missingFields.join(', ')}`);
      return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
    }

    const auth0Response = await axios.post(
      `https://${AUTH0_DOMAIN}/oauth/token`,
      new URLSearchParams(req.body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    console.log('tokenProxy - Auth0 response status:', auth0Response.status);
    console.log('tokenProxy - Auth0 response headers:', auth0Response.headers);
    console.log('tokenProxy - Auth0 response data:', auth0Response.data);
    
    res.setHeader('Content-Type', 'application/json');
    res.status(auth0Response.status).send(JSON.stringify(auth0Response.data));
    console.log('tokenProxy - Response sent to client');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `tokenProxy - Failed to fetch token from Auth0, status code: ${error.response?.status}, ` +
        `request data: ${JSON.stringify(req.body)}, error: ${error.response?.data}`
      );
      res.status(error.response?.status || 500).json({
        message: "Failed to exchange token with Auth0.",
        error_details: error.response?.data,
        form_data: req.body
      });
    } else {
      console.error("tokenProxy - Unexpected error:", error);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};
