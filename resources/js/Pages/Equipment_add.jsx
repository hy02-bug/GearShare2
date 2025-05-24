import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function ProductRentalForm({ user }) {

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    sports: '',
    size: '',
    condition: '',
    location: '',
    description: '',
    rentalPrice: '',
    dateAvailability: '',
    //pictures: [],
  });

//   const handleFileChange = (e) => {
//     setData('pictures', [...e.target.files]);
//   };

  function submit(e) {
    e.preventDefault();
    post("/equipment", {
      onSuccess: () => reset(),
    });
  }
 //console.log(useForm());

  return (
    <Layout header="Product Rental Form">
      <Head title="Product Rental Form" />

      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Product Rental Form</h1>


        <form onSubmit={submit} className="space-y-6">
          {/* Item Details Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Item Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {/* Item Name */}
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
              </div>
                {/* Sport Type Section */}
              <div>
                <label htmlFor="sports" className="block text-sm font-medium mb-1">Sports</label>
                <input
                  id="sports"
                  type="text"
                  value={data.sports}
                  onChange={e => setData('sports', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {errors.sports && <div className="text-red-600 text-sm mt-1">{errors.sports}</div>}
              </div>
                {/* Size Section*/}
              <div>
                <label htmlFor="size" className="block text-sm font-medium mb-1">Size</label>
                <input
                  id="size"
                  type="text"
                  value={data.size}
                  onChange={e => setData('size', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {errors.size && <div className="text-red-600 text-sm mt-1">{errors.size}</div>}
              </div>
                {/* Condition Section */}
              <div>
                <label htmlFor="condition" className="block text-sm font-medium mb-1">Condition</label>
                <input
                  id="condition"
                  type="text"
                  value={data.condition}
                  onChange={e => setData('condition', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {errors.condition && <div className="text-red-600 text-sm mt-1">{errors.condition}</div>}
              </div>
                {/* Location Section */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium mb-1">Location (City)</label>
                <input
                  id="location"
                  type="text"
                  value={data.location}
                  onChange={e => setData('location', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {errors.location && <div className="text-red-600 text-sm mt-1">{errors.location}</div>}
              </div>
            </div>
          </div>

          <hr className="my-4" />

          {/* Description Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Description (optional)</h2>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
              <textarea
                id="description"
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                className="w-full border rounded px-3 py-2"
                rows="3"
              />
              {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description}</div>}
            </div>
            {/* Insert Picture Section */}
            {/* <div>
              <label className="block text-sm font-medium mb-1">Picture (Put more than 1 picture)</label>
              <div className="border-2 border-dashed rounded p-4 text-center">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="pictures"
                />
                <label htmlFor="pictures" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-gray-600">Add picture</span>
                  </div>
                </label>
              </div>
              {errors.pictures && <div className="text-red-600 text-sm mt-1">{errors.pictures}</div>}
            </div> */}
          </div>

          <hr className="my-4" />

          {/* Pricing and Availability Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Pricing and availability</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="rentalPrice" className="block text-sm font-medium mb-1">Rental Price</label>
                <input
                  id="rentalPrice"
                  type="number"
                  value={data.rentalPrice}
                  onChange={e => setData('rentalPrice', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                  min="0"
                />
                {errors.rentalPrice && <div className="text-red-600 text-sm mt-1">{errors.rentalPrice}</div>}
              </div>

              <div>
                <label htmlFor="dateAvailability" className="block text-sm font-medium mb-1">Date Availability</label>
                <input
                  id="dateAvailability"
                  type="date"
                  value={data.dateAvailability}
                  onChange={e => setData('dateAvailability', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {errors.dateAvailability && <div className="text-red-600 text-sm mt-1">{errors.dateAvailability}</div>}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={processing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
            >
              {processing ? 'Processing...' : 'List my item'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
