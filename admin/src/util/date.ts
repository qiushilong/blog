import dayjs, { Dayjs } from "dayjs";

export function formatDate(
  date?: string | number | Date | Dayjs | null | undefined
) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}
