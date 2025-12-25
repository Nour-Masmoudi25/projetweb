🎓 SUP’EVENT — Plateforme de gestion d’événements universitaires

SUP’EVENT est une application web permettant aux étudiants et aux clubs universitaires de consulter, créer et gérer des événements (conférences, ateliers, activités culturelles, etc.), ainsi que de s’y inscrire en ligne.

Le projet est composé de :

un frontend (Next.js / React)

un backend (Node.js / Express)

une base de données MongoDB

🚀 Fonctionnalités principales

👤 Utilisateurs

Inscription et connexion sécurisées (JWT)

Rôles : Étudiant et Club

Consultation du profil utilisateur

📅 Événements

Création d’événements (clubs uniquement)

Consultation de tous les événements

Filtrage par catégorie

Recherche par nom

Inscription à un événement

Affichage du nombre d’inscrits

🗓️ Calendrier

Vue calendrier mensuelle

Mise en évidence des dates contenant des événements

Affichage des événements par jour

Inscription directe depuis le calendrier

🛠️ Technologies utilisées

Frontend :

Next.js

React

TypeScript

Tailwind CSS

Lucide Icons

Backend :

Node.js

Express.js

MongoDB

Mongoose

JWT (JSON Web Token)

🔧 Backend — Informations obligatoires
✅ Prérequis

Avant d’exécuter la partie backend, il faut installer :

Node.js (version 18 ou supérieure recommandée)

npm

MongoDB (local ou MongoDB Atlas)

(Optionnel) MongoDB Compass pour visualiser la base de données

▶️ Lancer le backend

Accéder au dossier backend :

cd backend


Installer les dépendances :

npm install


Créer un fichier .env dans le dossier backend :

MONGODB_URI=mongodb://localhost:27017/supevent
JWT_SECRET=your_secret_key


Lancer le serveur :

npm run dev

🌐 Port utilisé

Le serveur backend s’exécute sur le port 5000

URL :

http://localhost:5000

🗄️ Base de données MongoDB

Nom de la base : supevent

URI par défaut :

mongodb://localhost:27017/supevent


Les collections sont créées automatiquement :

users

events

🧪 Endpoint de test

Pour vérifier que le backend fonctionne correctement :

GET http://localhost:5000/api/health


Réponse attendue :

{ "status": "ok" }

▶️ Lancer le frontend

Accéder au dossier frontend :

cd frontend


Installer les dépendances :

npm install


Lancer l’application :

npm run dev


Ouvrir dans le navigateur :

http://localhost:3000


📌 Remarques

Les routes protégées utilisent un middleware d’authentification JWT

L’accès aux utilisateurs est sécurisé via authMiddleware

Les données sont persistées dans MongoDB

👨‍🎓 Auteurs:

Projet réalisé par Nour Masmoudi, Mariam Damak et Mohamed Jawhar Daoudi

Dans le cadre d’un projet académique universitaire.
