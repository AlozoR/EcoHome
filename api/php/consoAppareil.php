<?php
require_once('Model.php');
if (isset($_REQUEST['id_appareil'])) {
	$id_appareil = $_REQUEST['id_appareil'];
	$resultat = Model::selectConsoAppareil($id_appareil);
	if ($resultat == null) {
		print('[]');
	} else {
		$tab[] = array('conso_veille' => $resultat['conso_veille']);
		$json_string = json_encode($tab, JSON_PRETTY_PRINT);
		header('Content-Type: application/json');
		echo $json_string;
	}
}