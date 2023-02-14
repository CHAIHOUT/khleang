import React, { useEffect, useState } from 'react';
import "./style/khleang_display.css";
import "./style/khleang_note.css";
import UseFatch from './useFatch';
import Card from './card';

import { Link, useNavigate } from "react-router-dom";




function Khleang_note() {
  const{data} = UseFatch("http://localhost:8000/note");

    
  const[caption, setcaption] = useState('');
  const[img,setimg] = useState('');
  const[description,setdescription] = useState('');

  const[file_img_name,setfile_img_name] = useState('');


// search
const[search,setsearch] = useState('');  


//   SAVE

  const Onclick_save = () =>{
    
    if( caption !== '' && description !== '' && img !== ''){
        const note_data = {caption, file_img_name , img , description};
        fetch("http://localhost:8000/note",{
            method:"POST",
            headers:{"content-type": "application/json"},
            body: JSON.stringify(note_data)
        }).then(()=>{
            window.location.reload();
        })
    }
  }

// upload Img
  const uploadImg= async (e)=>{
    const file_img = e.target.files[0];
    console.log(file_img);
    const base64 = await convertBase64(file_img);
    setimg(base64);
    setfile_img_name(e.target.value);
  }

  const convertBase64=(file_img)=>{
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file_img);
        fileReader.onload = () =>{
            resolve(fileReader.result);
        }
        fileReader.onerror = (error) =>{
            reject(error);
        };
    })
  }



  return (
    <main>
        <div className="head_display" >
            <Link to={"/"}  className="icon">
                <img src="./img/home.png" id="img_head" />
            </Link>
            <a href="" className="icon">
                <img src="./img/setting.png" id="img_head" />
            </a>
            <a href="" className="icon">
                <img src="./img/spp.png" id="img_head" />
            </a>
            <a href="" className="icon2">
                <img src="./img/profile.png" id="img_head_profile" />
            </a>
            <a href="" id="logo_khleang">
                <img src="./img/KhleangLogo.png" id="img_head" />
            </a>
        </div>

        
        <div className="note_body">

            {/* Button Search */}
            <div className="khleang_search">
                <form action="" className="khleang_form">
                    <label className="khleang_label" for="khleang_ip"><img src="./img/search.svg" /></label>
                    <input onChange={(e)=> setsearch(e.target.value)} className="khleang_ip" type="text" placeholder="search..." />
                </form>
            </div>
            
            {/* Button ADD */}

            <div id="note_add">
                <img src="./img/add.svg" />

                {/* <!-- Button trigger modal --> */}
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal">
                    Add Note
                </button>
                {/* <!-- Modal --> */}
                <div class="modal fade" id="Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add Note</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="ip_caption" class="form-label">Caption :</label>
                                    <input value={caption} onChange={e => setcaption(e.target.value)} type="text" class="form-control" id="ip_caption" />
                                </div>
                                <div class="mb-3">
                                    <label for="ip_img" class="form-label">Upload Image :</label>
                                    <input onChange={e => uploadImg(e)} class="form-control" type="file" id="ip_img" />
                                </div>
                                <div class="mb-3">
                                    <label for="ip_description" class="form-label">Description :</label>
                                    <textarea value={description} onChange={e => setdescription(e.target.value)} class="form-control" id="ip_description" rows="3"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="note_btn_close">Close</button>
                            <button type="submit" class="btn btn-primary" id="note_btn_save" onClick={Onclick_save}>Save changes</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <div className="note_foot">
            {data &&
                data.filter((item)=>{
                    return search.toLowerCase() === ''
                        ? item
                        : item.caption.toLowerCase().includes(search);
                })
                .map((item)=>(
                    <div id='np'><Card item={item}/></div>
                ))
            }
        </div>
    </main>
  )
}

export default Khleang_note