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
            $requete = 'SELECT *
                        FROM appareil 
                            JOIN utilisation ut ON appareil.id_appareil = ut.id_appareil
                            JOIN utilisateur u ON ut.mail = u.mail
                        WHERE u.mail = :mail;';
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
            $data = array(':email' => $tab['email'], ':password' => $tab['password'],
                ':telephone' => $tab['telephone']);
            $requete = 'INSERT INTO utilisateur
                        (mail, mdp, tel)
                        VALUES (:mail, :password, :telephone);';
            $insert = self::$pdo->prepare($requete);
            $insert->execute($data);
        }
    }

    public static function selectUtilisateur($mail)
    {
        self::connexion();
        if (Model::$pdo == null) {
            return null;
        } else {
            $data = array(':email' => $mail);
            $requete = 'SELECT COUNT(*) AS nb
                        FROM utilisateur
                        WHERE mail = :mail';
            $select = self::$pdo->prepare($requete);
            $select->execute($data);
            return $select->fetch();
        }
    }
}
