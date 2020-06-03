<?php
require_once('Model.php');
if (isset($_REQUEST['mail'])) {
	$mail = $_REQUEST['mail'];
	$resultat = Model::selectOffreElec($mail);
	if ($resultat == null) {
		print('[]');
	} else {
		$tab[] = array('montant_kwh' => $resultat['montant_kwh']);
		$json_string = json_encode($tab, JSON_PRETTY_PRINT);
		header('Content-Type: application/json');
		echo $json_string;
	}
}