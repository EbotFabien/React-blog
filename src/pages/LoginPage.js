import {useEffect,useRef, useState} from 'react';
import Form from  'react-bootstrap/Form';
import  Button  from 'react-bootstrap/Button';
import Body from '../components/Body';
import InputField from '../components/InputField';

export default function LoginPage(){
    const [formErrors, setFormErrors] = useState({});
    const usernameField = useRef()
    const passwordField = useRef()

    useEffect(()=>{
        usernameField.current.focus();
    },[]);

    const onSubmit =(ev) =>{
        ev.preventDefault();
        const username = usernameField.current.value();
        const password = passwordField.current.value()

        console.log(`You entered ${username}:${password}`)
    };


    return(
        <Body>
            <h1>Login</h1>
            <Form onSubmit={onSubmit}>
                <InputField
                name='username' label='Username or email address'
                error={formErrors.username}  fieldRef={usernameField}/>
                <InputField
                name='password' label='password' type='password'
                error={formErrors.password} fieldRef={passwordField}/>
                <Button variant='primary' type='submit'>Login</Button>
                
            </Form>
        </Body>
    );
}