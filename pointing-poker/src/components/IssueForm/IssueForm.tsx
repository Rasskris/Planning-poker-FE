import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { addIssue } from '../../redux/thunks';
import { Button } from '../Button';
import classes from './IssueForm.module.scss';

interface IssueFormProps {
  gameId: string;
  creatorId: string;
}

const IssueForm: FC<IssueFormProps> = ({ gameId, creatorId }) => {
  const [issueValues, setIssueValues] = useState({ title: '', priority: 'Low' });
  const dispatch = useAppDispatch();

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = target;

    setIssueValues(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const issue = { gameId, creatorId, ...issueValues };

    dispatch(addIssue(issue));
  };

  const { title, priority } = issueValues;

  return (
    <form className={classes.issueForm} onSubmit={handleSubmit}>
      <p className={classes.title}>Create Issue:</p>
      <label>
        Title:
        <input name="title" onChange={handleChange} value={title} type="text" />
      </label>
      <label>
        Priority:
        <select onChange={handleChange} name="priority" value={priority}>
          <option value="Low">Low</option>
          <option value="Middle">Middle</option>
          <option value="High">High</option>
        </select>
      </label>
      <div className={classes.btnContainer}>
        <Button type="submit" text="Yes" colorButton="dark" />
        <Button type="button" text="No" colorButton="light" />
      </div>
    </form>
  );
};

export { IssueForm };
