-- DUPLIQUER LES NOUVELLES TABLES SCRAPPEES ET LEUR DONNER UN NOUVEAU NOM AVEC UN PREFIXE scrap_<nouveau nom>
CREATE TABLE scrap__games LIKE games;
INSERT INTO scrap__games SELECT * FROM games;
CREATE TABLE scrap__players LIKE game_details;
INSERT INTO scrap__players SELECT * FROM game_details;



-- DANS LA TABLE  scrap__games, CONVERTIR gameDate au format DATE()
UPDATE scrap__games 
SET gameDate = STR_TO_DATE(gameDate, '%d %M %Y')

