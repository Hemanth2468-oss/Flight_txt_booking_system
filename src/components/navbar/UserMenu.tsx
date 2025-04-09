
interface UserMenuProps {
  user: any;
  handleLogout: () => void;
  setIsLoginOpen: (value: boolean) => void;
  setIsRegisterOpen: (value: boolean) => void;
}

const UserMenu = ({ user, handleLogout, setIsLoginOpen, setIsRegisterOpen }: UserMenuProps) => {
  // Check if user is Elite member
  const isEliteMember = localStorage.getItem('eliteChipMember') === 'true';
  
  return (
    <>
      {user ? (
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-700">
            <span>Welcome, </span>
            <span className="font-medium">{user.firstName}</span>
            {isEliteMember && (
              <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-white text-xs rounded-full">
                Elite
              </span>
            )}
          </div>
          <button 
            onClick={handleLogout}
            className={`px-4 py-2 ${isEliteMember ? 'bg-[#FFD700] text-[#1A1F2C] hover:bg-[#e6c200]' : 'bg-primary-600 text-white hover:bg-primary-700'} rounded-button transition-all duration-300 shadow-sm hover:shadow glow-button`}
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
            className={`px-4 py-2 ${isEliteMember ? 'bg-[#FFD700] text-[#1A1F2C] hover:bg-[#e6c200]' : 'bg-primary-600 text-white hover:bg-primary-700'} rounded-button transition-all duration-300 shadow-sm hover:shadow glow-button`}
          >
            Register
          </button>
        </>
      )}
    </>
  );
};

export default UserMenu;
