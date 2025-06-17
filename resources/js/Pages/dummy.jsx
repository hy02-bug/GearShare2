import PropTypes from 'prop-types';
import Layout from '@/Layouts/Layout';
import ProductImages from '@/Components/product/ProductImages';
import ProductInfo from '@/Components/product/ProductInfo';
import ProductSpecs from '@/Components/product/ProductSpecs';
import SellerInfo from '@/Components/product/SellerInfo';
import BookingForm from '@/Components/booking/BookingForm';
// import ReviewsSection from '@/Components/review/ReviewsSection';

export default function EquipmentDetailPage({ equipment,existingRequest }) {
  const product = {
    title: equipment.name,
    images: equipment.image_path ? [equipment.image_path] : ['/placeholder-image.jpg'],
    description: equipment.description,
    size: equipment.size,
    condition: equipment.condition,
    location: equipment.location,
    specs: [
      { name: "Sport", value: equipment.sports },
      { name: "Availability", value: equipment.dateAvailability },
    ]
  };

  const seller = equipment.owner ? {
    id: equipment.owner.id,
    name: equipment.owner.name,
    email: equipment.owner.email,
    profileLink: `/users/${equipment.owner.id}`,
    rating: calculateUserRating(equipment.owner.id) || 0,
    ratingCount: equipment.owner.reviews?.length || 0,
    joinDate: formatJoinDate(equipment.owner.created_at),
    profileImage: equipment.owner.profile_image || '/default-avatar.jpg',
    verified: equipment.owner.verified || false
  } : {
    id: null,
    name: 'Unknown Owner',
    email: '',
    profileLink: '#',
    rating: 0,
    ratingCount: 0,
    joinDate: 'Unknown',
    profileImage: '/default-avatar.jpg',
    verified: false
  };

  function calculateUserRating(userId) {
    return 4.5;
  }

  function formatJoinDate(dateString) {
    if (!dateString) return 'Unknown';
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <ProductImages images={product.images} title={product.title} />

          <div>
            <ProductInfo equipment={equipment} />
            <SellerInfo seller={seller} />

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Details</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Size:</span> {product.size}</p>
                <p><span className="font-medium">Condition:</span> {product.condition}</p>
                <p><span className="font-medium">Location:</span> {product.location}</p>
              </div>
            </div>

            <ProductSpecs specs={product.specs} />
          </div>
        </div>

        <BookingForm
          defaultLocation={equipment.location}
          equipmentId={equipment.id}
          equipment={equipment}
          existingRequest={existingRequest}
        />

        {/* <ReviewsSection equipmentId={equipment.id} /> */}
      </div>
    </Layout>
  );
}

EquipmentDetailPage.propTypes = {
  equipment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image_path: PropTypes.string,
    description: PropTypes.string,
    size: PropTypes.string,
    condition: PropTypes.string,
    location: PropTypes.string,
    rentalPrice: PropTypes.number,
    sports: PropTypes.string,
    dateAvailability: PropTypes.string,
    owner: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      profile_image: PropTypes.string,
      verified: PropTypes.bool,
      created_at: PropTypes.string,
      reviews: PropTypes.arrayOf(PropTypes.object)
    })
  }).isRequired
};
