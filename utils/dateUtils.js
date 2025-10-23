// Safely parse any date string into a local Date (handles YYYY-MM-DD and ISO)
export const parseLocalDate = (dateStr) => {
  if (!dateStr) return null;

  if (dateStr.includes("T")) {
    // ISO datetime string
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0); // local midnight
    return d;
  }

  // YYYY-MM-DD string
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day); // local midnight
};

// Get today's local date (midnight)
export const getTodayLocal = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

// Format local date as YYYY-MM-DD
export const formatLocalDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
