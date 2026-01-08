<?php
try {
    // Connexion à la base de données
    $dbh = new PDO('mysql:host=localhost;dbname=ouketi', 'root', 'root', [
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    // Récupérer les IDs des mots-clés depuis les paramètres GET
    $motCleIds = isset($_GET['ids']) ? $_GET['ids'] : '';
    
    if (empty($motCleIds)) {
        // Si aucun mot-clé n'est sélectionné, retourner tous les objets
        $stmt = $dbh->prepare('SELECT * FROM tbl_objets');
        $stmt->execute();
    } else {
        // Convertir la chaîne d'IDs en tableau
        $idsArray = explode(',', $motCleIds);
        $nbr = count($idsArray);
        
        // Créer les placeholders pour la requête préparée
        $placeholders = implode(',', array_fill(0, $nbr, '?'));
        
        // Requête pour trouver les objets qui ont TOUS les mots-clés sélectionnés
        $sql = "SELECT tbl_objets.*
                FROM tbl_objets
                JOIN objets_motCle ON tbl_objets.id = objets_motCle.objets_id
                WHERE objets_motCle.motCle_id IN ($placeholders)
                GROUP BY tbl_objets.id
                HAVING COUNT(DISTINCT objets_motCle.motCle_id) = ?";
        
        $stmt = $dbh->prepare($sql);
        
        // Bind les valeurs
        $params = $idsArray;
        $params[] = $nbr; // Ajouter le nombre total à la fin
        
        $stmt->execute($params);
    }

    echo json_encode($stmt->fetchAll());
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}


// SELECT tbl_objets.id, tbl_objets.label
// FROM tbl_objets
// JOIN objets_motCle ON tbl_objets.id = objets_motCle.objets_id
// WHERE objets_motCle.motCle_id IN (1, 2);
// GROUP BY tbl_objets.id
// HAVING COUNT(DISTINCT objets_motCle.motCle_id) = 2;