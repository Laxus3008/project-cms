'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LivePage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch published products from API
  useEffect(() => {
    fetchLiveProducts();
  }, []);

  const fetchLiveProducts = async () => {
    try {
      const response = await axios.get('/api/live');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching live products:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h1>
            <p className="text-gray-600">Discover our latest published products</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Admin
          </button>
        </div>

        {/* Published Products Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Published Products ({products.length})
          </h2>
          <p className="text-gray-600 mb-6">
            These products are currently live and visible to the public.
          </p>

          {products.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500">No published products available at the moment.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {products.map((product) => (
                <div key={product.product_id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {product.product_name}
                        </h3>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Live
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {product.product_desc}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Published {formatDate(product.created_at)}</span>
                        <span>ID: {product.product_id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Products Management System - Live View
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}