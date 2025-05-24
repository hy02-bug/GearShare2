import Layout from '@/Layouts/Layout';
import { usePage } from '@inertiajs/react';
import React from "react";
import ProfileCard from './Components/ProfileCard';
import Navigation from './Components/Navigation';
import Tab from './Components/Tab';
import { Button } from '@mui/material';

export default function UserProfile() {
     const { user } = usePage().props;
  return (
    <Layout>
    <div>
      <ProfileCard/>
      <Button variant="contained" href="/equipment/create">Add Listing</Button>
      <Tab/>
    </div>
    </Layout>
  );
}
