import { NextResponse } from 'next/server';
import sql from '@/lib/config/db';

export async function GET() {
  try {
    // FIX: Use `sql` to execute the query
    const products = await sql`SELECT * FROM products WHERE is_deleted = FALSE;`;
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
 
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      product_name,
      product_desc,
      status = 'Draft',
      created_by
    } = body;

    if (!product_name || !created_by) {
      return NextResponse.json({ error: 'product_name and created_by are required.' }, { status: 400 });
    }

    // FIX: Use `sql` to execute the query
    const result = await sql`
      INSERT INTO products (
        product_name,
        product_desc,
        status,
        created_by
      ) VALUES (
        ${product_name},
        ${product_desc},
        ${status},
        ${created_by}
      ) RETURNING *;
    `;
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const {
      product_id,
      product_name,
      product_desc,
      status,
      updated_by,
      is_deleted
    } = body;

    if (!product_id || !updated_by) {
      return NextResponse.json({ error: 'product_id and updated_by are required.' }, { status: 400 });
    }

    const allowedStatuses = ['Draft', 'Published', 'Archived'];
    if (status && !allowedStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status value. Must be one of Draft, Published, or Archived.' }, { status: 400 });
    }

    // Build the update query with individual template literals for NeonDB
    let result;
    
    if (product_name !== undefined && product_desc !== undefined && status !== undefined && is_deleted !== undefined) {
      result = await sql`
        UPDATE products SET
          product_name = ${product_name},
          product_desc = ${product_desc},
          status = ${status},
          is_deleted = ${is_deleted},
          updated_by = ${updated_by},
          updated_at = CURRENT_TIMESTAMP
        WHERE product_id = ${product_id}
        RETURNING *;
      `;
    } else if (product_name !== undefined && product_desc !== undefined && status !== undefined) {
      result = await sql`
        UPDATE products SET
          product_name = ${product_name},
          product_desc = ${product_desc},
          status = ${status},
          updated_by = ${updated_by},
          updated_at = CURRENT_TIMESTAMP
        WHERE product_id = ${product_id}
        RETURNING *;
      `;
    } else if (product_name !== undefined && product_desc !== undefined) {
      result = await sql`
        UPDATE products SET
          product_name = ${product_name},
          product_desc = ${product_desc},
          updated_by = ${updated_by},
          updated_at = CURRENT_TIMESTAMP
        WHERE product_id = ${product_id}
        RETURNING *;
      `;
    } else if (product_name !== undefined && status !== undefined) {
      result = await sql`
        UPDATE products SET
          product_name = ${product_name},
          status = ${status},
          updated_by = ${updated_by},
          updated_at = CURRENT_TIMESTAMP
        WHERE product_id = ${product_id}
        RETURNING *;
      `;
    } else if (product_name !== undefined) {
      result = await sql`
        UPDATE products SET
          product_name = ${product_name},
          updated_by = ${updated_by},
          updated_at = CURRENT_TIMESTAMP
        WHERE product_id = ${product_id}
        RETURNING *;
      `;
    } else if (product_desc !== undefined) {
      result = await sql`
        UPDATE products SET
          product_desc = ${product_desc},
          updated_by = ${updated_by},
          updated_at = CURRENT_TIMESTAMP
        WHERE product_id = ${product_id}
        RETURNING *;
      `;
    } else if (status !== undefined) {
      result = await sql`
        UPDATE products SET
          status = ${status},
          updated_by = ${updated_by},
          updated_at = CURRENT_TIMESTAMP
        WHERE product_id = ${product_id}
        RETURNING *;
      `;
    } else if (is_deleted !== undefined) {
      result = await sql`
        UPDATE products SET
          is_deleted = ${is_deleted},
          updated_by = ${updated_by},
          updated_at = CURRENT_TIMESTAMP
        WHERE product_id = ${product_id}
        RETURNING *;
      `;
    } else {
      result = await sql`
        UPDATE products SET
          updated_by = ${updated_by},
          updated_at = CURRENT_TIMESTAMP
        WHERE product_id = ${product_id}
        RETURNING *;
      `;
    }

    if (result.length === 0) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }
    return NextResponse.json(result[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { product_id, updated_by } = body;

    if (!product_id || !updated_by) {
      return NextResponse.json({ error: 'product_id and updated_by are required.' }, { status: 400 });
    }

    const result = await sql`
      UPDATE products SET
        is_deleted = true,
        updated_by = ${updated_by},
        updated_at = CURRENT_TIMESTAMP
      WHERE product_id = ${product_id} AND is_deleted = false
      RETURNING *;
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Product not found or already deleted.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully.', product: result[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}