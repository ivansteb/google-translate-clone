import React from "react";
import { Form } from "react-bootstrap";
import { SectionType } from "../types.d";

type CommonProps = {
  value: string;
  onChange: (value: string) => void;
};

type Props =
  | (CommonProps & {
      type: SectionType.From;
      loading?: undefined;
      autoFocus?: undefined;
    })
  | (CommonProps & {
      type: SectionType.To;
      loading?: boolean;
      autoFocus?: boolean;
    });

const commonStyles = { border: 0, height: "200px", resize: "none" };

const getPlaceholder = ({
  type,
  loading,
}: {
  type: SectionType;
  loading?: boolean;
}) => {
  if (type === SectionType.From) return "Introducir texto";
  if (loading === true) return "Cargando...";
  return "Traducción";
};

export const TextArea = ({
  autoFocus,
  loading,
  type,
  value,
  onChange,
}: Props) => {
  const styles =
    type === SectionType.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: "#ddd" };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      as="textarea"
      placeholder={getPlaceholder({ type, loading })}
      style={styles}
      value={value}
      onChange={handleChange}
    />
  );
};
