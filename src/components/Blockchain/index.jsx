import React from 'react';

import Block from '../Block';
import { StyledBlockchain } from './styles';

const Blockchain = ({ blocks }) => (
  <StyledBlockchain>
    {blocks.map((block, index) => (
      <Block 
        block={block} 
        previousBlock={index === 0 ? null : blocks[index - 1]} 
        key={block.index}
      />
    ))}
  </StyledBlockchain>
);

export default Blockchain;
