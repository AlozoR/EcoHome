<?php
require_once('Model.php');
if (isset($_REQUEST['mail'])
	and isset($_REQUEST['tel'])
	and isset($_REQUEST['mdp'])) {
	$mail = $_REQUEST['mail'];
	$tel = $_REQUEST['tel'];
	$mdp = hash('md5', $_REQUEST['mdp']);
	$tab = array('mail' => $mail, 'mdp' => $mdp, 'tel' => $tel);
	Model::insertUtilisateur($tab);
	// print(json_encode($tab));
}
