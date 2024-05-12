import { auth } from '../../firebase/firebase';
import './detail.css';

const Detail = () => {
  return (
    <div className='detail'>

      <div className="user">
        <img src="./avatar.png" alt="" />
        <h3>John Doe</h3>
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
          <button>Block User</button>
          <button className='logout' onClick={() => auth.signOut()}>Log out</button>
        </div>
      </div>

    </div>
  );
};

export default Detail;