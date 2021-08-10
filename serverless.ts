import type { Serverless } from 'serverless/aws';

const config: Serverless = {
  service: 'pet-lover-api',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    lambdaHashingVersion: 20201221,
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      COGNITO_PET_LOVER_USER_POOL_ID: {
        Ref: 'PetLoverUserPool',
      },
    },
  },
  functions: {
    graphql: {
      handler: 'src/apollo-server.graphqlHandler',
      events: [
        {
          http: {
            path: 'graphql',
            method: 'post',
            cors: true,
            authorizer: {
              type: 'COGNITO_USER_POOLS',
              // @ts-ignore
              authorizerId: {
                Ref: 'ApiGatewayAuthorizer',
              },
            },
          },
        },
        {
          http: {
            path: 'graphql',
            method: 'get',
            cors: true,
            authorizer: {
              type: 'COGNITO_USER_POOLS',
              // @ts-ignore
              authorizerId: {
                Ref: 'ApiGatewayAuthorizer',
              },
            },
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      SmsRole: {
        Type: 'AWS::IAM::Role',
        Properties: {
          AssumeRolePolicyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Effect: 'Allow',
                Principal: {
                  Service: ['cognito-idp.amazonaws.com'],
                },
                Action: ['sts:AssumeRole'],
                Condition: {
                  StringEquals: {
                    'sts:ExternalId': 'SMS_MFA_EXTERNAL_ID',
                  },
                },
              },
            ],
          },
          Policies: [
            {
              PolicyName: 'Cognito',
              PolicyDocument: {
                Version: '2012-10-17',
                Statement: [
                  {
                    Effect: 'Allow',
                    Action: 'sns:Publish',
                    Resource: '*',
                  },
                ],
              },
            },
          ],
          Path: '/service-role/',
        },
      },
      PetLoverUserPool: {
        Type: 'AWS::Cognito::UserPool',
        Properties: {
          UserPoolName: 'pet-lover-user-pool-${sls:stage}',
          UsernameAttributes: ['email'],
          AutoVerifiedAttributes: ['email'],
          AccountRecoverySetting: {
            RecoveryMechanisms: [
              {
                Name: 'verified_email',
                Priority: 1,
              },
              {
                Name: 'verified_phone_number',
                Priority: 2,
              },
            ],
          },
          EnabledMfas: ['SMS_MFA'],
          MfaConfiguration: 'OPTIONAL',
          SmsConfiguration: {
            ExternalId: 'SMS_MFA_EXTERNAL_ID',
            SnsCallerArn: {
              'Fn::GetAtt': ['SmsRole', 'Arn'],
            },
          },
          Schema: [
            {
              Name: 'phone_number',
              Required: true,
            },
          ],
        },
      },
      PetLoverUserPoolClient: {
        Type: 'AWS::Cognito::UserPoolClient',
        Properties: {
          ClientName: 'pet-lover-user-pool-client-${sls:stage}',
          UserPoolId: {
            Ref: 'PetLoverUserPool',
          },
          AllowedOAuthFlows: ['implicit'],
          AllowedOAuthFlowsUserPoolClient: true,
          AllowedOAuthScopes: ['phone', 'email', 'openid', 'profile'],
          CallbackURLs: ['http://localhost:3000'],
          ExplicitAuthFlows: [
            'ALLOW_USER_SRP_AUTH',
            'ALLOW_REFRESH_TOKEN_AUTH',
          ],
          GenerateSecret: false,
          PreventUserExistenceErrors: 'ENABLED',
          SupportedIdentityProviders: ['COGNITO'],
        },
      },
      PetLoverUserPoolDomain: {
        Type: 'AWS::Cognito::UserPoolDomain',
        Properties: {
          UserPoolId: {
            Ref: 'PetLoverUserPool',
          },
          Domain: 'pet-lover-user-pool-domain-${sls:stage}',
        },
      },
      ApiGatewayAuthorizer: {
        Type: 'AWS::ApiGateway::Authorizer',
        DependsOn: ['ApiGatewayRestApi'],
        Properties: {
          Name: 'pet-lover-user-pool-authorizer-${sls:stage}',
          IdentitySource: 'method.request.header.Authorization',
          RestApiId: {
            Ref: 'ApiGatewayRestApi',
          },
          Type: 'COGNITO_USER_POOLS',
          ProviderARNs: [
            {
              'Fn::GetAtt': ['PetLoverUserPool', 'Arn'],
            },
          ],
        },
      },
      GatewayResponseDefault4XX: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
          },
          ResponseType: 'DEFAULT_4XX',
          RestApiId: {
            Ref: 'ApiGatewayRestApi',
          },
        },
      },
      UsersDynamoDBTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:service}-users-${sls:stage}',
          AttributeDefinitions: [
            {
              AttributeName: 'userId',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'userId',
              KeyType: 'HASH',
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
        },
      },
      PetsDynamoDBTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:service}-pets-${sls:stage}',
          AttributeDefinitions: [
            {
              AttributeName: 'userId',
              AttributeType: 'S',
            },
            {
              AttributeName: 'petId',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'userId',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'petId',
              KeyType: 'RANGE',
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
        },
      },
      PostsDynamoDBTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:service}-posts-${sls:stage}',
          AttributeDefinitions: [
            {
              AttributeName: 'petId',
              AttributeType: 'S',
            },
            {
              AttributeName: 'postId',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'petId',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'postId',
              KeyType: 'RANGE',
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
          GlobalSecondaryIndexes: [
            {
              IndexName: 'inverted-index',
              KeySchema: [
                {
                  AttributeName: 'postId',
                  KeyType: 'HASH',
                },
              ],
              Projection: {
                ProjectionType: 'ALL',
              },
            },
          ],
        },
      },
      CommentsDynamoDBTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:service}-comments-${sls:stage}',
          AttributeDefinitions: [
            {
              AttributeName: 'postId',
              AttributeType: 'S',
            },
            {
              AttributeName: 'commentId',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'postId',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'commentId',
              KeyType: 'RANGE',
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
        },
      },
      FriendshipsDynamoDBTable: {
        Type: 'AWS::DynamoDB::Table',
        DependsOn: 'PostsDynamoDBTable',
        Properties: {
          TableName: '${self:service}-friendships-${sls:stage}',
          AttributeDefinitions: [
            {
              AttributeName: 'petId',
              AttributeType: 'S',
            },
            {
              AttributeName: 'friendId',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'petId',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'friendId',
              KeyType: 'RANGE',
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
          GlobalSecondaryIndexes: [
            {
              IndexName: 'inverted-index',
              KeySchema: [
                {
                  AttributeName: 'friendId',
                  KeyType: 'HASH',
                },
                {
                  AttributeName: 'petId',
                  KeyType: 'RANGE',
                },
              ],
              Projection: {
                ProjectionType: 'ALL',
              },
            },
          ],
        },
      },
      FeedsDynamoDBTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:service}-feeds-${sls:stage}',
          AttributeDefinitions: [
            {
              AttributeName: 'userId',
              AttributeType: 'S',
            },
            {
              AttributeName: 'createdAt',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'userId',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'createdAt',
              KeyType: 'RANGE',
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
        },
      },
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  custom: {
    webpack: {
      includeModules: true,
    },
  },
};

module.exports = config;
