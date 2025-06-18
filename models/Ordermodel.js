import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "product",
      },
    ],
    // payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "processing",
      enum: [
        "notprocessing",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
    },

    total: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model("order", orderSchema);
