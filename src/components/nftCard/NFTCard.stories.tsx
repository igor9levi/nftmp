import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import NFTCard from './NFTCard';
import { TokenType } from '../../types';

export default {
  title: 'Components/NFTCard',
  component: NFTCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NFTCard>;

const Template: ComponentStory<typeof NFTCard> = (args) => (
  <div style={{ width: '316px' }}>
    <NFTCard {...args} />
  </div>
);

const content = {
  tokenId: '23412',
  type: 'ERC721' as TokenType,
  thumbnail: 'https://picsum.photos/286',
  tokenAddress: '0x1234456',
  link: 'https://www.etherscan.com',
};

export const Card = Template.bind({});
Card.args = {
  token: {
    ...content,
  },
};

export const CardWithUnavailableImage = Template.bind({});
CardWithUnavailableImage.args = {
  token: {
    ...content,
    thumbnail: 'https://picsumde.photos/286',
  },
};
