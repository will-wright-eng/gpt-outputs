prompt:
javascript react component that displays a list of tables which pulls from a cache when available, otherwise a refresh button can be clicked to pull the list from an api endpoint. along with an example of how it's implemented within the app object


```jsx
import React, { useState, useEffect } from 'react';

const TableList = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const cachedTables = localStorage.getItem('tables');
    if (cachedTables) {
      setTables(JSON.parse(cachedTables));
    } else {
      fetchTables();
    }
  }, []);

  const fetchTables = async () => {
    const response = await fetch('/api/tables');
    const data = await response.json();
    setTables(data);
    localStorage.setItem('tables', JSON.stringify(data));
  };

  return (
    <div>
      <h2>Table List</h2>
      <button onClick={fetchTables}>Refresh</button>
      <ul>
        {tables.map(table => (
          <li key={table.id}>{table.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TableList;

// Example implementation in App object
import React from 'react';
import TableList from './TableList';

const App = () => {
  return (
    <div>
      <h1>My App</h1>
      <TableList />
    </div>
  );
};

export default App;
```
