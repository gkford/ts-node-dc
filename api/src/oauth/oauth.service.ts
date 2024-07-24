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
    console.log('tokenProxy - Incoming request body:', req.body);
    console.log('tokenProxy - Incoming request headers:', req.headers);
    
    const auth0Response = await axios.post(
      `https://${AUTH0_DOMAIN}/oauth/token`,
      req.body,
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
      res.status(500).json({
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
