import { FC } from 'react';
import { Button } from '../index';
import classes from './ImageLoader.module.scss';

interface ImageProps {
  imgLink: string;
  onLoadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageLoader: FC<ImageProps> = ({ imgLink, onLoadImage }) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>Avatar: *</p>
      <div className={classes.loader}>
        <label className={classes.label} htmlFor="button-image">
          Choose file
        </label>
        <input
          className={classes.input}
          type="file"
          accept=".jpg, .jpeg, .png"
          id="button-image"
          name="avatar"
          placeholder="Choose file"
          onChange={onLoadImage}
        />
        <Button type="button" text="Button" colorButton="dark" />
      </div>
      {imgLink ? <img className={classes.image} src={imgLink} alt="Avatar" /> : null}
    </div>
  );
};

export { ImageLoader };
