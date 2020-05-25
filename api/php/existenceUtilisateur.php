<?php
require_once('Model.php');
if (isset($_REQUEST['mail'])) {
	$mail = $_REQUEST['mail'];
	$resultat = Model::selectUtilisateur($mail);
	if ($resultat == null) {
		print('[]');
	} else {
		$tab = array('nb' => $resultat['nb']);
		print(json_encode($tab));
	}
}
