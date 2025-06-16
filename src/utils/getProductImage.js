const imageMap = {
  'papa andina': require('../assets/papa-andina.jpg'),
  'maíz morado': require('../assets/maiz-morado.jpg'),
  'camote': require('../assets/camote.jpg'),
  'miel': require('../assets/miel.jpg'),
  'fresa orgánica': require('../assets/fresa-orgánica.jpg'),
  'mango kent': require('../assets/mango-kent.jpg'),
  'lentejas verdes': require('../assets/lentejas-verdes.jpg'),
  // agrega más productos aquí
};

export const getProductImage = (productName) => {
  const key = productName.toLowerCase().trim();
  return imageMap[key] || require('../assets/default.jpg'); // imagen por defecto
};
