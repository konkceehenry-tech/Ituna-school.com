

import React, { useState } from 'react';
import { CurrentUser } from '../types';
import { getStudents } from '../services/database';

const Login: React.FC<{ onLogin: (user: CurrentUser) => void }> = ({ onLogin }) => {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            const students = getStudents();
            // In a real app, passwords would be hashed. Here we do a plain text comparison.
            // For demo purposes, we'll assume the password is 'password123' for all students.
            const studentData = students.find(s => String(s.id) === studentId.trim());

            if (studentData && password === 'password123') {
                onLogin({ id: studentData.id, name: studentData.name, role: 'student' });
            } else {
                setError('Invalid Student ID or Password.');
            }
        } catch (e) {
            console.error("Login error:", e);
            setError('An error occurred during login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-black text-white min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center mb-2">Student Login</h2>
                <p className="text-center text-gray-400 mb-8">Login to the Ituna Portal (Hint: use ID 1 and password "password123")</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="studentId" className="block text-sm font-medium text-gray-300 mb-2">Student ID</label>
                        <input
                            type="text"
                            id="studentId"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            placeholder="Enter your student ID"
                            required
                            className="w-full px-4 py-3 bg-gray-800 text-white border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-3 bg-gray-800 text-white border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center" role="alert">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-offset-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <a href="#" className="text-sm text-sky-400 hover:underline">
                        Forgot Password?
                    </a>
                </div>
                <div className="text-center text-sm text-gray-400 mt-6">
                    <p>Don't have an account? <a href="#signup" className="font-medium text-sky-400 hover:underline">Sign Up</a></p>
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

export default Login;