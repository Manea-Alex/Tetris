import React from "react";

import Preview from "../preview/Preview.js";
const Previews = ({ tetrominoes }) => {
  //everything except the last one
  const previewTetrominoes = tetrominoes
    .slice(1 - tetrominoes.length)
    .reverse();
  console.log("Preview tetrominoes ", previewTetrominoes);
  return (
    <>
      {previewTetrominoes.map((tetromino, index) => (
        <Preview tetromino={tetromino} index={index} key={index} />
      ))}
    </>
  );
};

export default React.memo(Previews);
