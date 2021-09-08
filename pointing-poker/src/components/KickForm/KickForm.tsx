import React from 'react';
import classes from './KickForm.module.scss';

interface IKickFormProps {
  onKickFormHandler(event: React.MouseEvent): void;
}

const KickForm: React.FC<IKickFormProps> = ({ onKickFormHandler }: IKickFormProps): JSX.Element => {
  return (
    <div className={classes.logo} onClick={onKickFormHandler}>
      <div className={classes.logo_icon} />
    </div>
  );
};

export { KickForm };
