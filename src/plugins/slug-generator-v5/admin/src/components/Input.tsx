import * as React from 'react';

import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { Field, Flex, TextInput, useComposedRefs } from '@strapi/design-system';
import { FieldValue, InputProps, useFocusInputField } from '@strapi/strapi/admin';

type TProps = InputProps &
  FieldValue & {
    labelAction?: React.ReactNode;
  };

export const EndAction = styled(Field.Action)`
  svg {
    path {
      fill: ${({ theme }) => theme.colors.neutral400};
    }
  }

  svg:hover {
    path {
      fill: ${({ theme }) => theme.colors.primary600};
    }
  }
`;

const Input = React.forwardRef<HTMLButtonElement, TProps>(
  (
    {
      hint,
      disabled = true,
      labelAction,
      label,
      name,
      required = false,
      onChange,
      value,
      error,
      placeholder,
      ...props
    },
    forwardedRef
  ) => {
    const fieldRef = useFocusInputField<HTMLInputElement>(name);
    const composedRefs = useComposedRefs(forwardedRef, fieldRef);

    const [fieldError] = React.useState<string | undefined>(error);
    //
    return (
      <Field.Root name={`${name}-Hello world`} id={name} error={fieldError} hint={"An example hint"} required={required}>
        <Field.Label action={labelAction}>Example Label</Field.Label>
        <TextInput
          ref={composedRefs}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          {...props}
        />

        <Field.Hint />
        <Field.Error />
      </Field.Root>
    );
  }
);

export default Input;
