import React from "react";
import './style.css'

import api from '../../services/api'
export default function Image(props){
    return(
        <>
        <div className="content">
            <div className="Image">
                <div className="title">
                    {props.fileName}
                </div>
                <div className="resizedImage">
                    <img src={props.imgUrl}></img>
                </div>
            </div>
        </div>
        </>
    )
}