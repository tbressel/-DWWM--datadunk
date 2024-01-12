DROP TABLE franchise, league, season, games, player, stats, franchise_game, games_scraper, game_details;

-- Penser à nommer les autoincrement de chaque table avec simplelnt 'id' pour les clé primaire et 'id_nomDeLaTable' pour les clé étrangère


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



----------------------------------------------------------------------------------------------------------
-------------------------------DUPLIQUER UNE TABLE PAR MESURE DE SECURITE --------------------------------
----------------------------------------------------------------------------------------------------------
CREATE TABLE games_scraper_sav AS
SELECT * FROM games_scraper;

---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------
--------------------------------      ( VERSION 1 )    --------------------------------------
---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------
---------------------GENERATION AUTOMATIQUE DES NOMS DE FICHIERS  ---------------------------
---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------

-- L'idée est d'aller chercher dans la table games_scraper toutes les équipe de cette table qui ont joué à domicile (teamHome)
-- puis de les insérer dans 3 champ différent dont un particulier qui sera le nom du fichier de l'image de la franchise
-- il doit être construit (CONCAT)sur ce modèle : la chaine 'team-' + <le nom de la franchise> + la chaine '.png'
-- LOWER pour mettre en minuscule
-- REPLACE pour remplacer les caractères spéciaux
-- Remplacement également du nom 'espoirs' par une chaine vide car chaque équipe (Pro A, Pro B et Espoirs) appartient à une seule et même franchise

INSERT INTO franchise (franchise_name, franchise_logo, franchise_city)
SELECT DISTINCT
  teamHome,
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
                                                  teamHome, ' ', ''),
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
          'espoirs',''
      )
  ), '.png') AS logo,
  teamHome AS Ville
FROM
  games_scraper
ORDER BY
  teamHome ASC;



---------------------------------------------------------------------------------------------
--------------------------------      ( VERSION 2 )   VERSION CHOISIT  ----------------------
---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------
---------------------GENERATION AUTOMATIQUE DES NOMS DE FICHIERS  ---------------------------
--------REMPLISSAGE DE LA TABLE franchise avec les teamName Home et Visitors combiné---------
---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------

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




---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------
-----------------COPIE DES INFOS DE LA TABLE game_scraper VERS LA TABLE games  -------------
---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------

INSERT INTO games (game_date, game_day, game_location, teamIdHome, teamHomeScore, teamIdVisitor, teamVisitorScore, trainerHome, trainerVisitor)
                   SELECT gameDate, gameDay, gameLocation, teamIdHome, teamHomeScore, teamIdVisitor, teamVisitorScore, trainerHome, trainerVisitor
                   FROM games_scraper



ALTER TABLE games_scraper
DROP COLUMN gameId;

-------------------------------------------------------------------
-------------------------------------------------------------------
-----------------NETTOYAGE DE LA TABLE game_scraper   -------------
-------------------------------------------------------------------
-------------------------------------------------------------------

-- 1ere étape :
-- Récupérer tous les id d'une équipe de game_scraper en recherchant par le nom de la franchise, récupéré dans la table franchise
SELECT teamIdHome, teamHome, f.id_franchise
FROM games_scraper
JOIN franchise f ON teamHome = f.franchise_name
WHERE teamHome IN ('Angers');

-- 2ème étape :
-- modifier tous les id des teamHome dans games_scraper en fonction des nom identique de la table franchise
UPDATE games_scraper 
JOIN franchise f ON teamHome = f.franchise_name
SET teamIdHome = f.id_franchise;


-- 3ème étape :
-- modifier tous les id des teamVisitor dans games_scraper en fonction des nom identique de la table franchise
UPDATE games_scraper 
JOIN franchise f ON teamVisitor = f.franchise_name
SET teamIdVisitor = f.id_franchise;



-------------------------------------------------------------------
-------------------------------------------------------------------
--------CONVERTION DES DATES DE LA TABLE game_scraper   -----------
-------------------------------------------------------------------
-------------------------------------------------------------------

-- Vérifier de l'on ne recupère que l'année de chaque date
SELECT SUBSTR(gameDate, -4) AS years
FROM games_scraper
ORDER BY years ASC;


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



-- Mettre à jour la colonne pour conserver tous les chiffres
UPDATE games_scraper
SET gameDay = REPLACE(REPLACE(REPLACE(gameDay, 'ère', ''), 'ème', ''), 'journée', '')



-- Ajouter la clé étrangère
ALTER TABLE games
ADD CONSTRAINT fk_teamIdHome FOREIGN KEY (teamIdHome)
REFERENCES franchise(id_franchise);
-- Ajouter la clé étrangère
ALTER TABLE games
ADD CONSTRAINT fk_teamIdVisitor FOREIGN KEY (teamIdVisitor)
REFERENCES franchise(id_franchise);




INSERT INTO league (league_logo, league_name) VALUE 
('lnbproa.png','LNB Pro A'),
('lnbprob.png','LNB Pro B'),
('espoirs.png','Espoir Pro B');

INSERT INTO season (start_date, end_date, season_name) VALUE
('2015-10-02','2016-06-14', 'Pro A'),
('2016-09-23','2017-06-01', 'Pro A'),
('2017-09-01','2018-06-01', 'Jeep Elite'),
('2018-09-21','2019-06-01', 'Jeep Elite'),
('2019-09-20','2020-06-01', 'Jeep Elite'),
('2020-09-26','2021-06-01', 'Jeep Elite'),
('2021-10-02','2022-05-13', 'Bet Clic'),
('2022-09-24','2023-05-16', 'Bet Clic')




-- Combien y'a il eu de match par saison ?
SELECT game_date, game_day, id_games, teamIdHome, teamIdVisitor
FROM games gs 
JOIN season s ON gs.game_date BETWEEN s.start_date AND s.end_date 
WHERE s.id_season = 1 ORDER BY game_date DESC; 



-- permet de construire la table franchise_game par saison

INSERT INTO franchise_game (id_season, id_franchise, id_league, id_games)

SELECT id_season, teamIdHome AS 'id_franchise', championship AS 'id_league', id AS 'id_game' 
FROM games_scraper gs 
JOIN season s ON gs.gameDate BETWEEN s.start_date AND s.end_date 
WHERE s.id_season = 1 ORDER BY gameDate DESC; 



UPDATE games_scraper
SET championship = 'Espoir Pro B'
WHERE championship = 'LNB Espoir Elite B';



UPDATE games_scraper
SET championship = 1
WHERE championship = 'LNB Pro A';