export default function ProductImages({ images, title }) {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-96 object-contain"
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {images.slice(0, 3).map((img, i) => (
          <div key={i} className="bg-white rounded-md shadow-sm overflow-hidden">
            <img src={img} alt={`${title} ${i+1}`} className="w-full h-24 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
