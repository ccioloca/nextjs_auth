import moment from "moment";

export const COLUMNS = [
  { label: 'File Name', renderCell: (item) => item.fileName },
  { label: 'File Type', renderCell: (item) => {
    const split = item?.fileMimeType?.split("/");
    return split?.[1];
  }},
  { label: 'File Size', renderCell: (item) =>  {
    return (item.fileSize  / (1024*1024)).toFixed(2) + " MB"
  }},
  { label: 'Valid Until', renderCell: (item) => moment(item.validUntil).format("MMM Do YY") },
  { label: 'Created At', renderCell: (item) => moment(item.createdAt).format("MMM Do YY") },
  { label: 'Updated At', renderCell: (item) => moment(item.updatedAt).format("MMM Do YY") },
];

export const USER_COLUMNS = [
  { label: 'First Name', renderCell: (item) => item.firstName },
  { label: 'Last Name', renderCell: (item) => item.lastName },
];