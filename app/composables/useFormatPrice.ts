export const useFormatPrice = () => {
  const formatPrice = (value: number): string => {
    return value.toLocaleString('ru-RU') + ' ₽'
  }

  return { formatPrice }
}