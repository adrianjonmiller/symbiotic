/**
 * Special handlers for different attribute types
 */

// Property name normalization - HTML attributes are case-insensitive
const PROPERTY_MAP = {
  'innerhtml': 'innerHTML',
  'textcontent': 'textContent',
  'classname': 'className',
  'class': 'className',
  'tabindex': 'tabIndex',
  'maxlength': 'maxLength',
  'readonly': 'readOnly',
  'innertext': 'innerText'
};

export const getHandler = (property) => {
  // Normalize property name
  const normalizedProperty = PROPERTY_MAP[property.toLowerCase()] || property;
  
  switch (normalizedProperty) {
    case 'disabled':
      return (el, value) => {
        if (value) {
          el.setAttribute('disabled', '');
          el.disabled = true;
        } else {
          el.removeAttribute('disabled');
          el.disabled = false;
        }
      };
    case 'className':
      return (el, value) => {
        if (value) {
          el.className = value;
        } else {
          el.className = '';
        }
      };
    case 'style':
      return (el, value) => {
        if (value) {
          el.style.cssText = value;
        } else {
          el.style.cssText = '';
        }
      };
    case 'hidden':
      return (el, value) => {
        if (value) {
          el.setAttribute('hidden', '');
        } else {
          el.removeAttribute('hidden');
        }
      };
    case 'required':
      return (el, value) => {
        if (value) {
          el.setAttribute('required', '');
        } else {
          el.removeAttribute('required');
        }
      };
    case 'readonly':
      return (el, value) => {
        if (value) {
          el.setAttribute('readonly', '');
        } else {
          el.removeAttribute('readonly');
        }
      };
    case 'checked':
      return (el, value) => {
        el.checked = !!value;
      };
    case 'selected':
      return (el, value) => {
        el.selected = !!value;
      };
    case 'tabindex':
      return (el, value) => {
        const num = Number(value);
        if (!isNaN(num)) {
          el.setAttribute('tabindex', num);
        } else {  
          el.removeAttribute('tabindex');
        }
      };
    case 'maxlength':
      return (el, value) => {
        const num = Number(value);
        if (!isNaN(num)) {
          el.setAttribute('maxlength', num);
        } else {
          el.removeAttribute('maxlength');
        }
      };
    case 'textnode':
      return (el, value) => {
        // For text node bindings, el is actually the text node
        el.textContent = value != null ? String(value) : '';
      };
    default:
      return (el, value) => {
        if (normalizedProperty.startsWith('data-')) {
          return el.setAttribute(normalizedProperty, value != null ? String(value) : '');
        }
        return el[normalizedProperty] = value != null ? String(value) : '';
      };
  };
};
