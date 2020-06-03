DROP DATABASE IF EXISTS ecohome;
CREATE DATABASE ecohome;
USE ecohome;

-- CREATE USER 'superuser'@'localhost' IDENTIFIED BY 'superuser';
GRANT ALL PRIVILEGES ON ecohome.* TO superuser@localhost;

CREATE TABLE ecohome.operateur
(
    nom_operateur VARCHAR(32) NOT NULL,
    PRIMARY KEY (nom_operateur)
);


CREATE TABLE ecohome.offreelec
(
    nom_offre     VARCHAR(32)  NOT NULL,
    descriptif    VARCHAR(256) NOT NULL,
    nom_operateur VARCHAR(16),
    PRIMARY KEY (nom_offre, nom_operateur),
    CONSTRAINT nom_operateur_offr FOREIGN KEY (nom_operateur)
        REFERENCES ecohome.operateur (nom_operateur)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);


CREATE TABLE ecohome.prix
(
    montant_kwh        FLOAT NOT NULL,
    puissance_compteur INT   NOT NULL,
    PRIMARY KEY (montant_kwh, puissance_compteur),
    INDEX (puissance_compteur)
);


CREATE TABLE prix_offre
(
    montant_kwh        FLOAT       NOT NULL,
    puissance_compteur INT         NOT NULL,
    nom_offre          VARCHAR(32) NOT NULL,
    nom_operateur      VARCHAR(32) NOT NULL,
    PRIMARY KEY (montant_kwh, puissance_compteur, nom_offre),
    CONSTRAINT montant_kwh_prix_offr FOREIGN KEY (montant_kwh)
        REFERENCES ecohome.prix (montant_kwh)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    CONSTRAINT puissance_compteur_prix_offr FOREIGN KEY (puissance_compteur)
        REFERENCES ecohome.prix (puissance_compteur)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    CONSTRAINT nom_offre_prix_offr FOREIGN KEY (nom_offre)
        REFERENCES ecohome.offreelec (nom_offre)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    CONSTRAINT nom_operateur_prix_offr FOREIGN KEY (nom_operateur)
        REFERENCES ecohome.offreelec (nom_operateur)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);


CREATE TABLE ecohome.utilisateur
(
    mail               VARCHAR(32)     NOT NULL,
    mdp                VARCHAR(32)     NOT NULL,
    tel                VARCHAR(16),
    age                INT             NULL,
    sexe               ENUM ('M', 'F') NULL,
    puissance_compteur INT             NULL,
    date_inscription   DATETIME        NULL,
    nom_offre          VARCHAR(32)     NULL,
    nom_operateur      VARCHAR(32)     NULL,
    PRIMARY KEY (mail),
    CONSTRAINT nom_offre_user FOREIGN KEY (nom_offre)
        REFERENCES ecohome.offreelec (nom_offre)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    CONSTRAINT nom_operateur_user FOREIGN KEY (nom_operateur)
        REFERENCES ecohome.offreelec (nom_operateur)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);


CREATE TABLE ecohome.economies_mois
(
    mois      DATE        NOT NULL,
    economies FLOAT       NOT NULL,
    mail      VARCHAR(32) NOT NULL,
    PRIMARY KEY (mois, mail),
    CONSTRAINT mail_econ FOREIGN KEY (mail)
        REFERENCES ecohome.utilisateur (mail)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);


CREATE TABLE ecohome.type_appareil
(
    genre VARCHAR(32),
    PRIMARY KEY (genre)
);


CREATE TABLE ecohome.appareil
(
    id_appareil  VARCHAR(8)   NOT NULL,
    genre        VARCHAR(32)  NULL,
    categorie    ENUM ('électroménager','cuisine','informatique',
        'smartphones et objets connectés','équipement internet',
        'TV et accessoires','console de jeux','bricolage','autre')
                              NOT NULL,
    marque       VARCHAR(32)  NOT NULL,
    ref_appareil VARCHAR(128) NOT NULL,
    date_ajout   DATE         NULL,
    conso_eteint FLOAT        NULL,
    conso_veille FLOAT        NULL,
    conso_marche FLOAT        NULL,
    PRIMARY KEY (id_appareil),
    CONSTRAINT genre_appa FOREIGN KEY (genre)
        REFERENCES ecohome.type_appareil (genre)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);


CREATE TABLE ecohome.utilisation
(
    id_utilisation INT         NOT NULL AUTO_INCREMENT,
    jour           ENUM ('lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi',
        'samedi', 'dimanche')  NOT NULL,
    horaire_debut  TIME        NOT NULL,
    horaire_fin    TIME        NOT NULL,
    economie       FLOAT       NULL,
    id_appareil    VARCHAR(8)  NOT NULL,
    mail           VARCHAR(32) NOT NULL,
    PRIMARY KEY (id_utilisation),
    CONSTRAINT id_appareil_util FOREIGN KEY (id_appareil)
        REFERENCES ecohome.appareil (id_appareil)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    CONSTRAINT mail_util FOREIGN KEY (mail)
        REFERENCES ecohome.utilisateur (mail)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);


INSERT INTO ecohome.type_appareil(genre)
VALUES ('PC portable');
INSERT INTO ecohome.type_appareil(genre)
VALUES ('Imprimante');
INSERT INTO ecohome.type_appareil(genre)
VALUES ('Imprimante laser');
INSERT INTO ecohome.type_appareil(genre)
VALUES ('Lave Linge');
INSERT INTO ecohome.type_appareil(genre)
VALUES ('Four à micro ondes');
INSERT INTO ecohome.type_appareil(genre)
VALUES ('Box internet');
INSERT INTO ecohome.type_appareil(genre)
VALUES ('Décodeur TV');
INSERT INTO ecohome.type_appareil(genre)
VALUES ('TV');
INSERT INTO ecohome.type_appareil(genre)
VALUES ('Caster TV');
INSERT INTO ecohome.type_appareil(genre)
VALUES ('Ecran');
INSERT INTO ecohome.type_appareil(genre)
VALUES ('Répéteur WIFI');
INSERT INTO ecohome.type_appareil(genre)
VALUES ('Smartphone');
INSERT INTO ecohome.type_appareil(genre)
VALUES ('Tablette');
INSERT INTO ecohome.type_appareil(genre)
VALUES ('Montre connectée');
INSERT INTO ecohome.type_appareil(genre)
VALUES ('Transformateur batterie');
INSERT INTO ecohome.type_appareil(genre)
VALUES ('Console Portable');
INSERT INTO ecohome.type_appareil(genre)
VALUES ('Prise connectée');

SET GLOBAL local_infile = 1;
LOAD DATA LOCAL INFILE 'F:/OneDrive - De Vinci/Repos/JS/ReactNative/EcoHome/sql/test sql csv.csv'
    INTO TABLE ecohome.appareil
    FIELDS TERMINATED BY ';'
    LINES TERMINATED BY '\n';


INSERT INTO ecohome.operateur
VALUES ('EDF');


INSERT INTO ecohome.offreelec (nom_offre, descriptif, nom_operateur)
VALUES ('Vert Électrique base', 'Offre au tarif unique qui permet de réinjecter dans le réseau l\'equivalent
de sa consommation en électricité verte', 'EDF');


INSERT INTO prix (montant_kwh, puissance_compteur)
VALUES (0.1594, 6);

INSERT INTO prix (montant_kwh, puissance_compteur)
VALUES (0.1632, 9);


INSERT INTO prix_offre (montant_kwh, puissance_compteur, nom_offre, nom_operateur)
VALUES (0.1594, 6, 'Vert Électrique base', 'EDF');

INSERT INTO prix_offre (montant_kwh, puissance_compteur, nom_offre, nom_operateur)
VALUES (0.1632, 9, 'Vert Électrique base', 'EDF');


INSERT INTO ecohome.utilisateur
VALUES ('fion@fion.fion', '6a5bca8b119338e70777a85250c4ac5c', '00', 25, 'M', 6, CURDATE(), 'Vert Électrique base',
        'EDF');


INSERT INTO ecohome.utilisation (jour, horaire_debut, horaire_fin, economie, id_appareil, mail)
VALUES ('lundi', '00:45:00', '01:45:00', '0.1', '4', 'fion@fion.fion');

INSERT INTO ecohome.utilisation (jour, horaire_debut, horaire_fin, economie, id_appareil, mail)
VALUES ('lundi', '04:45:00', '05:45:00', '0.1', '4', 'fion@fion.fion');

INSERT INTO ecohome.utilisation (jour, horaire_debut, horaire_fin, economie, id_appareil, mail)
VALUES ('lundi', '00:45:00', '01:45:00', '0.1', '5', 'fion@fion.fion');

INSERT INTO ecohome.utilisation (jour, horaire_debut, horaire_fin, economie, id_appareil, mail)
VALUES ('mardi', '00:45:00', '01:45:00', '0.1', '5', 'fion@fion.fion');

INSERT INTO ecohome.utilisation (jour, horaire_debut, horaire_fin, economie, id_appareil, mail)
VALUES ('mercredi', '00:45:00', '01:45:00', '0.1', '5', 'fion@fion.fion');

INSERT INTO ecohome.utilisation (jour, horaire_debut, horaire_fin, economie, id_appareil, mail)
VALUES ('jeudi', '00:45:00', '01:45:00', '0.1', '5', 'fion@fion.fion');


INSERT INTO ecohome.economies_mois
VALUES ('2020-05-01', 12.5, 'fion@fion.fion');

INSERT INTO ecohome.economies_mois
VALUES ('2020-04-01', 11.2, 'fion@fion.fion');

