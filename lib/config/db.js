import {neon} from '@neondatabase/serverless';


const sql = neon(process.env.DATABASE_URL);

// Export both the database connection function and the sql helper
// export { db, sql };

// const sql = neon(`${process.env.DATABASE_URL}`);

export default sql;