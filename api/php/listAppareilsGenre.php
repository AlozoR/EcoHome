<?php
require_once('Model.php');

if (isset($_REQUEST['genre'])) {
	$genre = $_REQUEST['genre'];
	$resultat = Model::selectNomAppareil($genre);
	// echo json_encode($resultat);
	if ($resultat == null) {
		print('[]');
	} else {
		$tab = array();
		foreach ($resultat as $result) {
			$tab[] = array('label' => $result['ref_appareil'], 'value' => $result['id_appareil']);
		}
		$json_string = json_encode($tab, JSON_PRETTY_PRINT);
		header('Content-Type: application/json');
		echo $json_string;
	}
}
