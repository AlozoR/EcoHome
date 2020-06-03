<?php
require_once('Model.php');
if (isset($_REQUEST['jour'])
	and isset($_REQUEST['horaire_debut'])
	and isset($_REQUEST['horaire_fin'])
	and isset($_REQUEST['economie'])
	and isset($_REQUEST['id_appareil'])
	and isset($_REQUEST['mail'])) {
	$jour = $_REQUEST['jour'];
	$horaire_debut = $_REQUEST['horaire_debut'];
	$horaire_fin = $_REQUEST['horaire_fin'];
	$economie = $_REQUEST['economie'];
	$id_appareil = $_REQUEST['id_appareil'];
	$mail = $_REQUEST['mail'];
	$tab = array(
		'jour' => $jour,
		'horaire_debut' => $horaire_debut,
		'horaire_fin' => $horaire_fin,
		'economie' => $economie,
		'id_appareil' => $id_appareil,
		'mail' => $mail,
		);
	Model::insertUtilisation($tab);
	// print(json_encode($tab));
}