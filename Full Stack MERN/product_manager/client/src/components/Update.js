import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

const Update = (props) => {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const navigate = useNavigate();

    const [headerTitle, setHeaderTitle] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(res => {
                console.log(res.data)
                setTitle(res.data.product.title);
                setPrice(res.data.product.price);
                setDesc(res.data.product.desc);
                setHeaderTitle(res.data.product.title);
            })
            .catch(err => console.log(err))
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/products/edit/${id}`, {
            title,
            price,
            desc,
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                navigate("/products");
            })
            .catch(err => {console.log(err)});
    };

    return(
        <div>
            <h1>Update {headerTitle}</h1>
            <form onSubmit = {submitHandler}>
                <p>
                    <label>Title</label>
                    <input type="text" name="title" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                </p>
                <p>
                    <label>Price</label>
                    <input type="number" name="price" value={price} onChange={(e) => {setPrice(e.target.value)}} />
                </p>
                <p>
                    <label>Description</label>
                    <input type="text" name="desc" value={desc} onChange={(e) => {setDesc(e.target.value)}} />
                </p>
                <input type="submit" value="Update"/>
            </form>
        </div>
    )
}

export default Update;