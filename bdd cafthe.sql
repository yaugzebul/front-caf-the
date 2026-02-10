-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 10 fév. 2026 à 12:59
-- Version du serveur : 8.4.3
-- Version de PHP : 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cafthe`
--

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id_client` int NOT NULL,
  `nom_client` varchar(60) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `prenom_client` varchar(60) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adresse_facturation` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cp_facturation` varchar(5) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ville_facturation` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adresse_livraison` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cp_livraison` varchar(5) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ville_livraison` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email_client` varchar(320) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tel_client` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mdp_client` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_employe` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id_client`, `nom_client`, `prenom_client`, `adresse_facturation`, `cp_facturation`, `ville_facturation`, `adresse_livraison`, `cp_livraison`, `ville_livraison`, `email_client`, `tel_client`, `mdp_client`, `id_employe`) VALUES
(1, 'Gauthier', 'Claire', '8 Rue des Fleurs', '44000', 'Nantes', '8 Rue des Fleurs', '44000', 'Nantes', 'claire.g@email.com', '0612345670', '1234', 1),
(2, 'Moreau', 'Lucas', '15 Av de Blois', '41000', 'Blois', '15 Av de Blois', '41000', 'Blois', 'l.moreau@email.com', '0612345671', 'hash2', 2),
(3, 'Leroy', 'Emma', '22 Rue de la Gare', '75010', 'Paris', '22 Rue de la Gare', '75010', 'Paris', 'emma.leroy@email.com', '0612345672', 'hash3', 1),
(4, 'Petit', 'Antoine', '3 Quai de la Fosse', '44000', 'Nantes', '3 Quai de la Fosse', '44000', 'Nantes', 'antoine.p@email.com', '0612345673', 'hash4', NULL),
(5, 'Rousseau', 'Manon', '10 Rue du Port', '33000', 'Bordeaux', '10 Rue du Port', '33000', 'Bordeaux', 'manon.r@email.com', '0612345674', '1234', 3),
(7, 'Testaert', 'Romain', NULL, NULL, NULL, NULL, NULL, NULL, 'contact@rtestaert.fr', NULL, '$2b$10$Q6Njb7QAzK8scN8cw/G.Guki2UJuyy72Y6bfnqm/.Whbuax.KZVGK', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `id_commande` int NOT NULL,
  `date_commande` date DEFAULT NULL,
  `mode_commande` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `statut_commande` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `montant_paiement` decimal(15,2) DEFAULT NULL,
  `date_paiement` date DEFAULT NULL,
  `moyen_paiement` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_client` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id_commande`, `date_commande`, `mode_commande`, `statut_commande`, `montant_paiement`, `date_paiement`, `moyen_paiement`, `id_client`) VALUES
(1, '2026-01-05', 'Web', 'Livré', 35.50, '2026-01-05', 'CB', 1),
(2, '2026-01-10', 'Magasin', 'Livré', 90.00, '2026-01-10', 'Espèces', 2),
(3, '2026-01-15', 'Web', 'Annulé', 15.00, NULL, NULL, 3),
(4, '2026-01-20', 'Web', 'En cours', 54.00, '2026-01-20', 'PayPal', 4),
(5, '2026-01-25', 'Web', 'Livré', 125.40, '2026-01-25', 'CB', 5),
(6, '2026-02-05', NULL, 'En cours', 77.48, NULL, NULL, 7),
(7, '2026-02-05', 'Web', 'En cours', 35.89, '2026-02-05', 'PayPal', 7);

-- --------------------------------------------------------

--
-- Structure de la table `contenir`
--

CREATE TABLE `contenir` (
  `id_article` int NOT NULL,
  `id_commande` int NOT NULL,
  `quantite_commandee` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contenir`
--

INSERT INTO `contenir` (`id_article`, `id_commande`, `quantite_commandee`) VALUES
(1, 1, 200),
(1, 6, 200),
(2, 1, 100),
(3, 5, 200),
(5, 6, 100),
(7, 7, 100),
(8, 5, 100),
(10, 2, 1),
(11, 4, 1),
(12, 3, 1),
(12, 7, 1),
(13, 5, 1);

-- --------------------------------------------------------

--
-- Structure de la table `employe`
--

CREATE TABLE `employe` (
  `id_employe` int NOT NULL,
  `nom_employe` varchar(60) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `prenom_employe` varchar(60) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email_employe` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tel_employe` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mdp_employe` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `employe`
--

INSERT INTO `employe` (`id_employe`, `nom_employe`, `prenom_employe`, `email_employe`, `tel_employe`, `role`, `mdp_employe`) VALUES
(1, 'Legrand', 'Marc', 'm.legrand@cafte.fr', '0600000001', 'Admin', 'hash_admin_123'),
(2, 'Petit', 'Julie', 'j.petit@cafte.fr', '0600000002', 'Vendeur', 'hash_vendeur_456'),
(3, 'Bernard', 'Luc', 'l.bernard@cafte.fr', '0600000003', 'Vendeur', 'hash_vendeur_789');

-- --------------------------------------------------------

--
-- Structure de la table `livraison`
--

CREATE TABLE `livraison` (
  `id_livraison` decimal(15,2) NOT NULL,
  `choix_transporteur` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_livraison` date DEFAULT NULL,
  `delai_livraison` int DEFAULT NULL,
  `id_commande` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `id_article` int NOT NULL,
  `nom_produit` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_categorie` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type_vente` enum('vrac','unitaire') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `choix_poids` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '100,200,500,1000',
  `prix_ht` decimal(15,2) DEFAULT NULL,
  `taux_tva` decimal(15,3) DEFAULT NULL,
  `prix_ttc` decimal(15,2) DEFAULT NULL,
  `quantite_stock` int DEFAULT NULL,
  `image_url` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `origine` varchar(170) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `promotion` tinyint(1) DEFAULT '0',
  `pourcentage_promo` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`id_article`, `nom_produit`, `description`, `id_categorie`, `type_vente`, `choix_poids`, `prix_ht`, `taux_tva`, `prix_ttc`, `quantite_stock`, `image_url`, `origine`, `promotion`, `pourcentage_promo`) VALUES
(1, 'Sencha Bio', 'Thé vert japonais traditionnel, notes herbeuses.', 'Thé', 'vrac', '100,200,500,1000', 120.00, 5.500, 126.60, 4300, 'sachet.png', 'Japon', 0, 0),
(2, 'Earl Grey Royal', 'Thé noir à la bergamote de Calabre.', 'Thé', 'vrac', '100,200,500,1000', 95.00, 5.500, 100.23, 12000, NULL, 'Inde', 0, 0),
(3, 'Oolong Anxi', 'Thé bleu-vert entre le vert et le noir.', 'Thé', 'vrac', '100,200,500,1000', 152.00, 5.500, 160.36, 3000, NULL, 'Chine', 0, 0),
(4, 'Darjeeling First Flush', 'Le champagne des thés, récolte de printemps.', 'Thé', 'vrac', '100,200,500,1000', 220.00, 5.500, 232.10, 1500, NULL, 'Inde', 0, 0),
(5, 'Thé Rouge Rooibos', 'Sans théine, saveurs vanille et cannelle.', 'Thé', 'vrac', '100,200,500,1000', 89.00, 5.500, 93.90, 7900, NULL, 'Afrique du Sud', 0, 0),
(6, 'Espresso Intense', 'Mélange Arabica/Robusta pour un corps puissant.', 'Café', 'vrac', '100,200,500,1000', 145.00, 5.500, 152.98, 6000, NULL, 'Brésil/Vietnam', 0, 0),
(7, 'Guatemala Antigua', 'Café équilibré, notes de cacao et d\'épices.', 'Café', 'vrac', '100,200,500,1000', 198.00, 5.500, 208.89, 3900, NULL, 'Guatemala', 0, 0),
(8, 'Kenya AA', 'Acidité vive et notes de fruits rouges.', 'Café', 'vrac', '100,200,500,1000', 240.00, 5.500, 253.20, 2500, NULL, 'Kenya', 1, 10),
(9, 'Décaféiné Eau', 'Décaféination naturelle sans solvant.', 'Café', 'vrac', '100,200,500,1000', 165.00, 5.500, 174.08, 3500, NULL, 'Colombie', 0, 0),
(10, 'Bouilloire Temp', 'Bouilloire à température réglable 1.5L.', 'Accessoire', 'unitaire', NULL, 75.00, 20.000, 90.00, 10, NULL, 'Chine', 0, 0),
(11, 'Set Matcha', 'Bol (Chawan), fouet (Chasen) et spatule.', 'Accessoire', 'unitaire', NULL, 45.00, 20.000, 54.00, 8, NULL, 'Japon', 0, 0),
(12, 'Filtre Permanent', 'Filtre inox pour tasse ou théière.', 'Accessoire', 'unitaire', NULL, 12.50, 20.000, 15.00, 149, NULL, 'France', 0, 0),
(13, 'Mousseur à lait', 'Mousseur électrique haute performance.', 'Accessoire', 'unitaire', NULL, 25.00, 20.000, 30.00, 20, NULL, 'Allemagne', 0, 0),
(14, 'Matcha Cérémonial', 'Poudre de thé vert de prestige pour la cérémonie du thé.', 'Thé', 'vrac', '100,200,500,1000', 285.00, 5.500, 300.68, 2500, NULL, 'Japon', 0, 0),
(15, 'Pai Mu Tan', 'Thé blanc délicat aux notes de fleurs blanches.', 'Thé', 'vrac', '100,200,500,1000', 140.00, 5.500, 147.70, 4000, NULL, 'Chine', 0, 0),
(16, 'Lapsang Souchong', 'Thé noir fumé au bois de pin, caractère puissant.', 'Thé', 'vrac', '100,200,500,1000', 115.00, 5.500, 121.33, 5500, NULL, 'Chine', 0, 0),
(17, 'Genmaicha', 'Thé vert mélangé à des grains de riz soufflés et grillés.', 'Thé', 'vrac', '100,200,500,1000', 108.00, 5.500, 113.94, 6000, NULL, 'Japon', 0, 0),
(18, 'Jasmin Dragon Pearls', 'Perles de thé vert façonnées à la main et parfumées au jasmin.', 'Thé', 'vrac', '100,200,500,1000', 195.00, 5.500, 205.73, 3000, NULL, 'Chine', 1, 10),
(19, 'Pu-erh Millésimé', 'Thé sombre fermenté, notes de sous-bois et de terre humide.', 'Thé', 'vrac', '100,200,500,1000', 180.00, 5.500, 189.90, 2000, NULL, 'Chine', 0, 0),
(20, 'Masala Chai', 'Thé noir épicé : cannelle, cardamome, gingembre et clous de girofle.', 'Thé', 'vrac', '100,200,500,1000', 99.00, 5.500, 104.45, 8500, NULL, 'Inde', 0, 0),
(21, 'Verveine Menthe', 'Infusion relaxante de feuilles entières.', 'Thé', 'vrac', '100,200,500,1000', 85.00, 5.500, 89.68, 10000, NULL, 'France', 0, 0),
(22, 'Thé Blanc aux Fruits Rouges', 'Mélange gourmand de thé blanc et baies sauvages.', 'Thé', 'vrac', '100,200,500,1000', 132.00, 5.500, 139.26, 4500, NULL, 'Allemagne', 0, 0),
(23, 'Gyokuro', 'Thé vert d\'ombre, \"Perle de Rosée\", saveur umami intense.', 'Thé', 'vrac', '100,200,500,1000', 320.00, 5.500, 337.60, 1200, NULL, 'Japon', 0, 0),
(24, 'Ceylon OP', 'Thé noir de haute altitude, ambré et aromatique.', 'Thé', 'vrac', '100,200,500,1000', 92.00, 5.500, 97.06, 7000, NULL, 'Sri Lanka', 0, 0),
(25, 'Infusion Hibiscus', 'Carcadet bio aux notes acidulées et couleur pourpre.', 'Thé', 'vrac', '100,200,500,1000', 78.00, 5.500, 82.29, 11000, NULL, 'Egypte', 0, 0),
(26, 'Earl Grey Blue Flower', 'Thé noir bergamote parsemé de pétales de bleuet.', 'Thé', 'vrac', '100,200,500,1000', 105.00, 5.500, 110.78, 9000, NULL, 'Inde', 0, 0),
(27, 'White Monkey', 'Thé vert aux feuilles duveteuses, goût doux et miellé.', 'Thé', 'vrac', '100,200,500,1000', 160.00, 5.500, 168.80, 3500, NULL, 'Chine', 0, 0),
(28, 'Tisane du Soir', 'Mélange mélisse, camomille et fleur d\'oranger.', 'Thé', 'vrac', '100,200,500,1000', 89.00, 5.500, 93.90, 6500, NULL, 'France', 0, 0),
(29, 'Ethiopie Yirgacheffe', 'Café floral avec des notes de jasmin et de citron.', 'Café', 'vrac', '100,200,500,1000', 225.00, 5.500, 237.38, 4000, NULL, 'Ethiopie', 0, 0),
(30, 'Colombie Supremo', 'Café équilibré, notes de noisette et caramel.', 'Café', 'vrac', '100,200,500,1000', 178.00, 5.500, 187.79, 5000, NULL, 'Colombie', 0, 0),
(31, 'Brésil Sul de Minas', 'Corps onctueux, notes chocolatées, faible acidité.', 'Café', 'vrac', '100,200,500,1000', 155.00, 5.500, 163.53, 8000, NULL, 'Brésil', 0, 0),
(32, 'Sumatra Mandheling', 'Café boisé et épicé, corps terreux très riche.', 'Café', 'vrac', '100,200,500,1000', 210.00, 5.500, 221.55, 2500, NULL, 'Indonésie', 0, 0),
(33, 'Costa Rica Tarrazu', 'Café vif et propre, acidité d\'agrumes.', 'Café', 'vrac', '100,200,500,1000', 192.00, 5.500, 202.56, 4500, NULL, 'Costa Rica', 0, 0),
(34, 'Moka Sidamo', 'Arômes sauvages de fruits mûrs et d\'épices.', 'Café', 'vrac', '100,200,500,1000', 205.00, 5.500, 216.28, 3000, NULL, 'Ethiopie', 0, 0),
(35, 'Vietnam Robusta High Q', 'Puissance brute avec des notes de cacao amer.', 'Café', 'vrac', '100,200,500,1000', 139.00, 5.500, 146.65, 10000, NULL, 'Vietnam', 0, 0),
(36, 'Blue Mountain', 'Le plus prestigieux, équilibre parfait, rareté.', 'Café', 'vrac', '100,200,500,1000', 1200.00, 5.500, 1266.00, 500, NULL, 'Jamaïque', 0, 0),
(37, 'Kona Prime', 'Café volcanique, soyeux et complexe.', 'Café', 'vrac', '100,200,500,1000', 650.00, 5.500, 685.75, 800, NULL, 'Hawaï', 0, 0),
(38, 'Italian Roast', 'Mélange noir et huileux pour un espresso serré.', 'Café', 'vrac', '100,200,500,1000', 168.00, 5.500, 177.24, 6000, NULL, 'Mélange', 0, 0),
(39, 'Breakfast Blend', 'Café léger et tonique pour le matin.', 'Café', 'vrac', '100,200,500,1000', 142.00, 5.500, 149.81, 9000, NULL, 'Mélange', 0, 0),
(40, 'Pérou Cajamarca', 'Certifié bio, notes de fruits rouges et vanille.', 'Café', 'vrac', '100,200,500,1000', 185.00, 5.500, 195.18, 4000, NULL, 'Pérou', 0, 0),
(41, 'Rwanda Inzovu', 'Acidité brillante, arômes de thé noir et de canneneberge.', 'Café', 'vrac', '100,200,500,1000', 230.00, 5.500, 242.65, 2200, NULL, 'Rwanda', 0, 0),
(42, 'Honduras San Rafael', 'Café velouté, notes de pêche et de chocolat au lait.', 'Café', 'vrac', '100,200,500,1000', 175.00, 5.500, 184.63, 5000, NULL, 'Honduras', 0, 0),
(43, 'Mexique Altura', 'Corps léger, saveurs de noisette grillée.', 'Café', 'vrac', '100,200,500,1000', 160.00, 5.500, 168.80, 5500, NULL, 'Mexique', 0, 0),
(44, 'Théière Fonte Noire', 'Capacité 800ml, intérieur émaillé avec filtre inox.', 'Accessoire', 'unitaire', NULL, 45.83, 20.000, 55.00, 15, NULL, 'Japon', 0, 0),
(45, 'Tasses Double Paroi', 'Lot de 2 tasses 250ml en verre borosilicate.', 'Accessoire', 'unitaire', NULL, 16.67, 20.000, 20.00, 40, NULL, 'Chine', 1, 10),
(46, 'Moulin Manuel Inox', 'Meules coniques en céramique, réglage précis.', 'Accessoire', 'unitaire', NULL, 32.50, 20.000, 39.00, 25, NULL, 'France', 0, 0),
(47, 'Presse Française 1L', 'Cafetière à piston en verre et acier brossé.', 'Accessoire', 'unitaire', NULL, 29.17, 20.000, 35.00, 20, NULL, 'Danemark', 0, 0),
(48, 'Balance de Précision', 'Précision 0.1g avec chronomètre intégré.', 'Accessoire', 'unitaire', NULL, 20.83, 20.000, 25.00, 30, NULL, 'Chine', 0, 0),
(49, 'Infuseur Pince', 'Pince à thé classique en acier inoxydable.', 'Accessoire', 'unitaire', NULL, 4.17, 20.000, 5.00, 200, NULL, 'France', 0, 0),
(50, 'Boîte Hermétique', 'Boîte métal pour 250g de café ou thé.', 'Accessoire', 'unitaire', NULL, 10.00, 20.000, 12.00, 150, NULL, 'Allemagne', 0, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id_client`),
  ADD KEY `id_employe` (`id_employe`);

--
-- Index pour la table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`id_commande`),
  ADD KEY `id_client` (`id_client`);

--
-- Index pour la table `contenir`
--
ALTER TABLE `contenir`
  ADD PRIMARY KEY (`id_article`,`id_commande`),
  ADD KEY `id_commande` (`id_commande`);

--
-- Index pour la table `employe`
--
ALTER TABLE `employe`
  ADD PRIMARY KEY (`id_employe`);

--
-- Index pour la table `livraison`
--
ALTER TABLE `livraison`
  ADD PRIMARY KEY (`id_livraison`),
  ADD KEY `id_commande` (`id_commande`);

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`id_article`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id_client` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `id_commande` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `employe`
--
ALTER TABLE `employe`
  MODIFY `id_employe` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `id_article` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `client_ibfk_1` FOREIGN KEY (`id_employe`) REFERENCES `employe` (`id_employe`);

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`);

--
-- Contraintes pour la table `contenir`
--
ALTER TABLE `contenir`
  ADD CONSTRAINT `contenir_ibfk_1` FOREIGN KEY (`id_article`) REFERENCES `produit` (`id_article`),
  ADD CONSTRAINT `contenir_ibfk_2` FOREIGN KEY (`id_commande`) REFERENCES `commande` (`id_commande`);

--
-- Contraintes pour la table `livraison`
--
ALTER TABLE `livraison`
  ADD CONSTRAINT `livraison_ibfk_1` FOREIGN KEY (`id_commande`) REFERENCES `commande` (`id_commande`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
