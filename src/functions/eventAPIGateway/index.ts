import eventSchema from "./schemas/inputSchema";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "message",
        request: {
          schemas: {
            "application/json": eventSchema,
          },
        },
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: ["sns:publish"],
      Resource: [
        {
          Ref: "messagingSNS",
        },
      ],
    },
  ],
  iamRoleStatementsInherit: true,
};
