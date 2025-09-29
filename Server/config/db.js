import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Get MongoDB URI from environment variable
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    console.log('🔄 Connecting to MongoDB...');
    
    // Remove deprecated options - they're no longer needed in modern mongoose
    const conn = await mongoose.connect(mongoURI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📁 Database: ${conn.connection.name}`);

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('IP')) {
      console.error('\n⚠️  IP WHITELIST ERROR:');
      console.error('Go to: https://cloud.mongodb.com');
      console.error('1. Click "Network Access"');
      console.error('2. Click "ADD IP ADDRESS"');
      console.error('3. Add your current IP or use 0.0.0.0/0 for all IPs\n');
    }
    
    process.exit(1);
  }
};

export default connectDB;