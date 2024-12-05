import { IoCloseSharp } from "react-icons/io5";
import axios from 'axios'
import Field from './Field'




const Modal = ({isModalOpen, close, setContact , editItem}) => {

    const handleSubmit =(e) =>{
        e.preventDefault();


        //formdata yontemiyle tum verilerin datasina erisiriz
       const formData=  new FormData(e.target);
        const newContact =Object.fromEntries(formData.entries());

        if (!editItem){
            //api istek at
            axios.post("http://localhost:5001/contacts", newContact)
            .then((res) =>{
                //ara yuzu guncelle state ekle
                setContact((prev) => [...prev, res.data]);
                //modal i kapat
                close();   
            })
                .catch((err)=>{
                    alert("Sorry, your request could not be processed")

            });
        

        } else{
            axios.put(`http://localhost:5001/contacts/${editItem.id}`, newContact)
            .then((res) =>{
                setContact((prev) => prev.map((contact)=> contact.id === editItem.id ? res.data : contact ));
                close(); 
            });
        }
    };
        
    

return ( isModalOpen && (
  <div>
        <div className="modal">
            <div className="modal-inner">
                <div className="modal-head">
                    <h2>{editItem ? "Update User" : "Add New User"}</h2>
                 <button onClick ={close}><IoCloseSharp/></button>
                </div>
                <form onSubmit={handleSubmit}>
                       <Field label="Name Surname" name="name" value ={editItem?.name}/>
                       <Field label="Position" name="position" value ={editItem?.position}/>
                       <Field label="Company" name="company" value ={editItem?.company}/>
                       <Field label="Phone" name="phone" value ={editItem?.phone}/>
                       <Field label="Email" name="email" value ={editItem?.email}/>

                       <div className="buttons">
                        <button type="button" onClick={close}>Cancel</button>
                        <button type="submit">{editItem ? "Update" : "Create"}</button>
                        </div>
                </form>
            </div>
        </div>
    </div>
    )
  )
}

export default Modal