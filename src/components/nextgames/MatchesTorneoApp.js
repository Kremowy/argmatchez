import React, {useEffect, useState, useContext} from 'react';
import { getTournamentMatches } from './getTournamentMatches';
import ListadoDePartidosPrevios from '../mapmatch/ListadoDePartidosPrevios';
import Leaderboard from '../leaderboard/Leaderboard';
import TarjetaInformativa from '../tarjetas/infocard/TarjetaInformativa';
import ListadoDeTarjetasHoy from '../mapmatch/ListadoDeTarjetasHoy';
import Footer from '../footer/Footer';
import Warning from '../warning/Warning';
import { HeaderLogoContext } from '../context/HeaderLogoContext';
import LoadScreen from '../loader/LoadScreen';
import csgoLogoDefault from '../../ImagenesVarias/csgoLogoDefault.png';
import generic_team_pattern from '../../pattern/generic_team_pattern.png';
import HeaderMobile from '../headermobile/HeaderMobile';
import Logo from '../navigationbar/Logo';
//import { PathContext } from '../context/PathContext';
import { usePalette } from 'react-palette';
//import { template_unity } from '../../custom/unity/template';
//import { unity, unityTeams } from '../../custom/unity/unity-flow-league-schedule';
import { useParams, useHistory } from 'react-router';
import {
    HOME,
  } from '../../routes/routes';

const MatchTorneoApp = () => {
    const {tournamentId} = useParams();
    const history = useHistory();
    let backgroundStyle;
    let proxyLogo;

    const { guardarLogo, data, paletestate } = useContext(HeaderLogoContext);
    const [show, setShow] = useState("vs");
    const [loaderprogress, guardarLoaderProgress]     = useState({width: '0%'});
    const [crash,    guardarStateCrash]    = useState(false);
    const [noMatches, guardarNoMatches] = useState(false);  
    const [matchesHoy, guardarMatchesHoy] = useState([]);
    const [prevMatch, guardarPrevMatch] = useState([]);
    const [leaderboard, guardarLeaderboard] = useState([]);
    const [b64Logo, guardarB64Logo] = useState('');
    const [image_url, setImageLeague] = useState('');
    //const { paths } = useContext(PathContext);
    //const pathsArray = Object.values(paths);
    
    useEffect(() => { 
        //if (tournamentId !== undefined) {
            (async () => {
                if (!matchesHoy.length > 0) {
                    const {matchesTournament, badFetch} = await getTournamentMatches(tournamentId);
                    const {data, ladder, lastGames, imageLeague} = matchesTournament;
                    if (matchesTournament) {
                        guardarLoaderProgress({width: '100%'});
                        guardarMatchesHoy(data);
                        guardarLeaderboard(ladder);
                        if (imageLeague === null) {
                            setImageLeague(csgoLogoDefault);
                        }else{
                            setImageLeague('https://proxy-kremowy.herokuapp.com/' + imageLeague);
                            guardarLogo('https://proxy-kremowy.herokuapp.com/' + imageLeague);
                        }
                        if (lastGames.length < 1) {
                            guardarPrevMatch("no-match");
                        }else{
                            guardarPrevMatch(lastGames);
                        }
                        
                    }
                    if (!data) {
                        history.push(HOME)
                    }else{
                        if (badFetch) {
                            guardarStateCrash(true);
                        }
                        if(!data.length > 0){   
                            guardarNoMatches(true);
                        }
                    } 
                }
            })()
       /*  }else{
            if (pathsArray.length > 0) {
                const customMatches = template_unity(unity, pathsArray, unityTeams);
                guardarMatchesHoy(customMatches);
                guardarLoaderProgress({width: '100%'});
            }
        }
        if (image_url) {
            guardarLogo(image_url);
        }  */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[/*tournamentId === undefined? paths : null*/]);

    function toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
            callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }


    if (image_url !== csgoLogoDefault) {
        toDataURL(image_url, function(dataUrl) {
            guardarB64Logo(dataUrl);
        })
    }
    
    if (image_url !== csgoLogoDefault) {
        backgroundStyle = {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1280" height="1280"><image width="400" height="400" xlink:href="${b64Logo}" /></svg>')`,
            backgroundColor: `${data.darkVibrant}`,
            
        };
    }else{
        backgroundStyle = {
            backgroundColor: `${data.darkVibrant}`,
            backgroundImage: `url(${generic_team_pattern})`
        };
    }

    const {width} = loaderprogress;

    if (crash !== true){
        if(width === '100%' && paletestate === true){
            return(
                <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="parametros-container pattern-background" style={backgroundStyle}>
                    <HeaderMobile
                        color={data}
                        img={image_url}
                        setShow={setShow}
                        isTournament
                    />
                    {/* <div className="z-depth-5 gradient-position mb-0 animate__animated animate__fadeInDown animate__faster" style={{backgroundImage: `linear-gradient(to right, #000000f0 0%, ${data.vibrant} 100%)`}}> 
                        <img className="max-size-logo-header" style={{filter: `drop-shadow(4px 2px 20px ${data.lightVibrant})`}} alt="Logo Team" src={image_url}/>   
                        <a href="/" className="back-to-home"><FontAwesomeIcon style={{color: data.lightVibrant}} icon={faChevronCircleLeft}/></a>
                    </div> */}
                    {/* <div className="home-box">
                        <a href="/" className="btn-floating btn-large waves-effect waves-light red zoom-element"><i className="material-icons">home</i></a> 
                    </div> */}
                    {show === "ladder"&&
                        <Leaderboard 
                            leaderboard={leaderboard}
                        />
                    }
                    {show === "vs" && noMatches !== true &&
                        <ListadoDeTarjetasHoy matchesHoy={matchesHoy} data={data}/> 
                    }
                    {show === "vs"&& noMatches === true&&
                        <TarjetaInformativa noMatches={noMatches}/>
                    }
                    {show === "history" && prevMatch !== "no-match" &&
                        <ListadoDePartidosPrevios
                            prevMatch={prevMatch}
                        />
                    }  
                    <Logo
                        color={data}
                        img={image_url}
                    />
                    <Footer/>
                </div>
            );
        }else{
            return(
                <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="parametros-container pattern-background" style={{backgroundColor: 'black'}}>
                    <LoadScreen
                        loaderprogress={loaderprogress}
                    /> 
                </div>
            );
        };
    }else{
        return(
            <div onContextMenu={(e)=> window.innerWidth > 782? null : e.preventDefault()} className="parametros-container pattern-background">       
                <Warning/> 
                <Footer/>
            </div>
        );
    };   
    
}
 
export default MatchTorneoApp;