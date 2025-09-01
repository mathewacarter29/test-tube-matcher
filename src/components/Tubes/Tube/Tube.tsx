import tubeImage from "../../../assets/tube.png";
import classes from "./Tube.module.css";

interface FilledTubeProps {
  tube: Tube;
  onClick: () => void;
  isSelected: boolean;
}

const FilledTube = ({ tube, onClick, isSelected }: FilledTubeProps) => {
  return (
    <div className={classes.tube}>
      <img src={tubeImage} alt="test tube" style={{height: '300px', pointerEvents: 'all'}} onClick={onClick}/>
      {tube.balls.map((ball, index) => {
        const bottomPercent = isSelected && tube.balls.length && index === tube.balls.length - 1 ? `${(index) * 20 + 30}%` : `${(index) * 20 + 10}%`;
        return (
          <div
            key={index}
            className={classes.ball}
            style={{
              backgroundColor: ball.backgroundColor,
              bottom: bottomPercent,
            }}
            onClick={onClick}
          ></div>
        );
      })}
    </div>
  );
};
export interface Ball {
  backgroundColor: string;
}

export interface Tube {
  balls: Ball[];
}

export default FilledTube;
