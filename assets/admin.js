const adminForm = document.getElementById('admin-form');
const statusEl = document.getElementById('admin-status');
const saveButton = document.getElementById('save-content');
const refreshButton = document.getElementById('refresh-content');

let content = null;

const createElement = (tag, props = {}, children = []) => {
  const el = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'className') {
      el.className = value;
    } else if (key === 'text') {
      el.textContent = value;
    } else if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.substring(2).toLowerCase(), value);
    } else if (value !== undefined) {
      el.setAttribute(key, value);
    }
  });
  if (!Array.isArray(children)) {
    children = [children];
  }
  children.filter(Boolean).forEach((child) => {
    if (typeof child === 'string') {
      el.insertAdjacentHTML('beforeend', child);
    } else {
      el.appendChild(child);
    }
  });
  return el;
};

const createField = ({ label, type = 'text', options = [] }, value, onChange) => {
  const wrapper = createElement('label');
  wrapper.appendChild(createElement('span', { text: label }));

  let field;
  if (type === 'textarea') {
    field = createElement('textarea');
    field.value = value ?? '';
    field.addEventListener('input', (event) => onChange(event.target.value));
  } else if (type === 'select') {
    field = createElement('select');
    options.forEach((option) => {
      const optionEl = createElement('option', { value: option.value, text: option.label });
      if (option.value === value) {
        optionEl.selected = true;
      }
      field.appendChild(optionEl);
    });
    field.addEventListener('change', (event) => onChange(event.target.value));
  } else if (type === 'checkbox') {
    field = createElement('input', { type: 'checkbox' });
    field.checked = Boolean(value);
    field.addEventListener('change', (event) => onChange(event.target.checked));
  } else {
    field = createElement('input', { type });
    field.value = value ?? '';
    field.addEventListener('input', (event) => onChange(event.target.value));
  }

  wrapper.appendChild(field);
  return wrapper;
};

const createListEditor = ({ title, items, addLabel, createItem, fields }) => {
  const section = createElement('div', { className: 'form-section' });
  if (title) {
    section.appendChild(createElement('h3', { text: title }));
  }
  const list = createElement('div', { className: 'list-editor' });
  const renderItems = () => {
    list.innerHTML = '';
    items.forEach((item, index) => {
      const itemWrapper = createElement('div', { className: 'list-item' });
      fields.forEach((fieldConfig) => {
        const field = createField(
          fieldConfig,
          item[fieldConfig.key],
          (value) => {
            item[fieldConfig.key] = value;
          },
        );
        itemWrapper.appendChild(field);
      });
      const actions = createElement('div', { className: 'list-item-actions' });
      const removeButton = createElement('button', {
        type: 'button',
        text: 'Remove',
        onclick: () => {
          items.splice(index, 1);
          renderItems();
        },
      });
      actions.appendChild(removeButton);
      itemWrapper.appendChild(actions);
      list.appendChild(itemWrapper);
    });
  };
  renderItems();

  const addButton = createElement(
    'button',
    {
      type: 'button',
      className: 'add-button',
      text: `＋ ${addLabel}`,
      onclick: () => {
        items.push(createItem());
        renderItems();
      },
    },
  );

  section.appendChild(list);
  section.appendChild(addButton);
  return section;
};

const createSection = (title) => {
  const section = createElement('section', { className: 'form-section' });
  section.appendChild(createElement('h2', { text: title }));
  return section;
};

const buildAdminForm = () => {
  adminForm.innerHTML = '';
  if (!content) return;

  const seoSection = createSection('SEO');
  seoSection.appendChild(
    createField({ label: 'Page title' }, content.seo.title, (value) => {
      content.seo.title = value;
    }),
  );
  seoSection.appendChild(
    createField({ label: 'Meta description', type: 'textarea' }, content.seo.description, (value) => {
      content.seo.description = value;
    }),
  );
  adminForm.appendChild(seoSection);

  const navSection = createSection('Navigation');
  navSection.appendChild(
    createField({ label: 'Logo text' }, content.nav.logoText, (value) => {
      content.nav.logoText = value;
    }),
  );
  navSection.appendChild(
    createField({ label: 'CTA label' }, content.nav.cta.label, (value) => {
      content.nav.cta.label = value;
    }),
  );
  navSection.appendChild(
    createField({ label: 'CTA link (href)' }, content.nav.cta.href, (value) => {
      content.nav.cta.href = value;
    }),
  );
  navSection.appendChild(
    createListEditor({
      title: 'Navigation links',
      items: content.nav.links,
      addLabel: 'Add navigation link',
      createItem: () => ({ label: '', href: '#' }),
      fields: [
        { key: 'label', label: 'Label' },
        { key: 'href', label: 'Href' },
      ],
    }),
  );
  adminForm.appendChild(navSection);

  const heroSection = createSection('Hero');
  heroSection.appendChild(
    createField({ label: 'Eyebrow' }, content.hero.eyebrow, (value) => {
      content.hero.eyebrow = value;
    }),
  );
  heroSection.appendChild(
    createField({ label: 'Headline' }, content.hero.title, (value) => {
      content.hero.title = value;
    }),
  );
  heroSection.appendChild(
    createField({ label: 'Subheadline', type: 'textarea' }, content.hero.subtitle, (value) => {
      content.hero.subtitle = value;
    }),
  );
  heroSection.appendChild(
    createField({ label: 'Primary CTA label' }, content.hero.primaryCta.label, (value) => {
      content.hero.primaryCta.label = value;
    }),
  );
  heroSection.appendChild(
    createField({ label: 'Primary CTA href' }, content.hero.primaryCta.href, (value) => {
      content.hero.primaryCta.href = value;
    }),
  );
  heroSection.appendChild(
    createField({ label: 'Secondary CTA label' }, content.hero.secondaryCta.label, (value) => {
      content.hero.secondaryCta.label = value;
    }),
  );
  heroSection.appendChild(
    createField({ label: 'Secondary CTA href' }, content.hero.secondaryCta.href, (value) => {
      content.hero.secondaryCta.href = value;
    }),
  );
  heroSection.appendChild(
    createField({ label: 'Background video URL' }, content.hero.backgroundVideo, (value) => {
      content.hero.backgroundVideo = value;
    }),
  );
  adminForm.appendChild(heroSection);

  const clientsSection = createSection('Clients');
  clientsSection.appendChild(
    createField({ label: 'Headline' }, content.clients.headline, (value) => {
      content.clients.headline = value;
    }),
  );
  clientsSection.appendChild(
    createListEditor({
      title: 'Client logos',
      items: content.clients.logos,
      addLabel: 'Add client',
      createItem: () => ({ name: '', url: '' }),
      fields: [
        { key: 'name', label: 'Client name' },
        { key: 'url', label: 'Logo URL' },
      ],
    }),
  );
  adminForm.appendChild(clientsSection);

  const servicesSection = createSection('Services');
  servicesSection.appendChild(
    createField({ label: 'Headline' }, content.services.headline, (value) => {
      content.services.headline = value;
    }),
  );
  servicesSection.appendChild(
    createField({ label: 'Description', type: 'textarea' }, content.services.description, (value) => {
      content.services.description = value;
    }),
  );
  servicesSection.appendChild(
    createListEditor({
      title: 'Service cards',
      items: content.services.items,
      addLabel: 'Add service',
      createItem: () => ({ title: '', description: '' }),
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ],
    }),
  );
  adminForm.appendChild(servicesSection);

  const caseSection = createSection('Case studies');
  caseSection.appendChild(
    createField({ label: 'Headline' }, content.caseStudies.headline, (value) => {
      content.caseStudies.headline = value;
    }),
  );
  caseSection.appendChild(
    createListEditor({
      title: 'Cards',
      items: content.caseStudies.cards,
      addLabel: 'Add case study',
      createItem: () => ({ title: '', category: '', description: '', mediaType: 'image', mediaUrl: '' }),
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'category', label: 'Category' },
        { key: 'description', label: 'Description', type: 'textarea' },
        {
          key: 'mediaType',
          label: 'Media type',
          type: 'select',
          options: [
            { value: 'image', label: 'Image' },
            { value: 'video', label: 'Video' },
          ],
        },
        { key: 'mediaUrl', label: 'Media URL' },
      ],
    }),
  );
  adminForm.appendChild(caseSection);

  const approachSection = createSection('Approach');
  approachSection.appendChild(
    createField({ label: 'Headline' }, content.approach.headline, (value) => {
      content.approach.headline = value;
    }),
  );
  approachSection.appendChild(
    createListEditor({
      title: 'Steps',
      items: content.approach.steps,
      addLabel: 'Add step',
      createItem: () => ({ title: '', description: '' }),
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ],
    }),
  );
  adminForm.appendChild(approachSection);

  const testimonialsSection = createSection('Testimonials');
  testimonialsSection.appendChild(
    createField({ label: 'Headline' }, content.testimonials.headline, (value) => {
      content.testimonials.headline = value;
    }),
  );
  testimonialsSection.appendChild(
    createListEditor({
      title: 'Quotes',
      items: content.testimonials.items,
      addLabel: 'Add testimonial',
      createItem: () => ({ quote: '', author: '', role: '' }),
      fields: [
        { key: 'quote', label: 'Quote', type: 'textarea' },
        { key: 'author', label: 'Author' },
        { key: 'role', label: 'Role' },
      ],
    }),
  );
  adminForm.appendChild(testimonialsSection);

  const ctaSection = createSection('Primary CTA');
  ctaSection.appendChild(
    createField({ label: 'Headline' }, content.cta.headline, (value) => {
      content.cta.headline = value;
    }),
  );
  ctaSection.appendChild(
    createField({ label: 'Description', type: 'textarea' }, content.cta.description, (value) => {
      content.cta.description = value;
    }),
  );
  ctaSection.appendChild(
    createField({ label: 'Button label' }, content.cta.button.label, (value) => {
      content.cta.button.label = value;
    }),
  );
  ctaSection.appendChild(
    createField({ label: 'Button href' }, content.cta.button.href, (value) => {
      content.cta.button.href = value;
    }),
  );
  adminForm.appendChild(ctaSection);

  const contactSection = createSection('Contact form');
  contactSection.appendChild(
    createField({ label: 'Headline' }, content.contact.headline, (value) => {
      content.contact.headline = value;
    }),
  );
  contactSection.appendChild(
    createField({ label: 'Description', type: 'textarea' }, content.contact.description, (value) => {
      content.contact.description = value;
    }),
  );
  contactSection.appendChild(
    createField({ label: 'Form action URL' }, content.contact.formAction, (value) => {
      content.contact.formAction = value;
    }),
  );
  contactSection.appendChild(
    createListEditor({
      title: 'Fields',
      items: content.contact.fields,
      addLabel: 'Add form field',
      createItem: () => ({ name: '', label: '', type: 'text', required: false }),
      fields: [
        { key: 'name', label: 'Name' },
        { key: 'label', label: 'Label' },
        {
          key: 'type',
          label: 'Type',
          type: 'select',
          options: [
            { value: 'text', label: 'Text' },
            { value: 'email', label: 'Email' },
            { value: 'textarea', label: 'Textarea' },
          ],
        },
        { key: 'required', label: 'Required', type: 'checkbox' },
      ],
    }),
  );
  adminForm.appendChild(contactSection);

  const footerSection = createSection('Footer');
  footerSection.appendChild(
    createField({ label: 'Address' }, content.footer.address, (value) => {
      content.footer.address = value;
    }),
  );
  footerSection.appendChild(
    createField({ label: 'Email' }, content.footer.email, (value) => {
      content.footer.email = value;
    }),
  );
  footerSection.appendChild(
    createField({ label: 'Phone' }, content.footer.phone, (value) => {
      content.footer.phone = value;
    }),
  );
  footerSection.appendChild(
    createListEditor({
      title: 'Social links',
      items: content.footer.social,
      addLabel: 'Add social link',
      createItem: () => ({ label: '', href: '' }),
      fields: [
        { key: 'label', label: 'Platform' },
        { key: 'href', label: 'URL' },
      ],
    }),
  );
  adminForm.appendChild(footerSection);
};

const setStatus = (message, tone = 'info') => {
  statusEl.textContent = message;
  statusEl.dataset.tone = tone;
};

const loadContent = async () => {
  setStatus('Loading content…');
  try {
    const response = await fetch('api/content.php');
    if (!response.ok) throw new Error('Unable to load content');
    content = await response.json();
    buildAdminForm();
    setStatus('Content loaded.');
  } catch (error) {
    setStatus(error.message, 'error');
  }
};

const saveContent = async () => {
  if (!content) return;
  setStatus('Saving changes…');
  try {
    const response = await fetch('api/content.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    });
    const result = await response.json();
    if (!response.ok || result.error) {
      throw new Error(result?.error || 'Failed to save content');
    }
    setStatus('Saved successfully.', 'success');
  } catch (error) {
    setStatus(error.message, 'error');
  }
};

saveButton.addEventListener('click', (event) => {
  event.preventDefault();
  saveContent();
});

refreshButton.addEventListener('click', (event) => {
  event.preventDefault();
  loadContent();
});

loadContent();
