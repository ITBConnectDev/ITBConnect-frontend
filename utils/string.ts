export function validateEmail(email: string): boolean {
  // Regular expression to validate email
  const emailRegex = /^[1-3][0-9]{7}@mahasiswa\.itb\.ac\.id$/g;

  // Return true if email is valid, false otherwise
  return emailRegex.test(String(email).toLowerCase());
}
