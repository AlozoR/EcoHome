DROP DATABASE IF EXISTS ecohome;
CREATE DATABASE ecohome;
USE ecohome;


CREATE TABLE ecohome.offreelec
(
    nom_offre   VARCHAR(32)  NOT NULL,
    descriptif  VARCHAR(256) NOT NULL,
    prix_kwh    FLOAT        NOT NULL,
    fournisseur VARCHAR(16),
    PRIMARY KEY (nom_offre)
);


CREATE TABLE ecohome.utilisateur
(
    mail      VARCHAR(32) NOT NULL,
    mdp       VARCHAR(32) NOT NULL,
    tel       VARCHAR(16),
    nom_offre VARCHAR(32),
    PRIMARY KEY (mail),
    CONSTRAINT nom_offre FOREIGN KEY (nom_offre)
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
    categorie    ENUM ('électroménager','cuisine','informatique','smartphones et objets connectés','équipement internet','TV et accessoires','console de jeux','bricolage','autre'),
    ref_appareil VARCHAR(128) NOT NULL,
    conso_veille FLOAT        NULL,
    conso_marche FLOAT        NULL,
    conso_eteint FLOAT        NULL,
    PRIMARY KEY (id_appareil),
    CONSTRAINT genre FOREIGN KEY (genre)
        REFERENCES ecohome.type_appareil (genre)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);


CREATE TABLE ecohome.possede
(
    mail        VARCHAR(32) NOT NULL,
    id_appareil VARCHAR(8)  NOT NULL,
    PRIMARY KEY (mail, id_appareil),
    CONSTRAINT mail FOREIGN KEY (mail)
        REFERENCES ecohome.utilisateur (mail)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    CONSTRAINT id_appareil_poss FOREIGN KEY (id_appareil)
        REFERENCES ecohome.appareil (id_appareil)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);


CREATE TABLE ecohome.horaires
(
    jour          DATE     NOT NULL,
    horaire_debut DATETIME NOT NULL,
    horaire_fin   DATETIME NOT NULL,
    PRIMARY KEY (jour, horaire_debut, horaire_fin),
    INDEX f_hor1_idx (horaire_debut ASC),
    INDEX f_hor2_idx (horaire_fin ASC)
);


CREATE TABLE ecohome.utilisation
(
    id_appareil   VARCHAR(8) NOT NULL,
    jour          DATE       NOT NULL,
    horaire_debut DATETIME   NOT NULL,
    horaire_fin   DATETIME   NOT NULL,
    PRIMARY KEY (id_appareil, jour, horaire_debut, horaire_fin),
    CONSTRAINT id_appareil_util FOREIGN KEY (id_appareil)
        REFERENCES ecohome.appareil (id_appareil)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    CONSTRAINT jour FOREIGN KEY (jour)
        REFERENCES ecohome.horaires (jour)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    CONSTRAINT horaire_debut FOREIGN KEY (horaire_debut)
        REFERENCES ecohome.horaires (horaire_debut)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    CONSTRAINT horaire_fin FOREIGN KEY (horaire_fin)
        REFERENCES ecohome.horaires (horaire_fin)
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
VALUES ('Montre connec'); -- tée');
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

SELECT COUNT(*)
FROM ecohome.appareil;

DROP TABLE possede;

ALTER TABLE utilisation
    ADD COLUMN mail VARCHAR(32),
    ADD CONSTRAINT mail_util FOREIGN KEY (mail)
        REFERENCES utilisateur (mail)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    DROP PRIMARY KEY,
    ADD CONSTRAINT PRIMARY KEY (id_appareil, jour, horaire_debut, horaire_fin,
                                mail)

