import tube from "../../../assets/tube.png";
import classes from "./Tube.module.css";
import { useState, useEffect } from "react";

const Tube = () => {
  const [balls, setBalls] = useState<Ball[]>([]);

  useEffect(() => {
    const ballsArray = Array(4)
      .fill(null)
      .map((_) => {
        return { backgroundColor: "black" };
      });
    setBalls(ballsArray);
  }, []);

  return (
    <div className={classes.tube}>
      <img src={tube} alt="test tube" />
      {balls.map((ball, index) => {
        return (
          <div
            key={index}
            className={classes.ball}
            style={{
              backgroundColor: ball.backgroundColor,
              top: `${(index + 1) * 20}%`,
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

export default Tube;
