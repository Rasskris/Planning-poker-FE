import { FC, useEffect, useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getMessages, addMessage } from '../../redux/thunks';
import { selectMessages } from '../../redux/selectors';
import classes from './Chat.module.scss';
import { IUser } from '../../interfaces';

interface IChatProps {
  currentUser: IUser;
}

const Chat: FC<IChatProps> = ({ currentUser }) => {
  const [text, setText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { gameId, id: currentUserId } = currentUser;
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);

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
    <div className={classes.chat}>
      <div ref={messagesEndRef} className={classes.chatMessage}>
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
