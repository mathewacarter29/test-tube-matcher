import { useEffect, useState } from "react";
import tubeImage from "../../../assets/tube.png";
import classes from "./Tube.module.css";

interface FilledTubeProps {
  tube: Tube;
  onClick: () => void;
  isSelected: boolean;
  expectedBallNum: number;
}

const FilledTube = ({
  tube,
  onClick,
  isSelected,
  expectedBallNum,
}: FilledTubeProps) => {
  const [isComplete, setIsComplete] = useState<boolean>(false);
  useEffect(() => {
    if (tube.balls && tube.balls.length > 0) {
      const newIsComplete =
        tube.balls.every(
          (ball) => ball.backgroundColor === tube.balls[0].backgroundColor
        ) && tube.balls.length === expectedBallNum;
      setIsComplete(newIsComplete);
    }
  }, [tube]);

  const onClickTube = () => {
    onClick();
  };
  return (
    <div
      className={classes.tube}
      style={{ opacity: isComplete ? "40%" : "1000%" }}
    >
      <img
        src={tubeImage}
        alt="test tube"
        style={{ height: "300px", pointerEvents: "all" }}
        onClick={isComplete ? undefined : onClickTube}
      />
      {tube.balls.map((ball, index) => {
        const bottomPercent =
          isSelected && tube.balls.length && index === tube.balls.length - 1
            ? `${index * 20 + 30}%`
            : `${index * 20 + 10}%`;
        return (
          <div
            key={index}
            className={classes.ball}
            style={{
              backgroundColor: ball.backgroundColor,
              bottom: bottomPercent,
            }}
            onClick={isComplete ? undefined : onClickTube}
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
