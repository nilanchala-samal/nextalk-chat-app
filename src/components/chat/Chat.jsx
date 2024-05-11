import { useEffect, useRef, useState } from 'react';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleEmoji = e => {
    setText(prev => prev + e.emoji);
    // setOpen(false);
  };

  return (
    <div className='chat'>

      {/* Chat Top Part */}
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor sit amet consectetur...</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>

      {/* Chat Center part */}
      <div className="center">
        {/* Chat Single message */}
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium ipsa voluptatem vero ipsum error omnis, neque quaerat illum aliquid tempora.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium ipsa voluptatem vero ipsum error omnis, neque quaerat illum aliquid tempora.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium ipsa voluptatem vero ipsum error omnis, neque quaerat illum aliquid tempora.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMp2QN2WCx7VRAXuJme-AcdxJJeXRSM3obFhXX_uIKvQ&s" alt="" />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium ipsa voluptatem vero ipsum error omnis, neque quaerat illum aliquid tempora.</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div ref={endRef}></div>

      </div>

      {/* Chat Bottom Part */}
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          value={text}
          type="text"
          placeholder='Type a message...'
          onChange={(e) => setText(e.target.value)}
          onClick={() => setOpen(false)}
        />

        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => setOpen((prev) => !prev)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>

        <button className='sendButton'>Send</button>
      </div>
    </div>
  );
};

export default Chat;