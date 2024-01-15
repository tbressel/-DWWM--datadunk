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

