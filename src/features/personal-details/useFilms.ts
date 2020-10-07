import { selector, useRecoilValueLoadable } from 'recoil';
import { top100Films } from './films';

const fetchFilms: () => Promise<string[]> = () =>
  new Promise((resolve) => setTimeout(() => resolve(top100Films), 1000));

const filmsQuery = selector({
  key: 'filmsQuery',
  get: async () => fetchFilms(),
});

export function useFilms() {
  return useRecoilValueLoadable(filmsQuery);
}
