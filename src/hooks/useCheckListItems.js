import { useState } from "react";

export default function useCheckListItems({ setNote }) {
  const [fields, setFields] = useState([
    { id: Date.now(), value: "", checked: false },
  ]);

  const updateFields = (updated) => {
    setFields(updated);
    setNote(updated);
  };

  const handleAddField = () => {
    updateFields([...fields, { id: Date.now(), value: "", checked: false }]);
  };

  const handleFieldChange = (id, newValue) => {
    updateFields(
      fields.map((f) => (f.id === id ? { ...f, value: newValue } : f))
    );
  };

  const handleRemoveField = (id) => {
    updateFields(fields.filter((f) => f.id !== id));
  };

  const handleCheckChange = (id, checked) => {
    updateFields(fields.map((f) => (f.id === id ? { ...f, checked } : f)));
  };
  return {
    handleAddField,
    handleFieldChange,
    handleCheckChange,
    handleRemoveField,
    fields,
  };
}
