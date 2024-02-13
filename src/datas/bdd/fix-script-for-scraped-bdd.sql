-- EFFACER LES TABLES DE RECEPTION DES DONNEES
DROP TABLE IF EXISTS _user_, franchise, franchise_game, games, games_scraper, to_play, game_details, league, player, season, game_stats, temp_table, team_stats, team_gamestats;
DROP PROCEDURE IF EXISTS insert_franchise_game_team_visitor;
DROP PROCEDURE IF EXISTS insert_franchise_game_team_home;


-- RENOMMER UNE TABLE SI BESOIN 
-- RENAME TABLE old_name TO new_name;



-- DUPLIQUER LES TABLES D'ORIGINE POUR SECURISER LES DONNEES BRUTES
CREATE TABLE games_scraper AS
SELECT * FROM games_scraper_save;

CREATE TABLE game_details AS
SELECT * FROM game_details_save;


-- CERTAINE ANOMALIE EXISTE DANS LES DONNEES BRUTES DES MULTIPLICATIONS DE LIGNES
-- Permet de copier toutes lignes qui ont 3 fois le même identifiant de match (gameId) et qui sont de la Pro A, vers une table temporaire
-- MySQL ne permet pas d'utiliser la table cible dans une sous-requête avec un FROM lors d'une opération DELETE.
    CREATE  TABLE temp_table AS
    SELECT * 
    FROM games_scraper_save gss
    WHERE championship = 'Pro A'
    AND gameId IN (
        SELECT gameId
        FROM games_scraper_save
        GROUP BY gameId 
        HAVING COUNT(*) > 1
    )
    ORDER BY gss.gameId ASC;


-- Suppression des lignes dans la table principale en utilisant la table temporaire
DELETE FROM games_scraper
WHERE id IN (SELECT id FROM temp_table);

DROP TABLE temp_table;

-- VÉRIFICATION DANS LA TABLE games_scraper SI DES LIGNES ONT ÉTÉ SUPPRIMÉES
-- CE SCRIPT NE DOIT RETOURNER AUCCUNE LIGNE
    SELECT * 
    FROM games_scraper gs
    WHERE championship = 'Pro A'
    AND gameId IN (
        SELECT gameId
        FROM games_scraper
        GROUP BY gameId 
        HAVING COUNT(*) > 1
    )
    ORDER BY gs.gameId ASC;





-- CERTAINE ANOMALIE EXISTE DANS LES DONNEES BRUTES DES MULTIPLICATIONS DE LIGNES
-- Permet de copier toutes lignes qui ont 3 fois le même identifiant de match (gameId) et qui sont de la Pro A, vers une table temporaire
-- MySQL ne permet pas d'utiliser la table cible dans une sous-requête avec un FROM lors d'une opération DELETE.

-- Erreur de frappe dans le nom du joueur : 12 Craig Ra,ndall II
UPDATE game_details
SET player = '12 Craig Randall II'
WHERE player = '12 Craig Ra,ndall II';



-- CREATE  TABLE temp_table AS
-- SELECT DISTINCT gds.*
-- FROM game_details_save gds
-- WHERE id IN (
--     SELECT id
--     FROM game_details_save
--     GROUP BY id
--     HAVING COUNT(*) > 1
-- )
-- ORDER BY gds.id ASC;

-- -- Suppression des lignes dans la table principale en utilisant la table temporaire
-- DELETE FROM games_details
-- WHERE id IN (SELECT id FROM temp_table);

-- DROP TABLE temp_table;


-- CREATION DES TABLES NECESSAIRES QUI SERIVRONT A RECEVOIR LES DONNEES SCRAPEES
CREATE TABLE franchise(
   id INT AUTO_INCREMENT,
   franchise_name VARCHAR(50),
   franchise_logo VARCHAR(50),
   franchise_city VARCHAR(50),
   PRIMARY KEY(id)
);

CREATE TABLE league(
   id INT AUTO_INCREMENT,
   league_name VARCHAR(50),
   league_logo VARCHAR(50),
   PRIMARY KEY(id)
);

CREATE TABLE season(
   id INT AUTO_INCREMENT,
   `start_date` DATE,
   end_date DATE,
   season_name VARCHAR(50),
   PRIMARY KEY(id)
);

CREATE TABLE games(
   id INT AUTO_INCREMENT,
   game_day VARCHAR(50),
   game_location VARCHAR(128),
   game_date VARCHAR(50),
   trainerHome VARCHAR(50),
   teamIdHome INT,
   teamHomeScore INT,
   trainerVisitor VARCHAR(50),
   teamIdVisitor INT,
   teamVisitorScore INT,
   PRIMARY KEY(id)
);

CREATE TABLE player(
   id INT AUTO_INCREMENT,
   player_firstname VARCHAR(50),
   player_name VARCHAR(50),
   player_number VARCHAR(128),
   player_birthdate DATE,
   player_weight DECIMAL(5,2),
   player_height DECIMAL(5,2),
   player_photo VARCHAR (255),
   id_franchise INT,
   FOREIGN KEY(id_franchise) REFERENCES franchise(id),
   PRIMARY KEY(id)
);

CREATE TABLE game_stats(
    id INT AUTO_INCREMENT,
    gameId INT,    -- effacé un peu plus tard
    playerId INT,   -- effacé un peu plus tard
    id_franchise INT,
   fiveD BOOLEAN,
   min INT,
   pts INT,
   twoR INT,
   twoT INT,
   twoPerc DECIMAL(5,2),
   threeR INT,
   threeT INT,
   threetPerc DECIMAL(5,2),
   lr INT,
   lt INT,
   lPerc DECIMAL(5,2),
   ro INT,
   rt INT,
   rd INT,
   pd INT,
   ct INT,
   cs INT,
   `in` INT,
   bp INT,
   fte INT,
   fpr INT,
   eval INT,
   plusMinus INT,
   FOREIGN KEY(id_franchise) REFERENCES franchise(id),
   PRIMARY KEY(id)
);


CREATE TABLE team_stats(
    id INT AUTO_INCREMENT,
    gameId INT,    -- effacé un peu plus tard
    playerId INT,   -- effacé un peu plus tard
    id_franchise INT,
   fiveD BOOLEAN,
   min INT,
   pts INT,
   twoR INT,
   twoT INT,
   twoPerc DECIMAL(5,2),
   threeR INT,
   threeT INT,
   threetPerc DECIMAL(5,2),
   lr INT,
   lt INT,
   lPerc DECIMAL(5,2),
   ro INT,
   rt INT,
   rd INT,
   pd INT,
   ct INT,
   cs INT,
   `in` INT,
   bp INT,
   fte INT,
   fpr INT,
   eval INT,
   plusMinus INT,
   FOREIGN KEY(id_franchise) REFERENCES franchise(id),
   PRIMARY KEY(id)
);


CREATE TABLE franchise_game(
   id_franchise INT,
   id_league INT,
   id_season INT,
   id_games INT,
   PRIMARY KEY(id_franchise, id_league, id_season, id_games),
   FOREIGN KEY(id_franchise) REFERENCES franchise(id),
   FOREIGN KEY(id_league) REFERENCES league(id),
   FOREIGN KEY(id_season) REFERENCES season(id),
   FOREIGN KEY(id_games) REFERENCES games(id)
);


CREATE TABLE to_play(
   id_games INT,
   id_game_stats INT,
   id_player INT,
   PRIMARY KEY(id_games, id_game_stats, id_player),
   FOREIGN KEY(id_games) REFERENCES games(id),
   FOREIGN KEY(id_game_stats) REFERENCES game_stats(id),
   FOREIGN KEY(id_player) REFERENCES player(id)
);

CREATE TABLE team_gamestats(
   id_games INT,
   id_team_stats INT,
   PRIMARY KEY(id_games, id_team_stats),
   FOREIGN KEY(id_games) REFERENCES games(id),
   FOREIGN KEY(id_team_stats) REFERENCES team_stats(id)
);


CREATE TABLE _user_(
   id INT AUTO_INCREMENT,
   user_firstname VARCHAR(50),
   user_lastname VARCHAR(50),
   user_pseudo VARCHAR(50),
   user_role TINYINT,
   user_email VARCHAR(50),
   user_password VARCHAR(255),
   PRIMARY KEY(id)
);


-- COPIE DE DONNEES DANS LA TABLE franchise

-- L'idée est d'aller chercher dans la table games_scraper toutes les équipe de cette table qui ont joué à domicile et en visiteur(teamHome, teamVisitor)
-- puis de les insérer dans 3 champs différents dont un en particulier qui sera le nom du fichier de l'image de la franchise
-- il doit être construit (CONCAT)sur ce modèle : la chaine 'team-' + <le nom de la franchise> + la chaine '.png'
-- LOWER pour mettre en minuscule
-- REPLACE pour remplacer les caractères spéciaux
-- Remplacement également du nom 'espoirs' par une chaine vide car chaque équipe (Pro A, Pro B et Espoirs) appartient à une seule et même franchise
INSERT INTO franchise (franchise_name, franchise_logo, franchise_city)
SELECT DISTINCT
  teamName,
  CONCAT('team-', LOWER(
      REPLACE(
          REPLACE(
              REPLACE(
                  REPLACE(
                      REPLACE(
                          REPLACE(
                            REPLACE(
                              REPLACE(
                                  REPLACE(
                                      REPLACE(
                                          REPLACE(
                                              REPLACE(
                                                  teamName, ' ', ''),
                                              '/','sur'),
                                              '-',''),
                                          'ô','o'),
                                      'â','a'),
                                  'à','a'),
                              'é','e'),
                          'è','e'),
                      'ê','e'),
                  'ù','u'),
              'ç','c'),
          'Espoirs',''
      )
  ), '.png') AS logo,
  teamName AS Ville
FROM (
    SELECT DISTINCT teamHome AS teamName FROM games_scraper
    UNION
    SELECT DISTINCT teamVisitor AS teamName FROM games_scraper
) AS teams
ORDER BY teamName ASC;



-- CORRECTION DES DONNEES teamIdHome & teamIdVisitor DE la table game_scraper
-- LES id des équipes seront corrigé en fonctione de la table de référence : franchise
-- modifier tous les id des teamHome dans games_scraper en fonction des nom identique de la table franchise
UPDATE games_scraper 
JOIN franchise f ON teamHome = f.franchise_name
SET teamIdHome = f.id;


-- modifier tous les id des teamVisitor dans games_scraper en fonction des nom identique de la table franchise
UPDATE games_scraper 
JOIN franchise f ON teamVisitor = f.franchise_name
SET teamIdVisitor = f.id;


-- COPIE DES DONNEES DE LA TABLE game_scraper VERS LA TABLE games 
-- Une première tentative d'insertion des gameId dans la clé primaire de la table games à été faite mais elle a échoué car on retrouve plusieurs fois le même gameId 
INSERT INTO games (id, game_date, game_day, game_location, teamIdHome, teamHomeScore, teamIdVisitor, teamVisitorScore, trainerHome, trainerVisitor)
                   SELECT 
                    gameId,
                    gameDate,
                    gameDay,
                    gameLocation,
                    teamIdHome,
                    teamHomeScore,
                    teamIdVisitor, 
                    teamVisitorScore,
                    trainerHome,
                    trainerVisitor
                   FROM games_scraper;


-- CONVERTION DES DATES DE LA TABLE game
UPDATE games
SET game_date = STR_TO_DATE(
    REPLACE(
        REPLACE(
            REPLACE(
                REPLACE(
                    REPLACE(
                        REPLACE(
                            REPLACE(
                                REPLACE(
                                    REPLACE(
                                        REPLACE(
                                            REPLACE(
                                                REPLACE(
                                                    game_date,
                                                    'janvier', 'January'
                                                ),
                                                'février', 'February'
                                            ),
                                            'mars', 'March'
                                        ),
                                        'avril', 'April'
                                    ),
                                    'mai', 'May'
                                ),
                                'juin', 'June'
                            ),
                            'juillet', 'July'
                        ),
                        'août', 'August'
                    ),
                    'septembre', 'September'
                ),
                'octobre', 'October'
            ),
            'novembre', 'November'
        ),
        'décembre', 'December'
    ),
    '%d %M %Y'
);

-- CONVERTION DES DATES DE LA TABLE game_scraper
UPDATE games_scraper
SET gameDate = STR_TO_DATE(
    REPLACE(
        REPLACE(
            REPLACE(
                REPLACE(
                    REPLACE(
                        REPLACE(
                            REPLACE(
                                REPLACE(
                                    REPLACE(
                                        REPLACE(
                                            REPLACE(
                                                REPLACE(
                                                    gameDate,
                                                    'janvier', 'January'
                                                ),
                                                'février', 'February'
                                            ),
                                            'mars', 'March'
                                        ),
                                        'avril', 'April'
                                    ),
                                    'mai', 'May'
                                ),
                                'juin', 'June'
                            ),
                            'juillet', 'July'
                        ),
                        'août', 'August'
                    ),
                    'septembre', 'September'
                ),
                'octobre', 'October'
            ),
            'novembre', 'November'
        ),
        'décembre', 'December'
    ),
    '%d %M %Y'
);



INSERT INTO league (league_logo, league_name) VALUES 
('lnbproa.png','LNB Pro A'),
('lnbprob.png','LNB Pro B'),
('espoirs.png','Espoir Pro B');

INSERT INTO season (start_date, end_date, season_name) VALUES
('2000-10-14','2001-06-30', 'Pro A'),
('2001-10-06','2002-06-22', 'Pro A'),
('2002-10-05','2003-06-28', 'Pro A'),
('2003-10-03','2004-06-11', 'Pro A'),
('2004-10-09','2005-06-12', 'Pro A'),
('2005-10-05','2006-06-18', 'Pro A'),
('2006-09-23','2007-06-02', 'Pro A'),
('2007-09-29','2008-06-15', 'Pro A'),
('2008-10-04','2009-06-20', 'Pro A'),
('2009-10-03','2010-05-11', 'Pro A'),
('2010-10-09','2011-06-12', 'Pro A'),
('2011-10-07','2012-06-16', 'Pro A'),
('2012-10-05','2013-06-08', 'Pro A'),
('2013-10-04','2014-06-10', 'Pro A'),
('2014-09-26','2015-06-30', 'Pro A'),
('2015-10-02','2016-06-14', 'Pro A'),
('2016-09-23','2017-06-30', 'Pro A'),
('2017-09-01','2018-06-30', 'Jeep Elite'),
('2018-09-21','2019-06-30', 'Jeep Elite'),
('2019-09-20','2020-06-30', 'Jeep Elite'),
('2020-09-26','2021-06-30', 'Jeep Elite'),
('2021-10-02','2022-05-13', 'Bet Clic'),
('2022-09-24','2023-05-16', 'Bet Clic'),
('2023-09-01','2024-06-30', 'Bet Clic');



-- CORRECTION DES NOMS DES LIGUES dans la table game_scraper
UPDATE games_scraper
SET championship = 'Espoir Pro B'
WHERE championship = 'LNB Espoir Elite B';
UPDATE games_scraper
SET championship = 'LNB Pro A'
WHERE championship = 'Pro A';
UPDATE games_scraper
SET championship = 1
WHERE championship = 'LNB Pro A';
UPDATE games_scraper
SET championship = 2
WHERE championship = 'LNB Pro B';
UPDATE games_scraper
SET championship = 3
WHERE championship = 'Espoir Pro B';

SELECT DISTINCT championship FROM games_scraper




--  GENERATION POUR LES MATCH TEAM HOME


-- DESACTIVER LA VERIFICATION DES CLE ETRNAGERE
-- permet de construire la table franchise_game par saison classé par saison
-- cette requete fait une opération en bouclant de 1 à 15 sur les identifiant des saisons
DELIMITER //
CREATE PROCEDURE insert_franchise_game_team_home()
BEGIN
    DECLARE current_season INT DEFAULT 1;
    DECLARE iterations INT DEFAULT 24;

    WHILE iterations > 0 DO
        INSERT INTO franchise_game (id_season, id_franchise, id_league, id_games)
        SELECT s.id AS `id_season`, teamIdHome AS 'id_franchise', championship AS 'id_league', gameId AS 'id_game' 
        FROM games_scraper gs
        JOIN season s ON gs.gameDate BETWEEN s.start_date AND s.end_date
        WHERE s.id = current_season
        ORDER BY s.id ASC;

        SET current_season = current_season + 1;
        SET iterations = iterations - 1;
    END WHILE;
END //
DELIMITER ;

-- Execution de la procédure
CALL insert_franchise_game_team_home();



-- permet de construire la table franchise_game par saison classé par saison
-- cette requete fait une opération en bouclant de 1 à 15 sur les identifiant des saison
DELIMITER //
CREATE PROCEDURE insert_franchise_game_team_visitor()
BEGIN
    DECLARE current_season INT DEFAULT 1;
    DECLARE iterations INT DEFAULT 24;

    WHILE iterations > 0 DO
        INSERT INTO franchise_game (id_season, id_franchise, id_league, id_games)
        SELECT s.id AS `id_season`, teamIdVisitor AS 'id_franchise', championship AS 'id_league', gameId AS 'id_game' 
        FROM games_scraper gs
        JOIN season s ON gs.gameDate BETWEEN s.start_date AND s.end_date
        WHERE s.id = current_season
        ORDER BY s.id ASC;

        SET current_season = current_season + 1;
        SET iterations = iterations - 1;
    END WHILE;
END //
DELIMITER ;

-- Execution de la procédure
CALL insert_franchise_game_team_visitor();



-- Mise à jours des idientifiant de la colonne teamId pour obtenir les id identique à la table franchise
UPDATE game_details gd
JOIN franchise f ON gd.team = f.franchise_name
SET gd.teamId = f.id;


-- Remplissage de la table player avec les données filtrées de la table game_details
-- 
INSERT INTO player (id, player_firstname, player_name, player_number)-- id_franchise)
SELECT
    DISTINCT playerId,
    SUBSTRING_INDEX(SUBSTRING_INDEX(player, ' ', -2), ' ', 1) AS prenom,
    SUBSTRING_INDEX(player, ' ', -1) AS NOM,
    GROUP_CONCAT(DISTINCT REGEXP_REPLACE(player, '[^0-9]', '')
    -- teamId
ORDER BY 
    REGEXP_REPLACE(player, '[^0-9]', '')) AS player_number_only
FROM
    game_details
GROUP BY
    playerId, prenom, NOM;


-- Aoute d'une photo par defaut dans toutes les ligne de player_photo
UPDATE player
SET player_photo = CONCAT("player-",player_firstname,player_name);


-- Renommer les noms de la colonne player_photo en enlevant la particule ".png"
-- UPDATE player
-- SET player_photo = REPLACE(player_photo, '.png', '');


-- Modifier le type de données des colonnes de DOUBLE(10,4) à INT ou DECIMAL (5,2)
ALTER TABLE game_details
MODIFY COLUMN min INT,
MODIFY COLUMN pts INT,
MODIFY COLUMN twoR INT,
MODIFY COLUMN twoT INT,
MODIFY COLUMN twoPerc DECIMAL (5,2),
MODIFY COLUMN threeR INT,
MODIFY COLUMN threeT INT,
MODIFY COLUMN threetPerc DECIMAL (5,2),
MODIFY COLUMN lr INT,
MODIFY COLUMN lt INT,
MODIFY COLUMN lPerc DECIMAL (5,2),
MODIFY COLUMN ro INT,
MODIFY COLUMN rt INT,
MODIFY COLUMN rd INT,
MODIFY COLUMN pd INT,
MODIFY COLUMN ct INT,
MODIFY COLUMN cs INT,
MODIFY COLUMN `in` INT,
MODIFY COLUMN bp INT,
MODIFY COLUMN fte INT,
MODIFY COLUMN fpr INT,
MODIFY COLUMN eval INT,
MODIFY COLUMN plusMinus INT;

INSERT INTO game_stats (gameId, playerId, id_franchise,
fiveD, `min`, pts, twoR, twoT, twoPerc, threeR, threeT, threetPerc, lr, lt, lPerc, ro, rt, rd, pd, ct, cs, `in`, bp, fte, fpr, eval, plusMinus)
SELECT gameId, playerId, teamId, fiveD,
    ROUND (`min`, 1) AS `min`,
    ROUND (pts, 1) AS pts,
    ROUND (twoR, 1) AS twoR,
    ROUND (twoT, 1) AS twoT,
    ROUND(twoPerc, 2) AS twoPerc,
    ROUND (threeR, 1) AS threeR,
    ROUND (threeT, 1) AS threeT,
	ROUND(threetPerc, 2)AS threetPerc,
    ROUND (lr,1) AS lr,
    ROUND (lt,1) AS lt,
	ROUND(lPerc, 2) AS lPerc,
    ROUND (ro,1) AS ro,
    ROUND (rt,1) AS rt,
    ROUND (rd,1) AS rd,
    ROUND (pd,1) AS pd,
    ROUND (ct,1) AS ct,
    ROUND (cs,1) AS cs,
    ROUND (`in`,1) AS `in`,
    ROUND (bp,1) AS bp,
    ROUND (fte,1) AS fte,
    ROUND (fpr,1) AS fpr,
    ROUND (eval,1) AS eval,
    ROUND (plusMinus,1) AS plusMinus FROM game_details ORDER BY gameId; 



-- ON COPIE CE DONT ON A BESOIN DANS LA TABLE 
INSERT INTO to_play (id_games, id_player, id_game_stats) 
SELECT gameId, playerId, id
FROM game_stats gs;


-- ON EFFACE LES 2 COLONNNES INNUTILE DE GAME STAT
ALTER TABLE game_stats 
DROP COLUMN playerId;

ALTER TABLE game_stats 
DROP COLUMN gameId;



INSERT INTO team_stats (gameId, playerId, id_franchise,
fiveD, `min`, pts, twoR, twoT, twoPerc, threeR, threeT, threetPerc, lr, lt, lPerc, ro, rt, rd, pd, ct, cs, `in`, bp, fte, fpr, eval, plusMinus)
SELECT gameId, playerId, teamId, fiveD,
    ROUND (`min`, 1) AS `min`,
    ROUND (pts, 1) AS pts,
    ROUND (twoR, 1) AS twoR,
    ROUND (twoT, 1) AS twoT,
    ROUND(twoPerc, 2) AS twoPerc,
    ROUND (threeR, 1) AS threeR,
    ROUND (threeT, 1) AS threeT,
	ROUND(threetPerc, 2)AS threetPerc,
    ROUND (lr,1) AS lr,
    ROUND (lt,1) AS lt,
	ROUND(lPerc, 2) AS lPerc,
    ROUND (ro,1) AS ro,
    ROUND (rt,1) AS rt,
    ROUND (rd,1) AS rd,
    ROUND (pd,1) AS pd,
    ROUND (ct,1) AS ct,
    ROUND (cs,1) AS cs,
    ROUND (`in`,1) AS `in`,
    ROUND (bp,1) AS bp,
    ROUND (fte,1) AS fte,
    ROUND (fpr,1) AS fpr,
    ROUND (eval,1) AS eval,
    ROUND (plusMinus,1) AS plusMinus 
    FROM game_details 
    WHERE player LIKE "%quipe";



-- ON COPIE CE DONT ON A BESOIN DANS LA TABLE 
INSERT INTO team_gamestats (id_games, id_team_stats) 
SELECT gameId, id
FROM team_stats ts;


-- ON EFFACE LES 2 COLONNNES INNUTILE DE GAME STAT
ALTER TABLE team_stats 
DROP COLUMN playerId;

ALTER TABLE team_stats 
DROP COLUMN gameId;


-- DROP TABLE IF EXISTS games_scraper, games_scraper_save, game_details, game_details_save;




DROP TABLE IF EXISTS game_stats2;


CREATE TABLE game_stats2 AS
SELECT * FROM game_stats;


DELIMITER //
CREATE PROCEDURE calcul_gmsc()
BEGIN
    DECLARE current_stat INT DEFAULT 1;
    DECLARE iterations INT DEFAULT 354760;

    WHILE iterations > 0 DO
UPDATE game_stats2
SET total = (
    SELECT
        pts + 0.4 * (twoR + threeR) - 0.7 * (twoT + threeT) - 0.4 * (lt - lr)
        + (0.7 * ro) + (0.3 * rd) + `in` + (0.7 * pd) + (0.7 * ct)
        - 0.4 * fte - bp AS total
    FROM
        game_stats gs
    WHERE
        gs.id = current_stat
)
WHERE
    id = current_stat;

        SET current_stat = current_stat + 1;
        SET iterations = iterations - 1;
    END WHILE;
END //
DELIMITER ;

-- Execution de la procédure
CALL calcul_gmsc();




UPDATE player
SET player_photo = REPLACE(player_photo, 'é', 'e')
WHERE player_photo LIKE "%é%";

UPDATE player
SET player_photo = REPLACE(player_photo, 'è', 'e')
WHERE player_photo LIKE "%è%";

UPDATE player
SET player_photo = REPLACE(player_photo, 'ê', 'e')
WHERE player_photo LIKE "%ê%";

UPDATE player
SET player_photo = REPLACE(player_photo, 'ô', 'o')
WHERE player_photo LIKE "%ô%";

UPDATE player
SET player_photo = REPLACE(player_photo, 'ë', 'e')
WHERE player_photo LIKE "%ë%";

---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------



-- Récupérer l'Id de chaque joueur en lien avec les matchs
-- leur prénom et nom, mais aussi les numéros sous lesquelles ils ont joué
SELECT
    playerId,
    SUBSTRING_INDEX(SUBSTRING_INDEX(player, ' ', -2), ' ', 1) AS prenom,
    SUBSTRING_INDEX(player, ' ', -1) AS NOM,
    GROUP_CONCAT(DISTINCT REGEXP_REPLACE(player, '[^0-9]', '') ORDER BY REGEXP_REPLACE(player, '[^0-9]', '')) AS player_number_only
FROM
    game_details
GROUP BY
    playerId, prenom, NOM;


-- Visualisation de la table game_details nettoyée
SELECT gameId, playerId, 
SUBSTRING_INDEX(SUBSTRING_INDEX(player, ' ', -2), ' ', 1) AS prenom,
 SUBSTRING_INDEX(player, ' ', -1) AS NOM,
  REGEXP_REPLACE(player, '[^0-9]', '') AS player_number_only,
   team, teamId,fiveD,
    ROUND (min, 1) AS min,
    ROUND (pts, 1) AS pts,
    ROUND (twoR, 1) AS twoR,
    ROUND (twoT, 1) AS twoT,

    CAST(ROUND(twoPerc, 2) AS DECIMAL(4,2)) AS twoPerc,
CAST(ROUND(threetPerc, 2) AS DECIMAL(4,2)) AS threetPerc,
CAST(ROUND(lPerc, 2) AS DECIMAL(4,2)) AS lPerc,

    -- ROUND (twoPerc, 2) AS twoPerc,
    ROUND (threeR, 1) AS threeR,
    ROUND (threeT, 1) AS threeT,
    -- ROUND (threetPerc, 2) AS threetPerc,
    ROUND (lr,1) AS lr,
    ROUND (lt,1) AS lt,
    -- ROUND (lPerc, 2) AS lPerc,
    ROUND (ro,1) AS ro,
    ROUND (rt,1) AS rt,
    ROUND (rd,1) AS rd,
    ROUND (pd,1) AS pd,
    ROUND (ct,1) AS ct,
    ROUND (cs,1) AS cs,
    ROUND (`in`,1) AS `in`,
    ROUND (bp,1) AS bp,
    ROUND (fte,1) AS fte,
    ROUND (fpr,1) AS fpr,
    ROUND (eval,1) AS eval,
    ROUND (plusMinus,1) AS plusMinus FROM game_details ORDER BY gameId; 


-- Permet d'afficher toutes lignes qui ont 3 fois le même identifiant de match (gameId)
SELECT * FROM games_scraper_save gss 
WHERE gameId 
IN ( SELECT gameId 
    FROM games_scraper_save 
    GROUP BY gameId 
    HAVING COUNT(*) = 3 ) 
    ORDER BY gss.gameId ASC; 


