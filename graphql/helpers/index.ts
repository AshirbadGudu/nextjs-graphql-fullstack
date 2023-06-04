// Helper function to generate a new unique ID (you can implement your own logic)
export function generateNewId() {
  return `${Date.now()}`;
}

// Helper function to get the current date and time
export function getCurrentDateTime() {
  return new Date().toISOString();
}
