import React, { useState } from 'react';

function LoginPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function handleLogin(event) {
    setError('...');
    event.preventDefault();

    try {
      const response = await fetch('/api/users.json');
      const users = await response.json();

      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        props.onLoginSuccess(user);
      } else {
        setError('Invalid username or password');
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login">
        <div className="ui grid centered">
            <form onSubmit={handleLogin}>
                <div className="fields">
                    <div className="required field">
                        <div className="ui icon input">
                            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <i className="user icon"></i>
                        </div>
                    </div>
                    <div className="required field">
                        <div className="ui icon input">
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <i className="lock icon"></i>
                        </div>
                    </div>
                    <p style={{color: 'darkred',fontSize: 'initial'}}>{error}</p>
                    <div className="field">
                        <div className="ui icon input">
                            <input type="submit" value="Login" />
                            <i className="right chevron icon"></i>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
}

export default LoginPage;
