import "./style/detail.css";

import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFatch from './useFatch';

import left from './img/left.svg';

function Note_detail() {
  const {id} = useParams();
  const {data} = useFatch("http://localhost:8000/note/"+id);


  // Turn back
  const navigate = useNavigate();
  const back=()=>{
    navigate(-2);
  }

  return (
    <main>
{data&& <div class="container">
            <div id="row_1">
                <a onClick={back}><img id="left_img" src={left}></img></a>
                <p id="detail_caption">{data.caption}</p>
            </div>
            <div id="row_2">
                <p id="detail_img">Image :</p>
                <img src={data.img}></img>
            </div>
            <div id="row_3">
                <p id="text">description :</p>
                <textarea value={data.description} id="detail_desc" minLength='400'></textarea>
            </div>
        </div> }
    </main>
  )
}

export default Note_detail