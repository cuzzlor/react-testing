import { JokePreference } from './NameForm';
import { useState, useEffect } from 'react';

const fetchRandomJoke = () =>
  fetch('https://official-joke-api.appspot.com/jokes/random').then((response) =>
    response.json().then((data) => `${data.setup} ${data.punchline}`)
  );

const fetchDadJoke = () =>
  fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'text/plain' },
  }).then((response) => response.text());

export const useSampleJoke = () => {
  const [jokePreference, setJokePreference] = useState<JokePreference | undefined>(undefined);
  const [sampleJoke, setSampleJoke] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (jokePreference) {
      (jokePreference === 'dad' ? fetchDadJoke : fetchRandomJoke)().then(setSampleJoke);
    } else {
      setSampleJoke(undefined);
    }
  }, [jokePreference]);

  return { jokePreference, setJokePreference, sampleJoke };
};
