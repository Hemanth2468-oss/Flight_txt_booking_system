
interface UserMenuProps {
  user: any;
  handleLogout: () => void;
  setIsLoginOpen: (value: boolean) => void;
  setIsRegisterOpen: (value: boolean) => void;
}

const UserMenu = ({ user, handleLogout, setIsLoginOpen, setIsRegisterOpen }: UserMenuProps) => {
  return (
    <>
      {user ? (
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-700">
            <span>Welcome, </span>
            <span className="font-medium">{user.firstName}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300 shadow-sm hover:shadow glow-button"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <>
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-button transition-colors duration-200"
          >
            Sign In
          </button>
          <button 
            onClick={() => setIsRegisterOpen(true)}
            className="px-4 py-2 bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-all duration-300 shadow-sm hover:shadow glow-button"
          >
            Register
          </button>
        </>
      )}
    </>
  );
};

export default UserMenu;
