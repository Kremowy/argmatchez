import React from "react";
import { Link } from "react-router-dom";
import { TEAM, RANKING } from "../../routes/routes";
import ProgressiveImage from "react-progressive-image";
import csgoLogoBlack from "../../Images/csgoLogoDefaultBlack.png";
import { usePalette } from "react-palette";
import "./hltvranking.css";

const Team = ({
  balanceColor,
  id,
  img,
  balance,
  name,
  points,
  position,
  roster,
}) => {
  let colorTeam = usePalette("https://proxy-kremowy.herokuapp.com/" + img).data;
  
  return (
    <Link
      key={name}
      to={id ? TEAM.replace(":teamid", id) : RANKING}
      title={`Look the team profile of: ${name}`}
      className={`animate__faster animate__fadeInUp ${JSON.parse(localStorage.getItem("animations")) !== false&& "animate__animated"}`}
    >
      <div style={{ backgroundColor: colorTeam.darkVibrant }}>
        <div className="team">
          <span className="color-text-white">#{position}</span>
          <div>
            <ProgressiveImage
              src={img ? img : csgoLogoBlack}
              placeholder={csgoLogoBlack}
            >
              {(src) => (
                <img className="" loading="lazy" src={src} alt={name} />
              )}
            </ProgressiveImage>
          </div>
        </div>
        <div className="name">
          <span>{name}</span>
          <span  className="display-flex" >{points} Points <span className={balanceColor}>{balance}</span></span>
        </div>
        <div className="roster">
          {roster.map((player) => (
            <span key={player}>{player}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Team;
