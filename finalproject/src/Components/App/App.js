
import { useState, useEffect, useRef } from 'react';
import useLocalStorage from "use-local-storage";
import { API_GET_DATA } from '../Server/API';
import Header from '../Header/Header';
import Card from '../Card/Card';
import Footer from '../Footer/Footer';
import Task from '../Task/Task';
import './App.css';


const App = () =>{

 /*  async function fetchData(setData) {/// get data from the db server
    const result = await fetch(API_GET_DATA); 
    const {data} = await result.json();
    setData(data);
  }
  
  async function fetchSetData(data) {//// save data to the db server
    // console.log(data);
     await fetch(API_GET_DATA, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ data })
    });
  } */



  ///
  // const [data, setData] = useState([]);
  const [data, setData] = useLocalStorage("data", []);
  const [filterTask, setFilterTask] = useState(data);

  /* const [isDisplay, setIsDisplay] = useState("block"); */
  const submittingStatue = useRef(false);

  /* useEffect(()=>{
    if (!submittingStatue.current){
      return
    }
    fetchSetData(data)
    .then(data => submittingStatue.current = false)
  }, [data])

  useEffect(()=>{
    fetchData(setData); /// using data of the db server--(fetchData) set to the data--(setData)
  },[])
 */
  // card edit
  const submitEdit = (id, name, dueDate, assignedTo, description) => {
    const taskToEdit = filterTask.findIndex(task => task.id === id);
    // const taskToEdit2 = data.findIndex(task => task.id === id);

    // filterTask[taskToEdit] = {
    //   ...filterTask[taskToEdit],
    //   name: name,
    //   description: description,
    //   assignedTo: assignedTo,
    //   dueDate: dueDate

    // }

    let editedTask = filterTask[taskToEdit];

    editedTask = {
      ...editedTask, 
      name: name,
      dueDate: dueDate,
      assignedTo: assignedTo,
      description: description,

    };

    console.log(submitEdit);

    let newTaskArray = filterTask.filter(task => task.id !== id)
    // const newTaskArray = filterTask;

    // console.log(newTaskArray)

    // newTaskArray[taskToEdit] = editedTask; 

    // console.log(newTaskArray)

    newTaskArray = [editedTask, ...newTaskArray]

    setFilterTask(newTaskArray)
    // console.log(newTaskArray)

  }

  return (
    <div className="App" > 
      <Header CardData={data} filterTask={filterTask} setFilterTask={setFilterTask} /> 
      <Task CardData={data} submitEdit={submitEdit} filterTask={filterTask} deleteTask={setData} submittingStatue={submittingStatue} setFilterTask={setFilterTask} /> {/* passing the input value of the new task to the child */}
      <Card add={setData} submittingStatue={submittingStatue}  /* newTaskName={this.newTaskName} name={this.state.name} */ />
      <Footer />
    </div>
  );
};

export default App;


/* "data": [{
          "id": "01",
          "name": "a",
          "description": "",
            "assignedTo": "",
            "dueDate": ""
      }], */
