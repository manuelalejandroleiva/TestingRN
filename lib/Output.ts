export const convertToSpanishDate = (dateString: string) => {
    const date = new Date(dateString.replace(/\//g, '-'));
    // Format the date in Spanish
    const spanishDate = date.toLocaleDateString('es-ES', {
      weekday: 'long',   // e.g. "lunes"
      year: 'numeric',   // e.g. "2025"
      month: 'long',     // e.g. "mayo"
      day: 'numeric'     // e.g. "24"
    });
    return spanishDate;
  };


  export const convertToISO = (dateString: string) => {
    const date = new Date(dateString.replace(/\//g, '-'));
    const offsetDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000); // Ajuste de zona horaria
    const isoString = offsetDate.toISOString().split('T')[0]; // Solo la parte de la fecha
    return isoString;
  };