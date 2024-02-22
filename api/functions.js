////////////////////////////////////////////////////////
///////////////////////  Poss  /////////////////////////
////////////////////////////////////////////////////////


// ORtg
function Ortg (pProd, poss) {
    return (100 * pProd / poss);
}

//PPROD 
function pProd (fgPart, astPart, ftPart, TMOreb, tmOreb_Weight, TMPlay100, tmTcPoss, Oreb) {
    return ((fgPart + astPart + ftPart) * (1 - TMOreb * tmOreb_Weight * TMPlay100 / tmTcPoss) + (Oreb * tmOreb_Weight * TMPlay100));
}
// Poss
function poss (missedFg_Part, missedFt_Part, TOV, scPoss) {
    return (scPoss + missedFg_Part +  missedFt_Part + TOV);
}


//TM Poss%
function tmPoss () {
    return (poss / tmPoss);
}

//ScPoss
function scPoss (fg_Part, ast_Part, ft_Part, TMOreb, tmOreb_Weight, TMPlay100, TMscPoss, Oreb) {
    return ((fg_Part + ast_Part + ft_Part) * (1 - TMOreb * tmOreb_Weight * TMPlay100 / TMscPoss) + (Oreb * tmOreb_Weight * TMPlay100));
}


// TMOREB_Weigh
function tmOreb_Weight (TMOr, TMPlay100) {
    return (((1 - TMOr) * TMPlay100) / ((1 - TMOr) * TMPlay100 + TMOr * (1 - TMPlay100)));
}

//TMORPerc
function tmOrPerc (TMOreb, DTMDreb) {
    return (TMOreb / (TMOreb + DTMDreb));
}

// ORPart 
function orPart (Oreb, TMOreb_weight, TMPlay100, TMpts, TMfgm, ft, fta) {
    return ((Oreb * TMOreb_weight * TMPlay100 * TMpts) / (TMfgm + (0.8 * ft * fta) - (0.4 * ft * ft * fta)));
}

// AstPart
function astPart (TMfgm, fgm, TMfg3pm, fg3pm, TMpts, TMftm, pts, ftm, ast, TMfga, fga) {
    return (((TMfgm - fgm + (0.5 * TMfg3pm) - (0.5 * fg3pm)) / (TMfgm - fgm)) * ((TMpts - TMftm - pts + ftm) / (TMfga - fga)) * 0.5 * ast);
}

// Ast_Part
function ast_Part (TMpts, TMftm, pts, ftm, ast, TMfga, fga) {
    return ((((TMpts - TMftm) - (pts - ftm)) * ast) / (4 * (TMfga - fga)));
}
//qDouze
function qDouze (TMast, ast, TMfgm, fgm, min, TMmin) {
    return (((TMast * min * 5 / TMmin) - ast) / ((TMfgm * min * 5 / TMmin) - fgm));
}
// qCinq
function qCinq (TMast, ast, TMfgm) {
    return (1.14 * (TMast - ast) / TMfgm);
}
// qAST
function qAst (min, TMmin, qCinq, qDouze) {
    return (((min / (TMmin / 5)) * qCinq) + (( 1 - (min / (TMmin / 5)) * qDouze)));
}
// FTPart
function ftPart (ftm) {
    return ftm;
}
// FT_Part 
function ft_Part (ft, fta) {
    return ((2 * ft) - ft^2) * 0.4 * fta;
}
// FGPart
function fgPart (fgm, fg3pm, pts, ftm, qAst, fga ) {
    return ((2 * fgm) + fg3pm) * (1 - ((pts - ftm) * qAst) / (4 * fga));
}
// FG_Part
function fg_Part (fgm, fga, pts, ftm, qAst) {
    return (fgm * ( 1 - 0.5 * ((pts - ftm) / (2 * fga)) * qAst));
}
// MissedFG_Part 
function missedFgPart (fga, fgm, tmor) {
    return (fga - fgm) * (1 - 1.07 * tmor);
}
// MissedFT_Part 
function missedFtPart (ft, fta) {
    return (1 - (2 * ft) + (ft * ft) * 0.4 * fta);
}


