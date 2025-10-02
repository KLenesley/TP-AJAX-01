-- Suppression des tables si elles existent déjà
DROP TABLE IF EXISTS objets_motCle;
DROP TABLE IF EXISTS tbl_motCle;
DROP TABLE IF EXISTS tbl_objets;

-- Création de la table des objets
CREATE TABLE tbl_objets (
    id INT PRIMARY KEY,
    qte INT NOT NULL DEFAULT 1,
    label VARCHAR(50) NOT NULL,
    estConteneur BOOLEAN NOT NULL DEFAULT FALSE,
    estContenuDans INT,
    FOREIGN KEY (estContenuDans) REFERENCES tbl_objets(id)
);

-- Création de la table des mots-clés
CREATE TABLE tbl_motCle (
    id INT PRIMARY KEY,
    label VARCHAR(50) NOT NULL
);

-- Table de correspondance objets <-> mots-clés
CREATE TABLE objets_motCle (
    objets_id INT,
    motCle_id INT,
    PRIMARY KEY (objets_id, motCle_id),
    FOREIGN KEY (objets_id) REFERENCES tbl_objets(id),
    FOREIGN KEY (motCle_id) REFERENCES tbl_motCle(id)
);

-- SELECT *
-- FROM tbl_objets
-- JOIN objets_motCle ON tbl_objets.id = objets_motCle.objets_id
-- JOIN tbl_motCle ON objets_motCle.motCle_id = tbl_motCle.id