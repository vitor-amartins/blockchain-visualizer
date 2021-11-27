import { getBodyHash, getHeaderHash } from './src/utils/hash.js';

/**
 * checkDifficultyOnHash will check if the hash contains the ammount of zeros at the beggining indicated by the value of the difficulty
 * @param {Block} block 
 * @returns {?string} Null if the check pass or a string with a message if the check fail
 */
 export const checkDifficultyOnHash = (hash, difficulty) => {
  const substring = hash.substring(0, difficulty);
  return (substring.match(/0/g) || []).length === difficulty;
};

const block = {
  index: 5,
  previousHash: '0000080d88ccb190f4e1f76de64e5630247c34c5484117cbd7fc1ebe8d047732',
  timestamp: 1638028452,
  difficulty: 4,
  version: '1.0.0',
  transactions: [
    {
      id: 'f4bf9f7fcbedaba0392f108c59d8f4a38b3838efb64877380171b54475c2ade8',
      from: null,
      to: 'Vitor',
      value: 50,
      fee: 0,
    },
    {
      id: 'b323ba8eb5a4df2f162b251ea20b37f6887c7f88714de8ab70ebb4dc99beade5',
      from: 'Léo',
      to: 'Vitor',
      value: 19,
      fee: 1,
    },
  ],
};

var nonce = -1;
var hash = '';
block.bodyHash = getBodyHash(block.transactions);

while (!checkDifficultyOnHash(hash, block.difficulty)) {
  nonce += 1;
  hash = getHeaderHash({ 
    index: block.index, 
    previousHash: block.previousHash, 
    bodyHash: block.bodyHash, 
    timestamp: block.timestamp, 
    difficulty: block.difficulty, 
    nonce: nonce, 
    version: block.version,
  });
  console.log(hash, nonce);
}
console.log('Block mined!');
console.log('Hash:', hash);
console.log('Nonce:', nonce);
console.log('Body hash:', block.bodyHash);
