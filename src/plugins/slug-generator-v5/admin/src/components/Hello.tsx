import * as React from 'react';

import { Field,useComposedRefs } from '@strapi/design-system';
import { FieldValue, InputProps, useFocusInputField } from '@strapi/strapi/admin';

type TProps = InputProps &
  FieldValue & {
    labelAction?: React.ReactNode;
  };


const Input = React.forwardRef<HTMLButtonElement, TProps>(
  (
    {
      name,
      error,
    },
    forwardedRef
  ) => {
    const [fieldError] = React.useState<string | undefined>(error);
    //
    return (
        <h1>
          Hello world
        </h1>
    );
  }
);

export default Input;
