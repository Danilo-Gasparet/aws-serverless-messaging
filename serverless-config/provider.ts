import type { AWS } from "@serverless/typescript";

export const provider: AWS["provider"] = {
  name: "aws",
  stage: "dev",
  region: "eu-west-2",
  stackName: "serverless-messaging-aws",
  runtime: "nodejs14.x",
  apiGateway: {
    minimumCompressionSize: 1024,
    shouldStartNameWithService: true,
  },
  environment: {
    AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    topicArn: { Ref: "messagingSNS" },
  },
  iamRoleStatements: [
    {
      Action: ["sns:Publish"],
      Effect: "Allow",
      Resource: { Ref: "messagingSNS" },
    },
  ],
};

module.exports = { provider };
