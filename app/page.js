"use client";
import React, { useState } from "react";
// import Token from './components/Token'

const Badge = ({ count }) => {
  const badgeStyle = {
    position: "absolute",
    top: "-5px",
    right: "-10px",
    backgroundColor: "green",
    color: "white",
    padding: "5px",
    borderRadius: "50%",
    fontSize: "small",
    textAlign: "center",
    width: "16px",
    height: "16px",
  };

  return <div style={badgeStyle}>{count}</div>;
};

const Choices = ({
  choices,
  setChoices,
  setPot,
  removeToken,
  handleBlues,
  drawRandomToken,
  sack,
}) => {
  return (
    choices.length > 0 && (
      <div className="choices-container">
        <small>Choose one to go into the pot</small>
        <div className="choices">
          {choices.map((item, index) => (
            <div key={index} className="drawnToken">
              <ChoiceToken
                setPot={setPot}
                removeToken={removeToken}
                setChoices={setChoices}
                item={item}
                handleBlues={handleBlues}
                drawRandomToken={drawRandomToken}
                sack={sack}
              />
            </div>
          ))}
        </div>
        <div className="center-btn">
          {choices.length > 0 && (
            <button
              onClick={() => {
                setChoices([]);
              }}
            >
              Reject
            </button>
          )}
        </div>
      </div>
    )
  );
};

const ChoiceToken = ({
  setPot,
  removeToken,
  item,
  setChoices,
  handleBlues,
  drawRandomToken,
  sack,
}) => {
  const handleTokenClick = (e) => {
    if (item == null) return;
    setPot((prevPot) => [item, ...prevPot]);
    removeToken(item.color, item.label);
    setChoices([]);
    handleBlues(item, setChoices, drawRandomToken, sack);
  };

  return (
    <Token tokenFunc={handleTokenClick} label={item.label} color={item.color} />
  );
};

const DrawButton = ({
  sack,
  setChoices,
  setPot,
  removeToken,
  drawRandomToken,
  handleBlues,
}) => {
  const handleRandomDraw = (sack) => {
    const randomItem = drawRandomToken(sack);

    if (randomItem == null) return;

    // console.log("Randomly Selected Item:", randomItem);
    setPot((prevPot) => [randomItem, ...prevPot]);
    removeToken(randomItem.color, randomItem.label);

    // Handle blue tokens
    handleBlues(randomItem, setChoices, drawRandomToken, sack);
  };

  const handleClick = (e) => {
    handleRandomDraw(sack);
  };

  return (
    <>
      <button className="draw-btn" onClick={handleClick}>
        Draw
      </button>
      {/* {typeof result.label !== "undefined" && (
        <Token color={result.color} label={result.label} />
      )} */}
    </>
  );
};

const Pot = ({ pot, restoreToSack }) => {
  return (
    <div className="pot-container">
      <h2>Pot</h2>
      <div className="pot">
        {pot.map((item, index) => (
          <div key={index} className="drawnToken">
            <Token color={item.color} label={item.label} />
          </div>
        ))}
      </div>
      {pot.length > 0 && (
        <div className="center-btn">
          <button onClick={restoreToSack}>Restore</button>
        </div>
      )}
    </div>
  );
};

const RemoveToken = ({ removeFunc }) => {
  const removeTokenStyle = {
    position: "absolute",
    top: "-5px",
    left: "-10px",
    backgroundColor: "gray",
    color: "white",
    // padding: "5px",
    borderRadius: "10%",
    fontSize: "small",
    textAlign: "center",
    width: "20px",
    height: "20px",
  };

  return (
    <div onClick={removeFunc} style={removeTokenStyle}>
      -
    </div>
  );
};

function Token({ tokenFunc, label }) {
  return (
    <>
      <img onClick={tokenFunc} className="token" src={label + ".png"}></img>
    </>
  );
}

const TokenTable = ({ sack, setSack, addToken, removeToken }) => {
  return (
    <table>
      <tbody>
        {Object.entries(sack).map(([color, values]) => (
          <tr key={color}>
            {Object.entries(values).map(([value, count]) => (
              <td className="tokenCnt" key={`${color}-${value}`}>
                <TokenWithBadge
                  color={`${color}`}
                  label={`${value}`}
                  count={`${count}`}
                  setSack={setSack}
                  addToken={addToken}
                  removeToken={removeToken}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TokenWithBadge = ({
  color,
  label,
  count,
  setSack,
  addToken,
  removeToken,
}) => {
  const containerStyle = {
    position: "relative",
    display: "inline-block", // Ensures the container only takes as much space as the image and badge need
    margin: "10px 20px",
  };

  const handleTokenClick = (e) => {
    addToken(color, label);
  };

  const handleRemoveClick = (e) => {
    removeToken(color, label);
  };

  return (
    <div style={containerStyle}>
      <Token tokenFunc={handleTokenClick} label={label} color={color} />
      <Badge count={count} />
      <RemoveToken removeFunc={handleRemoveClick} />
    </div>
  );
};

export default function App() {
  const startingTokens = {
    black: { black_1: 0 },
    blue: { blue_1: 0, blue_2: 0, blue_4: 0 },
    green: { green_1: 1, green_2: 0, green_4: 0 },
    orange: { orange_1: 1 },
    purple: { purple_1: 0 },
    red: { red_1: 0, red_2: 0, red_4: 0 },
    white: { white_1: 4, white_2: 2, white_3: 1 },
    yellow: { yellow_1: 0, yellow_2: 0, yellow_4: 0 },
  };

  const [sack, setSack] = useState(startingTokens);
  const [pot, setPot] = useState([]);
  const [choices, setChoices] = useState([]);

  const removeToken = (color, label) => {
    setSack((prevSack) => {
      const existingColor = prevSack[color] || {};
      const existingValue = existingColor[label] || 0;
      return {
        ...prevSack,
        [color]: {
          ...existingColor,
          [label]: existingValue ? existingValue - 1 : 0,
        },
      };
    });
  };

  const addToken = (color, value) => {
    setSack((prevSack) => {
      const existingColor = prevSack[color] || {};
      const existingValue = existingColor[value] || 0;
      return {
        ...prevSack,
        [color]: {
          ...existingColor,
          [value]: existingValue + 1,
        },
      };
    });
  };

  function drawRandomToken(data) {
    // Flatten the object to an array of items with their values
    const flattenedData = Object.entries(data).flatMap(([color, values]) =>
      Object.entries(values).map(([label, count]) => ({
        color,
        label,
        count,
      }))
    );

    // Filter items with count greater than 0
    const itemsWithCountGreaterThanZero = flattenedData.filter(
      (item) => item.count > 0
    );

    // Randomly select an item from the filtered array
    const randomItem =
      itemsWithCountGreaterThanZero[
        Math.floor(Math.random() * itemsWithCountGreaterThanZero.length)
      ];
    return randomItem;
  }

  function handleBlues(item, setChoices, drawRandomToken, sack) {
    if (item.color === "blue") {
      const count = item.label.slice(-1);
      for (let i = 0; i < count; i++) {
        const randomItem = drawRandomToken(sack);
        // console.log(randomItem);
        if (randomItem == null) return;
        setChoices((prevChoices) => [...prevChoices, randomItem]);
      }
    }
  }

  const restoreToSack = () => {
    pot.map((item, index) => {
      addToken(item.color, item.label);
    });
    setPot([]);
  };

  return (
    <>
      <div className="center-btn">
        <DrawButton
          sack={sack}
          setChoices={setChoices}
          setPot={setPot}
          removeToken={removeToken}
          drawRandomToken={drawRandomToken}
          handleBlues={handleBlues}
        />
      </div>
      <Pot pot={pot} restoreToSack={restoreToSack} />
      <Choices
        className="choices-container"
        choices={choices}
        setChoices={setChoices}
        setPot={setPot}
        removeToken={removeToken}
        handleBlues={handleBlues}
        drawRandomToken={drawRandomToken}
        sack={sack}
      />
      <TokenTable
        sack={sack}
        setSack={setSack}
        addToken={addToken}
        removeToken={removeToken}
      />
    </>
  );
}
