import { NextResponse } from 'next/server';
import sql from '@/lib/config/db';

export async function GET() {
  try {
    const products = await sql`SELECT * FROM products WHERE status = 'Published' AND is_deleted = FALSE;`;
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
