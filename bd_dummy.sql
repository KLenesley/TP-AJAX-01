-- Insertion de données factices

-- Table tbl_objets
INSERT INTO tbl_objets (id, qte, label, estConteneur, estContenuDans) VALUES
(1, 10, 'Boîte en carton', TRUE, NULL),
(2, 5, 'Sac à dos', TRUE, NULL),
(3, 1, 'Bouteille d\'eau', FALSE, 2),
(4, 3, 'Clé USB', FALSE, 2),
(5, 20, 'Crayon', FALSE, 1),
(6, 2, 'Ordinateur portable', FALSE, NULL),
(7, 15, 'Livre', FALSE, 1),
(8, 1, 'Trousse', TRUE, 2),
(9, 4, 'Stylo', FALSE, 8),
(10, 1, 'Casque audio', FALSE, 2);

-- Table tbl_motCle
INSERT INTO tbl_motCle (id, label) VALUES
(1, 'électronique'),
(2, 'papeterie'),
(3, 'conteneur'),
(4, 'transport'),
(5, 'boisson'),
(6, 'lecture');

-- Table objets_motCle (correspondances)
INSERT INTO objets_motCle (objets_id, motCle_id) VALUES
(1, 3), -- boîte en carton → conteneur
(1, 4), -- boîte en carton → transport
(2, 3), -- sac à dos → conteneur
(2, 4), -- sac à dos → transport
(3, 5), -- bouteille d'eau → boisson
(4, 1), -- clé USB → électronique
(5, 2), -- crayon → papeterie
(6, 1), -- ordinateur portable → électronique
(7, 6), -- livre → lecture
(8, 3), -- trousse → conteneur
(9, 2), -- stylo → papeterie
(10, 1); -- casque audio → électronique
