import React from 'react';

import UsersImport from './UserSection/UsersImport';
import StoriesImport from './StorySection/StoriesImport';
import PostImport from './PostSection/PostImport';

const AdminConsole = ({ adminUser }) => {
  return (
    <>
      <h2 className="h1">{adminUser.name}&#39;s Admin Console</h2>
      
      <UsersImport />
      <StoriesImport />
      <PostImport />
    </>
  )
}

export default AdminConsole;