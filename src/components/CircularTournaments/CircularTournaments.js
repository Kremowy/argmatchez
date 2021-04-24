import React, { useEffect, useState } from 'react';
import CircularItem from './CircularItem';
import './circulartournaments.css';

const CircularTournaments = ({matches, show, prevMatch, filterByTournament}) => {
    
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        let modTournaments = [];
        const m = prevMatch? prevMatch : matches;
        m.map((match) => {
            modTournaments.push({
              name: match.league.name ? match.league.name : "none",
              img: match.league.image_url ? match.league.image_url : "none",
              id: match.league.id ? match.league.id : "none",
            });
        });
        if (modTournaments.length !== 0) {
            modTournaments = modTournaments.filter(
                (v, i, a) => a.findIndex((t) => t.id === v.id) === i
            );
        }
        setTournaments(modTournaments);
    }, [show]);

    return ( 
        <div className="circular-container">
            <div>
                {
                    tournaments.map(tournament => ( 
                        <CircularItem 
                            key={tournament.id}
                            filterByTournament={filterByTournament}
                            img={tournament.img}
                            name={tournament.name}
                            id={tournament.id}
                        />
                    ))
                }
            </div>
        </div>
     );
}
 
export default CircularTournaments;