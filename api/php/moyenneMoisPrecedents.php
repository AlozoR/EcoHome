<?php
require_once('Model.php');
if (isset($_REQUEST['mail'])) {
	$mail = $_REQUEST['mail'];
	$resultat = Model::averageEconomiesMois($mail);
	if ($resultat == null) {
		print('[]');
	} else {
		$tab[] = array('moyenne' => $resultat['moyenne']);
		$json_string = json_encode($tab, JSON_PRETTY_PRINT);
		header('Content-Type: application/json');
		echo $json_string;
	}
}