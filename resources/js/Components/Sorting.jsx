export default function Sorting({ sort, setSort }) {
  return (
    <div className="mb-4 flex justify-start">
      <label htmlFor="sort" className="mr-2 font-semibold">
        Sort by:
      </label>
      <select
        id="sort"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border rounded px-3 py-1"
      >
        <option value="newest">Newest Listings</option>
        <option value="oldest">Oldest Listings</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Most Popular</option>
        <option value="nameAsc">Name: A to Z</option>
        <option value="nameDesc">Name: Z to A</option>
      </select>
    </div>
  );
}
