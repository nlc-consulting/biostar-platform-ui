import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { API_BASE_URL, authFetchJson } from '../apiClient.ts';

interface BasicEntity {
  id: number;
  firstName?: string;
  lastName?: string;
  name?: string;
}

interface Props {
  value: number | null;
  onChange: (id: number | null) => void;
  label?: string;
}

export const ContactAutocomplete: React.FC<Props> = ({ value, onChange, label = 'Speaker' }) => {
  const [options, setOptions] = useState<BasicEntity[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch default list (top 10 contacts alphabetically)
  const loadDefaultList = async () => {
    setLoading(true);
    try {
      const res = await authFetchJson(
        `${API_BASE_URL}/contacts?sort=["lastName","ASC"]&range=[0,9]`
      );
      setOptions(res.json);
    } finally {
      setLoading(false);
    }
  };

  // Fetch specific contact if value is preselected
  const loadSelectedContact = async () => {
    if (!value) return;
    try {
      const res = await authFetchJson(`${API_BASE_URL}/contacts/${value}`);
      setOptions([res.json]); // ensures correct preselection
    } catch {
      console.error('test');
    }
  };

  // On mount or when modal opens, load defaults or selected
  useEffect(() => {
    if (value) loadSelectedContact();
    else loadDefaultList();
  }, [value]);

  const handleSearch = async (input: string) => {
    if (!input) return loadDefaultList();

    setLoading(true);
    const res = await authFetchJson(`${API_BASE_URL}/contacts?filter={"q":"${input}"}`);
    setOptions(res.json);
    setLoading(false);
  };

  return (
    <Autocomplete
      loading={loading}
      options={options}
      value={options.find((o) => o.id === value) || null}
      getOptionLabel={(r) => r.name || `${r.firstName ?? ''} ${r.lastName ?? ''}`.trim()}
      onInputChange={(_, text) => handleSearch(text)}
      onChange={(_, newVal) => onChange(newVal?.id ?? null)}
      renderInput={(params) => <TextField {...params} label={label} fullWidth />}
    />
  );
};
