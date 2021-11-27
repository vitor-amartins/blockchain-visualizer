import React from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import { BlockBody, BlockHash, BlockHeader, BlockTable, BlockTitle, StyledBlock } from './styles';

const Block = ({ block }) => {
  const type = block.type;
  const error = block.message;

  return (
    <StyledBlock className={type}>
      <BlockTitle>
        <div className="index" onClick={() => error ? toast.error(`#${block.index}: ${error}`) : toast.success('Bloco válido')}>
          #{block.index}
        </div>
        <BlockHash className="monospaced">{block.hash}</BlockHash>
      </BlockTitle>

      <hr />

      <BlockHeader>
        <div className="title">Cabeçalho</div>
        <BlockTable>
          <tbody>
            <tr id="hash-previous">
              <td>Hash do bloco anterior:</td>
              <td className="monospaced">{block.previousHash}</td>
            </tr>
            <tr id="hash-body">
              <td>Hash do corpo do bloco:</td>
              <td className="monospaced">{block.bodyHash}</td>
            </tr>
            <tr id="timestamp">
              <td>Timestamp:</td>
              <td className="monospaced">{block.timestamp} ({dayjs.unix(block.timestamp).format('DD/MM/YYYY HH:mm:ss')})</td>
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
        <div className="title">Transações</div>
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
                    <td>{transaction.from || <i>Moedas Recém-Geradas</i>}</td>
                    <td>{transaction.to}</td>
                    <td>{transaction.value} BTC</td>
                    <td>{transaction.fee} BTC</td>
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
