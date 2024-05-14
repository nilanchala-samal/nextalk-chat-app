import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../firebase/chatStore";
import { auth, db } from "../../firebase/firebase";
import { useUserStore } from "../../firebase/userStore";
import "./detail.css";

const Detail = () => {
  const { user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    resetChat();
  };

  return (
    <div className='detail'>

      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h3>{user?.username}</h3>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMp2QN2WCx7VRAXuJme-AcdxJJeXRSM3obFhXX_uIKvQ&s"
                  alt=""
                />
                <span>Random photo</span>
              </div>
              <img src="./download.png" alt="" className='icon' />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMp2QN2WCx7VRAXuJme-AcdxJJeXRSM3obFhXX_uIKvQ&s"
                  alt=""
                />
                <span>Random photo</span>
              </div>
              <img src="./download.png" alt="" className='icon' />
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMp2QN2WCx7VRAXuJme-AcdxJJeXRSM3obFhXX_uIKvQ&s"
                  alt=""
                />
                <span>Random photo</span>
              </div>
              <img src="./download.png" alt="" className='icon' />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className='actions'>
          <button onClick={handleBlock}>
            {isCurrentUserBlocked
              ? "You are Blocked!"
              : isReceiverBlocked
                ? "User blocked"
                : "Block User"}
          </button>
          <button className='logout' onClick={handleLogout}>Log out</button>
        </div>
      </div>

    </div>
  );
};

export default Detail;