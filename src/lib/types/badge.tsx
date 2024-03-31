export type Badge = {
   has_synonyms: boolean;
   is_moderator_only: boolean;
   is_required: boolean;
   count: number;
   name: string;
   collectives?: BadgeCollectives[];
};

export type BadgeCollectives = {
   tags: string[];
   external_links: { type: string; link: string }[];
   description: string;
   link: string;
   name: string;
   slug: string;
};
