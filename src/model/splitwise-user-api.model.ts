import { Schema, model } from "mongoose";

export interface SplitwiseUserInterface {
  name: string;
  email: string;
  number: number;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<SplitwiseUserInterface>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: Number, required: true },
});

export const User = model<SplitwiseUserInterface>("User", userSchema);
