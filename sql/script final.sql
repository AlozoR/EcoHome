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
    PRIMARY KEY (nom_offre),
    CONSTRAINT nom_operateur_offr FOREIGN KEY (nom_operateur)
        REFERENCES ecohome.operateur (nom_operateur)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);


CREATE TABLE ecohome.prix
(
    montant_kwh FLOAT        NOT NULL,
    description VARCHAR(256) NOT NULL,
    PRIMARY KEY (montant_kwh)
);


CREATE TABLE prix_offre
(
    montant_kwh FLOAT       NOT NULL,
    nom_offre   VARCHAR(32) NOT NULL,
    PRIMARY KEY (montant_kwh, nom_offre),
    CONSTRAINT montant_kwh_prix FOREIGN KEY (montant_kwh)
        REFERENCES ecohome.prix (montant_kwh)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    CONSTRAINT nom_offre_prix_offr FOREIGN KEY (nom_offre)
        REFERENCES ecohome.offreelec (nom_offre)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);


CREATE TABLE ecohome.utilisateur
(
    mail             VARCHAR(32)     NOT NULL,
    mdp              VARCHAR(32)     NOT NULL,
    tel              VARCHAR(16),
    age              INT             NULL,
    sexe             ENUM ('M', 'F') NULL,
    date_inscription DATETIME        NULL,
    nom_offre        VARCHAR(32),
    PRIMARY KEY (mail),
    CONSTRAINT nom_offre_user FOREIGN KEY (nom_offre)
        REFERENCES ecohome.offreelec (nom_offre)
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
    jour          DATE        NOT NULL,
    horaire_debut TIME        NOT NULL,
    horaire_fin   TIME        NOT NULL,
    id_appareil   VARCHAR(8)  NOT NULL,
    mail          VARCHAR(32) NOT NULL,
    PRIMARY KEY (jour, horaire_debut, horaire_fin, id_appareil, mail),
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


INSERT INTO ecohome.utilisation (jour, horaire_debut, horaire_fin, id_appareil, mail)
VALUES ('2020-06-01', '00:45:00', '01:45:00', '4', 'fion@fion.fion');

INSERT INTO ecohome.utilisation (jour, horaire_debut, horaire_fin, id_appareil, mail)
VALUES ('2020-06-01', '04:45:00', '05:45:00', '4', 'fion@fion.fion');

INSERT INTO ecohome.utilisation (jour, horaire_debut, horaire_fin, id_appareil, mail)
VALUES ('2020-06-01', '00:45:00', '01:45:00', '5', 'fion@fion.fion');
