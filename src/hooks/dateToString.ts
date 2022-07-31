export function returnDateFunc(currentDate: any) {
  return new Date(currentDate).toLocaleDateString("en", {
    hour12: false,
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}
