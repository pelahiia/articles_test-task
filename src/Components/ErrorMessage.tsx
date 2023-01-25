import React from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';
import { ErrorType } from '../types/ErrorType';

type Props = {
  error: ErrorType,
};

export const ErrorMessage: React.FC<Props> = ({ error }) => {
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
      action={(
        <Button color="inherit" size="small">
          UNDO
        </Button>
      )}
    >
      <AlertTitle>Error</AlertTitle>
      {errorMessage}
    </Alert>
  );
};
