import { getBodyHash, getHeaderHash } from "./hash";
import messages from "./messages";

/**
 * checkIndex will check if the index of the block is correct given the previous block and his index
 * @param {Block} block 
 * @param {?CheckedBlock} previousBlock 
 * @returns {?string} Null if the check pass or a string with a message if the check fail
 */
const checkIndex = (block, previousBlock) => {
  if (block.index === 0 && previousBlock !== null) {
    return messages.INVALID_INDEX_ZERO;
  } else if (block.index === 0) {
    return;
  }
  if (block.index - 1 !== previousBlock?.index) {
    return messages.INVALID_INDEX;
  }
};

/**
 * checkHashOfPreviousBlock will check if the value of previousHash on the block is equal the value of hash from the previous block
 * @param {Block} block 
 * @param {?CheckedBlock} previousBlock 
 * @returns {?string} Null if the check pass or a string with a message if the check fail
 */
const checkHashOfPreviousBlock = (block, previousBlock) => {
  if (previousBlock === null) return;
  if (block.previousHash !== previousBlock.hash) {
    return messages.INVALID_PREVIOUS_HASH;
  }
};

/**
 * checkTimestamp will check if the value of timestamp on the block is greater than the value of timestamp from the previous block
 * and if the timestamp of the block is not in the future
 * @param {Block} block 
 * @param {?CheckedBlock} previousBlock 
 * @returns {?string} Null if the check pass or a string with a message if the check fail
 */
 const checkTimestamp = (block, previousBlock) => {
  if (previousBlock === null) return;
  if (block.timestamp <= previousBlock.timestamp) {
    return messages.INVALID_TIMESTAMP_FROM_PREVIOUS;
  }
  if (block.timestamp > new Date().getTime() / 1000) {
    return messages.INVALID_TIMESTAMP_IN_FUTURE;
  }
};

/**
 * checkDifficultyOnHash will check if the hash contains the ammount of zeros at the beggining indicated by the value of the difficulty
 * @param {Block} block 
 * @returns {?string} Null if the check pass or a string with a message if the check fail
 */
const checkDifficultyOnHash = (block) => {
  const substring = block.hash.substring(0, block.difficulty);
  if (!(substring.match(/0/g) || []).length === block.difficulty) {
    return messages.INVALID_HASH_FOR_DIFFICULTY;
  }
};

/**
 * checkBodyHash will check if the hash of the transactions is the same value of bodyHash from the header
 * @param {Block} block 
 * @returns {?string} Null if the check pass or a string with a message if the check fail
 */
const checkBodyHash = (block) => {
  if (getBodyHash(block.transactions) !== block.bodyHash) {
    return messages.INVALID_BODY_HASH;
  }
};

/**
 * checkBlockHash will check if the hash of the header is the same value of the block's hash
 * @param {Block} block 
 * @returns {?string} Null if the check pass or a string with a message if the check fail
 */
const checkBlockHash = (block) => {
  if (getHeaderHash(block) !== block.hash) {
    return messages.INVALID_BLOCK_HASH;
  }
};

/**
 * checkTransactions will check if the block has at most two transactions, where the first one is the reward,
 * and the second one, if provided, is a transaction between two users
 * @param {Block} block 
 * @returns {?string} Null if the check pass or a string with a message if the check fail
 */
const checkTransactions = (block) => {
  if (block.transactions.length < 1 || block.transactions.length > 2) {
    return messages.INVALID_NUMBER_OF_TRANSACTIONS;
  }
  if (block.transactions[0].from !== null || block.transactions[0].to === null) {
    return messages.INVALID_REWARD_TRANSACTION;
  }
  if (block.transactions[0].fee !== 0) {
    return messages.INVALID_REWARD_TRANSACTION_FEE;
  }
  if (block.transactions[0].value < 0) {
    return messages.INVALID_REWARD_TRANSACTION_VALUE;
  }

  if (block.transactions.length === 1) return;
  
  if (block.transactions[1].from === null || block.transactions[0].to === null) {
    return messages.INVALID_TRANSACTION;
  }
  if (block.transactions[1].fee < 0) {
    return messages.INVALID_TRANSACTION_FEE;
  }
  if (block.transactions[1].value <= 0) {
    return messages.INVALID_TRANSACTION_VALUE;
  }
};

/**
 * callCheck execute a check provided and return a CheckedBlock if the check fail, i.e., the block is invalid
 * @param {Function} fn 
 * @returns {CheckedBlock}
 */
const callCheck = (fn, block) => {
  const message = fn();
  if (message) return {...block, type: 'invalid', message};
};

/**
 * validateBlock get one block and his previous block and returns a CheckedBlock indicating if the provided block is valid and if it isn't,
 * includes a message indicating why.
 * @param {Block} block The block to validate
 * @param {?CheckedBlock} previousCheckedBlock The previous block, that was already validated
 * @returns {CheckedBlock}
 */
export const validateBlock = (block, previousCheckedBlock) => {
  if (previousCheckedBlock !== null && previousCheckedBlock.type !== 'valid') {
    return {...block, type: 'invalid', message: messages.INVALID_PREVIOUS_BLOCK};
  }

  const checks = [
    () => checkIndex(block, previousCheckedBlock),
    () => checkHashOfPreviousBlock(block, previousCheckedBlock),
    () => checkTimestamp(block, previousCheckedBlock),
    () => checkDifficultyOnHash(block),
    () => checkBodyHash(block),
    () => checkBlockHash(block),
    () => checkTransactions(block),
  ];

  for (let i = 0; i < checks.length; i++) {
    const check = checks[i];
    const checkedBlock = callCheck(check, block);
    if (checkedBlock) return checkedBlock;
  }

  return {...block, type: 'valid'};
};
