// utils/dateUtils.js
export const parseLocalDate = (dateStr) => {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day); // local midnight
};

// ✅ Get today's local midnight (Nigerian time)
export const getTodayLocal = () => {
  const now = new Date();
  // shift to UTC+1 (Nigeria)
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const nigeriaOffset = 1 * 60 * 60000; // +1 hour
  const nigeriaTime = new Date(utc + nigeriaOffset);
  nigeriaTime.setHours(0, 0, 0, 0);
  return nigeriaTime;
};

export const formatLocalDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
