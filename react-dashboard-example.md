Sure, here's an example of a React dashboard for displaying and interacting with database tables:

```jsx
import React from 'react';
import axios from 'axios';

class Dashboard extends React.Component {
  state = {
    tables: [],
    selectedTable: null,
    tableData: [],
    isLoading: false,
    error: null
  }

  componentDidMount() {
    // Load the list of tables from the database
    this.loadTables();
  }

  loadTables = () => {
    this.setState({ isLoading: true });

    axios.get('/api/tables')
      .then(response => {
        this.setState({
          tables: response.data,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          error: error.message,
          isLoading: false
        });
      });
  }

  handleTableSelect = (tableName) => {
    // Load the data for the selected table
    this.setState({ selectedTable: tableName });

    axios.get(`/api/tables/${tableName}`)
      .then(response => {
        this.setState({
          tableData: response.data
        });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  }

  render() {
    const { tables, selectedTable, tableData, isLoading, error } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        <h1>Database Tables</h1>
        <ul>
          {tables.map(table => (
            <li key={table} onClick={() => this.handleTableSelect(table)}>
              {table}
            </li>
          ))}
        </ul>
        {selectedTable && (
          <div>
            <h2>{selectedTable}</h2>
            <table>
              <thead>
                <tr>
                  {Object.keys(tableData[0]).map(column => (
                    <th key={column}>{column}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map(row => (
                  <tr key={row.id}>
                    {Object.values(row).map(value => (
                      <td key={value}>{value}</td>
                    ))}
                    <td>
                      <button>Edit</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
```

In this example, the `Dashboard` component loads a list of tables from the database and displays them as a list. When a table is clicked, the component loads the data for that table and displays it in a table format. The component uses Axios to make HTTP requests to the server-side API, which handles the database interactions.

The table also includes "Edit" and "Delete" buttons for each row, which could be used to modify or delete the corresponding database record. However, the functionality for these buttons is not included in this example.

To use this component, you would need to modify the `loadTables` and `handleTableSelect` methods to match your specific database schema and API endpoints. You could also modify the table rendering to include additional columns or customize the appearance of the table.
