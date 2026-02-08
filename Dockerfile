# Utiliser l'image Node.js officielle
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --production

# Copier le code source
COPY . .

# Créer les dossiers d'upload
RUN mkdir -p public/uploads/images public/uploads/audio public/uploads/video public/uploads/documents

# Exposer le port
EXPOSE 3001

# Lancer le serveur
CMD ["node", "api-server.js"]
