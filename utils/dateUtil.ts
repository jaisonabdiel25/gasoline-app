import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const parseLocalDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const timeAgo = (createdAt: Date) =>
formatDistanceToNow(createdAt, {
  addSuffix: true,
  locale: es,
})
