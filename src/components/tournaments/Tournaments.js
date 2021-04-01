import React, { useContext } from 'react';
import Item from './Item';
import SimpleLoadScreen from '../loader/SimpleLoadScreen';
import { ColorThemeContext } from '../context/ColorThemeContext';
import { Link } from 'react-router-dom';
import { TournamentContext } from '../context/TournamentContext';
import {
    TOURNAMENT,
  } from '../../routes/routes';
import {
    LOOKMATCHES
} from '../../titlestag/titlestag';
import './tournaments.css';

const Tournaments = () => {

    const { colors } = useContext(ColorThemeContext);
    const { tournamentId } = useContext(TournamentContext);
    const objectToArray = Object.values(tournamentId);

    return (colors.background_color !== undefined?
        <div className="tournament-container font-gilroy" style={{backgroundColor: colors.background_color}} onContextMenu={(e)=> window.innerWidth > 1024? null : e.preventDefault()}>
            <div className="child-tournament">
                {objectToArray.length > 0 &&
                    objectToArray.map(tournament => (
                        <Link to={TOURNAMENT.replace(':tournamentId', tournament.id)} className="tournament-size z-depth-5 animate__animated animate__fadeInDown animate__faster" title={`${LOOKMATCHES} ${tournament.name}`} key={tournament.id}>
                            <Item
                                key={tournament.id}
                                tournament={tournament}
                            />
                        </Link>
                    ))
                }
            </div>
        </div>
        :
        <SimpleLoadScreen/>
     );
}
 
export default Tournaments;
