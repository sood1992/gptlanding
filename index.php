<?php
$contentPath = __DIR__ . '/data/content.json';
$contentJson = file_exists($contentPath) ? file_get_contents($contentPath) : '{}';
$content = json_decode($contentJson, true) ?? [];

$seo = $content['seo'] ?? [];
$nav = $content['nav'] ?? [];
$hero = $content['hero'] ?? [];
$clients = $content['clients'] ?? [];
$services = $content['services'] ?? [];
$caseStudies = $content['caseStudies'] ?? [];
$approach = $content['approach'] ?? [];
$testimonials = $content['testimonials'] ?? [];
$cta = $content['cta'] ?? [];
$contact = $content['contact'] ?? [];
$footer = $content['footer'] ?? [];

$escape = fn($value) => htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?= $escape($seo['title'] ?? 'NeoFox Media') ?></title>
  <?php if (!empty($seo['description'])): ?>
    <meta name="description" content="<?= $escape($seo['description']) ?>" />
  <?php endif; ?>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="assets/styles.css" />
</head>
<body>
  <div class="page" id="page">
    <header class="site-header" id="top">
      <a class="logo" href="#top"><?= $escape($nav['logoText'] ?? 'NeoFox Media') ?></a>
      <nav class="nav-links">
        <?php foreach (($nav['links'] ?? []) as $link): ?>
          <a href="<?= $escape($link['href'] ?? '#') ?>"><?= $escape($link['label'] ?? '') ?></a>
        <?php endforeach; ?>
        <?php if (!empty($nav['cta'])): ?>
          <a class="button" href="<?= $escape($nav['cta']['href'] ?? '#') ?>"><?= $escape($nav['cta']['label'] ?? '') ?></a>
        <?php endif; ?>
      </nav>
    </header>
    <main>
      <section class="hero" id="hero">
        <div class="hero-content">
          <?php if (!empty($hero['eyebrow'])): ?><span class="hero-eyebrow"><?= $escape($hero['eyebrow']) ?></span><?php endif; ?>
          <?php if (!empty($hero['title'])): ?><h1 class="hero-title"><?= $escape($hero['title']) ?></h1><?php endif; ?>
          <?php if (!empty($hero['subtitle'])): ?><p class="hero-subtitle"><?= $escape($hero['subtitle']) ?></p><?php endif; ?>
          <div class="hero-actions">
            <?php if (!empty($hero['primaryCta'])): ?><a class="button" href="<?= $escape($hero['primaryCta']['href'] ?? '#') ?>"><?= $escape($hero['primaryCta']['label'] ?? '') ?></a><?php endif; ?>
            <?php if (!empty($hero['secondaryCta'])): ?><a class="button button-outline" href="<?= $escape($hero['secondaryCta']['href'] ?? '#') ?>"><?= $escape($hero['secondaryCta']['label'] ?? '') ?></a><?php endif; ?>
          </div>
        </div>
        <?php if (!empty($hero['backgroundVideo'])): ?>
          <div class="hero-media">
            <iframe src="<?= $escape($hero['backgroundVideo']) ?>" title="Hero media" allow="autoplay; fullscreen; picture-in-picture"></iframe>
          </div>
        <?php endif; ?>
      </section>

      <section class="clients" id="clients">
        <div class="section-header">
          <?php if (!empty($clients['headline'])): ?><p class="section-title"><?= $escape($clients['headline']) ?></p><?php endif; ?>
        </div>
        <div class="clients-logos">
          <?php foreach (($clients['logos'] ?? []) as $logo): ?>
            <img src="<?= $escape($logo['url'] ?? '') ?>" alt="<?= $escape(($logo['name'] ?? '') . ' logo') ?>" loading="lazy" />
          <?php endforeach; ?>
        </div>
      </section>

      <section class="services" id="services">
        <div class="section-header">
          <span class="section-eyebrow">Capabilities</span>
          <?php if (!empty($services['headline'])): ?><h2 class="section-title"><?= $escape($services['headline']) ?></h2><?php endif; ?>
          <?php if (!empty($services['description'])): ?><p class="section-description"><?= $escape($services['description']) ?></p><?php endif; ?>
        </div>
        <div class="service-grid">
          <?php foreach (($services['items'] ?? []) as $item): ?>
            <article class="service-card">
              <?php if (!empty($item['title'])): ?><h3><?= $escape($item['title']) ?></h3><?php endif; ?>
              <?php if (!empty($item['description'])): ?><p><?= $escape($item['description']) ?></p><?php endif; ?>
            </article>
          <?php endforeach; ?>
        </div>
      </section>

      <section class="case-studies" id="case-studies">
        <div class="section-header">
          <span class="section-eyebrow">Work</span>
          <?php if (!empty($caseStudies['headline'])): ?><h2 class="section-title"><?= $escape($caseStudies['headline']) ?></h2><?php endif; ?>
        </div>
        <div class="case-grid">
          <?php foreach (($caseStudies['cards'] ?? []) as $card): ?>
            <article class="case-card">
              <div class="case-media">
                <?php if (($card['mediaType'] ?? '') === 'video'): ?>
                  <iframe src="<?= $escape($card['mediaUrl'] ?? '') ?>" title="<?= $escape($card['title'] ?? '') ?> video" allow="autoplay; fullscreen; picture-in-picture"></iframe>
                <?php else: ?>
                  <img src="<?= $escape($card['mediaUrl'] ?? '') ?>" alt="<?= $escape($card['title'] ?? '') ?>" loading="lazy" />
                <?php endif; ?>
              </div>
              <div class="case-content">
                <?php if (!empty($card['category'])): ?><p class="section-eyebrow"><?= $escape($card['category']) ?></p><?php endif; ?>
                <?php if (!empty($card['title'])): ?><h3 class="section-title"><?= $escape($card['title']) ?></h3><?php endif; ?>
                <?php if (!empty($card['description'])): ?><p class="section-description"><?= $escape($card['description']) ?></p><?php endif; ?>
              </div>
            </article>
          <?php endforeach; ?>
        </div>
      </section>

      <section class="approach" id="approach">
        <div class="section-header">
          <span class="section-eyebrow">Approach</span>
          <?php if (!empty($approach['headline'])): ?><h2 class="section-title"><?= $escape($approach['headline']) ?></h2><?php endif; ?>
        </div>
        <div class="approach-grid">
          <?php foreach (($approach['steps'] ?? []) as $index => $step): ?>
            <article class="approach-step">
              <span class="section-eyebrow">Step <?= $escape($index + 1) ?></span>
              <?php if (!empty($step['title'])): ?><h3><?= $escape($step['title']) ?></h3><?php endif; ?>
              <?php if (!empty($step['description'])): ?><p class="section-description"><?= $escape($step['description']) ?></p><?php endif; ?>
            </article>
          <?php endforeach; ?>
        </div>
      </section>

      <section class="testimonials" id="testimonials">
        <div class="section-header">
          <span class="section-eyebrow">Social proof</span>
          <?php if (!empty($testimonials['headline'])): ?><h2 class="section-title"><?= $escape($testimonials['headline']) ?></h2><?php endif; ?>
        </div>
        <div class="testimonial-grid">
          <?php foreach (($testimonials['items'] ?? []) as $item): ?>
            <blockquote class="testimonial-card">
              <?php if (!empty($item['quote'])): ?><p class="testimonial-quote">“<?= $escape($item['quote']) ?>”</p><?php endif; ?>
              <?php if (!empty($item['author']) || !empty($item['role'])): ?><p class="testimonial-author"><?= $escape($item['author'] ?? '') ?><?= !empty($item['role']) ? ' — ' . $escape($item['role']) : '' ?></p><?php endif; ?>
            </blockquote>
          <?php endforeach; ?>
        </div>
      </section>

      <section class="cta" id="cta">
        <?php if (!empty($cta['headline'])): ?><h2 class="section-title"><?= $escape($cta['headline']) ?></h2><?php endif; ?>
        <?php if (!empty($cta['description'])): ?><p><?= $escape($cta['description']) ?></p><?php endif; ?>
        <?php if (!empty($cta['button'])): ?><a class="button" href="<?= $escape($cta['button']['href'] ?? '#') ?>"><?= $escape($cta['button']['label'] ?? '') ?></a><?php endif; ?>
      </section>

      <section class="contact" id="contact">
        <div class="section-header">
          <?php if (!empty($contact['headline'])): ?><h2 class="section-title"><?= $escape($contact['headline']) ?></h2><?php endif; ?>
          <?php if (!empty($contact['description'])): ?><p class="section-description"><?= $escape($contact['description']) ?></p><?php endif; ?>
        </div>
        <form action="<?= $escape($contact['formAction'] ?? '#') ?>" method="POST">
          <?php foreach (($contact['fields'] ?? []) as $field): ?>
            <label>
              <?= $escape($field['label'] ?? '') ?>
              <?php if (($field['type'] ?? '') === 'textarea'): ?>
                <textarea name="<?= $escape($field['name'] ?? '') ?>" <?= !empty($field['required']) ? 'required' : '' ?>></textarea>
              <?php else: ?>
                <input type="<?= $escape($field['type'] ?? 'text') ?>" name="<?= $escape($field['name'] ?? '') ?>" <?= !empty($field['required']) ? 'required' : '' ?> />
              <?php endif; ?>
            </label>
          <?php endforeach; ?>
          <button class="button" type="submit">Submit</button>
        </form>
      </section>
    </main>

    <footer class="site-footer" id="footer">
      <div class="logo"><?= $escape($nav['logoText'] ?? 'NeoFox Media') ?></div>
      <div class="footer-meta">
        <?php if (!empty($footer['address'])): ?><span><?= $escape($footer['address']) ?></span><?php endif; ?>
        <?php if (!empty($footer['email'])): ?><span><?= $escape($footer['email']) ?></span><?php endif; ?>
        <?php if (!empty($footer['phone'])): ?><span><?= $escape($footer['phone']) ?></span><?php endif; ?>
      </div>
      <div class="footer-social">
        <?php foreach (($footer['social'] ?? []) as $item): ?>
          <a href="<?= $escape($item['href'] ?? '#') ?>"><?= $escape($item['label'] ?? '') ?></a>
        <?php endforeach; ?>
      </div>
      <small>© <?= date('Y') ?> <?= $escape($nav['logoText'] ?? 'NeoFox Media') ?>. All rights reserved.</small>
    </footer>
  </div>
</body>
</html>
