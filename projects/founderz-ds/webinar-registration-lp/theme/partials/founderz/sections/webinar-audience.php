<?php
/**
 * Section: Webinar Audience (webinar-audience)
 * "¿Es para ti?" — título centrado + grid de items con checkmark.
 *
 * $args:
 * - id?, title (textarea/br), description?
 * - items (repeater): text
 */
$title       = $args['title'] ?? '';
$description = $args['description'] ?? '';
$items       = $args['items'] ?? [];
$section_id  = $args['id'] ?? 'webinar-para-ti';
$check_svg   = (defined('SVG_ICONS') && !empty(SVG_ICONS['check'])) ? SVG_ICONS['check'] : '';
if (!$title || empty($items)) return;
?>
<section class="webinar-audience" id="<?= esc_attr($section_id) ?>">
    <div class="container">
        <?php
        $args = ['title' => $title, 'description' => $description, 'customClass' => 'heading-a--center'];
        include CHILD_DIR . '/partials/founderz/components/heading/heading-a.php';
        ?>
        <ul class="webinar-audience__list">
            <?php foreach ($items as $item) {
                if (empty($item['text'])) continue; ?>
                <li class="webinar-audience__item">
                    <span class="webinar-audience__item__icon" aria-hidden="true"><?= $check_svg ?></span>
                    <span class="webinar-audience__item__text"><?= esc_html($item['text']) ?></span>
                </li>
            <?php } ?>
        </ul>
    </div>
</section>
