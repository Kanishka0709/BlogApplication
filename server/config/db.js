const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        mongoose.set('strictQuery', false);
        
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('MongoDB Connection State:', mongoose.connection.readyState);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Test the connection by listing collections
        const collections = await conn.connection.db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));
        
        // Check if users collection exists
        const hasUsersCollection = collections.some(c => c.name === 'users');
        if (!hasUsersCollection) {
            console.log('Warning: users collection does not exist yet');
        }
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    }
};

// Monitor connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
});

module.exports = connectDB;
