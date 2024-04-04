import type { Meta, StoryObj } from '@storybook/react';
import { EnhancedTableHead } from './EnhancedTableHead';

const meta: Meta<typeof EnhancedTableHead> = {
   component: EnhancedTableHead,
   title: 'Table/EnhancedTableHead',
   tags: ['autodocs'],
   argTypes: {
      rowCount: {
         defaultValue: 30,
         control: { type: 'number' },
      },
   },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const EnahncedTableHead: Story = {};
