export const priceCard = (price: any) => {
  return price.holofoil && price.holofoil.low ||
    price.reverseHolofoil && price.reverseHolofoil.low ||
    price.normal && price.normal.low;
}