type PaginationProps = {
  currentPage: number
  totalPages: number
  totalData: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (value: number) => void
}

function Pagination({
  currentPage,
  totalPages,
  totalData,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const startData = (currentPage - 1) * itemsPerPage + 1
  const endData = Math.min(currentPage * itemsPerPage, totalData)

  const pages = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  if (totalData === 0) return null

  return (
    <div className="mt-6 rounded-xl border bg-white p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-gray-700">
          Showing <span className="font-semibold">{startData}-{endData}</span> of{' '}
          <span className="font-semibold">{totalData}</span> Data
        </p>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Data per page:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="rounded-lg border px-3 py-2 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
        >
          Prev
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded-lg border px-3 py-2 text-sm ${currentPage === page
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-black border-gray-300'
              }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <p className="mt-3 text-center text-sm text-gray-600">
        Total Pages: <span className="font-semibold">{totalPages}</span>
      </p>
    </div>
  )
}

export default Pagination