import Layout from "../components/Layout/Layout";
import { CompactTable } from '@table-library/react-table-library/compact';
import useUsersStore from "../store/users.store";
import { useEffect } from "react";
import { usePagination } from "@table-library/react-table-library/pagination";

const COLUMNS = [
  { label: 'First Name', renderCell: (item) => {
    return item.firstName 
  }},
  { label: 'Last Name', renderCell: (item) => item.lastName },
  { label: 'Email', renderCell: (item) => item.email },
  { label: 'Roles', renderCell: (item) => item.roles?.[0]?.role },
  { label: 'Created At', renderCell: (item) => item.createdAt },
  { label: 'Updated At', renderCell: (item) => item.updatedAt },
];


const UsersView = () => {
  const fetchUsers = useUsersStore((state: any) => state.fetchUsers)
  const users = useUsersStore((state: any) => state.users)

  useEffect(() => {
    fetchUsers();
  }, [])

  const data = { nodes: users };

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

export default UsersView;