import XLSX from 'xlsx';
import express from 'express';
import cors from 'cors';
import { Student } from './modules/students/students.model.js';
const app = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const workBook = XLSX.readFile('./src/student_list.xlsx');
const workSheet = workBook.Sheets['email_list'];

const arrStudents = XLSX.utils.sheet_to_json(workSheet);

app.get('/api/students', async (req, res) => {
   try {
      const students = await Student.find({});
      res.status(200).json(students);
   } catch (err) {
      console.error('Error:', err);
   }
});

app.get('/api/students/:email', async (req, res) => {
   try {
      const email = req.params.email;

      const student = await Student.findOne({ email });

      if (!student) {
         return res.status(404).json({ message: 'Student not found' });
      }

      res.status(200).json(student);
   } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'An error occurred' });
   }
});

app.post('/api/students/update', async (req, res) => {
   try {
      const { email, feedback, marks } = req.body;

      const updatedStudent = await Student.findOneAndUpdate(
         { email },
         { $set: { feedback, marks } },
         { new: true, upsert: true }
      );

      res.status(200).json({
         message: 'Feedback and Marks Updated',
         student: updatedStudent,
      });
   } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'An error occurred' });
   }
});

app.post('/students', async (req, res, next) => {
   console.log(req.body)
   try {
      const student = await Student.create({...req.body});
      res.status(200).json(student)
    } catch (err) {
      next(err)
    }
})

// Global error handler middleware
app.use((err, req, res, next) => {
   if (err.name === 'ValidationError') {
      // Handle Mongoose validation error
      const errorMessages = Object.values(err.errors).map(
         (error) => error.message
      );
      return res
         .status(400)
         .json({ error: 'Validation Error', messages: errorMessages });
   }

   // Handle other errors
   console.error('Error:', err);
   res.status(500).json({ error: 'Internal Server Error' });
});

//Test api
app.get('/', (req, res) => {
   res.json(arrStudents);
});

export default app;
