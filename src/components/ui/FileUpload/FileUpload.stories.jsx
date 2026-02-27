import { useState } from 'react';
import { FileUpload } from './FileUpload';

export default {
  title: 'UI/FileUpload',
  component: FileUpload,
};

export const Empty = {
  render: () => {
    const [file, setFile] = useState(null);
    return <FileUpload value={file} onChange={setFile} />;
  },
};

export const WithExistingImage = {
  render: () => {
    const [file, setFile] = useState(null);
    return (
      <FileUpload
        value={file}
        onChange={setFile}
        currentImageUrl="https://via.placeholder.com/80"
      />
    );
  },
};

export const Disabled = {
  render: () => (
    <FileUpload
      value={null}
      onChange={() => {}}
      currentImageUrl="https://via.placeholder.com/80"
      disabled
    />
  ),
};
