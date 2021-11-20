import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getBodyHash, getHeaderHash, checkDifficultyForHash } from '../../hash';

import { BlockBody, BlockHash, BlockHeader, BlockTable, BlockTitle, StyledBlock } from './styles';

const Block = ({ block, previousBlock }) => {
  const [type, setType] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    const isGenesis = block.index === 0 && previousBlock === null;

    // Check index and previous block
    if (block.index === 0 && previousBlock !== null) {
      setType('invalid');
      setError('Índice 0 porém há um bloco anterior na cadeia');
      return;
    }

    // Checks for non genesis blocks
    if (!isGenesis) {
      // Check if previous hash field match with the hash of the previous block
      if (block.previousHash !== previousBlock?.hash) {
        setType('invalid');
        setError('Hash do bloco anterior não confere');
        return;
      }
  
      // Check if the timestamp of this block is smaller than the timestamp from the previous block
      if (block.timestamp <= previousBlock?.timestamp) {
        setType('invalid');
        setError('Timestamp do bloco atual é menor que a do bloco anterior');
        return;
      }
    }

    // Check if hash has the ammount of zeros set by the difficulty
    if (!checkDifficultyForHash(block.difficulty, block.hash)) {
      setType('invalid');
      setError('A hash do bloco não possui a dificuldade exigida');
      return;
    }

    // Check the hash of the body
    if (getBodyHash(block.transactions) !== block.bodyHash) {
      setType('invalid');
      setError('A hash do corpo do bloco não confere');
      return;
    }

    // Check the hash of the header
    if (getHeaderHash(block) !== block.hash) {
      setType('invalid');
      setError('A hash do bloco não confere');
      return;
    }

    // We won't be checking the transactions on this project for now!

    setType('valid');
  }, [block, previousBlock]);

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
        </BlockTable>
      </BlockHeader>

      <BlockBody>
        <div className="title">Transações</div>
        <BlockTable style={{ tableLayout: 'fixed' }}>
          {block.transactions.length ? (
            <>
              <tr id="body-header">
                <th>Origem:</th>
                <th>Destino:</th>
                <th>Valor:</th>
                <th>Taxa:</th>
              </tr>
              {block.transactions.map((transaction) => (
              <tr className="transaction-row" key={transaction.id}>
                <td>{transaction.from || <i>Moedas Recém-Geradas</i>}</td>
                <td>{transaction.to}</td>
                <td>{transaction.value} BTC</td>
                <td>{transaction.fee} BTC</td>
              </tr>
            ))}
            </>
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                Não há transações nesse bloco
              </td>
            </tr>
          )}
          
        </BlockTable>
      </BlockBody>
    </StyledBlock>
  );
};

export default Block;
