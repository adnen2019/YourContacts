import React,{useState,useContext,useEffect} from 'react';
import AlertContext from '../../context/alert/AlertContext'
import AuthContext from '../../context/contact/auth/AuthContext'

const Register = props => {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const {setAlert} =alertContext;
    const {register,error,clearErrors,isAuthenticated} = authContext;

    const [user,setuser] = useState({
        name :'',
        email :'',
        password :'',
        password2 :''
    });

    useEffect(() =>{
        if(isAuthenticated){
            props.history.push('/')
        }
        if(error === 'User alredy exists'){
            setAlert(error,'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    },[error,isAuthenticated,props.history]);

    const {name,email,password,password2} = user;

    const onChange =(e) => setuser({
        ...user,
        [e.target.name] : e.target.value
    })

    const onSubmit =(e) => {
        e.preventDefault();
        if(name === '' || email === '' || password === '' || password2 === '' ){
            setAlert('please enter All Fields','danger')
        }
        else if(password !== password2){
            setAlert('Passwords do not match','danger')
        }
        else{
            register({
                name,email,password
            })
        }
        
        
    }


    
    return (
        <div className='form-container'>
            <h1> Account <span className="text-primary">Register</span> </h1>
            <form onSubmit={onSubmit}>
               <div className="form-group">
                   <label htmlFor="name">Name</label>
                   <input type="text" name="name" value={name} onChange={onChange} required/>
               </div>
               <div className="form-group">
                   <label htmlFor="email">Email</label>
                   <input type="email" name="email" value={email} onChange={onChange} required/>
               </div>
               <div className="form-group">
                   <label htmlFor="password">Password</label>
                   <input type="password" name="password" value={password} onChange={onChange} minLength='6' required/>
               </div>
               <div className="form-group">
                   <label htmlFor="password2">Confirm Password</label>
                   <input type="password" name="password2" value={password2} onChange={onChange} minLength='6' required/>
               </div>
               <input type="submit" value="Register" className='btn btn-primary btn-block'/>
            </form>
        </div>
    )
}

export default Register
