import Layout from "../components/Layout/Layout";
import { CompactTable } from '@table-library/react-table-library/compact';
import { usePagination } from "@table-library/react-table-library/pagination";



const COLUMNS = [
  { label: 'Task', renderCell: (item) => item.name },
  {
    label: 'Deadline',
    renderCell: (item) =>
      item.deadline.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
  },
  { label: 'Type', renderCell: (item) => item.type },
  {
    label: 'Complete',
    renderCell: (item) => item.isComplete.toString(),
  },
  { label: 'Tasks', renderCell: (item) => item.nodes },
];


const DashboardView = () => {
  

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 2,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log(action, state);
  }

  const nodes = [
    {
      id: '0',
      name: 'Shopping List',
      deadline: new Date(2020, 1, 15),
      type: 'TASK',
      isComplete: true,
      nodes: 3,
    },
  ];

  const data = { nodes };

  return (
    <Layout>
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
    </Layout>
  )
}

export default DashboardView;