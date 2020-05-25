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
            $tab[] = array('id_appareil' => $resultat['id_appareil'], 'genre' => $resultat['genre'],
                'categorie' => $resultat['categorie'], 'ref_appareil' => $resultat['ref_appareil'],
                'conso_veille' => $resultat['conso_veille'], 'conso_marche' => $resultat['conso_marche'],
                'conso_eteint' => $resultat['conso_eteint']);
        }
        print(json_encode($tab));
    }
}

