<?php
/**
 * Section: Webinar FAQs (webinar-faqs)
 * Preguntas frecuentes. Acordeón nativo <details> (hook #faqs-accordion,
 * gestionado por el módulo Accordion del tema).
 *
 * $args:
 * - id?, title (textarea/br)
 * - items (repeater): question, answer (textarea/wysiwyg)
 */
$title      = $args['title'] ?? '';
$items      = $args['items'] ?? [];
$section_id = $args['id'] ?? 'webinar-faqs';
if (!$title || empty($items)) return;
?>
<section class="webinar-faqs" id="<?= esc_attr($section_id) ?>">
    <div class="container">
        <?php
        $args = ['title' => $title, 'customClass' => 'heading-a--center'];
        include CHILD_DIR . '/partials/founderz/components/heading/heading-a.php';
        ?>
        <div class="webinar-faqs__list" id="faqs-accordion">
            <?php foreach ($items as $i => $faq) {
                if (empty($faq['question'])) continue; ?>
                <details class="webinar-faqs__item js--accordion-item<?= $i === 0 ? ' is-active' : '' ?>"<?= $i === 0 ? ' open' : '' ?>>
                    <summary class="webinar-faqs__item__summary js--accordion-button">
                        <span class="webinar-faqs__item__summary__text"><?= esc_html($faq['question']) ?></span>
                        <span class="webinar-faqs__item__summary__icon" aria-hidden="true">
                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.5L7 6.5L13 1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </summary>
                    <div class="webinar-faqs__item__content">
                        <?= wpautop($faq['answer'] ?? '') ?>
                    </div>
                </details>
            <?php } ?>
        </div>
    </div>
</section>
