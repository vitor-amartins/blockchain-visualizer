import { checkDifficultyForHash, getBodyHash, getHeaderHash } from "./src/hash.js";

const block = {
  index: 3,
  previousHash: '0000430c6dde02ed9d1e447decf80e2937a308d8cde4da2f0b4e9350dad4cbbd',
  timestamp: 1637434109,
  difficulty: 5,
  version: '1.0.0',
  transactions: [
    {
      id: '37d0de487e4754b9bbb6d1d7bf2316a8d5accafbf0186ecfbccd715714eed7b6',
      from: null,
      to: 'Vitor',
      value: 50,
      fee: 0,
    },
  ],
};

var nonce = -1;
var hash = '';
block.bodyHash = getBodyHash(block.transactions);

while (!checkDifficultyForHash(block.difficulty, hash)) {
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
console.log('Body hash:', block.bodyHash);
