import { useEffect, useState } from "react";
import Tube, { type Ball } from "./Tube/Tube";
import classes from "./Tubes.module.css";

const Tubes = () => {
  interface Tube {
    balls: Ball[];
  }

  const NUM_TUBES = 8;
  const BALLS_PER_TUBE = 4;
  const COLORS = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "black",
    "cyan",
    "white",
    "magenta",
    "maroon",
    "chocolate",
    "navy",
    "olive",
    "lime",
  ];

  const [tubes, setTubes] = useState<Tube[]>([]);

  useEffect(() => {
    let newTubes: Tube[] = [];
    let allBalls: string[] = COLORS.slice(0, NUM_TUBES).flatMap((color) =>
      Array(BALLS_PER_TUBE).fill(color)
    );
    console.log(allBalls);
    for (let i = 0; i < NUM_TUBES; i++) {
      // get BALLS_PER_TUBE balls to put in a tube
      const balls: Ball[] = [];
      for (let j = 0; j < BALLS_PER_TUBE; j++) {
        // pick a random color and remove it from the allBalls array
        const index = Math.floor(Math.random() * allBalls.length);
        balls.push({ backgroundColor: allBalls[index] });
        allBalls.splice(index, 1);
      }
      console.log(balls);
      newTubes.push({ balls });
    }
    setTubes(newTubes);
  }, []);

  return (
    <div className={classes.tubes}>
      {tubes.map((_, i) => {
        return (
          <div key={i}>
            <Tube/>
          </div>
        );
      })}
    </div>
  );
};

export default Tubes;
