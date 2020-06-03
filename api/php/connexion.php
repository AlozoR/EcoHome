<?php
require_once('Model.php');
if (isset($_REQUEST['mail']) and isset($_REQUEST['mdp'])) {
    $mail = $_REQUEST['mail'];
    $mdp = hash('md5', $_REQUEST['mdp']);
    // $mdp = $_REQUEST['mdp'];
    $resultat = Model::verifConnexion($mail, $mdp);
    if ($resultat == null) {
        print('[]');
    } else {
        $tab[] = array('nb' => $resultat['nb'], 'mail' => $resultat['mail']);
	    $json_string = json_encode($tab, JSON_PRETTY_PRINT);
	    header('Content-Type: application/json');
	    echo $json_string;
    }
}
