import { Schema, model } from 'mongoose';

const userSchema = new Schema(
   {
      
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      phone: {
         type: Number,
         required: true,
      },
      feedback: String,
      marks: Number
   },
);
export const Student = model('Student', userSchema, 'student_list');
