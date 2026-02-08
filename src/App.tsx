import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Placeholder pages - will be implemented
import About from "./pages/About";
import Contact from "./pages/Contact";
import SHE from "./pages/SHE";
import DENSE from "./pages/DENSE";
import CaFEE from "./pages/CafEE";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";
import Podcasts from "./pages/Podcasts";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LegalMentions from "./pages/LegalMentions";

// SHE Service pages
import SHEServiceInteriorDesign from "./pages/SHEServiceInteriorDesign";
import SHEServiceEvents from "./pages/SHEServiceEvents";
import SHEServiceDecoration from "./pages/SHEServiceDecoration";
import SHERealizationDetail from "./pages/SHERealizationDetail";

// DENSE Collection pages
import DenseCollectionLesDrapes from "./pages/dense/CollectionsLesDrapes";
import DenseCollectionLesPassePartout from "./pages/dense/CollectionsLesPassePartout";
import DenseCollectionLesModulables from "./pages/dense/CollectionsLesModulables";
import DenseCollectionLesEscamotables from "./pages/dense/CollectionsLesEscamotables";
import DenseCollectionLesAjustables from "./pages/dense/CollectionsLesAjustables";
import DenseCollectionLesPanaches from "./pages/dense/CollectionsLesPanaches";
import DenseCollectionLesAccessoires from "./pages/dense/CollectionsLesAccessoires";

// DENSE Service pages
import DenseContact from "./pages/dense/Contact";

// Cart and Manifeste pages
import Cart from "./pages/Cart";
import Manifeste from "./pages/Manifeste";

// Blog pages
import Blog from "./pages/Blog";
import BlogSHE from "./pages/BlogSHE";
import BlogDENSE from "./pages/BlogDENSE";
import BlogCaFEE from "./pages/BlogCaFEE";
import BlogArticle from "./pages/BlogArticle";

// Actualites pages
import Actualites from "./pages/Actualites";
import ActualiteArticle from "./pages/ActualiteArticle";

// Social pages
import Social from "./pages/Social";

// Admin pages - NEW STRUCTURE
import { AdminLayout } from "./pages/admin/layout";
import AdminLogin from "./pages/admin/login/page";
import { AdminDashboard } from "./pages/admin/dashboard/page";
import { AdminProductsList } from "./pages/admin/products/page";
import { AdminProductForm } from "./pages/admin/products/new/page";
import { AdminProductView } from "./pages/admin/products/[id]/page";
import { AdminPodcastsList } from "./pages/admin/podcasts/page";
import { AdminPodcastForm } from "./pages/admin/podcasts/new/page";
import { AdminPodcastView } from "./pages/admin/podcasts/[id]/page";
import { AdminCafeeServicesList } from "./pages/admin/cafee-services/AdminCafeeServicesList";
import { AdminCafeeServiceForm } from "./pages/admin/cafee-services/AdminCafeeServiceForm";
import { AdminCafeeServiceView } from "./pages/admin/cafee-services/AdminCafeeServiceView";
import { AdminSHEServicesList } from "./pages/admin/she-services/AdminSHEServicesList";
import { AdminSHEServiceForm } from "./pages/admin/she-services/AdminSHEServiceForm";
import { AdminSHEServiceView } from "./pages/admin/she-services/AdminSHEServiceView";

// Admin pages - Blog
import { AdminBlogList } from "./pages/admin/blog/AdminBlogList";
import { AdminBlogForm } from "./pages/admin/blog/AdminBlogForm";

// Admin pages - Contacts
import { AdminContactsList } from "./pages/admin/contacts/AdminContactsList";

// Admin pages - Newsletter
import { AdminNewsletterList } from "./pages/admin/newsletter/AdminNewsletterList";

// Admin pages - Media
import { AdminMediaList } from "./pages/admin/media/AdminMediaList";

// Admin pages - Settings
import { AdminSettings } from "./pages/admin/settings/AdminSettings";

// Admin pages - Documentation
import { SiteDocumentation } from "./pages/admin/documentation/SiteDocumentation";
import { AdminGuide } from "./pages/admin/documentation/AdminGuide";

const queryClient = new QueryClient();

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner position="top-right" richColors />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/she" element={<SHE />} />
            <Route path="/she/services/interior-design" element={<SHEServiceInteriorDesign />} />
            <Route path="/she/services/events" element={<SHEServiceEvents />} />
            <Route path="/she/services/decoration" element={<SHEServiceDecoration />} />
            <Route path="/she/realizations/:id" element={<SHERealizationDetail />} />
            <Route path="/dense" element={<DENSE />} />
            <Route path="/dense/contact" element={<DenseContact />} />
            <Route path="/manifeste" element={<Manifeste />} />
            <Route path="/cart" element={<Cart />} />
            
            {/* DENSE Collection Routes */}
            <Route path="/dense/collections/les-drapés" element={<DenseCollectionLesDrapes />} />
            <Route path="/dense/collections/les-passe-partout" element={<DenseCollectionLesPassePartout />} />
            <Route path="/dense/collections/les-modulables" element={<DenseCollectionLesModulables />} />
            <Route path="/dense/collections/les-escamotables" element={<DenseCollectionLesEscamotables />} />
            <Route path="/dense/collections/les-ajustables" element={<DenseCollectionLesAjustables />} />
            <Route path="/dense/collections/les-panachés" element={<DenseCollectionLesPanaches />} />
            <Route path="/dense/collections/les-accessoires" element={<DenseCollectionLesAccessoires />} />
            
            <Route path="/cafee" element={<CaFEE />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:id" element={<PortfolioDetail />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/social" element={<Social />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/legal-mentions" element={<LegalMentions />} />
            
            {/* Blog Routes */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/she" element={<BlogSHE />} />
            <Route path="/blog/densen" element={<BlogDENSE />} />
            <Route path="/blog/cafee" element={<BlogCaFEE />} />
            <Route path="/blog/:id" element={<BlogArticle />} />
            
            {/* Actualites Routes */}
            <Route path="/actualites" element={<Actualites />} />
            <Route path="/actualites/:id" element={<ActualiteArticle />} />
            
            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Admin Protected Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProductsList />} />
              <Route path="products/new" element={<AdminProductForm />} />
              <Route path="products/edit/:id" element={<AdminProductForm />} />
              <Route path="products/view/:id" element={<AdminProductView />} />
              <Route path="podcasts" element={<AdminPodcastsList />} />
              <Route path="podcasts/new" element={<AdminPodcastForm />} />
              <Route path="podcasts/edit/:id" element={<AdminPodcastForm />} />
              <Route path="podcasts/view/:id" element={<AdminPodcastView />} />
              <Route path="cafee-services" element={<AdminCafeeServicesList />} />
              <Route path="cafee-services/new" element={<AdminCafeeServiceForm />} />
              <Route path="cafee-services/edit/:id" element={<AdminCafeeServiceForm />} />
              <Route path="cafee-services/view/:id" element={<AdminCafeeServiceView />} />
              <Route path="she-services" element={<AdminSHEServicesList />} />
              <Route path="she-services/new" element={<AdminSHEServiceForm />} />
              <Route path="she-services/edit/:id" element={<AdminSHEServiceForm />} />
              <Route path="she-services/view/:id" element={<AdminSHEServiceView />} />
              <Route path="services" element={<AdminSHEServicesList />} />
              <Route path="blog" element={<AdminBlogList />} />
              <Route path="blog/new" element={<AdminBlogForm />} />
              <Route path="blog/edit/:id" element={<AdminBlogForm />} />
              <Route path="contacts" element={<AdminContactsList />} />
              <Route path="newsletter" element={<AdminNewsletterList />} />
              <Route path="media" element={<AdminMediaList />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="documentation" element={<SiteDocumentation />} />
              <Route path="guide" element={<AdminGuide />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
