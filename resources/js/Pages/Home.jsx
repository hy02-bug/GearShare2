import Layout from '@/Layouts/Layout';
import Card2 from '@/Components/Card2';
import { usePage, Head } from '@inertiajs/react';
import React from 'react';

export default function Home({ equipment = [] }) {
  return (
    <Layout header="Home Page">
      <Head title="Home Page" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome to GearShare!</h1>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {equipment.map((item) => {
            // Debug logging (remove in production)
            console.log('Media item:', item.media);

            return (
              <Card2
                key={item.id}
                item={{
                  ...item,
                  id: item.id,
                  name: item.name,
                  rentalPrice: item.rentalPrice,
                  size: item.size,
                  location: item.location,
                  image_url: item.media?.[0]?.file_path
                    ? `/storage/${item.media[0].file_path}`
                    : '/placeholder-image.jpg',
                  owner: {
                    name: item.owner?.name || 'Unknown'
                  }
                }}
              />
            );
          })}
        </div>

        {/* Empty state */}
        {equipment.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No equipment available yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
