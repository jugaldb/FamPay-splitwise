import mongoose, { Schema, model } from "mongoose";

export interface SplitwiseGroupInterface {
  name: string;
  createdAt: Date;
  owner: Schema.Types.ObjectId;
}

const groupSchema = new Schema<SplitwiseGroupInterface>({
  name: { type: String, required: true },
  createdAt: { type: Date, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Group = model<SplitwiseGroupInterface>(
  "UserGroupMapping",
  groupSchema
);
