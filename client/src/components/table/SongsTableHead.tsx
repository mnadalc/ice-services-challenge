export function SongsTableHead() {
  return (
    <thead>
      <tr className="border-b border-gray-200">
        <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
        <th className="px-4 py-3 text-left text-sm font-semibold">Song Name</th>
        <th className="px-4 py-3 text-left text-sm font-semibold">Author</th>
        <th className="px-4 py-3 text-left text-sm font-semibold">Progress</th>
        <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
      </tr>
    </thead>
  );
}
