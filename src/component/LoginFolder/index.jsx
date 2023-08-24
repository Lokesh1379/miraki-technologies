import { useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import TaskManager from '../TaskFolder'
const INITIAL_VALUE = {
    username: "",
    password: ""
}
const LoginComponent = () => {
    const [userData, setUserData] = useState(INITIAL_VALUE)
    const [navigate, setNavigate] = useState(true);
    const onChangeHandler = ({ target: { name, value } }) => {
        setUserData({ ...userData, [name]: value })

    }

    const navigationHandler = () => {
        if (userData.username && userData.password) {
            setNavigate(false)
        }
    }
    return <>
        {
            navigate ? <div className="login-container">
                <div className='login-input-container'>
                    <h1>Log-in </h1>
                    <div>
                        <label className='label l-1'>User name</label><br />
                        <input type='text' name="username" value={userData.username} onChange={onChangeHandler} className='input i-1' />
                    </div>
                    <div>
                        <label className='label l-2'>Password</label><br />
                        <input type='password' name="password" value={userData.password} onChange={onChangeHandler} className='input i-2' />
                    </div>
                    <div className="btn">
                        <button className='l-btn' onClick={navigationHandler}>Login</button>
                    </div>
                    <div>
                        <p>Create account <span ><Link to='/sign-up' className='si-btn'>Sign-up</Link></span></p>
                    </div>
                </div>
            </div> : <TaskManager />
        }
    </>
}

export default LoginComponent