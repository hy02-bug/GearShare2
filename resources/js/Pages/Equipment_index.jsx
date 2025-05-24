import React from 'react';
import Layout from '@/Layouts/Layout';
import Card2 from '@/Components/Card2';
import Sorting from '@/Components/Sorting';
import FilterBar from '@/Components/FilterBar';
import { Head } from '@inertiajs/react';
import { Button } from '@headlessui/react';

export default function Equipment_index({ equipment }) {
  return (
    <Layout header={null}>
        <Head title="Equipment List Page"/>
        <div className="flex">
            <FilterBar/>
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6 px-5 lg:px-[19.5px] gap-y-9">
        {equipment.map((item) => (
            <Card2 key={item.id} item={item} />
        ))}
        </div>
    </Layout>
  );
}

