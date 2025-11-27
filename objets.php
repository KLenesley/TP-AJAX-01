<?php
try {
    // Connexion à la base de données
    $dbh = new PDO('mysql:host=localhost;dbname=ouketi', 'root', 'root', [
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    // Préparation et exécution de la requête
    $stmt = $dbh->prepare('SELECT * FROM tbl_objets');
    $stmt->execute();

    echo json_encode($stmt->fetchAll());
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}