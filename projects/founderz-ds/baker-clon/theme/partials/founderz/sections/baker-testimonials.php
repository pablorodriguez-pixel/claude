<?php
/**
 * Section: Baker Testimonials (baker-testimonials)
 * Fondo gris. Trustpilot + testimonio destacado (vídeo) + 3 reseñas.
 *
 * $args (grupo "testimonials"):
 * - rating_text, title (textarea/br)
 * - featured (group: text, name, role, image(id))
 * - items (repeater: text, name, role, avatar(id))   → testimonial-a
 */
$rating   = $args['rating_text'] ?? '';
$title    = $args['title'] ?? '';
$featured = $args['featured'] ?? [];
$items    = $args['items'] ?? [];
if (!$title) return;
?>
<section class="baker-testimonials">
    <div class="container">
        <?php if ($rating) { ?>
            <p class="baker-testimonials__rating">
                <span aria-hidden="true">★★★★★</span> <?= esc_html($rating) ?>
            </p>
        <?php } ?>
        <?php
        $args = ['title' => $title, 'customClass' => 'heading-a--center'];
        include CHILD_DIR . '/partials/founderz/components/heading/heading-a.php';
        ?>

        <?php if (!empty($featured['text'])) { ?>
            <div class="baker-testimonials__featured">
                <div class="baker-testimonials__featured__media">
                    <?php if (!empty($featured['image'])) {
                        echo wp_get_attachment_image($featured['image'], 'large', false, ['loading' => 'lazy', 'decoding' => 'async', 'alt' => $featured['name'] ?? '']);
                    } ?>
                    <span class="baker-testimonials__featured__play" aria-hidden="true"><?= SVG_ICONS['play'] ?? '▶' ?></span>
                </div>
                <div class="baker-testimonials__featured__body">
                    <blockquote><?= esc_html($featured['text']) ?></blockquote>
                    <div class="baker-testimonials__featured__author">
                        <strong><?= esc_html($featured['name'] ?? '') ?></strong>
                        <span><?= esc_html($featured['role'] ?? '') ?></span>
                    </div>
                </div>
            </div>
        <?php } ?>

        <?php if (!empty($items)) { ?>
            <div class="baker-testimonials__grid">
                <?php foreach ($items as $t) {
                    $args = ['testimonial' => [
                        'text'  => $t['text'] ?? '',
                        'photo' => $t['avatar'] ?? null,
                        'name'  => $t['name'] ?? '',
                        'job'   => $t['role'] ?? '',
                    ]];
                    include CHILD_DIR . '/partials/founderz/components/testimonial/testimonial-a.php';
                } ?>
            </div>
        <?php } ?>
    </div>
</section>
