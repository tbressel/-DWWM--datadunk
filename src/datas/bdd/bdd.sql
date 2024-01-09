DROP DATABASE IF EXISTS `datadunk`;

CREATE DATABASE `datadunk`;


CREATE TABLE team(
   id_team INT AUTO_INCREMENT,
   team_clubname VARCHAR(50),
   team_nickname VARCHAR(50),
   team_city VARCHAR(50),
   team_picture VARCHAR(50),
   team_league VARCHAR(50),
   team_competition VARCHAR(50),
   PRIMARY KEY(id_team)
);


INSERT INTO team (team_clubname, team_nickname, team_city, team_picture, team_league, team_competition) VALUES
('Etoile Angers Basket', 'EAB', 'Angers', 'team-angers.png', 'Pro B', 'France'),
('AMSB Basket', 'AMSB', 'AMSB', 'team-amsb.png', 'Pro B', 'France'),
('antibes Basket', 'antibes', 'antibes', 'team-antibes.png', 'Pro B', 'France'),
('Lille Métropole Basket', 'RED GIANTS', 'Lille', 'team-lille.png', 'Pro B', 'France'),
('Rouen Métropole SPO Basket', 'SPO', 'Rouen', 'team-rouen.png', 'Pro B', 'France'),
('Blois Basket', 'AUCUN', 'blois', 'team-blois.png', 'Pro B', 'France'),
('Bourg Basket', 'AUCUN', 'bourg', 'team-bourg.png', 'Pro B', 'France'),
('evreux Basket', 'AUCUN', 'evreux', 'team-evreux.png', 'Pro B', 'France'),
('chalon Basket', 'AUCUN', 'chalon', 'team-chalon.png', 'Pro B', 'France'),
('nancy Basket', 'AUCUN', 'nancy', 'team-nancy.png', 'Pro B', 'France'),
('paris Basket', 'AUCUN', 'paris', 'team-paris.png', 'Pro B', 'France'),
('nantes Basket', 'AUCUN', 'nantes', 'team-nantes.png', 'Pro B', 'France');

