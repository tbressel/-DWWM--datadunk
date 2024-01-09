import Navbar from "../components/Navbar";
import TeamsList from "../components/TeamsList";
import { useEffect, useState } from "react";

const Teams = () => {



    return (
        <>
  <Navbar />

            <h1>Teams</h1>

            <TeamsList />
        </>
    );
};
export default Teams;
