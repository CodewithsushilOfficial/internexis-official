const mongoose = require('mongoose');

class DatabaseManager {
  constructor() {
    this.isConnected = false;
    this.connectionRetries = 0;
    this.maxRetries = 5;
    this.retryDelay = 5000; // 5 seconds
  }

  async connect() {
    try {
      const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
      
      if (!mongoURI) {
        throw new Error('MONGODB_URI or MONGO_URI environment variable is not defined');
      }

      // MongoDB connection options
      const options = {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
        bufferCommands: false,
        retryWrites: true,
        w: 'majority'
      };

      await mongoose.connect(mongoURI, options);
      
      this.isConnected = true;
      this.connectionRetries = 0;
      
      console.log('✅ MongoDB connected successfully');
      console.log('📊 Connected to database:', mongoose.connection.db.databaseName);
      
      return true;
    } catch (error) {
      console.error('❌ MongoDB connection error:', error.message);
      
      if (this.connectionRetries < this.maxRetries) {
        this.connectionRetries++;
        console.log(`🔄 Retrying connection (${this.connectionRetries}/${this.maxRetries}) in ${this.retryDelay/1000} seconds...`);
        
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.connect();
      }
      
      throw error;
    }
  }

  setupEventHandlers() {
    mongoose.connection.on('connected', () => {
      console.log('📡 Mongoose connected to MongoDB');
      this.isConnected = true;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ Mongoose disconnected from MongoDB');
      this.isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 Mongoose reconnected to MongoDB');
      this.isConnected = true;
    });

    mongoose.connection.on('error', (error) => {
      console.error('❌ Mongoose connection error:', error);
      this.isConnected = false;
    });

    // Handle application termination
    process.on('SIGINT', this.gracefulShutdown.bind(this));
    process.on('SIGTERM', this.gracefulShutdown.bind(this));
  }

  async gracefulShutdown(signal) {
    console.log(`\n📤 Received ${signal}. Graceful shutdown initiated...`);
    
    try {
      await mongoose.connection.close();
      console.log('✅ MongoDB connection closed successfully');
      process.exit(0);
    } catch (error) {
      console.error('❌ Error during MongoDB shutdown:', error);
      process.exit(1);
    }
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      readyState: mongoose.connection.readyState,
      readyStateString: this.getReadyStateString(mongoose.connection.readyState),
      database: mongoose.connection.db?.databaseName,
      host: mongoose.connection.host,
      port: mongoose.connection.port
    };
  }

  getReadyStateString(state) {
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    return states[state] || 'unknown';
  }

  // Health check method
  async healthCheck() {
    try {
      await mongoose.connection.db.admin().ping();
      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        ...this.getConnectionStatus()
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString(),
        ...this.getConnectionStatus()
      };
    }
  }
}

module.exports = new DatabaseManager();
