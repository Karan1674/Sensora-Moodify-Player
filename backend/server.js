const loadEnv = require('./src/config/env.config.js');
loadEnv();

const connectDB = require('./src/config/db.config.js');
const app = require('./src/app.js');


const startServer = async () => {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    
};

startServer();