
Important seeming stuff from the tutorial:

However, if you were to deploy your React application to production, you need to add the production logout URL to the "Allowed Logout URLs" list and ensure that Auth0 redirects your users to that production URL and not localhost. Setting logoutParams.returnTo to window.location.origin will do just that.

A best practice when working with Auth0 is to have different tenants for your different project environments. For example, it's recommended for developers to specify a production tenant. A production tenant gets higher rate limits than non-production tenants. Check out the "Set Up Multiple Environments" Auth0 document to learn more about how to set up development, staging, and production environments in the Auth0 Identity Platform.