-- 
-- LISTE DE TOUS LES CLUBS QUI EXISTENT TOUTES SAISONS ET LIGUES CONFONDUES CLASSE PAR ORDRE ALPHABETIQUE
--
SELECT DISTINCT
    f.id AS franchise_id,
    l.id AS league_id,
    f.franchise_name,
    f.franchise_logo,
    l.league_logo
FROM
    franchise f
JOIN franchise_game fg ON f.id = fg.id_franchise
JOIN league l ON fg.id_league = l.id
ORDER BY franchise_id ASC;

-- 
-- LISTE DE TOUS LES CLUBS QUI EXISTENT PAR SAISON
--
SELECT fg.id_season, 
fg.id_franchise AS franchise_id, 
fg.id_league AS league_id, 
f.franchise_name,
franchise_logo,
l.league_logo 
FROM franchise_game fg 
JOIN franchise f ON fg.id_franchise = f.id
JOIN league l ON fg.id_league = l.id
WHERE fg.id_season = 13 
GROUP BY fg.id_franchise, f.franchise_name,fg.id_league 
ORDER BY fg.id_franchise ASC;


--
-- LISTE DES X DERNIERS MATCHS
-- 
-- SELECT
--     fg.id_games,
--     l.league_name,
--     l.league_logo,
--     GROUP_CONCAT(DISTINCT fg.id_franchise) AS id_franchises,
--     GROUP_CONCAT(DISTINCT f.franchise_name) AS franchise_names,
--     GROUP_CONCAT(DISTINCT f.franchise_logo) AS franchise_logos,
--     GROUP_CONCAT(DISTINCT g.teamHomeScore) AS teamHomeScores,
--     GROUP_CONCAT(DISTINCT g.teamVisitorScore) AS teamVisitorScores,
--     GROUP_CONCAT(DISTINCT g.game_day) AS game_days,
--     GROUP_CONCAT(DISTINCT g.game_date) AS game_dates
-- FROM
--     franchise_game fg
-- JOIN
--     franchise f ON fg.id_franchise = f.id
-- JOIN
--     games g ON g.id = fg.id_games
-- JOIN
--     league l ON fg.id_league = l.id

-- GROUP BY
--     fg.id_games, l.league_name, l.league_logo
-- ORDER BY g.game_date DESC LIMIT 50

SELECT DISTINCT
    g.id AS 'ig_games',
    g.game_date AS 'game_date',
    g.game_day AS 'game_day',
    l.league_logo AS 'league_logo',
    g.teamIdHome AS 'home_franchise_id',
    f_home.franchise_name AS 'home_franchise_name',
    f_home.franchise_logo AS 'home_franchise_logo',
    g.teamHomeScore AS 'home_score',
    g.teamIdVisitor AS 'visitor_franchise_id',
    f_visitor.franchise_name AS 'visitor_franchise_name',
    f_visitor.franchise_logo AS 'visitor_franchise_logo',
    g.teamVisitorScore AS 'visitor_score'
FROM
    games g
JOIN
    franchise f_home ON g.teamIdHome = f_home.id
JOIN
    franchise f_visitor ON g.teamIdVisitor = f_visitor.id
JOIN
	franchise_game fg ON fg.id_games = g.id 
JOIN
    league l ON fg.id_league = l.id
ORDER BY
    game_date DESC LIMIT 50;



--
-- LISTE DE TOUS LES MATCHS FILTREE PAR id DE SAISONS
--
SELECT
    fg.id_games,
    l.league_name,
    l.league_logo,
    GROUP_CONCAT(DISTINCT fg.id_franchise) AS id_franchises,
    GROUP_CONCAT(DISTINCT f.franchise_name) AS franchise_names,
    GROUP_CONCAT(DISTINCT f.franchise_logo) AS franchise_logos,
    GROUP_CONCAT(DISTINCT g.teamHomeScore) AS teamHomeScores,
    GROUP_CONCAT(DISTINCT g.teamVisitorScore) AS teamVisitorScores,
    GROUP_CONCAT(DISTINCT g.game_day) AS game_days,
    GROUP_CONCAT(DISTINCT g.game_date) AS game_dates
FROM
    franchise_game fg
JOIN
    franchise f ON fg.id_franchise = f.id
JOIN
    games g ON g.id = fg.id_games
JOIN
    league l ON fg.id_league = l.id
JOIN
    season s ON g.game_date BETWEEN s.start_date AND s.end_date 
WHERE
    s.id = 23 
GROUP BY
    g.game_date, fg.id_games, l.league_name, l.league_logo
ORDER BY
    g.game_date DESC;


--
-- LISTE DE TOUS LES JOUEURS FILTREE PAR id DE SAISONS 
--

SELECT tp.id_games, p.id AS `ID joueur`, p.player_firstname, p.player_name
FROM to_play tp 
JOIN player p ON tp.id_player = p.id 
WHERE tp.id_games IN ( 
    SELECT fg.id_games 
    FROM franchise_game fg 
    WHERE fg.id_season = 13 ) 
    GROUP BY tp.id_games, p.id
    ORDER BY `tp`.`id_games` ASC 




--
-- LISTE DE TOUS LES JOUEUR FILTREE PAR id DE SAISONS AVEC LA DATE DE LEUR DERNIER MATCH JOUEE
--

SELECT p.id AS 'id_player',
    MAX(tp.id_games) AS id_games,
    MAX(p.player_firstname) AS player_firstname,
    MAX(p.player_name) AS player_name,
    p.player_birthdate,
    p.player_weight,
    p.player_height,
    p.player_photo,
    MAX(g.game_date) AS last_game_date,
    gs.id_franchise,
    f.franchise_logo
    FROM to_play tp 
    JOIN player p ON tp.id_player = p.id 
    JOIN games g ON tp.id_games = g.id 
    JOIN game_stats gs ON tp.id_game_stats = gs.id 
    JOIN franchise f ON gs.id_franchise = f.id
    WHERE tp.id_games IN ( 
        SELECT fg.id_games 
        FROM franchise_game fg 
        WHERE fg.id_season = 13 ) 
        GROUP BY p.id, gs.id_franchise 
        ORDER BY 'player_name' ASC




















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




-- Tous les matchs par saison ?
SELECT game_date, game_day, gs.id, teamIdHome, teamIdVisitor
FROM games gs 
JOIN season s ON gs.game_date BETWEEN s.start_date AND s.end_date 
WHERE s.id = 1 ORDER BY game_date DESC; 

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
