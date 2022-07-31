export const setSizeName = (sizes: number) => {
  if (sizes === 26) {
    return "Small";
  } else if (sizes === 30) {
    return "Medium";
  } else {
    return "Large";
  }
};
