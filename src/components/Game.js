import { useEffect, useState } from "react";
import Element from "./Element";

const Game = (props) => {
  const height = 600;
  const width = 1200;

  const randomCoord = () => {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    return [x, y];
  };

  const randomVector = () => {
    let x = 0;
    let y = 0;
    while (x === 0 && y === 0) {
      x = Math.floor(Math.random() * 10) - 5;
      y = Math.floor(Math.random() * 10) - 5;
    }
    return [x, y];
  };

  const initElement = (nb) => {
    const elements = [];
    for (let i = 1; i <= nb; i++) {
      elements.push({
        id: i,
        type: "rock",
        coord: randomCoord(),
        vector: randomVector(),
      });
    }
    for (let i = nb + 1; i <= nb * 2; i++) {
      elements.push({
        id: i,
        type: "paper",
        coord: randomCoord(),
        vector: randomVector(),
      });
    }
    for (let i = nb * 2 + 1; i <= nb * 3; i++) {
      elements.push({
        id: i,
        type: "scissor",
        coord: randomCoord(),
        vector: randomVector(),
      });
    }
    return elements;
  };

  const checkElements = (elem1, elem2) => {
    if (
      (elem1 === "rock" && elem2 === "scissor") ||
      (elem1 === "scissor" && elem2 === "paper") ||
      (elem1 === "paper" && elem2 === "rock")
    ) {
      return true;
    }
    return false;
  };

  const [elements, setElements] = useState(initElement(100));

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newElements = elements.map((element) => {
        let newVector = [element.vector[0], element.vector[1]];

        if (element.coord[0] <= 0 && element.vector[0] < 0) {
          newVector = [element.vector[0] * -1, element.vector[1]];
        } else if (element.coord[0] >= width && element.vector[0] > 0) {
          newVector = [element.vector[0] * -1, element.vector[1]];
        }

        if (element.coord[1] <= 0 && element.vector[1] < 0) {
          newVector = [element.vector[0], element.vector[1] * -1];
        } else if (element.coord[1] >= height && element.vector[1] > 0) {
          newVector = [element.vector[0], element.vector[1] * -1];
        }

        const newElementCoord = [
          element.coord[0] + element.vector[0],
          element.coord[1] + element.vector[1],
        ];

        let type = element.type;

        elements.forEach((elementAround) => {
          if (
            element.coord[0] - elementAround.coord[0] <= 20 &&
            element.coord[0] - elementAround.coord[0] >= -20 &&
            element.coord[1] - elementAround.coord[1] <= 20 &&
            element.coord[1] - elementAround.coord[1] >= -20
          ) {
            if (checkElements(elementAround.type, element.type)) {
              type = elementAround.type;
              newVector = randomVector();
            }
          }
        });

        return { ...element, coord: newElementCoord, vector: newVector, type };
      });

      setElements(newElements);
    }, 30);
  }, [elements]);

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case " ":
        break;

      default:
        break;
    }
  });

  return (
    <div
      className="game"
      style={{ width: width + 20 + "px", height: height + 20 + "px" }}
    >
      {elements.map((element) => {
        if (element.vector[0] === 0 && element.vector[1] === 0) {
          console.log(element);
        }
        return <Element elem={element} key={element.id} />;
      })}
      {console.log("-----")}
    </div>
  );
};

export default Game;
