import { Product } from '@/context/CartContext';

export const ALL_PRODUCTS: Product[] = [
  // Landerlan
  { id: "decaland", name: "Decaland 5ml", brand: "Landerlan", description: "5ml", price: 84.90, originalPrice: 100.00, image: "/placeholder.svg", category: "Injetável", tags: ["15% OFF", "Injetável"], details: { description: "<strong>Características:</strong><ul><li>✓ Produto de alta qualidade</li><li>✓ Fabricado com excelência</li><li>✓ Resultados consistentes</li></ul><br/><strong>Modo de uso:</strong><p>Uso intramuscular profundo. Consulte um profissional de saúde antes de usar.</p>", specifications: "200mg/ml" } },
  { id: "duraland", name: "Duraland 1ml", brand: "Landerlan", description: "1ml - 250mg/ml", price: 22.50, originalPrice: 25.00, image: "/placeholder.svg", category: "Injetável", tags: ["10% OFF", "Injetável"], details: { description: "Produto de alta qualidade para resultados eficazes.", specifications: "250mg/ml" } },
  { id: "gh-landertropin", name: "GH LANDERTROPIN", brand: "Landerlan", description: "10UI - 4mg/1.5ml", price: 2199.00, image: "/placeholder.svg", category: "Injetável", tags: ["Injetável"], details: { description: "Hormônio de crescimento para performance máxima.", specifications: "10UI" } },
  { id: "primobolan-inject", name: "Primobolan Inject.", brand: "Landerlan", description: "10ml - 100mg/ml", price: 369.90, originalPrice: 390.00, image: "/placeholder.svg", category: "Injetável", tags: ["5% OFF", "Injetável"], details: { description: "Ideal para ciclos de definição e qualidade muscular.", specifications: "100mg/ml" } },
  { id: "oxandroland", name: "Oxandroland", brand: "Landerlan", description: "100 comp - 10mg", price: 180.00, image: "/placeholder.svg", category: "Oral", tags: ["Oral"], details: { description: "Auxilia no ganho de massa magra com baixa retenção.", specifications: "10mg / comprimido" } },
];

export const findProductById = (id: string | undefined): Product | undefined => {
  if (!id) return undefined;
  return ALL_PRODUCTS.find(p => p.id === id);
};