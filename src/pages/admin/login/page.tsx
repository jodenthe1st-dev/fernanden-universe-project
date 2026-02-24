import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Lock, Mail, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import logoMain from '@/assets/logo-fernanden-main.png';

export function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from =
        (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/admin/dashboard';

    React.useEffect(() => {
        if (isAuthenticated) navigate(from, { replace: true });
    }, [isAuthenticated, navigate, from]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const success = await login(email, password);
            if (success) {
                navigate(from, { replace: true });
            } else {
                setError('Email ou mot de passe incorrect.');
            }
        } catch {
            setError('Une erreur est survenue. Réessayez.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            {/* Animated background gradients */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-terracotta/20 via-transparent to-transparent blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 via-transparent to-transparent blur-3xl"
                />
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    {/* Logo & Title */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-terracotta/20 to-purple-500/20 backdrop-blur-xl border border-white/10 mb-6">
                            <img src={logoMain} alt="Fernanden" className="h-12 w-auto" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                            Administration
                        </h1>
                        <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
                            <Sparkles size={14} className="text-terracotta" />
                            Espace réservé aux administrateurs
                        </p>
                    </motion.div>

                    {/* Login Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Glass card container */}
                            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/20">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mb-6 bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-2xl text-sm backdrop-blur-xl flex items-center gap-2"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                                        {error}
                                    </motion.div>
                                )}

                                <div className="space-y-5">
                                    {/* Email Input */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                                            <Mail size={14} className="text-terracotta" />
                                            Email
                                        </label>
                                        <div className="relative group">
                                            <Input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="admin@fernanden.com"
                                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-14 rounded-2xl px-4 text-base transition-all duration-300 group-hover:border-white/20 focus:border-terracotta/50 focus:bg-white/10 backdrop-blur-xl"
                                                required
                                                autoFocus
                                                autoComplete="email"
                                                aria-label="Adresse email"
                                            />
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-terracotta/0 via-terracotta/5 to-terracotta/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Password Input */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                                            <Lock size={14} className="text-terracotta" />
                                            Mot de passe
                                        </label>
                                        <div className="relative group">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-14 rounded-2xl px-4 pr-12 text-base transition-all duration-300 group-hover:border-white/20 focus:border-terracotta/50 focus:bg-white/10 backdrop-blur-xl"
                                                required
                                                autoComplete="current-password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                                                tabIndex={-1}
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-terracotta/0 via-terracotta/5 to-terracotta/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 mt-8 bg-gradient-to-r from-terracotta via-terracotta to-orange-600 hover:from-terracotta/90 hover:via-terracotta/90 hover:to-orange-600/90 text-white font-semibold rounded-2xl shadow-lg shadow-terracotta/25 transition-all duration-300 hover:shadow-xl hover:shadow-terracotta/40 hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden"
                                >
                                    {/* Button shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                                    {loading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <span className="flex items-center justify-center gap-2 relative z-10">
                                            Se connecter
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    )}
                                </Button>
                            </div>

                            {/* Footer */}
                            <p className="text-center text-xs text-gray-500 mt-6">
                                © {new Date().getFullYear()} Fernanden Universe · Tous droits réservés
                            </p>
                        </form>
                    </motion.div>

                    {/* Decorative elements */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-terracotta/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-purple-500/10 to-terracotta/10 rounded-full blur-3xl pointer-events-none"
                    />
                </motion.div>
            </div>
        </div>
    );
}
