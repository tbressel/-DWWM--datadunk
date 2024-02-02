export type NavigationDataType = {
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
export interface FormuleDataType {
  player: number[];
  id_player: number;
  pts: number;
  twoT: number;
  twoR: number;
  threeT: number;
  threeR: number;
  lt: number;
  lr: number;
  ro: number;
  rd: number;
  in: number;
  pd: number;
  ct: number;
  fte: number;
  bp: number;
}

export interface UserDataType {
  action:string;
  message: string;
  id: number;
  firstname: string;
  lastname: string;
  pseudo: string;
  email: string;
  status: number;
  status_name: string;
  avatar: string;
}
export interface UsersListDataType {
  id: number;
  user_firstname: string;
  user_lastname: string;
  user_pseudo: string;
  user_email: string;
  user_role: number;
  user_role_name: string;
  user_avatar: string;
}
export interface NotificationDataType {
  action:string
  message: string;

}

export interface SeasonsListDataType {
  id: number;
  season_field: string;
}


export interface MatchSummaryDataType {
 
  id : number;
  id_franchise : number;
  fiveD : number;
  min: number;
  pts: number;
  twoR: number;
  twoT: number;
  twoPerc: number;
  threeR: number;
  threeT: number;
  threetPerc: number;
  lr: number;
  lt: number;
  lPerc: number;
  ro: number;
  rt: number;
  rd: number;
  pd: number;
  ct: number;
  cs: number;
  in: number;
  bp: number;
  fte: number;
  fpr: number;
  eval: number;
  plusMinus: number;

}