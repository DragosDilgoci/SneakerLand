import React, { useEffect } from "react";
import Vara from "vara";

function VaraText({ text }) {
  useEffect(() => {

    new Vara(
      "#vara-container",
      "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json",
      [
        {
          text: text,
          fontSize: 60,
          strokeWidth: 0.7,
        },
      ]
    );
  }, [text]);

  return <div id="vara-container" className="z-[20]"></div>;
}

export default VaraText;