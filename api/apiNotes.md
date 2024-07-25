Ridiculous issue that took me a billion years to fix:

If the audience isn't specified when the authorize endpoint is called, auth0 issues a weird JWE/opaque token instead of simply failing. This causes bizzare problems. To fix this, you need to specify the audience within the custom auth and token endpoints in your api. The audience is appended at the end of the auth request in oauth.service.ts

Example Auth URL for gpt settings:

https://vigilant-space-guide-wx5xwpppr6f577-6060.app.github.dev/api/oauth/auth

Example Token URL for gpt settings:

https://vigilant-space-guide-wx5xwpppr6f577-6060.app.github.dev/api/oauth/token


Of course, the address given there will be different depending on the name of the codespaces instance or the server otherwise in use