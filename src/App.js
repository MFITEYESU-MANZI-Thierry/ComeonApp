import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import GamesPage from './components/GamesPage';
// import './stylesheets/styles.css';
// import './stylesheets/semantic.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  }

  return (
    <>
      <div class="ui one column center aligned page grid">
          <div class="column twelve wide">
              <img src="/images/logo.svg" alt="logo" />
          </div>
      </div>
      <div class="main container">
        {isLoggedIn ? (
          <>
            <div class="casino">
              <div class="ui grid centered">
                  <div class="twelve wide column">
                    <div class="ui list">

                        <div class="player item">
                            <img class="ui avatar image" src={`/${user.avatar}`} alt="avatar" />

                            <div class="content">
                              <div class="header"><b class="name">{user.name}</b></div>
                              <div class="description event">{user.event}</div>
                            </div>
                        </div>

                    </div>
                    <div class="logout ui left floated secondary button inverted" onClick={handleLogout}>
                      <i class="left chevron icon"></i>Log Out
                    </div>
                  </div>
                  <div class="four wide column">
                      <div class="search ui small icon input ">
                          <input type="text" placeholder="Search Game" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                          <i class="search icon"></i>
                      </div>
                  </div>
              </div>
              <GamesPage searchKeyword={searchKeyword} />
            </div>
            <div class="ingame">
              <div class="ui grid centered">
                  <div class="three wide column">
                      <div class="ui right floated secondary button inverted"><i class="left chevron icon"></i>Back
                      </div>
                  </div>
                  <div class="ten wide column">
                      <div id="game-launch">
                      </div>
                  </div>
                  <div class="three wide column"></div>
              </div>
            </div>
          </>
        ) : (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </>
  );
}

export default App;
