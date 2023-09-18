export const formatPrice = (number) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
  }).format(number / 100);
};

export const getUniqueValues = (data, type) => {
  let types = data.map((item) => item[type]);
  if (type === "colors") {
    types = types.flat();
  }
  return ["all", ...new Set(types)];
};
