export const filterProducts = (products, { search, category, price }) => {
  let data = [...products];

  // search
  if (search) {
    data = data.filter((p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()),
    );
  }

  // category (FIXED)
  if (category && category !== "all") {
    data = data.filter(
      (p) => p.category?.toLowerCase().trim() === category.toLowerCase().trim(),
    );
  }

  // price (FIXED)
  if (price) {
    data = data.filter((p) => Number(p.price) <= Number(price));
  }

  return data;
};
