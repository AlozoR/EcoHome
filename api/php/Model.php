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
						  AND a.id_appareil = ut.id_appareil
						GROUP BY a.id_appareil;';
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

	public static function selectUtilisation($mail, $id_appareil)
	{
		self::connexion();
		if (Model::$pdo == null) {
			return null;
		} else {
			$data = array(':mail' => $mail, ':id_appareil' => $id_appareil);
			$requete = 'SELECT COUNT(*) AS nb, ut.horaire_debut, ut.horaire_fin
						FROM ecohome.utilisation ut
						WHERE ut.mail = :mail
  						  AND ut.id_appareil = :id_appareil
						GROUP BY horaire_debut, horaire_fin;';
			$select = self::$pdo->prepare($requete);
			$select->execute($data);
			return $select->fetchAll();
		}
	}

	public static function selectAllUtilisation($mail)
	{
		self::connexion();
		if (Model::$pdo == null) {
			return null;
		} else {
			$data = array(':mail' => $mail);
			$requete = 'SELECT ut.horaire_debut, ut.horaire_fin, a.conso_veille, p.montant_kwh, COUNT(*) AS nb
						FROM ecohome.utilisation ut,
						     ecohome.utilisateur u,
						     ecohome.appareil a,
						     offreelec e,
						     prix_offre po,
						     prix p
						WHERE ut.mail = :mail
						  AND a.id_appareil = ut.id_appareil
						  AND u.mail = ut.mail
						  AND u.nom_offre = e.nom_offre
						  AND u.nom_operateur = e.nom_operateur
						  AND e.nom_offre = po.nom_offre
						  AND e.nom_operateur = po.nom_operateur
						  AND po.montant_kwh = p.montant_kwh
						  AND po.puissance_compteur = p.puissance_compteur
						  AND u.puissance_compteur = p.puissance_compteur
						GROUP BY ut.horaire_debut, ut.horaire_fin, a.conso_veille, p.montant_kwh;';
			$select = self::$pdo->prepare($requete);
			$select->execute($data);
			return $select->fetchAll();
		}
	}

	public static function averageEconomiesMois($mail)
	{
		self::connexion();
		if (Model::$pdo == null) {
			return null;
		} else {
			$data = array(':mail' => $mail);
			$requete = 'SELECT AVG(economies) AS moyenne
						FROM economies_mois em
						WHERE em.mail = :mail;';
			$select = self::$pdo->prepare($requete);
			$select->execute($data);
			return $select->fetch();
		}
	}

	public static function sumEconomiesUtilisations($mail, $id_appareil)
	{
		self::connexion();
		if (Model::$pdo == null) {
			return null;
		} else {
			$data = array(':mail' => $mail, ':id_appareil' => $id_appareil);
			$requete = 'SELECT SUM(ut.economie) AS eco
						FROM utilisation ut, appareil a
						WHERE mail = :mail
						  AND a.id_appareil = :id_appareil
						  AND a.id_appareil = ut.id_appareil;';
			$select = self::$pdo->prepare($requete);
			$select->execute($data);
			return $select->fetch();
		}
	}

	public static function sumAllEconomiesUtilisations($mail)
	{
		self::connexion();
		if (Model::$pdo == null) {
			return null;
		} else {
			$data = array(':mail' => $mail);
			$requete = 'SELECT SUM(ut.economie) AS eco
						FROM utilisation ut, appareil a
						WHERE mail = :mail
						  AND ut.id_appareil = a.id_appareil;';
			$select = self::$pdo->prepare($requete);
			$select->execute($data);
			return $select->fetch();
		}
	}

	public static function sumEconomiesMois($mail)
	{
		self::connexion();
		if (Model::$pdo == null) {
			return null;
		} else {
			$data = array(':mail' => $mail);
			$requete = 'SELECT SUM(em.economies) AS eco
						FROM economies_mois em
						WHERE mail = :mail;';
			$select = self::$pdo->prepare($requete);
			$select->execute($data);
			return $select->fetch();
		}
	}

	public static function selectOffreElec($mail)
	{
		self::connexion();
		if (Model::$pdo == null) {
			return null;
		} else {
			$data = array(':mail' => $mail);
			$requete = 'SELECT p.montant_kwh
						FROM offreelec o, prix_offre po, prix p, utilisateur u
						WHERE u.mail = :mail
						  AND u.nom_offre = o.nom_offre
						  AND u.nom_operateur = o.nom_operateur
						  AND o.nom_offre = po.nom_offre
						  AND o.nom_operateur = po.nom_operateur
						  AND po.montant_kwh = p.montant_kwh
						  AND po.puissance_compteur = p.puissance_compteur
						  AND p.puissance_compteur = u.puissance_compteur;';
			$select = self::$pdo->prepare($requete);
			$select->execute($data);
			return $select->fetch();
		}
	}

	public static function selectJour($mail, $horaire_debut, $horaire_fin, $id_appareil)
	{
		self::connexion();
		if (Model::$pdo == null) {
			return null;
		} else {
			$data = array(':mail' => $mail,
				':horaire_debut' => $horaire_debut,
				':horaire_fin' => $horaire_fin,
				':id_appareil' => $id_appareil);
			$requete = 'SELECT jour
						FROM utilisation ut
						WHERE ut.mail = :mail
						  AND ut.id_appareil = :id_appareil
						  AND ut.horaire_debut = :horaire_debut
						  AND ut.horaire_fin = :horaire_fin;';
			$select = self::$pdo->prepare($requete);
			$select->execute($data);
			return $select->fetchAll();
		}
	}

	public static function selectGenre()
	{
		self::connexion();
		if (Model::$pdo == null) {
			return null;
		} else {
			$requete = 'SELECT DISTINCT a.genre
						FROM appareil a';
			$select = self::$pdo->prepare($requete);
			$select->execute();
			return $select->fetchAll();
		}
	}

	public static function selectNomAppareil($genre){
		self::connexion();
		if (Model::$pdo == null) {
			return null;
		} else {
			$data = array(':genre' => $genre);
			$requete = 'SELECT a.ref_appareil, a.id_appareil
						FROM appareil a
						WHERE a.genre = :genre;';
			$select = self::$pdo->prepare($requete);
			$select->execute($data);
			return $select->fetchAll();
		}
	}
}
