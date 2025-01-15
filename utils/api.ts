const USELESS_FACTS_API = 'https://uselessfacts.jsph.pl/api/v2/facts/random';
const CAT_API = 'https://api.thecatapi.com/v1/images/search';

export async function getRandomFact() {
  const response = await fetch(USELESS_FACTS_API);
  if (!response.ok) throw new Error('Failed to fetch useless fact');
  const fact = await response.json();
  return { text: fact.text, isTrue: true };
}

export async function getRandomCatImage() {
  const response = await fetch(CAT_API);
  if (!response.ok) throw new Error('Failed to fetch cat image');
  const data = await response.json();
  return data[0].url;
}

function generateFalseFact(trueFact: string): string {
  const modifications = [
    (fact: string) => fact.replace(/\d+/, (match) => String(Number(match) + Math.floor(Math.random() * 10) + 1)),
    (fact: string) => fact.replace(/(\w+)/, (match) => {
      const opposites: {[key: string]: string} = {
        'first': 'last', 'last': 'first', 'biggest': 'smallest', 'smallest': 'biggest',
        'oldest': 'newest', 'newest': 'oldest', 'most': 'least', 'least': 'most'
      };
      return opposites[match.toLowerCase()] || match;
    }),
    (fact: string) => {
      const words = fact.split(' ');
      const randomIndex = Math.floor(Math.random() * words.length);
      words[randomIndex] = ['actually', 'interestingly', 'surprisingly'][Math.floor(Math.random() * 3)] + ',' + words[randomIndex];
      return words.join(' ');
    },
    (fact: string) => {
      const countries = ['France', 'Japan', 'Brazil', 'Australia', 'Egypt'];
      return fact.replace(/\b(in|at|on)\b.*$/, `$1 ${countries[Math.floor(Math.random() * countries.length)]}`);
    },
    (fact: string) => {
      const years = ['1920', '1955', '1982', '2001', '2015'];
      return fact.replace(/\b(in|during)\b.*$/, `$1 ${years[Math.floor(Math.random() * years.length)]}`);
    },
  ];
  
  const randomModification = modifications[Math.floor(Math.random() * modifications.length)];
  return randomModification(trueFact);
}

export async function getRandomFactWithTruthValue() {
  const { text: trueFact } = await getRandomFact();
  const isTrue = Math.random() < 0.5;
  return {
    text: isTrue ? trueFact : generateFalseFact(trueFact),
    isTrue,
  };
}
