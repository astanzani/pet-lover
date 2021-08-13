## Pet Lover API
Serverless Graphql api for the pet lover web and mobile apps.

## Querying the API
You can run queries on the deployed API by using the apollo studio explorer as following.
- Get an `id_token` for an user from the cognito user pool by running the following on the cli and getting the token from the response:
  ```
  aws cognito-idp initiate-auth --region YOU_REGION --auth-flow USER_PASSWORD_AUTH --client-id YOUR_CLIENT_ID --auth-parameters USERNAME=YOUR_EMAIL,PASSWORD=YOUR_PASSWORD
  ```

- Go to: https://studio.apollographql.com/sandbox/explorer/, add https://h64bajovyc.execute-api.us-east-1.amazonaws.com/dev/graphql (or whatever the deployed url is) as the endpoint, and use the token from the previous step as an `Authorization` header on your queries
- ???
- Profit

