import mongoose, { model, Schema } from "mongoose";


const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const contentSchema = new Schema({
  username : {type : String, required : true, unique:false},
  content : {
    type: new Schema({ // Use nested Schema correctly
      type: { type: String, required: true }, 
      link: { type: String, required: true }, 
      title: { type: String, required: true }, 
      sub_title: { type: String, required: true },
      description:{ type: String, required: true},
      tags: { type: [String], required: true } // Ensure tags array is required
    }),
    required: true
  }

})  

export const usermodel = model("users", userSchema);
export const contentModel = model("content", contentSchema);