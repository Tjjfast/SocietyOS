require('dotenv').config();
const app = require('./src/app');
const { connectMongo, connectPG} = require('./src/shared/config/db');
const { connectRedis } = require('./src/shared/config/redis');

const start = async () => {
    try {
        await connectMongo();
        await connectPG();
        await connectRedis();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
};

start();