import { useEffect, useState } from "react";
import FilledTube, { type Ball, type Tube } from "./Tube/Tube";
import classes from "./Tubes.module.css";

const Tubes = () => {
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
  const [selected, setSelected] = useState<number>(-1);

  useEffect(() => {
    let newTubes: Tube[] = [];
    let allBalls: string[] = COLORS.slice(0, NUM_TUBES).flatMap((color) =>
      Array(BALLS_PER_TUBE).fill(color)
    );
    for (let i = 0; i < NUM_TUBES; i++) {
      // get BALLS_PER_TUBE balls to put in a tube
      const balls: Ball[] = [];
      for (let j = 0; j < BALLS_PER_TUBE; j++) {
        // pick a random color and remove it from the allBalls array
        const index = Math.floor(Math.random() * allBalls.length);
        balls.push({ backgroundColor: allBalls[index] });
        allBalls.splice(index, 1);
      }
      newTubes.push({ balls });
    }
    setTubes(newTubes);
  }, []);

  const selectTube = (index: number) => {
    setSelected((prevState) => {
      if (prevState !== -1) {
        return -1;
      }
      return index;
    });
  };

  return (
    <div className={classes.tubes}>
      {tubes.map((tube, i) => {
        return (
          <div key={i}>
            <FilledTube tube={tube} onClick={() => selectTube(i)} isSelected={selected === i}/>
          </div>
        );
      })}
    </div>
  );
};

export default Tubes;
