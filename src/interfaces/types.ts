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
    [key: string]: {
        id_franchise: number;
        franchise_name: string;
        franchise_logo: string;
        franchise_city: string;
    };
}
export type MatchDataType = {
    [key: string]: {
        id_games: number;
        game_day: string;
        game_location: string;
        game_date: string;
        trainerHome: string;
        teamHome: string;
        teamHomeScore: number;
        trainerVisitor: string;
        teamVisitor: string;
        teamVisitorScore: number;
    };
}
