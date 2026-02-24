import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function AdminGuide() {
    const navigate = useNavigate();

    return (
        <div>
            <Button variant="ghost" onClick={() => navigate('/admin/documentation')} className="text-gray-400 hover:text-white mb-4"><ArrowLeft size={16} className="mr-1" /> Retour</Button>
            <h1 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><BookOpen size={20} className="text-terracotta" /> Guide Administrateur</h1>

            <div className="space-y-4">
                <Card className="bg-gray-900 border-white/10"><CardContent className="p-6">
                    <h2 className="font-semibold text-white mb-3">1. Connexion</h2>
                    <p className="text-sm text-gray-400">Accédez à <code className="text-terracotta">/admin/login</code> et entrez vos identifiants. Seuls les comptes avec le rôle "admin" dans Supabase peuvent accéder au tableau de bord.</p>
                </CardContent></Card>

                <Card className="bg-gray-900 border-white/10"><CardContent className="p-6">
                    <h2 className="font-semibold text-white mb-3">2. Tableau de bord</h2>
                    <p className="text-sm text-gray-400">Le dashboard affiche un aperçu rapide de vos contenus : nombre de produits, podcasts, services et fichiers médias. Cliquez sur une carte pour accéder directement à la section correspondante.</p>
                </CardContent></Card>

                <Card className="bg-gray-900 border-white/10"><CardContent className="p-6">
                    <h2 className="font-semibold text-white mb-3">3. Gestion des contenus</h2>
                    <p className="text-sm text-gray-400">Chaque section (Produits, Services, Blog, Podcasts) fonctionne de la même manière : une liste avec des actions rapides (voir, modifier, supprimer), et un formulaire de création/édition accessible via le bouton "Ajouter".</p>
                </CardContent></Card>

                <Card className="bg-gray-900 border-white/10"><CardContent className="p-6">
                    <h2 className="font-semibold text-white mb-3">4. Paramètres</h2>
                    <p className="text-sm text-gray-400">La page Paramètres permet de modifier les informations globales du site : nom, adresse, téléphone, email, logos, et métadonnées SEO. Les modifications sont sauvegardées en temps réel dans Supabase.</p>
                </CardContent></Card>

                <Card className="bg-gray-900 border-white/10"><CardContent className="p-6">
                    <h2 className="font-semibold text-white mb-3">5. Médiathèque</h2>
                    <p className="text-sm text-gray-400">La médiathèque centralise tous vos fichiers. Survolez une image pour copier son URL (utile pour les champs "Image" des formulaires) ou la supprimer.</p>
                </CardContent></Card>
            </div>
        </div>
    );
}
