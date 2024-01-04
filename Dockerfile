# Utilisez une image Node.js pour construire votre application
FROM node:18

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances de l'application
RUN npm install

# Copiez le reste des fichiers de l'application
COPY . .

# Exposez le port sur lequel votre application s'exécute
EXPOSE 3000

# Démarrez l'application
CMD [ "npm", "start" ]