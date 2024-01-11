DROP TABLE franchise, league, season, games, player, stats, franchise_game;

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
   game_location VARCHAR(50),
   game_date DATE,
   trainerHome VARCHAR(50),
   teamHome VARCHAR(50),
   teamHomeScore TINYINT,
   trainerVisitor VARCHAR(50),
   teamVisitor VARCHAR(50),
   teamVisitorScore TINYINT,
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


INSERT INTO franchise (franchise_name, franchise_logo, franchise_city)
SELECT DISTINCT
  teamHome,
  CONCAT(
    'item-',
    LOWER(
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
                      teamHome,
                      '/',
                      ''
                    ),
                    '-',
                    ''
                  ),
                  ' ',
                  ''
                ),
                'à', 'a'
              ),
              'ê', 'e'
            ),
            'é', 'e'
          ),
          'è', 'e'
        ),
        'â', 'a'
      ),
      'ô','o'
      ),
      'ç','c'
      )
    ),'.png'
  ) AS logo,
  teamHome AS Ville
FROM
  games_scrap
ORDER BY
  teamHome ASC;
