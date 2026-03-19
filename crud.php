<?php

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'POST':
        // create
        json_encode($objets);
        $label = $method['label'];
        $qte = $method['qte'];
        $estConteneur = $method['estConteneur'];
        $estContenuDans = $method['estContenuDans'];
        $img = $method['img'];
        break;

    case 'GET':
        echo json_encode($objets);
        break;

    case 'PUT':
        // update
        break;

    case 'DELETE':
        // delete
        break;
}
