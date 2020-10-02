import { atom, selector, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { JokePreference } from './NameForm';

const fetchRandomJoke = () =>
  fetch('https://official-joke-api.appspot.com/jokes/random').then((response) =>
    response.json().then((data) => `${data.setup} ${data.punchline}`)
  );

const fetchDadJoke = () =>
  fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'text/plain' },
  }).then((response) => response.text());

const jokePreferenceState = atom<JokePreference | null>({
  key: 'jokePreferenceState',
  default: null,
});

const sampleJokeState = selector<string | null>({
  key: 'sampleJokeState',
  get: async ({ get }) => {
    const jokePreference = get(jokePreferenceState);
    if (jokePreference) {
      return (jokePreference === 'dad' ? fetchDadJoke : fetchRandomJoke)();
    } else {
      return null;
    }
  },
});

export const useRecoilSampleJoke = () => ({
  jokePreference: useRecoilValue(jokePreferenceState),
  setJokePreference: useSetRecoilState(jokePreferenceState),
  sampleJoke: useRecoilValueLoadable(sampleJokeState),
});
