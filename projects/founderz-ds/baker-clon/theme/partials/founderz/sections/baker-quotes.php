<?php
/**
 * Section: Baker Quotes "¿Te suena?" (baker-quotes)
 * Fondo oscuro. 3 tarjetas con foto + cita + frase de resolución.
 *
 * $args (grupo "quotes"): title, items (repeater: text, after, image(id))
 */
$title = $args['title'] ?? '';
$items = $args['items'] ?? [];
if (!$title || empty($items)) return;
?>
<section class="baker-quotes">
    <div class="container">
        <?php
        $args = ['title' => $title, 'customClass' => 'heading-a--center heading-a--on-dark'];
        include CHILD_DIR . '/partials/founderz/components/heading/heading-a.php';
        ?>
        <div class="baker-quotes__grid">
            <?php foreach ($items as $q) { ?>
                <figure class="baker-quotes__item">
                    <?php if (!empty($q['image'])) { ?>
                        <?= wp_get_attachment_image($q['image'], 'thumbnail', false, ['class' => 'baker-quotes__item__img', 'loading' => 'lazy', 'decoding' => 'async', 'alt' => '']) ?>
                    <?php } ?>
                    <blockquote class="baker-quotes__item__text"><?= esc_html($q['text'] ?? '') ?></blockquote>
                    <?php if (!empty($q['after'])) { ?><figcaption class="baker-quotes__item__after"><?= esc_html($q['after']) ?></figcaption><?php } ?>
                </figure>
            <?php } ?>
        </div>
    </div>
</section>
