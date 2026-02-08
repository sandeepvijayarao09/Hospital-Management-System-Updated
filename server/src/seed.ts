import bcrypt from 'bcryptjs';
import User from './models/User';

export const seedAdmin = async () => {
    try {
        const adminEmail = 'admin@hospital.com';
        const adminPassword = 'admin';

        const emailExists = await User.findOne({ email: adminEmail });

        if (emailExists) {
            console.log('Admin user already exists');
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        await User.create({
            name: 'admin',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
        });

        console.log('Admin user created successfully');
        console.log('Email: admin@hospital.com');
        console.log('Password: admin');

    } catch (error) {
        console.error('Error seeding database:', error);
    }
};
