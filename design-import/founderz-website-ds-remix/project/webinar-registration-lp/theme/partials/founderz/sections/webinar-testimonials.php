<?php
/**
 * Section: Webinar Testimonials (webinar-testimonials)
 * Fondo gris. heading-a + slider Swiper de testimonial-a.
 *
 * $args:
 * - id?, title (textarea/br), description?
 * - items (repeater): text, photo(id), name, job, image(id)?, link?
 */
$title       = $args['title'] ?? '';
$description = $args['description'] ?? '';
$items       = $args['items'] ?? [];
$section_id  = $args['id'] ?? 'webinar-testimonios';
if (!$title || empty($items)) return;
?>
<section class="webinar-testimonials" id="<?= esc_attr($section_id) ?>">
    <div class="container">
        <?php
        $args = ['title' => $title, 'description' => $description, 'customClass' => 'heading-a--center'];
        include CHILD_DIR . '/partials/founderz/components/heading/heading-a.php';
        ?>
        <div class="webinar-testimonials__slider swiper js--quotes-slider">
            <div class="swiper-wrapper">
                <?php foreach ($items as $t) { ?>
                    <div class="swiper-slide">
                        <?php
                        $args = ['testimonial' => [
                            'text'  => $t['text'] ?? '',
                            'photo' => $t['photo'] ?? null,
                            'name'  => $t['name'] ?? '',
                            'job'   => $t['job'] ?? '',
                            'image' => $t['image'] ?? null,
                            'link'  => $t['link'] ?? null,
                        ]];
                        include CHILD_DIR . '/partials/founderz/components/testimonial/testimonial-a.php';
                        ?>
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>
</section>
