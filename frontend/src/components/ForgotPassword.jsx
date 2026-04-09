import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../api/authApi';
import { Mail, ArrowRight, Send, Zap, Shield } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            setError('Please enter your email address');
            return;
        }
        
        setLoading(true);
        setMessage('');
        setError('');
        
        try {
            const response = await forgotPassword(email);
            setMessage(response.message || 'Password reset email sent! Please check your inbox.');
            setEmail('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send reset email. Please try again.');
        }
        
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-spark-darker via-spark-dark to-spark-darker">
            {/* Main Container */}
            <div className="relative z-10 w-full max-w-md px-4">
                {/* Logo/Brand */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-spark-primary to-spark-secondary rounded-2xl shadow-lg mb-4 relative group">
                        <Shield className="w-10 h-10 text-white animate-pulse" />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-spark-primary to-spark-secondary opacity-0 group-hover:opacity-50 blur-xl transition-opacity"></div>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-spark-primary to-spark-secondary bg-clip-text text-transparent">
                        MERN Auth System
                    </h1>
                    <p className="text-white/60 mt-2">Reset your password</p>
                </div>

                {/* Forgot Password Card */}
                <div className="spark-card p-8 animate-slide-up">
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-spark-primary/20 p-3 rounded-full">
                            <Mail className="w-8 h-8 text-spark-primary" />
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white text-center mb-2">
                        Forgot Password?
                    </h2>
                    <p className="text-white/50 text-center text-sm mb-6">
                        Enter your email and we'll send you a reset link.
                    </p>

                    {/* Success Message */}
                    {message && (
                        <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-xl backdrop-blur-sm mb-4 flex items-center gap-2 animate-fade-in">
                            <Send className="w-5 h-5 flex-shrink-0" />
                            <span>{message}</span>
                        </div>
                    )}
                    
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl backdrop-blur-sm mb-4 flex items-center gap-2 animate-fade-in">
                            <Zap className="w-5 h-5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                    
                    {/* Reset Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="email"
                                    required
                                    className="spark-input pl-10"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="spark-btn-primary group"
                        >
                            <span className="flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Reset Link
                                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-spark-card text-white/40">remembered?</span>
                        </div>
                    </div>

                    {/* Back to Login */}
                    <Link
                        to="/login"
                        className="w-full py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition flex items-center justify-center gap-2 group"
                    >
                        <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Login
                    </Link>
                </div>

               
            </div>
        </div>
    );
};

export default ForgotPassword;