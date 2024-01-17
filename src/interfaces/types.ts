export type NavigationDataType = {
    [key: string]: {
        icon: string;
        name: string;
        path: string;
    };
}
export type NavbarDataType = {
    [key: string]: {
        icon: string;
        name: string;
        path: string;
    };
}

export type TeamDataType = {

        id_franchise: number;
        id_league: number;
        franchise_name: string;
        franchise_logo: string;
        league_logo: string;
  
}
export type MatchDataType = {
        id_games: number;
        league_name: string;
        league_logo: string;
        id_franchises: string; 
        franchise_names: string; 
        franchise_logos: string; 
        teamHomeScores: string;
        teamVisitorScores: string;     
        game_days: string;
        game_dates: string;
   
};

export type PlayerDataType = {
    id_franchise: number;
    id_games: number;
    id_player: number;
    last_game_date: string;
    player_birthdate: string; 
    player_firstname: string;
    player_height: number; 
    player_name: string;
    player_photo: string;
    player_weight: number;
    franchise_logo: string;
};
