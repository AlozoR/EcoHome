<?php
require_once('Model.php');
if (isset($_REQUEST['mail']) and isset($_REQUEST['mdp'])) {
    $mail = $_REQUEST['mail'];
    $mdp = hash('md5', $_REQUEST['mdp']);
    $resultat = Model::verifConnexion($mail, $mdp);
    if ($resultat == null) {
        print('[]');
    } else {
        $tab[] = array('nb' => $resultat['nb'], 'mail' => $resultat['mail']);
        print(json_encode($tab));
    }
}
