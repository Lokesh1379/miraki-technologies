import React, { useState } from "react";
import "./style.css";

const TaskManager = () => {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState("");
    const [editId, setEditId] = useState(null);
    const [description, setDescription] = useState("");
    const [checkedItems, setCheckedItems] = useState({});
    const [divColors, setDivColors] = useState({});

    const inputValue = ({ target: { value } }) => {
        setTitle(value);
    };

    const onSubmittimg = (e) => {
        e.preventDefault();
        if (title === "") {
            alert("Please enter some value.");
        } else {
            if (editId === null) {
                const newItem = {
                    id: data.length,
                    value: title,
                    des: description
                };
                setData((prevData) => [...prevData, newItem]);
                setTitle("");
                setDescription("");
                setCheckedItems((prevChecked) => ({
                    ...prevChecked,
                    [newItem.id]: false
                }));
                setDivColors((prevColors) => ({
                    ...prevColors,
                    [newItem.id]: "lightcoral"
                }));
            } else {
                setData((prevData) =>
                    prevData.map((d) =>
                        d.id === editId ? { ...d, value: title, des: description } : d
                    )
                );
                setEditId(null);
                setTitle("");
                setDescription("");
            }
        }
    };

    const deleteHandler = (id) => {
        setData(data.filter((b) => b.id !== id));
        setCheckedItems((prevChecked) => {
            const newChecked = { ...prevChecked };
            delete newChecked[id];
            return newChecked;
        });
        setDivColors((prevColors) => {
            const newColors = { ...prevColors };
            delete newColors[id];
            return newColors;
        });
    };

    const editHandler = (id, value, des) => {
        setTitle(value);
        setEditId(id);
        setDescription(des);
    };

    const descriptionHandler = ({ target: { value } }) => {
        setDescription(value);
    };

    const toggleCheckbox = (id) => {
        setCheckedItems((prevChecked) => ({
            ...prevChecked,
            [id]: !prevChecked[id]
        }));
        setDivColors((prevColors) => ({
            ...prevColors,
            [id]: !checkedItems[id] ? "lightgreen" : "lightcoral"
        }));
    };

    return (
        <>
            <div className="container">
                <h1 className="heading">ToDo List</h1>
                <div className="input-container">
                    <input
                        type="text"
                        value={title}
                        onChange={inputValue}
                        id="input"
                        placeholder="Title"
                    />
                    <div style={{ display: "flex" }}>
                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            style={{ width: "90%" }}
                            name="description"
                            onChange={descriptionHandler}
                        />
                        <button
                            type="button"
                            className="btn1 a-btn"
                            onClick={onSubmittimg}
                        >
                            {editId === null ? "Add" : "Update"}
                        </button>
                    </div>
                </div>
                {data.map((item, index) => {
                    return <React.Fragment key={index}>
                        <div
                            key={item.id}
                            className="d-container"
                            style={{ backgroundColor: divColors[item.id] }}
                        >
                            <div>
                                <p>{item.value.toUpperCase()}</p>
                            </div>
                            <div className="btns">
                                <div className="check">
                                    <input
                                        type="checkbox"
                                        id={`mark${item.id}`}
                                        checked={checkedItems[item.id] || false}
                                        onChange={() => toggleCheckbox(item.id)}
                                    />
                                    <h6>Mark as Completed</h6>
                                </div>
                                <button
                                    type="button"
                                    className="btn1 d-btn"
                                    onClick={() => {
                                        deleteHandler(item.id);
                                    }}
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    className="btn1 e-btn"
                                    onClick={() => {
                                        editHandler(item.id, item.value, item.des);
                                    }}
                                >
                                    Edit
                                </button>
                            </div>

                        </div>
                        <div className="dis-con">
                            <h5>description :{item.des}</h5>
                        </div>
                    </React.Fragment>
                })}
            </div>
        </>
    );
};

export default TaskManager;
