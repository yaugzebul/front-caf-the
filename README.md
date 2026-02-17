# Caf'Thé

Site e-commerce de vente de thés, cafés et accessoires.

<!-- ATTENTION PAS ENCORE VU EN COURS -->
<!-- Decommenter et adapter les badges selon votre CI/CD -->
<!-- ![Build](https://img.shields.io/github/actions/workflow/status/USER/REPO/ci.yml?branch=main) -->
<!-- ![Tests](https://img.shields.io/github/actions/workflow/status/USER/REPO/tests.yml?branch=main&label=tests) -->
<!-- ![License](https://img.shields.io/github/license/USER/REPO) -->

## Prerequis

- [Node.js](https://nodejs.org/) >= 18
- npm
- Une API back-end fonctionnelle (voir projet backend)

## Quickstart

```bash
# 1. Cloner le depot
git clone https://github.com/yaugzebul/front-caf-the.git
cd frontcafthe

# 2. Installer les dependances
npm install

# 3. Configurer l'environnement
cp .env.example .env
# Editer .env et renseigner les variables necessaires

# 4. Lancer le serveur de developpement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

### Variables d'environnement

| Variable         | Description | Exemple |
| ---------------- | ----------- | ------- |
| `VITE_API_URL`   | URL de l'API backend | `http://localhost:3000` |

## Scripts disponibles

| Commande          | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Lancer le serveur de developpement |
| `npm run build`   | Construire le projet pour la prod  |
| `npm run preview` | Previsualiser le build de prod     |
| `npm run lint`    | Lancer ESLint sur le projet        |

## Exemples d'utilisation

| URL                            | Description                |
|--------------------------------|----------------------------|
| `http://localhost:5173/`       | Page d'accueil (Hero, meilleures ventes) |
| `http://localhost:5173/produits` | Catalogue complet avec filtres (catégorie, prix) et tri |
| `http://localhost:5173/produit/:id` | Page détail d'un produit |
| `http://localhost:5173/panier` | Panier d'achat |
| `http://localhost:5173/login`  | Page de connexion |

## Structure du projet

```
src/                    
├── components/         # Composants réutilisables
│   ├── styles/         # CSS des composants
│   ├── CartIcon.jsx    # Icône du panier avec compteur
│   ├── ConfirmationModal.jsx # Modale d'ajout au panier
│   ├── Footer.jsx      # Pied de page
│   ├── Header.jsx      # Barre de navigation
│   ├── Hero.jsx        # Bannière d'accueil
│   ├── Pagination.jsx  # Système de pagination
│   ├── ProductCard.jsx # Carte produit (liste)
│   ├── ProductFilters.jsx # Filtres (catégorie, prix)
│   ├── PromoSection.jsx # Section promotionnelle
│   └── RSE.jsx         # Section RSE
├── context/            # Gestion de l'état global
│   ├── AuthContext.jsx # Authentification utilisateur
│   └── CartContext.jsx # Gestion du panier
├── layout/             
│   └── Layout.jsx      # Structure principale (Header + Outlet + Footer)
├── pages/              # Pages de l'application
│   ├── styles/         # CSS des pages
│   ├── Accueil.jsx     # Page d'accueil
│   ├── Login.jsx       # Page de connexion
│   ├── ProductDetail.jsx # Page détail produit
│   ├── ProductList.jsx # Page catalogue
│   └── Panier.jsx      # Page panier
├── App.css             # Styles globaux et variables CSS
├── App.jsx             # Configuration des routes
└── main.jsx            # Point d'entrée
```

## Deploiement

### Build de production

```bash
npm run build
```

Les fichiers statiques sont generes dans le dossier `dist/`.

### Hebergement

<!-- Decrire la procedure de deploiement (Plesk, o2Switch, etc...) -->


## Tests
<!-- ATTENTION PAS ENCORE VU EN COURS -->
<!-- Decrire comment lancer les tests -->

```bash
# Lancer les tests
npm run test
```

## Stack technique

- **React** - Bibliothèque UI
- **Vite** - Bundler et serveur de développement
- **React Router Dom** - Gestion du routing
- **Lucide React** - Bibliothèque d'icônes (utilisée pour les icônes générales)
- **React Icons** - Bibliothèque d'icônes (utilisée pour les réseaux sociaux)
- **React Loading Skeleton** - Affichage des états de chargement (placeholders)

## Auteurs

- **Romain Testaert** - Développeur

## Licence

<!-- Choisir une licence : MIT, Apache 2.0, GPL v3... -->

Ce projet est sous licence [MIT](LICENSE).

## Liens utiles

- [Documentation React](https://react.dev/)
- [Documentation Vite](https://vite.dev/)
