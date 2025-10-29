const formatHtml = (strings, ...values) =>
  strings.reduce((acc, str, idx) => acc + str + (values[idx] ?? ''), '');

const renderHeader = (nav) => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  header.innerHTML = formatHtml`
    <a class="logo" href="#top">${nav.logoText}</a>
    <nav class="nav-links">
      ${nav.links.map((link) => `<a href="${link.href}">${link.label}</a>`).join('')}
      <a class="button" href="${nav.cta.href}">${nav.cta.label}</a>
    </nav>
  `;
};

const renderHero = (hero) => {
  const section = document.getElementById('hero');
  if (!section) return;
  section.innerHTML = formatHtml`
    <div class="hero-content">
      <span class="hero-eyebrow">${hero.eyebrow}</span>
      <h1 class="hero-title">${hero.title}</h1>
      <p class="hero-subtitle">${hero.subtitle}</p>
      <div class="hero-actions">
        <a class="button" href="${hero.primaryCta.href}">${hero.primaryCta.label}</a>
        <a class="button button-outline" href="${hero.secondaryCta.href}">${hero.secondaryCta.label}</a>
      </div>
    </div>
    <div class="hero-media">
      <iframe src="${hero.backgroundVideo}" title="Hero media" allow="autoplay; fullscreen; picture-in-picture"></iframe>
    </div>
  `;
};

const renderClients = (clients) => {
  const section = document.getElementById('clients');
  section.innerHTML = formatHtml`
    <div class="section-header">
      <p class="section-title">${clients.headline}</p>
    </div>
    <div class="clients-logos">
      ${clients.logos
        .map((logo) => `<img src="${logo.url}" alt="${logo.name} logo" loading="lazy" />`)
        .join('')}
    </div>
  `;
};

const renderServices = (services) => {
  const section = document.getElementById('services');
  section.innerHTML = formatHtml`
    <div class="section-header">
      <span class="section-eyebrow">Capabilities</span>
      <h2 class="section-title">${services.headline}</h2>
      <p class="section-description">${services.description}</p>
    </div>
    <div class="service-grid">
      ${services.items
        .map(
          (item) => formatHtml`
            <article class="service-card">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
            </article>
          `,
        )
        .join('')}
    </div>
  `;
};

const renderCaseStudies = (caseStudies) => {
  const section = document.getElementById('case-studies');
  section.innerHTML = formatHtml`
    <div class="section-header">
      <span class="section-eyebrow">Work</span>
      <h2 class="section-title">${caseStudies.headline}</h2>
    </div>
    <div class="case-grid">
      ${caseStudies.cards
        .map((card) => {
          const media =
            card.mediaType === 'video'
              ? `<iframe src="${card.mediaUrl}" title="${card.title} video" allow="autoplay; fullscreen; picture-in-picture"></iframe>`
              : `<img src="${card.mediaUrl}" alt="${card.title}" loading="lazy" />`;
          return formatHtml`
            <article class="case-card">
              <div class="case-media">${media}</div>
              <div class="case-content">
                <p class="section-eyebrow">${card.category}</p>
                <h3 class="section-title">${card.title}</h3>
                <p class="section-description">${card.description}</p>
              </div>
            </article>
          `;
        })
        .join('')}
    </div>
  `;
};

const renderApproach = (approach) => {
  const section = document.getElementById('approach');
  section.innerHTML = formatHtml`
    <div class="section-header">
      <span class="section-eyebrow">Approach</span>
      <h2 class="section-title">${approach.headline}</h2>
    </div>
    <div class="approach-grid">
      ${approach.steps
        .map(
          (step, index) => formatHtml`
            <article class="approach-step">
              <span class="section-eyebrow">Step ${index + 1}</span>
              <h3>${step.title}</h3>
              <p class="section-description">${step.description}</p>
            </article>
          `,
        )
        .join('')}
    </div>
  `;
};

const renderTestimonials = (testimonials) => {
  const section = document.getElementById('testimonials');
  section.innerHTML = formatHtml`
    <div class="section-header">
      <span class="section-eyebrow">Social proof</span>
      <h2 class="section-title">${testimonials.headline}</h2>
    </div>
    <div class="testimonial-grid">
      ${testimonials.items
        .map(
          (item) => formatHtml`
            <blockquote class="testimonial-card">
              <p class="testimonial-quote">“${item.quote}”</p>
              <p class="testimonial-author">${item.author} — ${item.role}</p>
            </blockquote>
          `,
        )
        .join('')}
    </div>
  `;
};

const renderCta = (cta) => {
  const section = document.getElementById('cta');
  section.innerHTML = formatHtml`
    <h2 class="section-title">${cta.headline}</h2>
    <p>${cta.description}</p>
    <a class="button" href="${cta.button.href}">${cta.button.label}</a>
  `;
};

const renderContact = (contact) => {
  const section = document.getElementById('contact');
  section.innerHTML = formatHtml`
    <div class="section-header">
      <h2 class="section-title">${contact.headline}</h2>
      <p class="section-description">${contact.description}</p>
    </div>
    <form action="${contact.formAction}" method="POST">
      ${contact.fields
        .map((field) => {
          if (field.type === 'textarea') {
            return formatHtml`
              <label>
                ${field.label}
                <textarea name="${field.name}" ${field.required ? 'required' : ''}></textarea>
              </label>
            `;
          }
          return formatHtml`
            <label>
              ${field.label}
              <input type="${field.type}" name="${field.name}" ${field.required ? 'required' : ''} />
            </label>
          `;
        })
        .join('')}
      <button class="button" type="submit">Submit</button>
    </form>
  `;
};

const renderFooter = (footer) => {
  const section = document.getElementById('footer');
  section.innerHTML = formatHtml`
    <div class="logo">NeoFox Media</div>
    <div class="footer-meta">
      <span>${footer.address}</span>
      <span>${footer.email}</span>
      <span>${footer.phone}</span>
    </div>
    <div class="footer-social">
      ${footer.social.map((item) => `<a href="${item.href}">${item.label}</a>`).join('')}
    </div>
    <small>© ${new Date().getFullYear()} NeoFox Media. All rights reserved.</small>
  `;
};

const applySeo = (seo) => {
  document.title = seo.title;
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', seo.description);
  } else {
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = seo.description;
    document.head.appendChild(meta);
  }
};

const hydratePage = async () => {
  const response = await fetch('/api/content');
  const content = await response.json();

  applySeo(content.seo);
  renderHeader(content.nav);
  renderHero(content.hero);
  renderClients(content.clients);
  renderServices(content.services);
  renderCaseStudies(content.caseStudies);
  renderApproach(content.approach);
  renderTestimonials(content.testimonials);
  renderCta(content.cta);
  renderContact(content.contact);
  renderFooter(content.footer);
};

document.addEventListener('DOMContentLoaded', hydratePage);
