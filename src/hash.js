import crypto from 'crypto';

const sha256 = (data) => crypto.createHash('sha256').update(data).digest('hex');

export const getBodyHash = (transactions) => {
  const transactionsJson = JSON.stringify(transactions);
  return sha256(transactionsJson);
};

export const getHeaderHash = ({ index, previousHash, bodyHash, timestamp, difficulty, nonce, version }) => {
  return sha256(index + previousHash + bodyHash + timestamp + difficulty + nonce + version);
};

export const checkDifficultyForHash = (difficulty, hash) => {
  const substring = hash.substring(0, difficulty);
  return (substring.match(/0/g) || []).length === difficulty;
};
