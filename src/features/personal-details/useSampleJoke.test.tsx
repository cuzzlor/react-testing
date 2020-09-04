import { act, renderHook } from '@testing-library/react-hooks';
import { useSampleJoke } from './useSampleJoke';

describe('useSampleJoke', () => {
  const randomJokeResponse = { setup: 'Why did the chicken cross the road?', punchline: 'To get to the other side!' };
  const randomJoke = `${randomJokeResponse.setup} ${randomJokeResponse.punchline}`;
  const dadJoke = 'What did the 0 say to the 8? Nice belt.';

  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(randomJokeResponse),
        text: () => Promise.resolve(dadJoke),
      } as Response)
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('gets a dad joke', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSampleJoke());

    act(() => {
      result.current.setJokePreference('dad');
    });

    await waitForNextUpdate();

    expect(result.current.jokePreference).toEqual('dad');
    expect(result.current.sampleJoke).toEqual(dadJoke);
  });

  it('gets a random joke', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSampleJoke());

    act(() => {
      result.current.setJokePreference('random');
    });

    await waitForNextUpdate();

    expect(result.current.jokePreference).toEqual('random');
    expect(result.current.sampleJoke).toEqual(randomJoke);
  });

  it('supports unsetting jokePreference', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSampleJoke());

    act(() => {
      result.current.setJokePreference('random');
    });

    await waitForNextUpdate();

    expect(result.current.jokePreference).toEqual('random');
    expect(result.current.sampleJoke).toEqual(randomJoke);

    act(() => {
      result.current.setJokePreference(undefined);
    });

    expect(result.current.jokePreference).toEqual(undefined);
    expect(result.current.sampleJoke).toEqual(undefined);
  });
});
