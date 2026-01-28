export function SongsTableHead() {
  return (
    <thead>
      <tr className="border-b border-gray-200">
        <th scope="col" className="px-4 py-3 text-left text-sm font-semibold">ID</th>
        <th scope="col" className="px-4 py-3 text-left text-sm font-semibold">Song Name</th>
        <th scope="col" className="px-4 py-3 text-left text-sm font-semibold">Author</th>
        <th scope="col" className="px-4 py-3 text-left text-sm font-semibold">Progress</th>
        <th scope="col" className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
      </tr>
    </thead>
  );
}
