const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String, // ✅ Fix: make this a String
      required: false,
    },
    isCompleted: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true, // ✅ also fix the typo from `timeStamp`
  }
);

const TodoModel = mongoose.models.todo || mongoose.model("todo", Schema);

export default TodoModel;
