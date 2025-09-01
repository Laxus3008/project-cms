# Product CMS - Next.js

A modern Content Management System for products built with Next.js, NeonDB (PostgreSQL), and Tailwind CSS.

## 🚀 Live Demo

**Live Website**: [https://project-cms-gamma.vercel.app](https://project-cms-gamma.vercel.app)

## Features

- ✅ **Product Management**: Create, read, update, and delete products
- ✅ **Status Management**: Draft, Published, and Archived statuses
- ✅ **Live Site View**: Public-facing page showing only published products
- ✅ **Responsive Design**: Works on desktop and mobile devices
- ✅ **Real-time Updates**: Instant refresh after operations
- ✅ **Modal Forms**: Clean UI for adding and editing products

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: NeonDB (PostgreSQL)
- **HTTP Client**: Axios
- **Deployment**: Vercel

## Database Schema

```sql
-- Create the custom status type
CREATE TYPE product_status AS ENUM ('Draft', 'Published', 'Archived');

-- Create the products table
CREATE TABLE products (
    product_id   SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    product_desc TEXT,
    status       product_status DEFAULT 'Draft',
    
    -- Audit Columns
    created_by   VARCHAR(50) NOT NULL,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by   VARCHAR(50),
    updated_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_deleted   BOOLEAN DEFAULT FALSE
);
```

## API Endpoints

- `GET /api/allProducts` - Get all products (excluding deleted)
- `POST /api/allProducts` - Create a new product
- `PATCH /api/allProducts` - Update an existing product
- `DELETE /api/allProducts` - Soft delete a product
- `GET /api/live` - Get only published products

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- NeonDB account and database

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd next-project-cms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL=your_neondb_connection_string
   ```

4. **Set up the database**
   Run the SQL commands above in your NeonDB console to create the table.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment on Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variable:
   - `DATABASE_URL`: Your NeonDB connection string
6. Click "Deploy"

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── allProducts/
│   │   │   └── route.js          # CRUD operations for products
│   │   └── live/
│   │       └── route.js          # Published products only
│   ├── live/
│   │   └── page.jsx              # Public live site
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   └── ProductManagement.jsx     # Main admin interface
├── lib/
│   └── config/
│       └── db.js                 # Database connection
├── public/
├── .env.local                    # Environment variables
├── vercel.json                   # Vercel configuration
└── README.md
```

## Usage

### Admin Interface
- Access the admin interface at `/`
- Create, edit, and delete products
- Change product status (Draft/Published/Archived)
- View live site

### Live Site
- Access the public site at `/live`
- Shows only published products
- Clean, public-facing design

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | NeonDB connection string | `postgresql://user:pass@host/db` |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
