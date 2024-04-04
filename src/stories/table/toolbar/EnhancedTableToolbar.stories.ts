import type { Meta, StoryObj } from '@storybook/react';
import { EnhancedTableToolbar } from './EnhancedTableToolbar';

const meta: Meta<typeof EnhancedTableToolbar> = {
   component: EnhancedTableToolbar,
   title: 'Table/EnhancedTableToolbar',
   tags: ['autodocs'],
   argTypes: {
      resultsPerPage: {
         defaultValue: 30,
         control: { type: 'number' },
      },
   },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const EnahncedTableToolbar: Story = {};
