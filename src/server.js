import mongoose from 'mongoose';
import app from './app.js';

const port = process.env.PORT || 5000;

async function bootstrap() {
   try {
      await mongoose.connect(
         `mongodb+srv://mizanmahi:x6jeacAcVRWr8XCs@programminghero.mjewnyg.mongodb.net/interview_feedback`
      );
      console.log(`🛢   Database is connected successfully`);

      app.listen(port, () => {
         console.log(`Application  listening on port ${port}`);
      });
   } catch (err) {
      console.log('Failed to connect database', err);
   }
}

bootstrap();
