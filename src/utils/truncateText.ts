/**
 * Truncates text to a maximum length, appending an ellipsis if truncated.
 * If text is at or below maxLength, returns unchanged.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '…';
}
