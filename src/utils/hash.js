import crypto from 'crypto';

const sha256 = (data) => crypto.createHash('sha256').update(data).digest('hex');

/**
 * getBodyHash stringify as JSON all the transactions and returns a SHA256 hash of this string
 * @param {Transaction[]} transactions 
 * @returns {string} The hash of the transactions
 */
export const getBodyHash = (transactions) => {
  const transactionsJson = JSON.stringify(transactions);
  return sha256(transactionsJson);
};

/**
 * @param {Object} blockHeader 
 * @returns {string} The hash of the header
 */
export const getHeaderHash = ({ index, previousHash, bodyHash, timestamp, difficulty, nonce, version }) => {
  return sha256(index + previousHash + bodyHash + timestamp + difficulty + nonce + version);
};
