import { connect } from "mongoose";
import "dotenv/config";

export const run = () => {
  connect(process.env.MONGODB_URL!, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
  })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));
};
