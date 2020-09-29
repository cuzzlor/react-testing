import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import React from 'react';

export type FavouriteFilmAutocompleteProps = Omit<
  AutocompleteProps<string, false, false, false>,
  'options' | 'multiple'
> & {
  films: string[];
};

export const FavouriteFilmAutocomplete: React.FC<FavouriteFilmAutocompleteProps> = ({ films, ...rest }) => {
  return <Autocomplete {...rest} options={films} />;
};
