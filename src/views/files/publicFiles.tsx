import { CompactTable } from '@table-library/react-table-library/compact';
import { useEffect } from "react";
import { usePagination } from "@table-library/react-table-library/pagination";
import useFilesStore from "../../store/files.store";
import { COLUMNS } from './config';

const PublicFilesView = () => {
  const fetchPublicFiles = useFilesStore((state: any) => state.fetchPublicFiles)
  const publicFiles = useFilesStore((state: any) => state.publicFiles)

  useEffect(() => {
    fetchPublicFiles();
  }, [])

  const data = { nodes: publicFiles };

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 50,
    },
    onChange: onPaginationChange,
  });
  

  function onPaginationChange(action, state) {
    console.log(action, state);
  }

  return (
    <div className='py-6'>
      <h3>PUBLIC FILES</h3>
      <CompactTable columns={COLUMNS} data={data} pagination={pagination} />
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Total Pages: {pagination.state.getTotalPages(data.nodes)}</span>
        <span>
          Page:{" "}
          {pagination.state.getPages(data.nodes).map((_, index) => (
            <button
              key={index}
              type="button"
              style={{
                fontWeight: pagination.state.page === index ? "bold" : "normal",
              }}
              onClick={() => pagination.fns.onSetPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </span>
      </div>
    </div>
  )
}

export default PublicFilesView;