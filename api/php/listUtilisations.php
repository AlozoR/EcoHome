<?php
require_once('Model.php');
if (isset($_REQUEST['mail']) and isset($_REQUEST['id_appareil'])) {
	$mail = $_REQUEST['mail'];
	$id_appareil = $_REQUEST['id_appareil'];
	if ($id_appareil == '0') {
		$resultat = Model::selectAllUtilisation($mail);
	} else {
		$resultat = Model::selectUtilisation($mail, $id_appareil);
	}
	if ($resultat == null) {
		print('[]');
	} else {
		$tab = array();
		foreach ($resultat as $unRes) {
			$tab[] = array('nb_jour' => $unRes['nb'],
				'horaire_debut' => $unRes['horaire_debut'],
				'horaire_fin' => $unRes['horaire_fin'],
				'conso_veille' => $unRes['conso_veille']??null,
				'montant_kwh' => $unRes['montant_kwh']??null);
		}
		$json_string = json_encode($tab, JSON_PRETTY_PRINT);
		header('Content-Type: application/json');
		echo $json_string;
	}
}