import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import NFTCard from './NFTCard';

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
  tokenId: '397',
  types: ['erc20', 'erc721'],
  type: 'erc721',
  thumbnail: 'https://picsum.photos/286',
  contractAddress: '0xecbfef3465bde3a6e14a01ac7d988c88ad05e06d',
  externalUrl: null,
  tokenUrl:
    // eslint-disable-next-line max-len
    'https://ipfs.io/ipfs/QmZ4kT8gkPxWLwsNZFkGXU8GZ5kVNWuC22C9McRHYb1pk7/397.json',
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
