import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: 'Button',
};

export const Ghost = Template.bind({});
Ghost.args = {
  ...Default.args,
  ghost: true,
};

export const Large = Template.bind({});
Large.args = {
  ...Default.args,
  size: 'lg',
};

export const Small = Template.bind({});
Small.args = {
  ...Default.args,
  size: 'sm',
};
