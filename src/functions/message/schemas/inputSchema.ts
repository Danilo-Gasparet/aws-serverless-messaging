import { FromSchema } from "json-schema-to-ts";

// Creating a JSON schema
const inputSchema = {
  type: "object",
  properties: {
    number: { type: 'string' },
    message: { type: 'string' }, 
  },
  required: ['number', 'message']
} as const;

// Exporting the MessageInput type using the JSON schema above
export type MessageInput = FromSchema<typeof inputSchema>;

// Exporting the Message intersection type 
export type Message = MessageInput & {id: string};

// Exporting the input JSON schema
export default inputSchema;