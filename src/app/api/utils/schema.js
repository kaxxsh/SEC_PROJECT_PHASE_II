import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    ticket: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    track: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const authUser =
  mongoose.models.authUser || mongoose.model("authUser", UserSchema);
const Tag = mongoose.models.Tag || mongoose.model("Tag", TagSchema);

export { authUser, Tag };
