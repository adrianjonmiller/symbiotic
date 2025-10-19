import { createSymbiote, bind } from '../../src/main.js';

// Performance monitoring utilities
function measurePerformance(name, fn) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name}: ${(end - start).toFixed(2)}ms`);
  return result;
}

function generateTestData(size) {
  return Array.from({ length: size }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
    price: Math.random() * 1000,
    category: ['Electronics', 'Clothing', 'Books', 'Home'][i % 4],
    inStock: Math.random() > 0.5,
    rating: Math.floor(Math.random() * 5) + 1
  }));
}

function runStressTest() {
  console.log('🚀 Starting Symbiote Repeat Performance Stress Test');
  console.log('================================================');
  
  const testSizes = [100, 500, 1000, 2000, 5000];
  const results = {};
  
  testSizes.forEach(size => {
    console.log(`\n📊 Testing with ${size} items:`);
    
    // Generate test data
    const data = generateTestData(size);
    
    // Find the template element
    const template = document.querySelector('.js-repeat');
    if (!template) {
      console.error('Template not found!');
      return;
    }
    
    // Measure initial render
    const update = measurePerformance(`Initial render (${size} items)`, () => {
      return bind(template, { items: data });
    });
    
    // Measure update performance
    const updateData = generateTestData(size);
    measurePerformance(`Update render (${size} items)`, () => {
      update({ items: updateData });
    });
    
    // Measure partial update (50% items changed)
    const partialData = data.map((item, i) => 
      i % 2 === 0 ? { ...item, name: `Updated ${item.name}` } : item
    );
    measurePerformance(`Partial update (${size} items, 50% changed)`, () => {
      update({ items: partialData });
    });
    
    // Measure DOM operations
    const domStart = performance.now();
    const renderedItems = template.parentNode.querySelectorAll('[data-repeat-item]');
    const domEnd = performance.now();
    console.log(`DOM query (${renderedItems.length} elements): ${(domEnd - domStart).toFixed(2)}ms`);
    
    // Memory usage check
    if (performance.memory) {
      console.log(`Memory usage: ${(performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
    }
    
    results[size] = {
      initialRender: performance.now(),
      updateRender: performance.now(),
      partialUpdate: performance.now(),
      domQuery: domEnd - domStart
    };
  });
  
  console.log('\n✅ Stress test completed!');
  console.log('Results summary:', results);
  
  // Test memory leaks by running multiple cycles
  console.log('\n🔍 Testing for memory leaks...');
  const template = document.querySelector('.js-repeat');
  if (template) {
    const update = bind(template, { items: generateTestData(1000) });
    
    for (let i = 0; i < 10; i++) {
      const start = performance.now();
      update({ items: generateTestData(1000) });
      const end = performance.now();
      console.log(`Cycle ${i + 1}: ${(end - start).toFixed(2)}ms`);
      
      // Force garbage collection if available
      if (window.gc) {
        window.gc();
      }
    }
  }
  
  console.log('\n🎉 Performance test complete!');
}

const symbiote = createSymbiote({
  '.js-repeat': (el) => {
    console.log('🔧 Setting up repeat component...');
    
    // Start stress test after a short delay
    setTimeout(runStressTest, 100);
  }
});

symbiote.attach();
