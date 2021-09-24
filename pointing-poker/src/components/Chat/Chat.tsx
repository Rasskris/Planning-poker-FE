import { FC, useEffect, useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getMessages, addMessage } from '../../redux/thunks';
import { selectCurrentUser, selectMessages } from '../../redux/selectors';
import { IUser } from '../../interfaces';
import classes from './Chat.module.scss';

const Chat: FC = () => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const currentUser = useAppSelector(selectCurrentUser) as IUser;
  const { gameId, id: currentUserId } = currentUser;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getMessages(gameId));
  }, [dispatch, gameId, messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTo({ top: messagesEndRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (text.length > 0) {
      dispatch(addMessage({ gameId, sender: currentUser, text }));
      setText('');
    }
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setText(target.value);
  };

  return (
    <div ref={messagesEndRef} className={classes.chat}>
      <div className={classes.chatMessage}>
        {messages.map(({ id, text, sender }) => {
          return (
            <div key={id} className={classes.message}>
              <p>{text}</p>
              <span>{currentUserId === sender.id ? 'You' : sender.firstName}</span>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className={classes.send}>
        <input placeholder="type your message..." type="text" value={text} onChange={handleChange} />
        <button type="submit"></button>
      </form>
    </div>
  );
};

export { Chat };
