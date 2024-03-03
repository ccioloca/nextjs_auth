import { CompactTable } from '@table-library/react-table-library/compact';
import { useEffect, useState } from "react";
import { usePagination } from "@table-library/react-table-library/pagination";
import useFilesStore from "../../store/files.store";
import { COLUMNS, USER_COLUMNS } from './config';
import Modal from '../../components/Modal/Modal';
import useUsersStore from '../../store/users.store';

const PrivateFilesView = () => {
  const fetchPrivateFiles = useFilesStore((state: any) => state.fetchPrivateFiles)
  const addUserToFile = useFilesStore((state: any) => state.addUserToFile)
  const removeUserFromFile = useFilesStore((state: any) => state.removeUserFromFile)
  const privateFiles = useFilesStore((state: any) => state.privateFiles);
  const users = useUsersStore((state: any) => state.users);
  const fetchUsers = useUsersStore((state: any) => state.fetchUsers);
  const fileAccess = useFilesStore((state: any) => state.fileAccess);
  const fetchUsersForFile = useFilesStore((state: any) => state.fetchUsersForFile);

  const [ showModal, setShowModal ]= useState(false);
  const [ currentFile, setCurrentFile ]= useState(null);

  useEffect(() => {
    fetchPrivateFiles();
  }, [])

  const data = { nodes: privateFiles };

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

  const onSelectionChange = (item, event) => {
    if (event.target.value === 'SHARED') {
      fetchUsers();
      fetchUsersForFile(item.id);
      setShowModal(true);
      setCurrentFile(item)
    }
  } 

  const selectOptions = (item) => {
    return (
      <select name="permissions" id="permissions" onChange={(ev) => onSelectionChange(item, ev)}>
        <option value="PRIVATE">Private</option>
        <option value="PUBLIC">Public</option>
        <option value="SHARED">Shared</option>
      </select>
    )
  }

  const onCheckBoxChange = (item, event) => {
    const isChecked = event.target.checked;

    if (!isChecked) {
      currentFile && removeUserFromFile(item.id, currentFile.id);
    } else {
      currentFile && addUserToFile(item.id, currentFile.id);
    }
  }

  const checkBox = (item) => {
    if (!currentFile) {
      return null;
    }

    const isChecked = fileAccess[currentFile.id]?.includes(item.id);
    return (
      <input type="checkbox" checked={isChecked} onClick={(ev) => onCheckBoxChange(item, ev)}/>
    )
  }

  const closeModal = () => {
    setShowModal(false);
    setCurrentFile(null)
  }

  const MODIFIED_COLUMNS = [
    ...COLUMNS,
    { label: 'Change Permission', renderCell: (item, ev) => selectOptions(item, ev) },
  ]

  const MODIFIED_USERS_COLUMNS = [
    ...USER_COLUMNS,
    { label: 'Select', renderCell: (item, ev) => checkBox(item, ev) },
  ]

  return (
    <div className='py-6'>
      <h3>PRIVATE FILES</h3>
      <CompactTable columns={MODIFIED_COLUMNS} data={data} pagination={pagination} />
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
      {showModal && <Modal closeButtonLabel="Close" showSaveButton={false} closeModal={closeModal}>
          <CompactTable columns={MODIFIED_USERS_COLUMNS} data={{nodes: users}} />
        </Modal>
        }
    </div>
  )
}

export default PrivateFilesView;