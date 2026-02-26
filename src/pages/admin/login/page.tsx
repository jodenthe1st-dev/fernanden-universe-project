import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Lock, Mail } from 'lucide-react';
import logoMain from '@/assets/logo-fernanden-main.png';

export function AdminLogin() {
  const [email, setEmail] = useState('admin@fernanden.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = useMemo(
    () => ((location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/admin/dashboard'),
    [location.state]
  );

  React.useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const ok = await login(email, password);
      if (!ok) {
        setError('Connexion refusée. Vérifie les identifiants admin.');
        return;
      }
      navigate(from, { replace: true });
    } catch {
      setError('Impossible de se connecter pour le moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-border p-8 shadow-xl">
          <div className="text-center mb-6">
            <img src={logoMain} alt="Fernanden" className="h-12 w-auto mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-foreground">Connexion Admin</h1>
            <p className="text-sm text-muted-foreground">Accès réservé aux administrateurs</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg border border-red-300 bg-red-50 text-red-700 px-3 py-2 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 inline-flex items-center gap-2">
                <Mail size={14} />
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@fernanden.com"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 inline-flex items-center gap-2">
                <Lock size={14} />
                Mot de passe
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Se connecter'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
