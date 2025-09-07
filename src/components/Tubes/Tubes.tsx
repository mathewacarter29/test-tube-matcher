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
    const numColors: number = NUM_TUBES - 1;
    let allBalls: string[] = COLORS.slice(0, numColors).flatMap((color) =>
      Array(BALLS_PER_TUBE).fill(color)
    );
    // pick 4 random tubes to have 3 balls
    let lessTubes = new Set();
    while (lessTubes.size < 4) {
      lessTubes.add(Math.floor(Math.random() * NUM_TUBES));
    }
    for (let i = 0; i < NUM_TUBES; i++) { // loop for tubes
      // get BALLS_PER_TUBE balls to put in a tube
      const balls: Ball[] = [];
      for (let j = 0; j < BALLS_PER_TUBE && allBalls; j++) { // going through the balls in a tube
        if (lessTubes.has(i)) {
          j++;
          lessTubes.delete(i);
        }
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
    setSelected((prevIndex) => {
      // if this is the first tube selected
      if (prevIndex === -1) {
        if (!tubes[index].balls || tubes[index].balls.length === 0) {
          return -1;
        }
        return index;
      } else {
        if (tubes[index].balls.length >= BALLS_PER_TUBE) {
          // invalid tube to place ball onto
          return -1;
        }
        // second tube selected
        // pop top ball of previous tube and add it to top of next tube
        // TODO: it would be cool if this was done using setState with a callback instead of deep copying the tubes array
        let newTubes = JSON.parse(JSON.stringify(tubes));
        const top =
          newTubes[prevIndex].balls[newTubes[prevIndex].balls.length - 1];
        newTubes[prevIndex].balls.splice(newTubes[prevIndex].balls.length - 1, 1);
        newTubes[index].balls.push(top);
        setTubes(newTubes);
        return -1;
      }
    });
  };

  useEffect(() => {
    if (checkForWin()) {
      
    }
  }, [tubes])

  const checkForWin = (): boolean => {
    return tubes.every((tube) => {
      // tube has 4 balls that are all the same color or tube is empty
      return (tube.balls.length === BALLS_PER_TUBE && tube.balls.every((ball) => ball.backgroundColor === tube.balls[0].backgroundColor)) || tube.balls.length === 0;
    })
  }
  

  return (
    <div className={classes.tubes}>
      {tubes.map((tube, i) => {
        return (
          <div key={i}>
            <FilledTube
              tube={tube}
              onClick={() => selectTube(i)}
              isSelected={selected === i}
              expectedBallNum={BALLS_PER_TUBE}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Tubes;
