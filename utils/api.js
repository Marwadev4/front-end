const API_BASE_URL = 'http://localhost:5000/api';

export const fetchFonts = async () => {
  const response = await fetch(`${API_BASE_URL}/fonts`);
  if (!response.ok) throw new Error('Failed to fetch fonts');
  return response.json();
};

export const uploadFont = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/fonts/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Upload failed');
  }
  return response.json();
};

export const deleteFont = async (id) => {
  const response = await fetch(`${API_BASE_URL}/fonts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Delete failed');
  return response.json();
};

export const getDownloadUrl = (id) => `${API_BASE_URL}/fonts/${id}/download`;
