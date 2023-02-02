import { pgTable, varchar, uuid, date, boolean, decimal, text, timestamp } from 'drizzle-orm-pg'

/**
 * Name 'User' is reserved, had to rename
 */
export const UserProfile = pgTable('user_profile', {
	id: uuid('id').defaultRandom().primaryKey().notNull(),
	password: varchar('password', { length: 25 }).notNull(),
	name: varchar('name'),
	phone: varchar('phone'),
	email: varchar('email'),
	selfie: varchar('selfie') // Will be stored as a link to a file
})

export const Preferences = pgTable('preferences', {
	profileId: uuid('profileId')
		.references(() => UserProfile.id)
		.primaryKey(),
	isUnsubscribed: boolean('is_unsubscribed').default(false),
	sendEmail: boolean('send_email').default(true),
	sendText: boolean('send_text').default(true)
})

export const Photographer = pgTable('photographer', {
	login: varchar('login', { length: 25 }).primaryKey().notNull(),
	password: varchar('password', { length: 25 }).notNull()
})

export const Album = pgTable('album', {
	id: uuid('id').defaultRandom().primaryKey().notNull(),
	photographer: uuid('photographer').references(() => Photographer.login),
	name: varchar('name').notNull(),
	location: varchar('location').notNull()
})

export const Photo = pgTable('photo', {
	id: uuid('id').defaultRandom().primaryKey().notNull(),
	albumId: uuid('albumId').references(() => Album.id),
	fullLink: varchar('full_link').notNull(),
	thumbLink: varchar('thumb_link').notNull(),
	markedLink: varchar('marked_link').notNull(),
	markedThumbLink: varchar('marked_thumb_link').notNull(),
	creationDate: date('creation_date').defaultNow().notNull()
})

export const UserPhoto = pgTable('user_photo', {
	userId: uuid('user_id').references(() => UserProfile.id),
	photoId: uuid('photo_id').references(() => Photo.id),
	isPurchased: boolean('is_purchased').default(false),
	price: decimal('price', { precision: 2 }).default('5.00').notNull(), // Price in $
	uploadDate: date('upload_date').defaultNow().notNull()
})

// Functional tables start here

export const UserTokens = pgTable('user_tokens', {
	id: uuid('id').references(() => UserProfile.id),
	token: text('token').primaryKey().notNull(),
	expiration: timestamp('expiration'),
	isTerminated: boolean('is_terminated').default(false)
})

export const PhotographerTokens = pgTable('user_tokens', {
	login: varchar('login').references(() => Photographer.login),
	token: text('token').primaryKey().notNull(),
	expiration: timestamp('expiration'),
	isTerminated: boolean('is_terminated').default(false)
})
