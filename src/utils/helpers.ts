export const getCookie = (cookieName: string): string => {
  const cookieValue = document.cookie.replace(
    new RegExp(
      "(?:(?:^|.*;\\s*)" + cookieName + "\\s*\\=\\s*([^;]*).*$)|^.*$"
    ),
    "$1"
  );

  return cookieValue;
};