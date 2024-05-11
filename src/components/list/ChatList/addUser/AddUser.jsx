import './addUser.css';

const AddUser = () => {
    return (
        <div className='addUser'>
            <form action="">
                <input type="text" />
                <button>Search</button>
            </form>
            <div className="user">
                <div className="detail">
                    <img src="./avatar.png" alt="" />
                    <span>Jone Doe</span>
                </div>
                <button>Add User</button>
            </div>
        </div>
    );
};

export default AddUser;