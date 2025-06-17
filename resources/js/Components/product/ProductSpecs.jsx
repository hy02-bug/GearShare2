export default function ProductSpecs({ specs }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Specifications</h2>
      <ul className="space-y-2">
        {specs.map((spec, i) => (
          <li key={i} className="flex">
            <span className="font-medium w-32">{spec.name}:</span>
            <span>{spec.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
