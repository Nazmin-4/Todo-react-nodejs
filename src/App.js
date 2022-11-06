import React,{useState,useEffect,useRef} from 'react';
import './App.css';
import Data from "./data.json";
import {v1 as uuidv1} from 'uuid';
import axios from 'axios';
let v=1;
function App() {
  const titleRef = useRef();
  const dateRef = useRef();
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
const [data,setData]=useState(Data);
useEffect(()=>{
  titleRef.current.value='';
  dateRef.current.value='';
},[data]);
const addPost =()=>{
if(title&&date){
  let newpost={
    "id":uuidv1(),
    "task":title,
    "date":date,
    "status":"not completed"
  }
  let posts=[...data,newpost];
  setData(posts);
  setTitle();
  setDate();
  saveJson(posts);
}
}

const deletePost=(key)=>{
let f=[...data].filter(obj=>obj.id!==key);
setData(f);
saveJson(f);
}
const saveJson =(posts)=>{
  const url = 'http://localhost:5000/write'
  axios.post(url, posts)
  .then(response => {
  });
}
  return (
    <div className='App'>
    <h1><u>TO-DO</u></h1>
    <div>
      <h4>
        Add Task
      </h4>
      <input onChange={ e => setTitle( e.target.value ) } 
          value={ title || '' } 
          ref={ titleRef }placeholder='taskname'></input><br/>
      <input onChange={ e => setDate( e.target.value ) } 
          value={ date || '' } 
          ref={ dateRef } type='date'/><br/>
      <button onClick={addPost}>add</button>
    </div>
     <div className='posts'>
      {
        data? data.map(post=>{
          return(
            <div key={post.id}>
            <h3>
              {
                post.task
              }
            </h3>
            <p>{post.date}</p>
            <button onClick={()=> deletePost(post.id)}>Delete</button></div>
          )
        })
      :null}
     </div>
    </div>
  );
}

export default App;
