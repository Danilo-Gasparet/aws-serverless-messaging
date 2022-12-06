import type { AWS } from '@serverless/typescript';

import message from '@functions/message';
import { provider } from './serverless-config/provider';

const serverlessConfiguration: AWS = {
  // Service Name
  service: 'serverless-messaging-aws',

  // Framework version constraint (semver constraint): '3', '^2.33'
  frameworkVersion: '3',

  // Plugins extends the Serverless Framework with new features.
  // Serverless plugin to bundle JavaScript and TypeScript lambdas with esbuild - an extremely fast bundler and minifier
  plugins: ['serverless-esbuild'],

  // Configuring the Cloud provider
  provider: {
    ...provider,
  },

  // Import the functions
  functions: { message },

  // Resources for functions to use
  resources : {
    Resources: {
      // Creating the SNS resource topic
      SNSEvent: {
        Type: "AWS::SNS::Topic",
        Properties:{
          DisplayName: "SNSmessages",
          TopicName: "incoming-messages",
        },
      },
    },
  },

  // Configuration on how to package functions
  package: { individually: true },

  // Define custom plugin properties
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
