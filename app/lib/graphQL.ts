import { Character } from '../types';

const ENDPOINT = 'https://futuramaapi.com/graphql';

const CHARACTER_QUERY = `
  query ($id: Int!) {
    character(characterId: $id) {
      id
      name
      image
    }
  }
`;

const CHARACTERS_QUERY = `
    query {
      characters(limit: 20, offset: 0) {
        total
        offset

        edges {
          id
          name
          species
          image
        }
      }
    }
  `;

export async function getCharacters(): Promise<Response> {
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: CHARACTERS_QUERY }),
  };
  const res = await fetch(ENDPOINT, fetchOptions);
  return res;
}

export async function getCharacterOrThrow(id: number): Promise<Character | null> {
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: CHARACTER_QUERY, variables: { id } }),
  };
  const res = await fetch(ENDPOINT, fetchOptions);
  if (!res.ok) {
    console.error("couldn't fetch character ", res.status, await res.text());
    return null;
  }
  const json = await res.json();
  return json?.data?.character ?? null;
}

export async function getCharacter(id: number): Promise<Response> {
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: CHARACTER_QUERY, variables: { id } }),
  };
  const res = await fetch(ENDPOINT, fetchOptions);
  return res;
}
