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

const DrawButton = ({ updateSackValue }) => {
  const item = { color: "green", label: "green_1" };

  const handleClick = (e) => {
    updateSackValue(item);
  };

  return <button onClick={handleClick}>Draw</button>;
};

function DrawToken() {
  return (
    <div>
      <Token color="green" value="1" />
      <p small>Tap to &#10;&#13;keeps</p>
    </div>
  );
}

function DrawPile() {
  return <DrawToken />;
}

function Pot() {
  return (
    <div>
      <p>A pot with many tokens, scrolling horizontally</p>
      <Token />
    </div>
  );
}

function SackToken() {
  return (
    <div>
      <p>Badge number</p>
      <Token />
    </div>
  );
}

function Token({ color }) {
  return (
    <>
      <img className="token" src={color + ".png"}></img>
    </>
  );
}

function TokenRows({ sack }) {
  // Organize data by color and label
  const organizedData = sack.reduce((acc, item) => {
    const { color, label } = item;
    if (!acc[color]) {
      acc[color] = [];
    }
    acc[color].push({ label, count: (acc[color][label]?.count || 0) + 1 });
    return acc;
  }, {});

  return (
    <div>
      {/* Render table */}
      <table>
        <thead>
          <tr>
            <th>Color</th>
            <th>Labels</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(organizedData).map((color) => (
            <tr key={color}>
              <td>{color}</td>
              <td>
                {organizedData[color].map(({ label, count }) => (
                  <span key={label}>{`${label}(${count})`} </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // return (
  //   <table>
  //     <tbody>
  //       {Object.entries(sack).map(([color, items]) => (
  //         <tr key={color}>
  //           {Object.entries(items).map(([item, count]) => (
  //             <td className="tokenCnt" key={`${color}-${item}`}>
  //               <TokenWithBadge color={`${item}`} count={`${count}`} />
  //             </td>
  //           ))}
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
}

function TokenTable({ sack }) {
  return (
    <div>
      <TokenRows sack={sack} />
      {/* <TokenRow sack={sack}/>
      <TokenRow sack={sack}/> */}
    </div>
  );
}

const TokenWithBadge = ({ color, count }) => {
  const containerStyle = {
    position: "relative",
    display: "inline-block", // Ensures the container only takes as much space as the image and badge need
    margin: "10px",
  };
  return (
    <div style={containerStyle}>
      <Token color={color} />
      <Badge count={count} />
    </div>
  );
};

export default function App() {
  const startingTokens = [
    { color: "green", label: "green_1" },
    { color: "orange", label: "orange_1" },
    { color: "white", label: "white_1" },
    { color: "white", label: "white_1" },
    { color: "white", label: "white_1" },
    { color: "white", label: "white_1" },
    { color: "white", label: "white_2" },
    { color: "white", label: "white_2" },
    { color: "white", label: "white_3" },
  ];

  const [sack, setSack] = useState(startingTokens);

  const updateSackValue = (item) => {
    setSack((prevSack) => [...prevSack, item]);
  };

  return (
    <>
      <DrawButton updateSackValue={updateSackValue} />
      <DrawPile />
      <Pot />
      <TokenTable sack={sack} />
    </>
  );
}
