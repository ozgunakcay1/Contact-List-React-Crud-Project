import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { TiThMenu } from "react-icons/ti";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import Card from './components/Card';
import Modal from './components/Modal';

axios.defaults.baseURL = "http://localhost:5001"



const App = () => {
  const[isModelOpen , setIsModelOpen]= useState(false);
  const [editItem, setEditItem] = useState(null);
  const [contacts, setContact]= useState([]);


  //bilesenin ekrana basilma anini izle
  useEffect(() => {
    //api'a rehber verileri icin istek at
    axios.get('http://localhost:5001/contacts')
     .then((res) => {
        setContact(res.data);
      })

      .catch((error) => {
        console.error("There was an error fetching the contacts!", error);
      });
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = e.target[1].value;
    
    const params ={
      q: text,
    }


  axios.get("/contacts", { params })
   .then(response => setContact(response.data))
 
  }

  const handleDelete = (id) => {
    const res = confirm("Are you sure you want to delete this?");
    if(res){
      axios.delete(`/contacts/${id}`)
      .then(() => {
        const updated = contacts.filter((contact)=>contact.id !== id);
        setContact(updated);

    });
  }
}

  const handleEdit = (contact) => {
    setIsModelOpen(true);
    setEditItem(contact);
   
  };


  return (
    <div className='app'>
      <header>
        <h1>Contacts</h1>

        <div>
          <form onSubmit={handleSubmit}>
            <button type="submit"><FaSearch/></button>
            <input type="search" placeholder='Search user...' />
          </form>

          <button className='hide'><TiThMenu/></button>
          <button className='hide'><HiMiniSquares2X2/></button>
          <button onClick={()=>setIsModelOpen(true)} className='add'><IoMdPersonAdd/><span>New User</span></button>

         </div>
      </header>


      <main>
        {contacts.map((contact)=>(<Card key={contact.id} contact={contact} handleDelete={handleDelete}  handleEdit={handleEdit}/>))}
      </main>
      <Modal
        editItem={editItem}
        isModalOpen={isModelOpen}
        close={() => {
          setIsModelOpen(false);
          setEditItem(null);
        }}
        setContact={setContact}
        
       />

    </div>
  );
};

export default App