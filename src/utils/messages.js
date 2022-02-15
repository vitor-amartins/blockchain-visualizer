const messages = {
  INVALID_INDEX_ZERO: 'Índice 0 porém há um bloco anterior na cadeia',
  INVALID_INDEX: 'Índice do bloco não é o valor posterior do índice do bloco anterior',
  INVALID_PREVIOUS_HASH: 'Hash do bloco anterior não confere',
  INVALID_TIMESTAMP_FROM_PREVIOUS: 'Timestamp do bloco atual é menor ou igual que o do bloco anterior',
  INVALID_TIMESTAMP_IN_FUTURE: 'Timestamp do bloco atual é maior que o timestamp atual',
  INVALID_HASH_FOR_DIFFICULTY: 'A hash do bloco não possui a dificuldade exigida',
  INVALID_BODY_HASH: 'A hash do corpo do bloco não confere',
  INVALID_BLOCK_HASH: 'A hash do bloco não confere',
  INVALID_NUMBER_OF_TRANSACTIONS: 'O número de transações no block não é válido',
  INVALID_REWARD_TRANSACTION: 'A origem/destino da transação de recompensa não é válida',
  INVALID_REWARD_TRANSACTION_FEE: 'A taxa da transação de recompensa deve ser zero',
  INVALID_REWARD_TRANSACTION_VALUE: 'O valor da transação de recompensa deve ser maior ou igual a zero',
  INVALID_TRANSACTION: 'A origem/destino da transação não é válida',
  INVALID_TRANSACTION_FEE: 'A taxa da transação deve ser maior ou igual a zero',
  INVALID_TRANSACTION_VALUE: 'O valor da transação deve ser maior que zero',
  INVALID_PREVIOUS_BLOCK: 'O bloco anterior não é válido',
  INVALID_TRANSACTION_VALUE_BALANCE: 'O usuário origem não possui saldo suficiente para esta transação',
};

export default messages;
