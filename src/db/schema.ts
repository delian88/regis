import { pgTable, serial, text, integer, doublePrecision, boolean, timestamp, json, bigint } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const agents = pgTable('agents', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  companyName: text('company_name').notNull(),
  slug: text('slug').notNull().unique(),
  logoUrl: text('logo_url'),
  phone: text('phone').notNull(),
  whatsapp: text('whatsapp').notNull(),
  email: text('email'),
  location: text('location').notNull(),
  isVerified: boolean('is_verified').default(true).notNull(),
  agentType: text('agent_type').notNull().default('agent'), // 'agent' | 'developer'
  activeListingsCount: integer('active_listings_count').default(1),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const properties = pgTable('properties', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  category: text('category').notNull(), // 'sale' | 'rent' | 'shortlet' | 'jv'
  propertyType: text('property_type').notNull(), // 'flats' | 'houses' | 'land' | 'commercial'
  subtype: text('subtype').notNull(), // e.g. 'detached-duplex', 'mini-flat', etc.
  price: doublePrecision('price').notNull(),
  currency: text('currency').default('NGN').notNull(),
  period: text('period'), // 'yearly' | 'monthly' | 'daily' | null
  state: text('state').notNull(),
  locality: text('locality').notNull(),
  area: text('area'),
  streetAddress: text('street_address'),
  bedrooms: integer('bedrooms').default(0),
  bathrooms: integer('bathrooms').default(0),
  toilets: integer('toilets').default(0),
  parkingSpaces: integer('parking_spaces').default(0),
  plotSizeSqm: doublePrecision('plot_size_sqm'),
  isFurnished: boolean('is_furnished').default(false).notNull(),
  isServiced: boolean('is_serviced').default(false).notNull(),
  isShared: boolean('is_shared').default(false).notNull(),
  isFeatured: boolean('is_featured').default(false).notNull(),
  isVerified: boolean('is_verified').default(true).notNull(),
  images: json('images').$type<string[]>().default([]).notNull(),
  amenities: json('amenities').$type<string[]>().default([]).notNull(),
  agentId: integer('agent_id').references(() => agents.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const propertyRequests = pgTable('property_requests', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  requestType: text('request_type').notNull(), // 'buy' | 'rent' | 'shortlet' | 'jv'
  propertyType: text('property_type').notNull(),
  state: text('state').notNull(),
  locality: text('locality'),
  bedrooms: integer('bedrooms'),
  budgetMin: doublePrecision('budget_min'),
  budgetMax: doublePrecision('budget_max'),
  details: text('details'),
  status: text('status').default('active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const favorites = pgTable('favorites', {
  id: serial('id').primaryKey(),
  propertyId: integer('property_id').references(() => properties.id).notNull(),
  userId: text('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const agentsRelations = relations(agents, ({ many }) => ({
  properties: many(properties),
}));

export const propertiesRelations = relations(properties, ({ one }) => ({
  agent: one(agents, {
    fields: [properties.agentId],
    references: [agents.id],
  }),
}));

export type Agent = typeof agents.$inferSelect;
export type NewAgent = typeof agents.$inferInsert;
export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;
export type PropertyRequest = typeof propertyRequests.$inferSelect;
export type NewPropertyRequest = typeof propertyRequests.$inferInsert;
export type Favorite = typeof favorites.$inferSelect;
