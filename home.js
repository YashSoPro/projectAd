// HomePage Component
function HomePage() {
    const [user, setUser] = React.useState(null);
    const [showProfile, setShowProfile] = React.useState(false);

    React.useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (savedUser) {
            setUser(savedUser);
        } else {
            window.location.href = 'index.html'; // Redirect to login page if no user
        }
    }, []);

    const handleProfileClick = () => {
        setShowProfile(!showProfile);
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html'; // Redirect to login page
    };

    if (!user) return null; // Return nothing if no user is loaded

    return (
        <div>
            <header style={headerStyle}>
                <div style={navbarStyle}>
                    <div style={profileContainerStyle}>
                        <div 
                            onClick={handleProfileClick} 
                            style={profileIconStyle}
                        >
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                        {showProfile && (
                            <div style={profileDropdownStyle}>
                                <p>{user.username}</p>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <main>
                <h1>Welcome, {user.username}!</h1>
                {/* Add more content for the home page here */}
            </main>
        </div>
    );
}

// Styles for the home page
const headerStyle = {
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '1000'
};

const navbarStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '50px'
};

const profileContainerStyle = {
    position: 'relative',
    cursor: 'pointer'
};

const profileIconStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#555',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    color: '#fff'
};

const profileDropdownStyle = {
    position: 'absolute',
    top: '50px',
    right: '0',
    backgroundColor: '#fff',
    color: '#000',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
};

// Initialize React root and render the HomePage component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HomePage />);
