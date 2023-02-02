import { drizzle } from 'drizzle-orm-pg/node'
import { Pool } from 'pg'
import config from 'config'
import * as Schema from './schema'

import type { DatabaseConfig } from './types'

const dbConfig = config.get<DatabaseConfig>('Database.dbPhotodrop')
const pool = new Pool(dbConfig)
const database = drizzle(pool)

export default {
	DB: database,
	Tables: Schema
}
