import React from 'react';
import classes from './ImageLoader.module.scss';
import { Button } from '../index';

interface ImageProps {
  imgLink: string;
  onLoadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageLoader: React.FC<ImageProps> = ({ imgLink, onLoadImage }): JSX.Element => {
  return (
    <div className={classes.wrapper}>
      <h3>Image:</h3>
      <div className={classes.loader}>
        <label className={classes.label} htmlFor="button-image">
          Choose file
        </label>
        <input
          className={classes.input}
          type="file"
          id="button-image"
          name="upload"
          placeholder="Choose file"
          onChange={onLoadImage}
        />
        <Button children="Button" colorButton="dark" disabled={false} />
      </div>
      {imgLink ? <img className={classes.image} src={imgLink} alt="User picture" /> : null}
    </div>
  );
};

export { ImageLoader };
