import React from 'react';
import { Link } from 'react-router-dom';
import ProgressiveImage from 'react-progressive-image';
import Moment from 'moment';
import {momentSpanishSetup} from '../../utility/MomentSpanishSetup';
import {setGameMode} from '../../utility/SetGameMode';
import {setMatchResult} from '../../utility/SetMatchResult';
import toBeDefined from '../../ImagenesVarias/toBeDefined.png';
import csgoLogoDefault from '../../ImagenesVarias/csgoLogoDefault.png';
import { usePalette } from 'react-palette';

const TarjetaAllmatches = ({match}) => {

    const {opponents, league, begin_at, serie, number_of_games, tournament, status, official_stream_url, name, results} = match; 
    momentSpanishSetup();
    const dateUser = Moment(Date.now()).format("MM-DD-YYYY");
    const dateMatch = Moment(begin_at).format("MM-DD-YYYY");
    let proxyLogo;
    let aTeamSlug = "";
    let bTeamSlug = "";
    let aTeamName = "";
    let bTeamName = "";
    let aTeamLogo = "";
    let bTeamLogo = "";
    let bTeamId = "";
    let statusStream = "Streaming inactivo";
    let statusMatch = "¡Hoy " + Moment(begin_at).format('H:mm') + "hs!";
    if (league.image_url !== null && league.image_url !== csgoLogoDefault) proxyLogo = 'https://proxy-kremowy.herokuapp.com/' + league.image_url;
    let { data, error } = usePalette(proxyLogo);

    if (error) {
        data = {
            darkMuted: "#1c313a",
            darkVibrant: "#455a64",
            lightMuted: "#455a64",
            lightVibrant: "#718792",
            muted: "#1c313a",
            vibrant: "#718792",
        }
    }

    if (opponents.length !== 0) {
        if (opponents.length === 1) {
            aTeamName = opponents[0].opponent.name;
            if(opponents[0].opponent.image_url === null){
                aTeamLogo = csgoLogoDefault;
            }else{
                aTeamLogo = opponents[0].opponent.image_url;
                //aTeamId = opponents[0].opponent.id;
            };
            bTeamName = "a definir";
            bTeamLogo = toBeDefined;
        }else{
            aTeamName = opponents[0].opponent.name;
            aTeamSlug = opponents[0].opponent.slug;
            //aTeamId = opponents[0].opponent.id;

            bTeamName = opponents[1].opponent.name;
            bTeamSlug = opponents[1].opponent.slug;
            bTeamId = opponents[1].opponent.id;
            if(opponents[0].opponent.image_url === null || undefined){
                aTeamLogo = csgoLogoDefault;
            }else{
                aTeamLogo = opponents[0].opponent.image_url;
            };
            if(opponents[1].opponent.image_url === null){
                bTeamLogo = csgoLogoDefault;
            }else{
                bTeamLogo = opponents[1].opponent.image_url;
            };
        }
    }else{
        aTeamName = "a definir";
        aTeamLogo = toBeDefined;
        bTeamName = "a definir";
        bTeamLogo = toBeDefined;
    }

    const {modalidad} = setGameMode(number_of_games);

    if (status === "running"){                                  // if the status is running the status stream change to "Stream in live!"
        statusStream = "Partido en vivo!";
        statusMatch = "¡Ahora!";
    }

    if (dateUser === dateMatch || status === "running"){ 
        if (status === "running"){
            const {A_point, B_point} = setMatchResult(results, bTeamId);                            //backgroundColor: `${data.lightVibrant}`
            return (
                <div className="card posicion-tarjeta tamano-tarjeta-previo container-prev-match font-gilroy" style={{border: `5px solid ${data.lightVibrant}`}}>
                    <div className="col s12 m7 posicion-tarjeta">
                        <div className="card-image waves-effect waves-block waves-light">
                            <div className="card-image container-info cursor-default padding-top-8">
                                <div className="live-league-container">
                                    <a className="text-center head-font highlight-text" style={{color: `${data.darkVibrant}`}} rel="noopener noreferrer" target="_blank" href={league.slug}> {league.name+" "+serie.full_name} </a>     
                                </div>
                                
                                <div className="live-container-puntos-logos-upcoming">
    
                                    <Link to ={`/${aTeamSlug}`}>
                                        <div className="team-canvas outline-shade-black"> 
                                        <ProgressiveImage src={aTeamLogo} placeholder={csgoLogoDefault}>
                                            {src => <img title={`Click para ver el perfil de ${aTeamName}`} alt="a team" className="max-size-team-logo-prev-match animate__animated animate__fadeIn animate__fast"  src={src} />}
                                        </ProgressiveImage>                          
                                        </div> 
                                    </Link>
    
                                    <div title="Partidos ganados en la serie">
                                        <div className="points" title="Partidos ganados en la serie">
                                            <p className="match-winner point-A">{A_point}</p>
                                            <p>-</p>
                                            <p className="match-winner point-B">{B_point}</p>                           
                                        </div>  
                                    </div>
    
                                    <Link to ={`/${bTeamSlug}`}>
                                        <div className="team-canvas outline-shade-black">
                                            <ProgressiveImage src={bTeamLogo} placeholder={csgoLogoDefault}>
                                            {src => <img title={`Click para ver el perfil de ${bTeamName}`} alt="b team" className="max-size-team-logo-prev-match outline-shade-black animate__animated animate__fadeIn animate__fast" src={src} />}
                                            </ProgressiveImage>          
                                        </div> 
                                    </Link>
                                </div>
    
                                <div className="container-label">
                                    <p className="label-teams">{aTeamName}</p> 
                                    <p className="modalidad-past-match" >{modalidad}</p>
                                    <p className="label-teams">{bTeamName}</p>
                                </div> 
    
    
                                <div className="live-container-info-bottom">
                                    <p className="text-center cursor-default font-size live-child-width-info-bottom">
                                        <span className="label-data-style margin-entre-label-contenido" style={{color: `${data.darkVibrant}`}}>Fase:</span> 
                                        {tournament.name}
                                    </p>
    
                                    <p className="text-center cursor-default font-size live-child-width-info-bottom">
                                        <span className="label-data-style margin-entre-label-contenido" style={{color: `${data.darkVibrant}`}}>Empezó: </span>
                                        <span>{Moment(begin_at).format('H:mm')}  hs</span> 
                                    </p>                  
                                </div>
    
                                <div className="card-action live-streaming-box-bottom-padding live-streaming-box-container">
                                    <a className="stream-font-color-LIVE" rel="noopener noreferrer" target="_blank" href={official_stream_url}> {statusStream} <span className="dot-indicator"></span></a>
                                </div>
                            </div>              
                        </div>
                    </div>
                </div>   
             ); 
        }else{
            return(
                <div className="card posicion-tarjeta tamano-tarjeta-previo container-prev-match font-gilroy" style={{border: `5px solid ${data.lightVibrant}`}}> 
                    <div className="card-image waves-effect waves-block waves-light">
        
                        <div className="card-image container-info cursor-default">
                            <div className="hoy-esquina-container">
                                <p className="hoy-esquina">{name}</p>
                                <p className="hoy-esquina">{statusMatch}</p> 
                            </div>
        
                            <div className="container-puntosYlogos">

                                <Link to={`/${aTeamSlug}`}>
                                    <div className="team-canvas">  
                                        <ProgressiveImage src={aTeamLogo} placeholder={csgoLogoDefault}>
                                            {src => <img title={`Click para ver el perfil de ${aTeamName}`} alt="a team" className="max-size-team-logo-prev-match animate__animated animate__fadeIn animate__fast"  src={src} />}
                                        </ProgressiveImage>                              
                                    </div>
                                </Link>
        
                                <div className="versus-label">
                                    <p>VS</p>           
                                </div>         

                                <Link to ={`/${bTeamSlug}`}>
                                    <div className="team-canvas">
                                        <ProgressiveImage src={bTeamLogo} placeholder={csgoLogoDefault}>
                                            {src => <img title={`Click para ver el perfil de ${bTeamName}`} alt="b team" className="max-size-team-logo-prev-match outline-shade-black animate__animated animate__fadeIn animate__fast" src={src} />}
                                        </ProgressiveImage>    
                                    </div> 
                                </Link>
                                    
                            </div>
        
                            <div className="container-label">
                                <p className="label-teams">{aTeamName}</p> 
                                <p className="modalidad-past-match" >{modalidad}</p>
                                <p className="label-teams">{bTeamName}</p>
                            </div> 
                        </div>            
                    
                    </div>
                    <div className="card-content click-more-info activator cursor-pointer">
                        <span className="head-font" ><i className="material-icons right">info</i></span>
                    </div>
                    <div className="card-reveal card-reveal-padding">
                        <span className="card-title grey-text text-darken-4 margin-right-bottom"><i className="material-icons right">close</i></span>
    
                        <p className="text-align-center cursor-default font-size">
                            <span className="label-data-style margin-entre-label-contenido" style={{color: `${data.darkVibrant}`}}>Torneo:</span> 
                            {league.name+" "+serie.full_name}
                        </p>
        
                        <p className="text-align-center cursor-default font-size">
                            <span className="label-data-style margin-entre-label-contenido" style={{color: `${data.darkVibrant}`}}>Fase:</span> 
                            {tournament.name}
                        </p>    
                    </div>
                </div>
            );    
        }
    }else{
        return (
            <div className="card posicion-tarjeta tamano-tarjeta-previo container-prev-match font-gilroy" style={{border: `5px solid ${data.lightVibrant}`}}> 
                <div className="card-image waves-effect waves-block waves-light">
    
                    <div className="card-image container-info cursor-default">
                        
                        <div className="hoy-esquina-container">
                            <p className="labels-esquinas">{name}</p>
                            <p className="labels-esquinas">{Moment(begin_at).format('Do')} de {Moment(begin_at).format('MMMM - H:mm')} hs</p> 
                        </div>

                        <div className="container-puntosYlogos">

                            <Link to ={`/${aTeamSlug}`}>
                                <div className="team-canvas">          
                                    <ProgressiveImage src={aTeamLogo} placeholder={csgoLogoDefault}>
                                        {src => <img title={`Click para ver el perfil de ${aTeamName}`} alt="a team" className="max-size-team-logo-prev-match animate__animated animate__fadeIn animate__fast"  src={src} />}
                                    </ProgressiveImage>                       
                                </div>
                            </Link>
       
                            <div className="versus-label">
                                <p>VS</p>           
                            </div>         

                            <Link to ={`/${bTeamSlug}`}>
                                <div className="team-canvas">
                                    <ProgressiveImage src={bTeamLogo} placeholder={csgoLogoDefault}>
                                        {src => <img title={`Click para ver el perfil de ${bTeamName}`} alt="b team" className="max-size-team-logo-prev-match outline-shade-black animate__animated animate__fadeIn animate__fast" src={src} />}
                                    </ProgressiveImage>   
                                </div> 
                            </Link>
          
                        </div>
    
                        <div className="container-label">
                            <p className="label-teams">{aTeamName}</p> 
                            <p className="modalidad-past-match" >{modalidad}</p>
                            <p className="label-teams">{bTeamName}</p>
                        </div> 
                    </div>            
                
                </div>
                <div className="card-content click-more-info activator cursor-pointer">
                    <span className="head-font Furious-font"><i className="material-icons right" >info</i></span>
                </div>
                <div className="card-reveal card-reveal-padding">
                    <span className="card-title grey-text text-darken-4 margin-right-bottom"><i className="material-icons right">close</i></span>
   
                    <p className="text-align-center cursor-default font-size">
                        <span className="label-data-style margin-entre-label-contenido" style={{color: `${data.darkVibrant}`}}>Torneo:</span> 
                        {league.name+" "+serie.full_name}
                    </p>
    
                    <p className="text-align-center cursor-default font-size">
                        <span className="label-data-style margin-entre-label-contenido" style={{color: `${data.darkVibrant}`}}>Fase:</span> 
                        {tournament.name}
                    </p>     
                </div>
            </div>
        ); 
    } 
}
 
export default TarjetaAllmatches;