import React from 'react';
import classes from './KickForm.module.scss';

interface IKickFormProps {
  onClick(event: React.MouseEvent): void;
}

const KickForm: React.FC<IKickFormProps> = (props: IKickFormProps): JSX.Element => {
  return (
    <div className={classes.logo} onClick={props.onClick}>
      <div className={classes.logo_icon} />
    </div>
  );
};

export { KickForm };
