import type { Meta, StoryObj } from '@storybook/react';
import { TagsTable } from './TagsTable';

const meta: Meta<typeof TagsTable> = {
   component: TagsTable,
   title: 'Table',
   tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TagsTableStory: Story = {};
