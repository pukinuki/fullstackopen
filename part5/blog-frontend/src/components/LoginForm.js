import Notification from './Notification'

const LoginForm = ({notification, username, 
    password, handleLogin, 
    handleUsernameChange, handlePasswordChange}) => {
     
    return (
        <div>
        <h2>Log in to application</h2>
        <Notification message={notification.message} type = {notification.type} />
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
        </form>
      </div>
    )
}

export default LoginForm