import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import './App.css';

function App() {
  const [todo, setTodo] = useState({description: '', date: '', priority:''});
  const [todos, setTodos] = useState([]);

  const gridRef = useRef();

  const addTodo = () => {
    setTodos([...todos, todo]);
  }

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter(( todo, index) =>  index !== gridRef.current.getSelectedNodes()[0].childIndex))
    } else {
      alert('Select row first');
    }
  }

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const columns = [
    { headerName: "Description", field: "description", sortable: true, filter: true, floatingFilter: true},
    { headerName: "Date", field: "date", filter: true, sortable: true, floatingFilter: true},
    { headerName: "Priority", field :"priority", filter: true, sortable: true, floatingFilter: true,
      cellStyle: params => (params.value ===  "High" || params.value ===  "high")  ? {color: 'red'} : {color:'black'},
    }
  ]
  
  return (
    <div className="App">
      <input type="date" onChange={inputChanged} placeholder="Date" name="date" value={todo.date}/>
      <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.description}/>
      <input type="text" onChange={inputChanged} placeholder="Priority" name="priority" value={todo.priority}/>
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>
      <div className="ag-theme-material" style={{height:'700px', width:'80%', margin:'auto'}}>
        <AgGridReact 
          ref={gridRef} 
          onGridReady={ params =>  gridRef.current= params.api}
          rowSelection="single"
          columnDefs={columns} 
          rowData={todos}
          animateRows={true}>
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;

