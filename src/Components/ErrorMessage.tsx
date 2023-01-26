import React from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';
import { ErrorType } from '../types/ErrorType';

type Props = {
  error: ErrorType,
  closeError: () => void,
};

export const ErrorMessage: React.FC<Props> = ({ error, closeError }) => {
  let errorMessage = '';

  switch (error) {
    case ErrorType.LOAD:
      errorMessage = 'Unable to load articles';
      break;

    case ErrorType.FIND:
      errorMessage = 'No articles found';
      break;

    default:
      break;
  }

  return (
    <Alert
      severity="error"
      className="alert-message"
      action={(
        <Button
          color="inherit"
          size="small"
          onClick={closeError}
        >
          CLOSE
        </Button>
      )}
    >
      <AlertTitle>Error</AlertTitle>
      {errorMessage}
    </Alert>
  );
};
