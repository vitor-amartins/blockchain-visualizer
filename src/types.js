/**
 * Transaction
 * @typedef {Object} Transaction
 * @property {string} id
 * @property {?string} from The transaction that have this property null represents the block's reward
 * @property {string} to
 * @property {Number} value
 * @property {Number} fee
 */

/**
 * Block
 * @typedef {Object} Block
 * @property {Number} index
 * @property {string} hash
 * @property {string} previousHash
 * @property {string} bodyHash
 * @property {Number} timestamp
 * @property {Number} difficulty
 * @property {Number} nonce
 * @property {string} version
 * @property {Transaction[]} transactions
 */

/**
 * CheckedBlock
 * @typedef {Object} CheckedBlock
 * @property {Number} index
 * @property {string} hash
 * @property {string} previousHash
 * @property {string} bodyHash
 * @property {Number} timestamp
 * @property {Number} difficulty
 * @property {Number} nonce
 * @property {string} version
 * @property {Transaction[]} transactions
 * @property {string} type Can be "valid" or "invalid"
 * @property {?string} message If the block is valid, then it's null, otherwise, it's a message indicating why the block is invalid
 */

/**
 * Blockchain
 * @typedef {Block[]} Blockchain
 */
