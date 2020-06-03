<?php
require_once('Model.php');
if (isset($_REQUEST['mail']) and isset($_REQUEST['id_appareil'])) {
	$mail = $_REQUEST['mail'];
	$id_appareil = $_REQUEST['id_appareil'];
	if ($id_appareil == '0') {
		$resultat = Model::sumAllEconomiesUtilisations($mail);
	} else {
		$resultat = Model::sumEconomiesUtilisations($mail, $id_appareil);
	}
	if ($resultat == null) {
		print('[]');
	} else {
		$tab[] = array('eco' => $resultat['eco']);
		$json_string = json_encode($tab, JSON_PRETTY_PRINT);
		header('Content-Type: application/json');
		echo $json_string;
	}
}