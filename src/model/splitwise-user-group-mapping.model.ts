import { Schema, model } from "mongoose";

export interface SplitwiseUserGroupInterface {
  user: string;
  group: string;
}

const userGroupMappingSchema = new Schema<SplitwiseUserGroupInterface>({
  user: { type: String, required: true },
  group: { type: String, required: true },
});

export const UserGroupMapping = model<SplitwiseUserGroupInterface>(
  "UserGroupMapping",
  userGroupMappingSchema
);
