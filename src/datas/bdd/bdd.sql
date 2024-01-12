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
    fg.id_games AS 'ID',
    l.league_name,
    l.league_logo,
    GROUP_CONCAT(DISTINCT fg.id_franchise) AS 'Club ID',
    GROUP_CONCAT(DISTINCT f.franchise_name) AS franchise_names,
    GROUP_CONCAT(DISTINCT f.franchise_logo) AS franchise_logos,
    GROUP_CONCAT(DISTINCT g.teamHomeScore) AS teamHomeScores,
    GROUP_CONCAT(DISTINCT g.teamVisitorScore) AS teamVisitorScores,
    GROUP_CONCAT(DISTINCT g.game_day) AS game_days,
    GROUP_CONCAT(DISTINCT g.game_date) AS game_dates
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
