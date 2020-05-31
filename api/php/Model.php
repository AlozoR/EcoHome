<?php


class Model
{
	private static $pdo;

	private static function connexion()
	{
		try {
			self::$pdo = new PDO('mysql:host=localhost;dbname=ecohome', 'superuser', 'superuser');
		} catch (PDOException $exp) {
			echo 'erreur de connexion au serveur';
		}
	}

	public static function verifConnexion($mail, $mdp)
	{
		self::connexion();
		if (Model::$pdo == null) {
			return null;
		} else {
			$data = array(':mail' => $mail, ':mdp' => $mdp);
			$requete = 'SELECT COUNT(*) AS nb, mail
                        FROM utilisateur
                        WHERE mail = :mail
                          AND mdp = :mdp;';
			$select = self::$pdo->prepare($requete);
			$select->execute($data);
			return $select->fetch();
		}
	}

	public static function selectAppareils($mail)
	{
		self::connexion();
		if (Model::$pdo == null) {
			return null;
		} else {
			$data = array(':mail' => $mail);
			$requete = 'SELECT a.id_appareil,
						       a.categorie,
						       a.genre,
						       a.ref_appareil,
						       a.conso_veille
                        FROM utilisation ut,
                             appareil a
                            	 JOIN utilisateur u ON mail = u.mail
                        WHERE u.mail = :mail
						  AND a.id_appareil = ut.id_appareil;';
			$select = self::$pdo->prepare($requete);
			$select->execute($data);
			return $select->fetchAll();
		}
	}

	public static function insertUtilisateur($tab)
	{
		self::connexion();
		if (Model::$pdo == null) {
			return null;
		} else {
			$data = array(':mail' => $tab['mail'], ':mdp' => $tab['mdp'],
				':tel' => $tab['tel']);
			$requete = 'INSERT INTO utilisateur
                        (mail, mdp, tel)
                        VALUES (:mail, :mdp, :tel);';
			$insert = self::$pdo->prepare($requete);
			$insert->execute($data);
		}
	}

	public static function selectUtilisateur($mail, $tel)
	{
		self::connexion();
		if (Model::$pdo == null) {
			return null;
		} else {
			$data = array(':mail' => $mail, ':tel' => $tel);
			$requete = 'SELECT COUNT(*) AS nb
                        FROM utilisateur
                        WHERE mail = :mail
                     	   OR tel = :tel;';
			$select = self::$pdo->prepare($requete);
			$select->execute($data);
			return $select->fetch();
		}
	}
}
