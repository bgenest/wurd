import React, { useState, useEffect } from "react";

import WordComponent from "./WordComponent";
import WeatherTile from "./WeatherTile";
import helpers from "./helpers";

export const wordIndex = (props) => {
  const [wordData, setWordData] = useState([
    {
      word: "word",
      phonetic: "/wɜd/",
      meanings: [
        {
          definitions: [
            {
              definition:
                "The smallest unit of language that has a particular meaning and can be expressed by itself; the smallest discrete, meaningful unit of language. (contrast morpheme.)",
            },
            {
              definition: "Something like such a unit of language:",
            },
          ],
        },
      ],
    },
  ]);

  let word = helpers.randomword();

  const getWord = async () => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const responseWordData = await response.json();
      setWordData(responseWordData);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const wordComponents = wordData.map((word) => {
    wordData;
    return (
      <WordComponent
        word={word.word}
        phonetic={word.phonetic}
        definition={word.meanings[0].definitions[0].definition}
      />
    );
  });

  useEffect(() => {
    getWord();
  }, []);

  return (
    <div class="grid-container grid-margin-x fluid">
      <div class="grid-x">
        <div> </div>
        <h1 class=" cell title-page">Welcome to Wordy!</h1>
        <hr />
        <h4 class="cell subtitle">
          Wordy is the game that's like Wordle, but it's not Wordle.
        </h4>
        <br />
      </div>
      <div className="cell grid-x">
        <div className="play-button-container float-center">
          <br />
          <a className="aux-button button-19" role="button" href="sessions/new">
            Play!
          </a>
        </div>
      </div>
      <div className="cell grid-x">
        <div className="play-button-container float-center">
          <br />
          <a className="aux-button button-19" role="button" href="/tutorial">
            How to play
          </a>
        </div>
      </div>
      <br />
      <br />
      <div className="grid-x">
        <div className="cell grid-x align-middle">
          {wordComponents[0]}

          <WeatherTile />
        </div>
      </div>
      <br />
    </div>
  );
};

export default wordIndex;
