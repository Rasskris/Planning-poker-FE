import { FC, useEffect, useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getMessages, addMessage } from '../../redux/thunks';
import { selectMessages, selectUser } from '../../redux/selectors';
import classes from './Chat.module.scss';

const Chat: FC = () => {
  const [text, setText] = useState('');
  const { gameId } = useParams<{ gameId: string }>();
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const user = useAppSelector(selectUser);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getMessages(gameId));
  }, [dispatch, gameId, messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = () => {
    if (text) {
      dispatch(addMessage({ gameId, sender: user, text }));
      setText('');
    }
  };

  const handleKeyPress = ({ key }: KeyboardEvent) => {
    if (key === 'Enter') {
      sendMessage();
    }
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setText(target.value);
  };

  return (
    <div className={classes.chat}>
      <div className={classes.chatMessage}>
        {messages.map(({ id, text, sender }) => {
          return (
            <div key={id} className={classes.message}>
              <p>{text}</p>
              <span>{user.id === sender.id ? 'You' : sender.firstName}</span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className={classes.send}>
        <input
          placeholder="type your message..."
          type="text"
          value={text}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}></button>
      </div>
    </div>
  );
};

export { Chat };
