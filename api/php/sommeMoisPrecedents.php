<?php
require_once('Model.php');
if (isset($_REQUEST['mail'])) {
	$mail = $_REQUEST['mail'];
	$resultat = Model::sumEconomiesMois($mail);
	if ($resultat == null) {
		print('[]');
	} else {
		$tab[] = array('eco' => $resultat['eco']);
		$json_string = json_encode($tab, JSON_PRETTY_PRINT);
		header('Content-Type: application/json');
		echo $json_string;
	}
}