import { useEffect, useRef, useState } from 'react';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useChatStore } from '../../firebase/chatStore';
import { useUserStore } from '../../firebase/userStore';
import upload from '../../firebase/upload';

const Chat = () => {
  const [chat, setChats] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: ""
  });

  const { currentUser } = useUserStore();

  const { chatId, user } = useChatStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChats(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);



  const handleEmoji = e => {
    setText(prev => prev + e.emoji);
    // setOpen(false);
  };

  const handleSend = async () => {
    if (text === "") return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...Chat(imgUrl && { img: imgUrl }),
        })
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId);

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updateAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });

    } catch (error) {
      console.log(error);
    }
    setImg({
      file: null,
      url: ""
    });
    setText("");
  };

  const handleImage = e => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
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

        {chat?.messages?.map((message) => (
          <div className={message.senderId === currentUser.id ? "message own" : "message"} key={message?.createdAt}>
            <div className="texts">
              {message.img && (
                <img
                  src={message.img}
                  alt="shared image" />
              )}
              <p>{message.text}</p>
              {/* <span>1 min ago</span> */}
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}

        <div ref={endRef}></div>

      </div>

      {/* Chat Bottom Part */}
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="" />
          </label>
          <input type="file" hidden id='file' onChange={handleImage} />
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

        <button className='sendButton' onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;