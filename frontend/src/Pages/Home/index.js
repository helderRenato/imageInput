import React, { useMemo, useState, useEffect} from "react";
import './style.css'
import { Icon } from '@iconify/react';
import api from "../../services/api";
import Image from "../../Components/Image";

export default function Home(){
    const [image, setImage] = useState(null)
    const [allImages, setAllImages] = useState([])

    const preview = useMemo( () => {
        return image ? URL.createObjectURL(image) : null
    }, [image])

    async function handleSubmit(){
        const multiFormData = new FormData()

        multiFormData.append('image', image)
        await api.post('/image', multiFormData)
    }

    useEffect(() => {
        async function loadView(){
            const response = await api.get('/allImages')
            setAllImages(response.data)
        }
        loadView()
    }, [])
    
    return(
        <>
            <header className="navBar">
                <nav>
                    <ul>
                        <li>LITTLE PROJECT #2</li>
                    </ul>
                </nav>
            </header>
           
           <div className="content">

                <div className="viewImage">
                    {
                        allImages.map( allImages => (
                            <Image imgUrl = {allImages.imageUrl} fileName = {allImages.fileName}></Image>
                        ))
                    }
                </div>

                <div className="inputImage">
                    <label className="selectImage">
                            <Icon icon="ci:add-to-queue" height={"24px"} className = "addIcon"/>
                            <p>ADD IMAGE</p>
                            <input type={"file"} className="type" accept = "image/*" onChange={event => setImage(event.target.files[0])}></input>
                    </label>

                    <div className="thumbnail">
                        <img src={preview}></img>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input type={"submit"} value = "SUBMIT" className="submitButton"></input>
                    </form>
                </div>

            </div>
        </>
    )
}