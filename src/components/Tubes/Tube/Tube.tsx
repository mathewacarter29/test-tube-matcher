import tubeImage from "../../../assets/tube.png";
import classes from "./Tube.module.css";

interface FilledTubeProps {
  tube: Tube;
}

const FilledTube = ({ tube }: FilledTubeProps) => {
  return (
    <div className={classes.tube}>
      <img src={tubeImage} alt="test tube" style={{height: '300px'}}/>
      {tube.balls.map((ball, index) => {
        return (
          <div
            key={index}
            className={classes.ball}
            style={{
              backgroundColor: ball.backgroundColor,
              bottom: `${(index) * 20 + 10}%`,
            }}
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
