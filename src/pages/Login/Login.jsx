import React, { useState } from 'react'
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HashLoader from "react-spinners/HashLoader";
import { useDispatch, useSelector } from 'react-redux'
import { loginAPI, loginAction,loginFacebookAPI } from '../../redux/reducers/userReducer/userReducer'; //loginFacebookAPI
import FacebookLogin from 'react-facebook-login';
import logo from '../../assets/img/cyberlogo-white.png'

const Login = () => {

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const {userLogin} = useSelector(state => state.userReducer)

  const [errors, setErrors] = useState({});

  const [passwordIcon, setpasswordIcon] = useState(false);

  const [submit, setSubmit] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e?.preventDefault();
    setErrors(validation(values));
    setSubmit(true);
  }

  useEffect(() => {
    if (userLogin) {
      setLoading(true);
        setTimeout(() => {
          setLoading(false);
          navigate("./home")
        },2000)
    toast.success('', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    }
  },[userLogin])

  useEffect(() => {
    if(Object.keys(errors).length === 0 && submit) {
      const actionLogin = loginAPI(values)
      dispatch(actionLogin)
    }
  }, [errors])
  
  const responseFacebook = (response) => {
    const actionFacebookLogin = loginFacebookAPI(response.accessToken);
    dispatch(actionFacebookLogin);
  }

  const validation = (value) => {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let error = {};
    if (!value.email) {
      error.email = 'Email can not be blank.'
    } else if (!value.email.match(regexEmail)) {
      error.email = 'Email is invalid.'
    }

    return error;
  }

  const handleChangeIcon = () => {
    setpasswordIcon(!passwordIcon)
  }

  return (
    <div className="login text-center">
      <NavLink to='/home' className="logo">
        <img src={logo} alt="logo" />
        <span>CYBERSOFT</span>
      </NavLink>
      <ToastContainer />
      <div className="login__wrapper">
       
        <div className="login__wrap">
          <div className="title">
            <h1>Login</h1>
          </div>
          <form className='form__login' onSubmit={handleSubmit}>
            <div className="form__content">
              <div className="form__input">
                <input id='email' type="text" name='email' value={values.email} required onChange={handleChange}/>
                <span>Email</span>
                {errors.email && <div className='messError'>{errors.email}</div>}
              </div>
              <div className="form__input">
                <input id='password' type={passwordIcon ? 'text' : 'password'} name='password' value={values.password} required onChange={handleChange}/>
                <span>Password</span>
                <a onClick={handleChangeIcon}>{passwordIcon ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}</a>
              </div>
              <div className="form__submit-login">
                <button type='submit' className='btn-submit-login'>Login</button>
              </div>
            </div>
          </form>
          <div className="form__info">
            <span>Don not have an account? <NavLink to={'/users/register'}>Register</NavLink></span>
          </div>
          <div className="form__social">
            <FacebookLogin
              appId="6103817359665381"
              autoLoad={false}
              fields="name,email,picture"
              cssClass="btn-fb"
              icon={<i className="fa-brands fa-facebook"></i>}
              callback={responseFacebook} />
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Login
