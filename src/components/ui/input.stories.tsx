import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@/components/ui/input';

const meta = {
  title: 'Atoms/input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    placeholder:{control:'text'},
    disabled:{control:'boolean'},
    type: {control: { type: 'select' },
    options: [
      'email',
      'text',
      'password',
      'file'
    ],},
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Email',
    type: 'email',
  },
};