-- Insertion dummy data

-- Table tbl_objets
INSERT INTO tbl_objets (id, qte, label, estConteneur, estContenuDans) VALUES
(1, 1, 'Caisse-1', TRUE, NULL),
(2, 1, 'Tournevis', FALSE, 1),
(3, 1, 'Scie', FALSE, 1),
(4, 1, 'Caisse-2', TRUE, NULL),
(5, 1, 'Sachet', TRUE, 4),
(40, 10, 'Clous', FALSE, 5),
(15, 1, 'Perceuse', FALSE, 4);

-- Table tbl_motCle
INSERT INTO tbl_motCle (id, label) VALUES
(1, 'Métal'),
(2, 'Bleu'),
(3, 'Plastique'),
(4, 'Vert'),
(50, 'Rouge'),
(20, 'Bois');

-- Table objets_motCle (correspondances)
INSERT INTO objets_motCle (objets_id, motCle_id) VALUES
(1, 20),  -- Caisse-1 - Bois
(2, 1),  -- Tournevis - Métal
(2, 2),  -- Tournevis - Bleu
(3, 1),  -- Scie - Métal
(3, 50),  -- Scie - Rouge
(4, 20),  -- Caisse-2 - Bois
(5, 3),  -- Sachet - Plastique
(5, 4),  -- Sachet - Vert
(40, 1),  -- Clous - Métal
(15, 1),  -- Perceuse - Métal
(15, 2);  -- Perceuse - Bleu

-- SELECT *
-- FROM objets_motcle
-- WHERE motCle_id = 1
-- AND objets_id IN (
--     SELECT objets_id 
--     FROM objets_motcle 
--     WHERE motCle_id = 2
-- );