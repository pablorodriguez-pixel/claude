<?php
/**
 * Section: Baker FAQs (baker-faqs)
 * Fondo gris. Acordeón de preguntas (#faqs-accordion).
 *
 * $args (grupo "faqs"): label, title (textarea/br), items (repeater: question, answer)
 */
$label = $args['label'] ?? 'FAQ';
$title = $args['title'] ?? '';
$items = $args['items'] ?? [];
if (!$title || empty($items)) return;
?>
<section class="baker-faqs">
    <div class="container">
        <?php
        $args = ['label' => $label, 'title' => $title, 'customClass' => 'heading-a--center'];
        include CHILD_DIR . '/partials/founderz/components/heading/heading-a.php';
        ?>
        <div class="baker-faqs__list" id="faqs-accordion">
            <?php foreach ($items as $i => $faq) { if (empty($faq['question'])) continue; ?>
                <details class="baker-faqs__item js--accordion-item<?= $i === 0 ? ' is-active' : '' ?>"<?= $i === 0 ? ' open' : '' ?>>
                    <summary class="baker-faqs__item__summary js--accordion-button">
                        <span class="baker-faqs__item__summary__text"><?= esc_html($faq['question']) ?></span>
                        <span class="baker-faqs__item__summary__icon" aria-hidden="true">
                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 1.5L7 6.5L13 1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </span>
                    </summary>
                    <div class="baker-faqs__item__content"><?= wpautop($faq['answer'] ?? '') ?></div>
                </details>
            <?php } ?>
        </div>
    </div>
</section>
