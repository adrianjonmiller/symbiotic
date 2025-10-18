/**
 * Special handlers for different attribute types
 */

export const specialHandlers = {
  disabled: (el, name, value) => {
    if (value) {
      el.setAttribute('disabled', '');
      el.disabled = true;
    } else {
      el.removeAttribute('disabled');
      el.disabled = false;
    }
  },
  
  class: (el, name, value) => {
    if (value) {
      el.className = value;
    } else {
      el.className = '';
    }
  },
  
  style: (el, name, value) => {
    if (value) {
      el.style.cssText = value;
    } else {
      el.style.cssText = '';
    }
  },
  
  hidden: (el, name, value) => {
    if (value) {
      el.setAttribute('hidden', '');
    } else {
      el.removeAttribute('hidden');
    }
  },
  
  required: (el, name, value) => {
    if (value) {
      el.setAttribute('required', '');
    } else {
      el.removeAttribute('required');
    }
  },
  
  readonly: (el, name, value) => {
    if (value) {
      el.setAttribute('readonly', '');
    } else {
      el.removeAttribute('readonly');
    }
  },
  
  checked: (el, name, value) => {
    el.checked = !!value;
  },
  
  selected: (el, name, value) => {
    el.selected = !!value;
  },
  
  tabindex: (el, name, value) => {
    const num = Number(value);
    if (!isNaN(num)) {
      el.setAttribute('tabindex', num);
    } else {
      el.removeAttribute('tabindex');
    }
  },
  
  maxlength: (el, name, value) => {
    const num = Number(value);
    if (!isNaN(num)) {
      el.setAttribute('maxlength', num);
    } else {
      el.removeAttribute('maxlength');
    }
  }
};
