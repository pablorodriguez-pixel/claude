<?php
/**
 * Section: Webinar Speaker (webinar-speaker)
 * Fondo oscuro. Foto cuadrada + bio del ponente.
 *
 * $args:
 * - id?, label, name, role, bio (wysiwyg), image (id)
 */
$label   = $args['label'] ?? '';
$name    = $args['name'] ?? '';
$role    = $args['role'] ?? '';
$bio     = $args['bio'] ?? '';
$image   = $args['image'] ?? null;
$section_id = $args['id'] ?? 'webinar-ponente';
if (!$name) return;
?>
<section class="webinar-speaker" id="<?= esc_attr($section_id) ?>">
    <div class="container">
        <div class="webinar-speaker__wrapper">
            <div class="webinar-speaker__media-wrapper">
                <?php if ($image) {
                    echo wp_get_attachment_image($image, 'full', false, [
                        'class'    => 'webinar-speaker__media-wrapper__media',
                        'loading'  => 'lazy',
                        'decoding' => 'async',
                        'sizes'    => '(max-width: 810px) 100vw, 360px',
                        'alt'      => $name,
                    ]);
                } ?>
            </div>
            <div class="webinar-speaker__content">
                <?php if ($label) { ?><p class="webinar-speaker__content__label"><?= esc_html($label) ?></p><?php } ?>
                <h2 class="webinar-speaker__content__title"><?= esc_html($name) ?></h2>
                <?php if ($role) { ?><p class="webinar-speaker__content__role"><?= esc_html($role) ?></p><?php } ?>
                <?php if ($bio) { ?><div class="webinar-speaker__content__bio"><?= $bio ?></div><?php } ?>
            </div>
        </div>
    </div>
</section>
