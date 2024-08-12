const { useState, useEffect } = React;

// Mock database
const mockDatabase = {
    users: [],
    findUser: function(username) {
        return this.users.find(user => user.username === username);
    },
    addUser: function(user) {
        this.users.push(user);
    }
};

// App Component
function App() {
    const [page, setPage] = useState('login');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (savedUser) {
            setIsAuthenticated(true);
            setCurrentUser(savedUser);
            setPage('home');
        }
    }, []);

    const handleLogin = (username, password) => {
        const user = mockDatabase.findUser(username);
        if (user && user.password === password) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            setIsAuthenticated(true);
            setCurrentUser(user);
            setPage('home');
        } else {
            alert('Invalid username or password.');
        }
    };

    const handleSignUp = (username, password) => {
        if (mockDatabase.findUser(username)) {
            alert('Username is already taken.');
            return;
        }
        const newUser = { username, password };
        mockDatabase.addUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        setIsAuthenticated(true);
        setCurrentUser(newUser);
        setPage('home');
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setIsAuthenticated(false);
        setCurrentUser(null);
        setPage('login');
    };

    return (
        <div>
            {page === 'login' && (
                <LoginPage onLogin={handleLogin} switchPage={() => setPage('signup')} />
            )}
            {page === 'signup' && (
                <SignupPage onSignUp={handleSignUp} switchPage={() => setPage('login')} />
            )}
            {page === 'home' && currentUser && (
                <HomePage user={currentUser} onLogout={handleLogout} />
            )}
        </div>
    );
}

// LoginPage Component
function LoginPage({ onLogin, switchPage }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); switchPage(); }}>Sign up</a></p>
        </div>
    );
}

// SignupPage Component
function SignupPage({ onSignUp, switchPage }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignUp(username, password);
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); switchPage(); }}>Login</a></p>
        </div>
    );
}

// HomePage Component
function HomePage({ user, onLogout }) {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    return (
        <div>
            <header style={headerStyle}>
                <div 
                    style={profileIconStyle} 
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                >
                    {user.username.charAt(0).toUpperCase()}
                </div>
                {dropdownVisible && (
                    <div style={dropdownStyle}>
                        <p>{user.username}</p>
                        <button onClick={onLogout}>Logout</button>
                    </div>
                )}
            </header>
            <main style={{ padding: '60px' }}>
                <h1>Welcome, {user.username}!</h1>
                {/* Add more content for the home page here */}
            </main>
        </div>
    );
}

// Styling
const headerStyle = {
    backgroundColor: '#333',
    color: 'white',
    padding: '10px',
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
};

const profileIconStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#555',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    cursor: 'pointer',
    position: 'relative'
};

const dropdownStyle = {
    position: 'absolute',
    top: '50px',
    right: '0',
    backgroundColor: 'white',
    color: 'black',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000
};

// Render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
