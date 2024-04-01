export type Tag = {
   has_synonyms: boolean;
   is_moderator_only: boolean;
   is_required: boolean;
   count: number;
   name: string;
   collectives?: TagCollectives[];
};

export type TagCollectives = {
   tags: string[];
   external_links: { type: string; link: string }[];
   description: string;
   link: string;
   name: string;
   slug: string;
};

export type OmiTBooleanTagComparator = Omit<
   Tag,
   'has_synonyms' | 'is_moderator_only' | 'is_required' | 'collectives'
>;
