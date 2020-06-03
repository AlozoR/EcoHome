<?php
require_once('Model.php');
if (isset($_REQUEST['mail'])) {
    $mail = $_REQUEST['mail'];
    $resultat = Model::selectAppareils($mail);
    if ($resultat == null) {
        print('[]');
    } else {
        $tab = array();
        foreach ($resultat as $unRes) {
            $tab[] = array('id_appareil' => $unRes['id_appareil'],
	            'categorie' => $unRes['categorie'],
	            'genre' => $unRes['genre'],
	            'ref_appareil' => $unRes['ref_appareil'],
                'conso_veille' => $unRes['conso_veille']);
        }
        $json_string = json_encode($tab, JSON_PRETTY_PRINT);
	    header('Content-Type: application/json');
        echo $json_string;
    }
}

