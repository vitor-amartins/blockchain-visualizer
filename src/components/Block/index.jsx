import React from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import { BlockBody, BlockHash, BlockHeader, BlockTable, BlockTitle, StyledBlock } from './styles';
import Emoji from '../Emoji';
import messages from '../../utils/messages';

const Block = ({ block }) => {
  const type = block.type;
  const error = block.message;

  const toastError = () => {
    error ? toast.error(`#${block.index}: ${error}`) : toast.success('Bloco válido');
  };

  const FeedbackEmoji = (...expectedMessages) => {
    if (expectedMessages.includes(error)) {
      return (
        <>
          &nbsp;
          <Emoji label="error" symbol="❌" onClick={toastError} />
        </>
      )
    }
    return null;
  };

  return (
    <StyledBlock className={type}>
      <BlockTitle>
        <div className="index" onClick={toastError}>
          #{block.index}
        </div>
        <BlockHash className="monospaced">
          {block.hash}
          {FeedbackEmoji(messages.INVALID_BLOCK_HASH, messages.INVALID_HASH_FOR_DIFFICULTY)}
        </BlockHash>
      </BlockTitle>

      <hr />

      <BlockHeader>
        <div className="title">Cabeçalho</div>
        <BlockTable>
          <tbody>
            <tr id="hash-previous">
              <td>Hash do bloco anterior:</td>
              <td className="monospaced">
                {block.previousHash}
                {FeedbackEmoji(messages.INVALID_PREVIOUS_HASH)}
              </td>
            </tr>
            <tr id="hash-body">
              <td>Hash do corpo do bloco:</td>
              <td className="monospaced">
                {block.bodyHash}
                {FeedbackEmoji(messages.INVALID_BODY_HASH)}
              </td>
            </tr>
            <tr id="timestamp">
              <td>Timestamp:</td>
              <td className="monospaced">
                {block.timestamp}
                &nbsp;
                ({dayjs.unix(block.timestamp).format('DD/MM/YYYY HH:mm:ss')})
                {FeedbackEmoji(messages.INVALID_TIMESTAMP_FROM_PREVIOUS, messages.INVALID_TIMESTAMP_IN_FUTURE)}
              </td>
            </tr>
            <tr id="difficulty">
              <td>Dificuldade:</td>
              <td className="monospaced">{block.difficulty}</td>
            </tr>
            <tr id="nonce">
              <td>Nonce:</td>
              <td className="monospaced">{block.nonce}</td>
            </tr>
            <tr id="version">
              <td>Versão:</td>
              <td className="monospaced">{block.version}</td>
            </tr>
          </tbody>
        </BlockTable>
      </BlockHeader>

      <BlockBody>
        <div className="title">
          Transações
          {FeedbackEmoji(messages.INVALID_NUMBER_OF_TRANSACTIONS, messages.INVALID_REWARD_TRANSACTION, messages.INVALID_TRANSACTION)}
        </div>
        <BlockTable style={{ tableLayout: 'fixed' }}>
          {block.transactions.length ? (
            <>
              <thead>
                <tr id="body-header">
                  <th>Origem:</th>
                  <th>Destino:</th>
                  <th>Valor:</th>
                  <th>Taxa:</th>
                </tr>
              </thead>
              <tbody>
                {block.transactions.map((transaction) => (
                  <tr className="transaction-row" key={transaction.id}>
                    <td>
                      {transaction.from || <i>Moedas Recém-Geradas</i>}
                    </td>
                    <td>{transaction.to}</td>
                    <td>
                      {`${transaction.value} BTC`}
                      {transaction.from && FeedbackEmoji(messages.INVALID_TRANSACTION_VALUE_BALANCE, messages.INVALID_TRANSACTION_VALUE)}
                    </td>
                    <td>
                      {transaction.from ? (
                        <>
                          {`${transaction.fee} BTC`}
                          {FeedbackEmoji(messages.INVALID_TRANSACTION_FEE)}
                        </>
                      ) : (
                        <>
                          {transaction.fee ? `${transaction.fee} BTC` : '-'}
                          {FeedbackEmoji(messages.INVALID_REWARD_TRANSACTION_FEE)}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <tbody>
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  Não há transações nesse bloco
                </td>
              </tr>
            </tbody>
          )}
          
        </BlockTable>
      </BlockBody>
    </StyledBlock>
  );
};

export default Block;
