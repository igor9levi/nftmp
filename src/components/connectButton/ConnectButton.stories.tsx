import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import ConnectButton from './ConnectButton';

export default {
  title: 'Components/ConnectButton',
  component: ConnectButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConnectButton>;

const Template: ComponentStory<typeof ConnectButton> = (args) => (
  <div style={{ width: '316px' }}>
    <ConnectButton {...args} />
  </div>
);

export const Base = Template.bind({});
Base.args = {};
