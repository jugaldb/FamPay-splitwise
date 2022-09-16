import { Schema, model } from "mongoose";

export interface SplitwiseUserGroupInterface {
  user: Schema.Types.ObjectId;
  group: Schema.Types.ObjectId;
}

const userGroupMappingSchema = new Schema<SplitwiseUserGroupInterface>({
  user: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  group: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const UserGroupMapping = model<SplitwiseUserGroupInterface>(
  "UserGroupMapping",
  userGroupMappingSchema
);
