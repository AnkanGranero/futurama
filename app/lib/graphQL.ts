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
    query($species: SpeciesFilter, $offset:Int!) {
      characters(limit: 20, offset: $offset, species: $species) {
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

export async function getCharacters(species: string, offset: number): Promise<Response> {

  console.log(species, offset);
  
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: CHARACTERS_QUERY, variables: { species, offset } }),
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
  
  try {
    const res = await fetch(ENDPOINT, fetchOptions);
    
    if (!res.ok) {
      console.error("couldn't fetch character ", res.status, await res.text());
      return null;
    }

    const json = await res.json();
    return json?.data?.character;
  } catch (error) {
    throw error;
  }
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
