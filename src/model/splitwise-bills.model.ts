import mongoose, { Schema, model } from "mongoose";

export interface BillInterface {
  user1: Schema.Types.ObjectId;
  user2: Schema.Types.ObjectId;
  amount: number;
  group: Schema.Types.ObjectId;
  title: string;
}

const billSchema = new Schema<BillInterface>({
  user1: { type: Schema.Types.ObjectId, ref: "User", required: true },
  user2: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  group: { type: Schema.Types.ObjectId, ref: "Group" },
  title: { type: String },
});

export const Bill = model<BillInterface>("Bill", billSchema);
