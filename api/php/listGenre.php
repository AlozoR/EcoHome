<?php
require_once('Model.php');

$resultat = Model::selectGenre();
// echo json_encode($resultat);
if ($resultat == null) {
	print('[]');
} else {
	$tab = array();
	foreach ($resultat as $result) {
		$tab[] = array('label' => $result['genre'], 'value' => $result['genre']);
	}
	$json_string = json_encode($tab, JSON_PRETTY_PRINT);
	header('Content-Type: application/json');
	echo $json_string;
}
