-- EFFACER LES TABLES DE RECEPTION DES DONNEES
DROP TABLE IF EXISTS franchise, franchise_game, games, games_scraper, league, player, season, stats;
DROP PROCEDURE IF EXISTS insert_franchise_game_team_visitor;
DROP PROCEDURE IF EXISTS insert_franchise_game_team_home;


-- RENOMMER UNE TABLE SI BESOIN 
-- RENAME TABLE old_name TO new_name;


-- DUPLIQUER UNE TABLE
CREATE TABLE games_scraper AS
SELECT * FROM games_scraper_save;


-- CREATION DES TABLES
CREATE TABLE franchise(
   id_franchise INT AUTO_INCREMENT,
   franchise_name VARCHAR(50),
   franchise_logo VARCHAR(50),
   franchise_city VARCHAR(50),
   PRIMARY KEY(id_franchise)
);

CREATE TABLE league(
   id_league INT AUTO_INCREMENT,
   league_name VARCHAR(20),
   league_logo VARCHAR(50),
   PRIMARY KEY(id_league)
);

CREATE TABLE season(
   id_season INT AUTO_INCREMENT,
   start_date DATE,
   end_date DATE,
   season_name VARCHAR(50),
   PRIMARY KEY(id_season)
);

CREATE TABLE games(
   id_games INT AUTO_INCREMENT,
   game_day VARCHAR(50),
   game_location VARCHAR(255),
   game_date VARCHAR(50),
   trainerHome VARCHAR(50),
   teamIdHome INT,
   teamHomeScore INT,
   trainerVisitor VARCHAR(50),
   teamIdVisitor INT,
   teamVisitorScore INT,
   PRIMARY KEY(id_games)
);

CREATE TABLE player(
   id_player INT AUTO_INCREMENT,
   player_firstname VARCHAR(50),
   player_name VARCHAR(50),
   player_number TINYINT,
   PRIMARY KEY(id_player)
);

CREATE TABLE stats(
   id_stats INT AUTO_INCREMENT,
   fiveD BOOLEAN,
   ct TINYINT,
   in_ TINYINT,
   pts TINYINT,
   threeR TINYINT,
   Ir TINYINT,
   It TINYINT,
   cs TINYINT,
   threetPerc DECIMAL(3,1),
   threeT TINYINT,
   twoT TINYINT,
   twoR TINYINT,
   twoPerc DECIMAL(3,1),
   IPerc TINYINT,
   ro TINYINT,
   rt TINYINT,
   rd TINYINT,
   pd TINYINT,
   bp TINYINT,
   fte TINYINT,
   fpr TINYINT,
   eval TINYINT,
   plusMinus TINYINT,
   id_games INT NOT NULL,
   id_player INT NOT NULL,
   PRIMARY KEY(id_stats),
   FOREIGN KEY(id_games) REFERENCES games(id_games),
   FOREIGN KEY(id_player) REFERENCES player(id_player)
);

CREATE TABLE franchise_game(
   id_franchise INT,
   id_league INT,
   id_season INT,
   id_games INT,
   PRIMARY KEY(id_franchise, id_league, id_season, id_games),
   FOREIGN KEY(id_franchise) REFERENCES franchise(id_franchise),
   FOREIGN KEY(id_league) REFERENCES league(id_league),
   FOREIGN KEY(id_season) REFERENCES season(id_season),
   FOREIGN KEY(id_games) REFERENCES games(id_games)
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
SET teamIdHome = f.id_franchise;


-- modifier tous les id des teamVisitor dans games_scraper en fonction des nom identique de la table franchise
UPDATE games_scraper 
JOIN franchise f ON teamVisitor = f.franchise_name
SET teamIdVisitor = f.id_franchise;


-- COPIE DES DONNEES DE LA TABLE game_scraper VERS LA TABLE games  
INSERT INTO games (game_date, game_day, game_location, teamIdHome, teamHomeScore, teamIdVisitor, teamVisitorScore, trainerHome, trainerVisitor)
                   SELECT gameDate,
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





INSERT INTO league (league_logo, league_name) VALUE 
('lnbproa.png','LNB Pro A'),
('lnbprob.png','LNB Pro B'),
('espoirs.png','Espoir Pro B');

INSERT INTO season (start_date, end_date, season_name) VALUE
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
('2022-09-24','2023-05-16', 'Bet Clic');



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

-- permet de construire la table franchise_game par saison classé par saison
-- cette requete fait une opération en bouclant de 1 à 15 sur les identifiant des saisons
DELIMITER //
CREATE PROCEDURE insert_franchise_game_team_home()
BEGIN
    DECLARE current_season INT DEFAULT 1;
    DECLARE iterations INT DEFAULT 23;

    WHILE iterations > 0 DO
        INSERT INTO franchise_game (id_season, id_franchise, id_league, id_games)
        SELECT id_season, teamIdHome AS 'id_franchise', championship AS 'id_league', id AS 'id_game' 
        FROM games_scraper gs
        JOIN season s ON gs.gameDate BETWEEN s.start_date AND s.end_date
        WHERE s.id_season = current_season
        ORDER BY id_season ASC;

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
    DECLARE iterations INT DEFAULT 23;

    WHILE iterations > 0 DO
        INSERT INTO franchise_game (id_season, id_franchise, id_league, id_games)
        SELECT id_season, teamIdVisitor AS 'id_franchise', championship AS 'id_league', id AS 'id_game' 
        FROM games_scraper gs
        JOIN season s ON gs.gameDate BETWEEN s.start_date AND s.end_date
        WHERE s.id_season = current_season
        ORDER BY id_season ASC;

        SET current_season = current_season + 1;
        SET iterations = iterations - 1;
    END WHILE;
END //
DELIMITER ;

-- Execution de la procédure
CALL insert_franchise_game_team_visitor();





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




---------------------------------------------------------------------
------------ OPERATION DE VISUALISATION DANS GAME SCRAPER------------
---------------------------------------------------------------------

-- Équipes présentes dans teamHome mais pas dans teamVisitor :
SELECT DISTINCT teamHome
FROM games_scraper
WHERE teamHome NOT IN (SELECT DISTINCT teamVisitor FROM games_scraper);

-- Équipes présentes dans teamVisitor mais pas dans teamHome :
SELECT DISTINCT teamVisitor
FROM games_scraper
WHERE teamVisitor NOT IN (SELECT DISTINCT teamHome FROM games_scraper);

-- Equipe teamHome et teamVisitor :
SELECT teamName
FROM (
    SELECT DISTINCT teamHome AS teamName FROM games_scraper
    UNION
    SELECT DISTINCT teamVisitor AS teamName FROM games_scraper
) AS teams
ORDER BY teamName ASC;

-- Equipe teamHome et teamVisitor (en supprimant "Espoirs" dans lme nom de l'équipe)):
SELECT DISTINCT REPLACE(teamName, 'Espoirs', '') AS teamName
FROM (
    SELECT DISTINCT teamHome AS teamName FROM games_scraper
    UNION
    SELECT DISTINCT teamVisitor AS teamName FROM games_scraper
) AS teams
ORDER BY teamName ASC;


-- Récupérer tous les id d'une équipe de game_scraper en recherchant par le nom de la franchise, récupéré dans la table franchise
SELECT teamIdHome, teamHome, f.id_franchise
FROM games_scraper
JOIN franchise f ON teamHome = f.franchise_name
WHERE teamHome IN ('Angers');


-- Récupèrer l'année de chaque date
SELECT SUBSTR(gameDate, -4) AS years
FROM games_scraper
ORDER BY years ASC;



-- Ajouter la clé étrangère
ALTER TABLE games
ADD CONSTRAINT fk_teamIdHome FOREIGN KEY (teamIdHome)
REFERENCES franchise(id_franchise);

-- Ajouter la clé étrangère
ALTER TABLE games
ADD CONSTRAINT fk_teamIdVisitor FOREIGN KEY (teamIdVisitor)
REFERENCES franchise(id_franchise);


-- Tous les matchs par saison ?
SELECT game_date, game_day, id_games, teamIdHome, teamIdVisitor
FROM games gs 
JOIN season s ON gs.game_date BETWEEN s.start_date AND s.end_date 
WHERE s.id_season = 1 ORDER BY game_date DESC; 

-- Combien de  matchs pour une saison ?
SELECT COUNT(id_games)
FROM games gs 
JOIN season s ON gs.game_date BETWEEN s.start_date AND s.end_date 
WHERE s.id_season = 1 ORDER BY game_date DESC; 



-- Récupération de toutes les inforamtions concernant l'affichage d'un match en particulier
SELECT fg.id_games AS 'ID', l.league_name, l.league_logo, fg.id_franchise AS 'Club ID', f.franchise_name, f.franchise_logo, g.teamHomeScore, g.teamVisitorScore, g.game_day, g.game_date
FROM franchise_game fg
JOIN franchise f ON fg.id_franchise = f.id_franchise
JOIN games g ON g.id_games = fg.id_games
JOIN league l ON fg.id_league = l.id_league
WHERE fg.id_games = 1
ORDER BY g.game_date DESC LIMIT 10;



-- Recupération de tous les matchs
SELECT
    fg.id_games AS 'id_games',
    l.league_name,
    l.league_logo,
    GROUP_CONCAT(DISTINCT fg.id_franchise) AS 'id_franchise',
    GROUP_CONCAT(DISTINCT f.franchise_name) AS 'franchise_names',
    GROUP_CONCAT(DISTINCT f.franchise_logo) AS 'franchise_logos',
    GROUP_CONCAT(DISTINCT g.teamHomeScore) AS 'teamHomeScores',
    GROUP_CONCAT(DISTINCT g.teamVisitorScore) AS 'teamVisitorScores',
    GROUP_CONCAT(DISTINCT g.game_day) AS 'game_days',
    GROUP_CONCAT(DISTINCT g.game_date) AS 'game_dates'
FROM
    franchise_game fg
JOIN
    franchise f ON fg.id_franchise = f.id_franchise
JOIN
    games g ON g.id_games = fg.id_games
JOIN
    league l ON fg.id_league = l.id_league

GROUP BY
    fg.id_games, l.league_name, l.league_logo
ORDER BY g.game_date DESC LIMIT 50