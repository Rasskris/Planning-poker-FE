import React from 'react';
import classes from './ImageLoader.module.scss';
import { Button } from '../index';

const ImageLoader: React.FC = (): JSX.Element => {
  const onLoadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    const reader = new FileReader();

    reader.onload = () => {
      const newImage: HTMLImageElement = new Image();
      if (typeof reader.result === 'string') {
        newImage.src = reader.result;
        const link = newImage.src;
      }
    };
    if (file) reader.readAsDataURL(file);
    event.target.value = '';
  };

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
          onChange={onLoadHandler}
        />
        <Button children="Button" colorButton="dark" disabled={false} />
      </div>
    </div>
  );
};

export { ImageLoader };
