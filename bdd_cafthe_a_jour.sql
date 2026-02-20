-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : ven. 20 fév. 2026 à 13:12
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
  `nom_client` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `prenom_client` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adresse_facturation` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cp_facturation` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ville_facturation` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adresse_livraison` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cp_livraison` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ville_livraison` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email_client` varchar(320) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tel_client` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mdp_client` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
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
  `mode_commande` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `statut_commande` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `montant_paiement` decimal(15,2) DEFAULT NULL,
  `date_paiement` date DEFAULT NULL,
  `moyen_paiement` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
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
  `nom_employe` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `prenom_employe` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email_employe` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tel_employe` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mdp_employe` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
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
  `choix_transporteur` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
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
  `nom_produit` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_categorie` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type_vente` enum('vrac','unitaire') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `choix_poids` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '100,200,500,1000',
  `prix_ht` decimal(15,2) DEFAULT NULL,
  `taux_tva` decimal(15,3) DEFAULT NULL,
  `prix_ttc` decimal(15,2) DEFAULT NULL,
  `quantite_stock` int DEFAULT NULL,
  `image_url` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `origine` varchar(170) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `promotion` tinyint(1) DEFAULT '0',
  `pourcentage_promo` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`id_article`, `nom_produit`, `description`, `id_categorie`, `type_vente`, `choix_poids`, `prix_ht`, `taux_tva`, `prix_ttc`, `quantite_stock`, `image_url`, `origine`, `promotion`, `pourcentage_promo`) VALUES
(1, 'Sencha Bio', 'Un Sencha de prestige issu de la première récolte de printemps à Shizuoka. Ses feuilles d’un vert profond offrent une liqueur limpide aux notes herbeuses intenses et une pointe d’iode caractéristique des meilleurs jardins japonais. Un équilibre parfait entre douceur et vivacité.', 'Thé', 'vrac', '100,200,500,1000', 132.70, 5.500, 140.00, 4300, 'sencha.webp', 'Japon', 0, 0),
(2, 'Earl Grey Royal', 'Un grand classique revisité. Ce thé noir de haute altitude est subtilement parfumé à l’essence naturelle de bergamote de Calabre, agrémenté de pétales de bleuet. Une tasse équilibrée, florale et zestée, idéale pour un après-midi raffiné.', 'Thé', 'vrac', '100,200,500,1000', 113.70, 5.500, 119.95, 12000, 'earl_grey_royal.webp', 'Inde', 0, 0),
(3, 'Oolong Anxi', 'Originaire de la province du Fujian, ce Oolong de type Anxi offre un profil aromatique complexe. Semi-oxydé, il dévoile des notes de fleurs blanches et une texture onctueuse en bouche, presque lactée, avec une longueur exceptionnelle.', 'Thé', 'vrac', '100,200,500,1000', 113.70, 5.500, 119.95, 3000, 'oolong_anxi.webp', 'Chine', 0, 0),
(4, 'Darjeeling First Flush', 'Surnommé le \"Champagne des thés\", cette première récolte de printemps dans l’Himalaya est un trésor de délicatesse. Ses feuilles riches en bourgeons argentés produisent une liqueur dorée aux notes de muscat et de fleurs fraîches. Rare et précieux.', 'Thé', 'vrac', '100,200,500,1000', 161.10, 5.500, 169.96, 1500, 'darjeeling_first_flush.webp', 'Inde', 0, 0),
(5, 'Thé Rouge Rooibos', 'Sans théine, saveurs vanille et cannelle.', 'Thé', 'vrac', '100,200,500,1000', 66.40, 5.500, 70.05, 7900, 'the_rouge_rooibos.webp', 'Afrique du Sud', 0, 0),
(6, 'Espresso Intense', 'Notre mélange signature torréfié \"robe de moine\". Alliant la douceur chocolatée des Arabicas du Brésil à la puissance d’un Robusta de haute altitude, il offre une crème onctueuse et des notes de noisettes grillées. L’espresso italien parfait.', 'Café', 'vrac', '100,200,500,1000', 39.80, 5.500, 41.99, 6000, 'espresso_intense.webp', 'Brésil/Vietnam', 0, 0),
(7, 'Guatemala Antigua', 'Cultivé sur les sols volcaniques de la vallée d’Antigua, ce café se distingue par son équilibre magistral. On y retrouve une acidité fine, un corps sirupeux et des notes gourmandes de cacao pur et d’épices douces en fin de bouche.', 'Café', 'vrac', '100,200,500,1000', 47.40, 5.500, 50.01, 3900, 'guatemala_antigua.webp', 'Guatemala', 0, 0),
(8, 'Kenya AA', 'Acidité vive et notes de fruits rouges.', 'Café', 'vrac', '100,200,500,1000', 41.72, 5.500, 44.01, 2500, 'kenya_aa.webp', 'Kenya', 1, 10),
(9, 'Décaféiné Eau', 'Décaféination naturelle sans solvant.', 'Café', 'vrac', '100,200,500,1000', 45.48, 5.500, 47.98, 3500, 'decafeine_eau.webp', 'Colombie', 0, 0),
(10, 'Bouilloire Temp', 'Bouilloire à col de cygne en acier inoxydable brossé avec réglage de température au degré près (de 40°C à 100°C). Son design ergonomique permet un contrôle total du débit d’eau, essentiel pour réussir vos extractions manuelles (V60, Chemex).', 'Accessoire', 'unitaire', NULL, 137.50, 20.000, 165.00, 10, 'bouilloire_temp.webp', 'Chine', 0, 0),
(11, 'Set Matcha', 'Bol (Chawan), fouet (Chasen) et spatule.', 'Accessoire', 'unitaire', NULL, 37.50, 20.000, 45.00, 8, 'set_matcha.webp', 'Japon', 0, 0),
(12, 'Filtre Permanent', 'Filtre inox pour tasse ou théière.', 'Accessoire', 'unitaire', NULL, 12.50, 20.000, 15.00, 149, 'filtre_permanent.webp', 'France', 0, 0),
(13, 'Mousseur à lait', 'Mousseur électrique haute performance.', 'Accessoire', 'unitaire', NULL, 25.00, 20.000, 30.00, 20, 'mousseur_a_lait.webp', 'Allemagne', 0, 0),
(14, 'Matcha Cérémonial', 'La quintessence de la cérémonie du thé. Ce Matcha de grade cérémonial est moulu à la pierre de granit à Kyoto. Sa texture de soie et sa couleur vert néon cachent un goût umami profond, sans aucune amertume, avec une douceur persistante.', 'Thé', 'vrac', '100,200,500,1000', 237.00, 5.500, 250.04, 2500, 'matcha_ceremonial.webp', 'Japon', 0, 0),
(15, 'Pai Mu Tan', 'Thé blanc délicat aux notes de fleurs blanches.', 'Thé', 'vrac', '100,200,500,1000', 170.60, 5.500, 179.98, 4000, 'pai_mu_tan.webp', 'Chine', 0, 0),
(16, 'Lapsang Souchong', 'Thé noir fumé au bois de pin, caractère puissant.', 'Thé', 'vrac', '100,200,500,1000', 132.70, 5.500, 140.00, 5500, 'lapsang_souchong.webp', 'Chine', 0, 0),
(17, 'Genmaicha', 'Thé vert mélangé à des grains de riz soufflés et grillés.', 'Thé', 'vrac', '100,200,500,1000', 108.00, 5.500, 113.94, 6000, 'genmaicha.webp', 'Japon', 0, 0),
(18, 'Jasmin Dragon Pearls', 'Perles de thé vert façonnées à la main et parfumées au jasmin.', 'Thé', 'vrac', '100,200,500,1000', 142.20, 5.500, 150.02, 3000, 'jasmin_dragonpearls.webp', 'Chine', 1, 10),
(19, 'Pu-erh Millésimé', 'Un Pu-erh millésimé fermenté selon les méthodes ancestrales du Yunnan. Sa robe sombre révèle des arômes profonds de sous-bois, de terre humide et de cuir, qui s’adoucissent au fil des infusions. Un thé de méditation par excellence.', 'Thé', 'vrac', '100,200,500,1000', 331.80, 5.500, 350.05, 2000, 'pu_erh_millesime.webp', 'Chine', 0, 0),
(20, 'Masala Chai', 'Thé noir épicé : cannelle, cardamome, gingembre et clous de girofle.', 'Thé', 'vrac', '100,200,500,1000', 99.00, 5.500, 104.45, 8500, 'masala_chai.webp', 'Inde', 0, 0),
(21, 'Verveine Menthe', 'Infusion relaxante de feuilles entières.', 'Thé', 'vrac', '100,200,500,1000', 85.00, 5.500, 89.68, 10000, 'verveine_menthe.webp', 'France', 0, 0),
(22, 'Thé Blanc aux Fruits Rouges', 'Mélange gourmand de thé blanc et baies sauvages.', 'Thé', 'vrac', '100,200,500,1000', 132.00, 5.500, 139.26, 4500, 'the_blanc_fruits_rouges.webp', 'Allemagne', 0, 0),
(23, 'Gyokuro', 'Le \"Graal\" des thés verts japonais. Cultivé sous ombrage pendant 21 jours pour booster la théine et la chlorophylle, il offre une saveur umami explosive et une texture veloutée. Une expérience sensorielle unique pour les initiés.', 'Thé', 'vrac', '100,200,500,1000', 284.40, 5.500, 300.04, 1200, 'the_gyokuro.webp', 'Japon', 0, 0),
(24, 'Ceylon OP', 'Thé noir de haute altitude, ambré et aromatique.', 'Thé', 'vrac', '100,200,500,1000', 104.30, 5.500, 110.04, 7000, 'ceylon_op.webp', 'Sri Lanka', 0, 0),
(25, 'Infusion Hibiscus', 'Carcadet bio aux notes acidulées et couleur pourpre.', 'Thé', 'vrac', '100,200,500,1000', 61.60, 5.500, 64.99, 11000, 'infusion_hibiscus.webp', 'Egypte', 0, 0),
(26, 'Earl Grey Blue Flower', 'Thé noir bergamote parsemé de pétales de bleuet.', 'Thé', 'vrac', '100,200,500,1000', 105.00, 5.500, 110.77, 9000, 'earl_grey_blue_flower.webp', 'Inde', 0, 0),
(27, 'White Monkey', 'Thé vert aux feuilles duveteuses, goût doux et miellé.', 'Thé', 'vrac', '100,200,500,1000', 151.70, 5.500, 160.04, 3500, 'white_monkey.webp', 'Chine', 0, 0),
(28, 'Tisane du Soir', 'Mélange mélisse, camomille et fleur d\'oranger.', 'Thé', 'vrac', '100,200,500,1000', 89.00, 5.500, 93.89, 6500, 'tisane_du_soir.webp', 'France', 0, 0),
(29, 'Ethiopie Yirgacheffe', 'Un café de forêt exceptionnel, lavé et séché sur lits africains. Son profil est d’une finesse rare : un corps léger, presque aérien, marqué par des notes florales de jasmin et une vive pointe de citron jaune. Un café d’une grande élégativité.', 'Café', 'vrac', '100,200,500,1000', 47.40, 5.500, 50.01, 4000, 'ethiopie_yirgacheffe.webp', 'Ethiopie', 0, 0),
(30, 'Colombie Supremo', 'Café équilibré, notes de noisette et caramel.', 'Café', 'vrac', '100,200,500,1000', 36.02, 5.500, 38.00, 5000, 'colombie_supremo.webp', 'Colombie', 0, 0),
(31, 'Brésil Sul de Minas', 'Corps onctueux, notes chocolatées, faible acidité.', 'Café', 'vrac', '100,200,500,1000', 28.44, 5.500, 30.00, 8000, 'bresil_sul_de_minas.webp', 'Brésil', 0, 0),
(32, 'Sumatra Mandheling', 'Café boisé et épicé, corps terreux très riche.', 'Café', 'vrac', '100,200,500,1000', 41.71, 5.500, 44.00, 2500, 'sumatra_mandheling.webp', 'Indonésie', 0, 0),
(33, 'Costa Rica Tarrazu', 'Café vif et propre, acidité d\'agrumes.', 'Café', 'vrac', '100,200,500,1000', 39.81, 5.500, 42.00, 4500, 'costa_rica_tarrazu.webp', 'Costa Rica', 0, 0),
(34, 'Moka Sidamo', 'Arômes sauvages de fruits mûrs et d\'épices.', 'Café', 'vrac', '100,200,500,1000', 43.60, 5.500, 46.00, 3000, 'moka_sidamo.webp', 'Ethiopie', 0, 0),
(35, 'Vietnam Robusta High Q', 'Puissance brute avec des notes de cacao amer.', 'Café', 'vrac', '100,200,500,1000', 20.85, 5.500, 22.00, 10000, 'vietnam_robusta.webp', 'Vietnam', 0, 0),
(36, 'Blue Mountain', 'Le café le plus mythique au monde. Cultivé entre 1500 et 1700m dans les Blue Mountains de Jamaïque, il est transporté dans des barils en bois. Sa rareté n’a d’égale que sa perfection : aucune amertume, une douceur extrême et un arôme floral unique.', 'Café', 'vrac', '100,200,500,1000', 170.60, 5.500, 179.98, 500, 'blue_mountain.webp', 'Jamaïque', 0, 0),
(37, 'Kona Prime', 'Un café volcanique cultivé sur les pentes du Mauna Loa à Hawaï. Ce cru d’exception offre une tasse soyeuse avec des nuances de cassonade, de noix de macadamia et une finale légèrement épicée. Un voyage exotique dans chaque tasse.', 'Café', 'vrac', '100,200,500,1000', 208.52, 5.500, 219.99, 800, 'kona_prime.webp', 'Hawaï', 0, 0),
(38, 'Italian Roast', 'Mélange noir et huileux pour un espresso serré.', 'Café', 'vrac', '100,200,500,1000', 26.54, 5.500, 28.00, 6000, 'italian_roast.webp', 'Mélange', 0, 0),
(39, 'Breakfast Blend', 'Café léger et tonique pour le matin.', 'Café', 'vrac', '100,200,500,1000', 24.64, 5.500, 26.00, 9000, 'breakfast_blend.webp', 'Mélange', 0, 0),
(40, 'Pérou Cajamarca', 'Certifié bio, notes de fruits rouges et vanille.', 'Café', 'vrac', '100,200,500,1000', 36.97, 5.500, 39.00, 4000, 'perou_cajamarca.webp', 'Pérou', 0, 0),
(41, 'Rwanda Inzovu', 'Acidité brillante, arômes de thé noir et de canneneberge.', 'Café', 'vrac', '100,200,500,1000', 49.29, 5.500, 52.00, 2200, 'rwanda_inzovu.webp', 'Rwanda', 0, 0),
(42, 'Honduras San Rafael', 'Café velouté, notes de pêche et de chocolat au lait.', 'Café', 'vrac', '100,200,500,1000', 34.12, 5.500, 36.00, 5000, 'honduras_san_rafael.webp', 'Honduras', 0, 0),
(43, 'Mexique Altura', 'Corps léger, saveurs de noisette grillée.', 'Café', 'vrac', '100,200,500,1000', 32.23, 5.500, 34.00, 5500, 'mexique_altura.webp', 'Mexique', 0, 0),
(44, 'Théière Fonte Noire', 'Véritable théière en fonte japonaise fabriquée par l’atelier historique Iwachu. Son intérieur émaillé protège les arômes et sa fonte épaisse conserve la chaleur de façon optimale. Ornée d’un motif traditionnel \"Arare\", elle est livrée avec son filtre inox.', 'Accessoire', 'unitaire', NULL, 120.83, 20.000, 145.00, 15, 'theiere_fonte_noire.webp', 'Japon', 0, 0),
(45, 'Tasses Double Paroi', 'Lot de 2 tasses 250ml en verre borosilicate.', 'Accessoire', 'unitaire', NULL, 16.67, 20.000, 20.00, 40, 'tasses_double_paroi.webp', 'Chine', 1, 10),
(46, 'Moulin Manuel Inox', 'Meules coniques en céramique, réglage précis.', 'Accessoire', 'unitaire', NULL, 32.50, 20.000, 39.00, 25, 'moulin_manuel_inox.webp', 'France', 0, 0),
(47, 'Presse Française 1L', 'Cafetière à piston iconique d’une capacité de 1L. Verre borosilicate résistant aux chocs thermiques et armature en acier inoxydable brossé. Le système de filtration à double grille permet d’extraire toutes les huiles essentielles du café pour un corps dense.', 'Accessoire', 'unitaire', NULL, 54.17, 20.000, 65.00, 20, 'presse_francaise_1l.webp', 'Danemark', 0, 0),
(48, 'Balance de Précision', 'Précision 0.1g avec chronomètre intégré.', 'Accessoire', 'unitaire', NULL, 20.83, 20.000, 25.00, 30, 'balance_de_precision.webp', 'Chine', 0, 0),
(49, 'Infuseur Pince', 'Pince à thé classique en acier inoxydable.', 'Accessoire', 'unitaire', NULL, 4.17, 20.000, 5.00, 200, 'infuseur_pince.webp', 'France', 0, 0),
(50, 'Boîte Hermétique', 'Boîte métal pour 250g de café ou thé.', 'Accessoire', 'unitaire', NULL, 10.00, 20.000, 12.00, 150, 'boite_hermetique.webp', 'Allemagne', 0, 0),
(51, 'Capsules Arabica Bio', 'Boîte de 10 capsules d’origine protégée, biodégradables et compatibles Nespresso. Un pur Arabica de Colombie sélectionné pour ses notes de fruits rouges et son intensité équilibrée. Le luxe du café de spécialité en un seul geste.', 'Café', 'unitaire', NULL, 6.45, 5.500, 6.80, 100, 'capsules_arabica_bio.webp', 'Colombie', 0, 0),
(52, 'Dosettes ESE Classique', 'Sachet de 20 dosettes en papier biodégradable.', 'Café', 'unitaire', NULL, 6.16, 5.500, 6.50, 150, 'dosettes_ese.webp', 'Mélange', 0, 0),
(53, 'Coffret Dégustation Monde', 'Assortiment de 5 variétés de cafés moulus (5x50g).', 'Café', 'unitaire', NULL, 18.91, 5.500, 19.95, 30, 'coffret_degustation_monde.webp', 'Multiples', 1, 10),
(54, 'Capsules Décaféiné Naturel', 'Boîte de 10 capsules, décaféination à l\'eau.', 'Café', 'unitaire', NULL, 4.55, 5.500, 4.80, 80, 'capsules_deca.webp', 'Pérou', 0, 0),
(55, 'Café de Spécialité \"Héritage\"', 'Boîte collector en métal contenant 250g de café moulu.', 'Café', 'unitaire', NULL, 11.37, 5.500, 12.00, 45, 'cafe_de_specialite_heritage.webp', 'Éthiopie', 0, 0),
(56, 'Lot 3 Boîtes Hermétiques Café', 'Trois mélanges signature en format découverte.', 'Café', 'unitaire', NULL, 23.70, 5.500, 25.00, 20, 'lot_3_boites.webp', 'Mélange', 0, 0),
(57, 'Capsules Ristretto Intense', 'Boîte de 10 capsules, intensité 10/12.', 'Café', 'unitaire', NULL, 4.27, 5.500, 4.50, 120, 'capsules_ristretto.webp', 'Brésil/Vietnam', 0, 0),
(58, 'Kit Voyage Café', 'Piston nomade et sachet de café moulu 100g.', 'Café', 'unitaire', NULL, 33.18, 5.500, 35.00, 15, 'kit_voyage_cafe.webp', 'Mélange', 0, 0),
(59, 'Capsules Lungo Doux', 'Boîte de 10 capsules, torréfaction légère.', 'Café', 'unitaire', NULL, 4.27, 5.500, 4.50, 90, 'capsules_lungo.webp', 'Guatemala', 0, 0),
(60, 'Coffret \"Réveil Matin\"', 'Sélection de 2 cafés dynamiques et un mug céramique.', 'Café', 'unitaire', NULL, 28.44, 5.500, 30.00, 25, 'coffret_reveil_matin.webp', 'Multiples', 0, 0),
(61, 'Coffret 24 Mousselines', 'Un écrin de luxe contenant 24 mousselines de soie cousues main. Découvrez nos 6 recettes emblématiques : Thés noirs parfumés, thés verts de jardins et infusions bien-être. Le cadeau idéal pour explorer l’univers de notre Maison.', 'Thé', 'unitaire', NULL, 20.85, 5.500, 22.00, 50, 'coffret_24_mousselines.webp', 'Multiples', 1, 15),
(62, 'Thé de Noël Collector', 'Boîte métal 100g, épices et orange, édition limitée.', 'Thé', 'unitaire', NULL, 14.22, 5.500, 15.00, 60, 'the_de_noel.webp', 'Chine', 0, 0),
(63, 'Boîte 20 Sachets Earl Grey', 'Sachets individuels compostables, bergamote intense.', 'Thé', 'unitaire', NULL, 8.44, 5.500, 8.90, 200, 'boite_20_sachets_earl_grey.webp', 'Inde', 0, 0),
(64, 'Kit Initiation Matcha', 'Petit sachet 30g Matcha et fouet en bambou.', 'Thé', 'unitaire', NULL, 26.54, 5.500, 28.00, 40, 'kit_initiation_matcha.webp', 'Japon', 0, 0),
(65, 'Coffret \"Sommeil Paisible\"', 'Pack de 3 infusions bio sans théine.', 'Thé', 'unitaire', NULL, 17.06, 5.500, 18.00, 35, 'coffret_sommeil_paisible.webp', 'France', 0, 0),
(66, 'Fleurs de Thé (Set de 5)', 'Boules de thé qui s\'ouvrent en fleurs dans l\'eau.', 'Thé', 'unitaire', NULL, 12.32, 5.500, 13.00, 75, 'fleurs_de_the.webp', 'Chine', 0, 0),
(67, 'Thé Noir Bio en Sachets', 'Boîte de 20 sachets, origine Ceylan.', 'Thé', 'unitaire', NULL, 7.49, 5.500, 7.90, 110, 'the_noir_bio_sachets.webp', 'Sri Lanka', 0, 0),
(68, 'Coffret Zen Japonais', 'Duo de Sencha et Genmaicha en boîtes métal.', 'Thé', 'unitaire', NULL, 24.64, 5.500, 26.00, 18, 'coffret_zen_japonais.webp', 'Japon', 0, 0),
(69, 'Sachets Menthe Douce', 'Boîte de 20 sachets de menthe poivrée.', 'Thé', 'unitaire', NULL, 6.54, 5.500, 6.90, 130, 'sachets_menthe.webp', 'Maroc', 0, 0),
(70, 'Assortiment Grands Crus', 'Une sélection ultra-exclusive de 4 thés rares (30g par variété). Ce coffret regroupe nos récoltes les plus confidentielles : un thé blanc de bourgeons, un Oolong de roche, un thé noir fumé au bois de pin et un thé vert d’ombre japonais.', 'Thé', 'unitaire', NULL, 42.65, 5.500, 45.00, 12, 'assortiment_grands_crus.webp', 'Multiples', 0, 0);

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
  MODIFY `id_article` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

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
