import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer, } from 'drizzle-orm/sqlite-core'



export const User = sqliteTable('user', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    username: text('username').notNull(),
    password: text('password').notNull(),
   

})
