// scripts/setup-admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection string - replace with your actual values
const MONGODB_URI = 'mongodb+srv://admin:secret123@cluster0.i7jo7.mongodb.net/saththebuilder?retryWrites=true&w=majority&appName=Cluster0';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor", "viewer"], default: "admin" },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

async function setupAdmin() {
    try {
        console.log('🔗 Connecting to MongoDB Atlas...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB Atlas successfully!');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('ℹ️  Admin user already exists:', existingAdmin.email);
            process.exit(0);
        }

        // Create admin user
        const adminData = {
            email: 'admin@saththebuilder.com',  // Your friend can change this
            username: 'saththebuilder',
            password: 'admin123',  // Your friend should change this after first login
            role: 'admin'
        };

        console.log('🔐 Creating admin user...');
        const passwordHash = await bcrypt.hash(adminData.password, 10);

        const admin = await User.create({
            email: adminData.email,
            username: adminData.username,
            passwordHash,
            role: adminData.role
        });

        console.log('✅ Admin user created successfully!');
        console.log('📧 Email:', adminData.email);
        console.log('👤 Username:', adminData.username);
        console.log('🔑 Password:', adminData.password);
        console.log('');
        console.log('🚨 IMPORTANT: Change the password after first login!');
        console.log('🌐 Login at: http://localhost:3000/login');

    } catch (error) {
        console.error('❌ Error setting up admin:', error.message);

        if (error.code === 11000) {
            console.log('ℹ️  User already exists. Try different email/username.');
        }
    } finally {
        await mongoose.connection.close();
        console.log('🔌 Database connection closed.');
    }
}

setupAdmin();