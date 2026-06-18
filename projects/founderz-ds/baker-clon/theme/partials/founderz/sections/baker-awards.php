<?php
/**
 * Section: Baker Awards (baker-awards)
 * Fondo blanco. Fila de logos de premios/reconocimientos.
 *
 * $args (grupo "awards"): label, logos (gallery ids)
 */
$label = $args['label'] ?? '';
$logos = $args['logos'] ?? [];
if (empty($logos)) return;
?>
<section class="baker-awards">
    <div class="container">
        <?php if ($label) { ?><p class="baker-awards__label"><?= esc_html($label) ?></p><?php } ?>
        <div class="baker-awards__logos">
            <?php foreach ($logos as $logo) {
                echo wp_get_attachment_image($logo, 'medium', false, ['loading' => 'lazy', 'decoding' => 'async', 'alt' => '']);
            } ?>
        </div>
    </div>
</section>
