<?php
require_once('Model.php');
if (isset($_REQUEST['mail'])
	and isset($_REQUEST['horaire_debut'])
	and isset($_REQUEST['horaire_fin'])
	and isset($_REQUEST['id_appareil'])) {
	$mail = $_REQUEST['mail'];
	$horaire_debut = $_REQUEST['horaire_debut'];
	$horaire_fin = $_REQUEST['horaire_fin'];
	$id_appareil = $_REQUEST['id_appareil'];
	$resultat = Model::selectJour($mail, $horaire_debut, $horaire_fin, $id_appareil);
	// echo json_encode($resultat);
	if ($resultat == null) {
		print('[]');
	} else {
		$tab = array('lundi' => '0',
			'mardi' => '0',
			'mercredi' => '0',
			'jeudi' => '0',
			'vendredi' => '0',
			'samedi' => '0',
			'dimanche' => '0',
		);
		foreach ($resultat as $result) {
			$tab[$result['jour']] = '1';
		}
		$json_string = json_encode($tab, JSON_PRETTY_PRINT);
		header('Content-Type: application/json');
		echo $json_string;
	}
}