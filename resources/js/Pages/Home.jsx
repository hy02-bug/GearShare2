import Layout from '@/Layouts/Layout';
import Card2 from '@/Components/Card2';
import { usePage,Head } from '@inertiajs/react';
import React from 'react';

export default function Home({equipment}) {


  return (
    <Layout header="Home Page">
      <Head title="Home Page" />
      <div>
        {/* Your dashboard content here */}
        Welcome to GearShare!
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6 px-5 lg:px-[19.5px] gap-y-9">
        {equipment.map((item) => (
            <Card2 key={item.id} item={item} />
        ))}
        </div>
      </div>
    </Layout>
  );
}


