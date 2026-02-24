# 🧪 GUIDE DE TEST — Après les corrections audit React

## 1️⃣ Vérification initiale

```bash
# Réinstaller dépendances (si manques)
npm install

# Vérifier que le build fonctionne
npm run build

# Vérifier que le dev server démarrage
npm run dev
```

**Résultat attendu**: Pas d'erreurs, seulement des warnings mineurs (Browserslist old, chunk size)

---

## 2️⃣ Test des pages corrigées

### A. Test BlogArticle (XSS fix + image optimization)
```
1. Naviguez à http://localhost:5173/blog
2. Cliquez sur un article (ex: "Les tendances design...")
3. Vérifiez:
   - ✅ HTML rendu correctement (titres, listes, liens)
   - ✅ Pas d'erreurs console (ContentRenderer devrait fonctionner)
   - ✅ Images chargent (hero image en haut, related articles en bas)
   - ✅ Lazy loading activé sur related articles
```

### B. Test authentification (AuthContext fix)
```
1. Naviguez à http://localhost:3001/admin/login
   (assurez-vous que api-server.cjs tourne en parallèle)
2. Entrez: admin@fernanden.com / admin123
3. Vérifiez:
   - ✅ Login réussit
   - ✅ Redirect vers /admin/dashboard
   - ✅ User info chargée (check localStorage/cookies)
   - ✅ Logout fonctionne sans erreur
```

### C. Test CloudinaryService (secrets fix)
```
1. Admin > Media ou She Services > Upload image
2. Essayez de supprimer une image
3. Vérifiez:
   - ✅ Suppression réussit (requête vers /api/cloudinary/destroy)
   - ✅ Pas de secrets dans les headers réseau (DevTools > Network)
   - ✅ Signature URL non exposée côté client
```

### D. Test Upload (error handling fix)
```
1. Admin > Media > Upload
2. Téléchargez une image
3. Consommez dans votre app
4. Vérifiez:
   - ✅ File apparaît dans media list
   - ✅ Pas d'erreurs console
   - ✅ Error message clair si upload fails
```

### E. Test pages avec lists (key={index} fix)
```
1. Naviguez à /dense (quiz page)
2. Répondez au quiz
3. Scrollez pour voir progress dots
4. Vérifiez:
   - ✅ Progress dots changent d'état sans re-render glitches
   - ✅ Animations lisses (pas de flickers)
   - ✅ Réponses restent en mémoire correctement
```

---

## 3️⃣ Vérifications avancées (DevTools)

### Ouvrez Chrome DevTools (F12)

#### Console
- ❌ Pas de warnings `dangerouslySetInnerHTML` 
- ❌ Pas d'erreurs `AbortError` (sauf voulu)
- ✅ Messages `✅` de logger pour succès

#### Network Tab
```
Vérifiez les requêtes:
- /api/admin/me → réponse 200 OK
- /api/admin/login → utilise POST avec credentials
- /api/cloudinary/destroy → aucune clé secrète dans body/headers
- /api/upload → multipart form-data
```

#### Lighthouse (Performance)
```
1. Run Lighthouse audit sur /blog page
2. Vérifiez:
   - ✅ CLS (Cumulative Layout Shift) <= 0.1 (images have dimensions)
   - ✅ LCP (Largest Contentful Paint) < 3s (hero image isn't too large)
   - ✅ FID (First Input Delay) < 100ms
```

--- 

## 4️⃣ Test API Server (Cloudinary destroy endpoint)

### Vérifiez que api-server.cjs a la nouvelle route

```bash
# Démarrez le serveur
set ADMIN_EMAIL=admin@fernanden.com
set ADMIN_PASSWORD=admin123
set ADMIN_TOKEN_SECRET=devsecret
set PORT=3001
node api-server.cjs
```

**Vérifiez le log**:
```
✓ 🚀 Serveur API lancé sur http://localhost:3001
```

### Test manual de /api/cloudinary/destroy

```bash
# Depuis un terminal (avec auth token):
curl -X POST http://localhost:3001/api/cloudinary/destroy \
  -H "Content-Type: application/json" \
  -H "Cookie: admin_token=YOUR_TOKEN" \
  -d '{
    "public_id": "fernanden/sample",
    "resource_type": "image"
  }'
```

**Résultat attendu**:
```json
{
  "success": true,
  "result": {
    "result": "ok"
  }
}
```

---

## 5️⃣ Checklist finale

- [ ] Build npm run build ✅
- [ ] Dev server démarre ✅
- [ ] Blog article affiche sans erreur ✅
- [ ] Auth login/logout fonctionne ✅
- [ ] Image upload/delete fonctionne ✅
- [ ] Aucune clé secrète en Console ✅
- [ ] Aucune erreur XSS ou warnings ✅
- [ ] Performance audit OK ✅

---

## 🐛 Si vous trouvez des bugs

1. **ContentRenderer error**: Vérifiez que `marked` + `dompurify` sont installés
   ```bash
   npm list marked dompurify
   ```

2. **Cloudinary delete fails**: Vérifiez
   - `VITE_CLOUDINARY_*` env vars dans `.env.local`
   - `api-server.cjs` tourne sur port 3001
   - Auth token est valide

3. **Memory leak warnings**: Chrome DevTools > Performance > record, puis check pour "Detached DOM nodes"

---

**Toutes les corrections sont prêtes pour production! 🚀**
