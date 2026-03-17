const mango = "/ChatGPTMango.jpg";
const coconut = "/ChatGPT Coconut.jpg";
const guava = "/ChatGPTGuava.jpg";
const chiku = "/ChatGPT Chiku.jpg";

export const INTRO_DATA=[
    {
        image: mango,
        title: 'Fresh Farm Mangoes',
        description:'Tropical Mangoes Delivered to Your Doorstep Within 10 minutes'
    },
    {
        image: coconut,
        title: 'Fresh Farm Coconuts',
        description:'Tropical Coconuts Delivered to Your Doorstep Within 10 minutes'
    },
    {
        image:guava,
        title:'Fresh Farm Guava',
        description:'Tropical Guava Delivered to Your Doorstep Within 10 minutes',

    },
    {
        image:chiku,
        title:'Fresh Farm Chiku',
        description:'Tropical Chiku Delivered to Your Doorstep Within 10 minutes',

    },

]

const baseProducts = [
  { id: "mango", name: "Kesar Mango", price: 120, image: mango },
  { id: "chiku", name: "Chiku", price: 90, image: chiku },
  { id: "coconut", name: "Green Coconut", price: 60, image: coconut },
  { id: "guava", name: "Guava", price: 80, image: guava },
];

const products = Array.from({ length: 80 }, (_, i) => {
  const base = baseProducts[i % baseProducts.length];

  return {
    ...base,
    id: `${base.id}-${i}`,
    name: `${base.name} ${i + 1}`,
  };
});

export default products;
