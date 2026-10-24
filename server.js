 
import 'dotenv/config';
import app from './app.js';
import connectDB from './src/config/db.js';

const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`HCM Lite API running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exitCode = 1;
  }
}

startServer();
