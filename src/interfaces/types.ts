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
        season_id: number;
        franchise_id: number;
        league_id: number;
        franchise_name: string;
        franchise_logo: string;
        league_logo: string;
  
}
export type MatchDataType = {
        id_games: number;
        game_date: string;
        game_day: string;
        league_logo: string;
        home_franchise_id: number;
        home_franchise_name: string;
        home_franchise_logo: string;
        home_score: number;
        visitor_franchise_id: number;
        visitor_franchise_name: string;
        visitor_franchise_logo: string;
        visitor_score: number;
   
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
