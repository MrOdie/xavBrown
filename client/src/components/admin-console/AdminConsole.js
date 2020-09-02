import React from 'react';

import Users from './UserSection/Users';

const AdminConsole = ({ adminUser }) => {
  return (
    <>
      <h2 className="h1">{adminUser.name}&#39;s Admin Console</h2>
      
      <Users />
    </>
  )
}

export default AdminConsole;