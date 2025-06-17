export default function ProductInfo({equipment}) {
    const { name, rentalPrice, description } = equipment;
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
      <div className="text-2xl font-bold text-gray-900 mb-6">
        RM{rentalPrice} <span className="text-lg font-normal text-gray-500">/ day</span>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Description</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </>
  );
}
