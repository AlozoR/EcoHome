<?php
require_once('Model.php');
if (isset($_REQUEST['mail'])) {
	$mail = $_REQUEST['mail'];
	$resultat = Model::selectUtilisateur($mail, '000');
	if ($resultat == null) {
		print('[]');
	} else {
		$tab = array('nb' => $resultat['nb']);
		$json_string = json_encode($tab, JSON_PRETTY_PRINT);
		header('Content-Type: application/json');
		echo $json_string;
	}
}

if (isset($_REQUEST['tel'])) {
	$tel = $_REQUEST['tel'];
	$resultat = Model::selectUtilisateur('foo', $tel);
	if ($resultat == null) {
		print('[]');
	} else {
		$tab = array('nb' => $resultat['nb']);
		$json_string = json_encode($tab, JSON_PRETTY_PRINT);
		header('Content-Type: application/json');
		echo $json_string;
	}
}
