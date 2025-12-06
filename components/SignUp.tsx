
import React, { useState } from 'react';

const SignUp: React.FC = () => {
    const [role, setRole] = useState('');
    
    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(event.target.value);
    };
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert('Sign-up functionality is a work in progress! You will now be redirected to the login page.');
        window.location.hash = '#login';
    };

    return (
        <div className="bg-black text-white min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center mb-2">Create an Account</h2>
                <p className="text-center text-gray-400 mb-8">Join the Ituna Portal</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                     <div>
                        <label htmlFor="fullname" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                        <input type="text" id="fullname" placeholder="e.g., Jane Doe" required className="w-full px-4 py-3 bg-gray-800 text-white border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                        <input type="email" id="email" placeholder="you@example.com" required className="w-full px-4 py-3 bg-gray-800 text-white border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <input type="password" id="password" placeholder="••••••••" required className="w-full px-4 py-3 bg-gray-800 text-white border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">I am a...</label>
                        <select id="role" onChange={handleRoleChange} value={role} required className="w-full px-4 py-3 bg-gray-800 text-white border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500">
                            <option value="">Select your role</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                    
                    <button type="submit" className="w-full py-3 px-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-offset-gray-900">
                        Create Account
                    </button>
                </form>
                 <div className="text-center text-sm text-gray-400 mt-6">
                    <p>Already have an account? <a href="#login" className="font-medium text-sky-400 hover:underline">Login</a></p>
                </div>
                <div className="text-center mt-4">
                    <a href="#" className="text-sm text-sky-400 hover:underline">
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
