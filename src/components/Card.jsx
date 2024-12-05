import React from 'react';
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { BiSolidEditAlt } from "react-icons/bi";




const Card = ({ contact, handleDelete, handleEdit }) => {
    const[name, surname]= contact.name.split(" ");


  return (
    <div className='card'>

        <div className='edit-btn'>
          <button onClick={()=>handleEdit(contact)}><BiSolidEditAlt /></button>
          <button onClick={()=>handleDelete(contact.id)}><FaTrashCan/></button>
        </div>
        <h1>{name[0]} {surname ? surname[0] : ''}</h1>
        <h3>{contact.name}</h3>
        <p>{contact.position}</p>
        <p>{contact.company}</p>


        <div className='bottom'>
            <div>
               <span><FaPhone/></span>
               <span>{contact.phone}</span>
            </div>

            <div>
                <span><MdEmail/></span>
                <span>{contact.email}</span>
            </div>
        </div>
        


    </div>
  )
}

export default Card