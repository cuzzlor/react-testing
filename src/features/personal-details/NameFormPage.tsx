import { NameForm, NameFormData } from './NameForm';
import React from 'react';
import { useSampleJoke } from './useSampleJoke';

export function NameFormPage(data: NameFormData) {
  const handleSubmit = (data: NameFormData) => alert(JSON.stringify(data));
  const { sampleJoke, setJokePreference } = useSampleJoke();
  return (
    <NameForm {...data} sampleJoke={sampleJoke} onJokePreferenceChanged={setJokePreference} onSubmit={handleSubmit} />
  );
}
