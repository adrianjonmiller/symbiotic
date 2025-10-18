export function parseDataBind(element) {
  const bindings = [];
  const attributes = element.attributes;
  
  for (let i = 0; i < attributes.length; i++) {
    const attr = attributes[i];
    if (attr.name.startsWith('data-bind:')) {
      const property = attr.name.slice(10);
      const path = attr.value.trim();
      
      bindings.push({
        property,
        path: path
      });
    }
  }
  
  return bindings;
}