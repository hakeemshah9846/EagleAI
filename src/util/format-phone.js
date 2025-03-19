export function formatPhoneNumber(number) {
    return number.replace(/\D/g, '') // Remove non-numeric characters
      .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
   
  