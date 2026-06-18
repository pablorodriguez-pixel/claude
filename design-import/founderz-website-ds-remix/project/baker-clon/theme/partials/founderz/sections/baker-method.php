<?php
/**
 * Section: Baker Method (baker-method)
 * Fondo blanco. Vídeo vertical + intro + checklist de ventajas.
 *
 * $args (grupo "method"):
 * - label, title (textarea/br), video_image(id), video_title, video_sub, intro
 * - items (repeater: svg_icon, title, text)
 */
$label    = $args['label'] ?? '';
$title    = $args['title'] ?? '';
$vid_img  = $args['video_image'] ?? null;
$vid_t    = $args['video_title'] ?? '';
$vid_s    = $args['video_sub'] ?? '';
$intro    = $args['intro'] ?? '';
$items    = $args['items'] ?? [];
if (!$title) return;
?>
<section class="baker-method">
    <div class="container">
        <?php
        $args = ['label' => $label, 'title' => $title, 'customClass' => 'heading-a--center'];
        include CHILD_DIR . '/partials/founderz/components/heading/heading-a.php';
        ?>
        <div class="baker-method__wrapper">
            <div class="baker-method__media">
                <?php if ($vid_img) {
                    echo wp_get_attachment_image($vid_img, 'large', false, ['class' => 'baker-method__media__img', 'loading' => 'lazy', 'decoding' => 'async', 'alt' => $vid_t]);
                } ?>
                <span class="baker-method__media__play" aria-hidden="true"><?= SVG_ICONS['play'] ?? '▶' ?></span>
                <?php if ($vid_t) { ?><span class="baker-method__media__label"><?= esc_html($vid_t) ?><?php if ($vid_s) { ?> · <?= esc_html($vid_s) ?><?php } ?></span><?php } ?>
            </div>
            <div class="baker-method__content">
                <?php if ($intro) { ?><p class="baker-method__intro"><?= esc_html($intro) ?></p><?php } ?>
                <div class="baker-method__items">
                    <?php foreach ($items as $it) { ?>
                        <div class="baker-method__item">
                            <span class="baker-method__item__icon" aria-hidden="true"><?= (!empty($it['svg_icon']) && !empty(SVG_ICONS[$it['svg_icon']])) ? SVG_ICONS[$it['svg_icon']] : '' ?></span>
                            <div>
                                <h3 class="baker-method__item__title"><?= esc_html($it['title'] ?? '') ?></h3>
                                <p class="baker-method__item__text"><?= esc_html($it['text'] ?? '') ?></p>
                            </div>
                        </div>
                    <?php } ?>
                </div>
            </div>
        </div>
    </div>
</section>
