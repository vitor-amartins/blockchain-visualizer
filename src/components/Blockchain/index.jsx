import React from 'react';
import { validateBlock } from '../../utils/block-validation';

import Block from '../Block';
import { StyledBlockchain } from './styles';

const Blockchain = ({ blocks }) => {
  const validatedBlocks = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    validatedBlocks.push(validateBlock(block, i === 0 ? null : validatedBlocks[i - 1]))
  };
  console.log(validatedBlocks);

  return (
    <StyledBlockchain>
      {validatedBlocks.map((block) => (
        <Block 
          block={block}
          key={block.index}
        />
      ))}
    </StyledBlockchain>
  )
};

export default Blockchain;
