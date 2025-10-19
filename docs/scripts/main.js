import { createSymbiote, bind, repeat } from '../../src/main.js';

const symbiote = createSymbiote({
  '.js-repeat': (el) => {
    const data = {
      items: [
        {
          id: 1,
          name: 'Item 1',
          description: 'Description 1',
          price: 100,
          category: 'Category 1',
          inStock: true,
          rating: 4.5
        },
        {
          id: 2,
          name: 'Item 2',
          description: 'Description 2',
          price: 200,
          category: 'Category 2',
          inStock: false,
          rating: 3.5
        },
        {
          id: 3,
          name: 'Item 3',
          description: 'Description 3',
          price: 300,
          category: 'Category 3',
          inStock: true,
          rating: 5.0
        }
      ]
    }
    const updateItems = repeat(el, data)

    setTimeout(() => {
      data.items.push({
        id: 4,
        name: 'Item 4',
        description: 'Description 4',
        price: 400,
        category: 'Category 4',
        inStock: true,
        rating: 4.0
      })
      updateItems(data)
    }, 1000)
  }
});

symbiote.attach();
