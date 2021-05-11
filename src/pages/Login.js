import React, {useState, useContext} from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Form } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'


const Login = (props) => {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(login, {
    username: '',
    password: '',
  })
  
  const [loginUser, {loading}] = useMutation(LOGIN_USER, {
    update(_, {data: { login: userData }}){
      // console.log(result);
      context.login(userData)
      props.history.push('/');
    },
    onError(err) {
      setErrors( err ? err.graphQLErrors[0].extensions.exception.errors: null)
    }, 
    variables: values
  })

  function login() {
    loginUser();
  }

  return (
    <div  className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading? 'loading': ''}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type='submit' color="purple">Login</Button>
      </Form>

      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )} 
    </div>
  )
}

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(username: $username password: $password){
      id email username createdAt token
    }
  }
`

export default Login
