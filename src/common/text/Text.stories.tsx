import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Text from './Text';

export default {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Lorem Ipsum is simply dummy text of the.',
  size: 'md',
};
