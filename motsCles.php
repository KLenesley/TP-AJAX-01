<?php
try {
	// Connexion à la base de données
	$dbh = new PDO('mysql:host=localhost;dbname=ouketi', 'root', 'root', [
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
	]);

	// Préparation et exécution de la requête
	$stmt = $dbh->prepare('SELECT * FROM tbl_motcle');
	$stmt->execute();

	echo json_encode($stmt->fetchAll());
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}