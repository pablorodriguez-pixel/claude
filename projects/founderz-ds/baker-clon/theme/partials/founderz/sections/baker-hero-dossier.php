<?php
/**
 * Section: Baker Hero + Dossier (baker-hero-dossier)
 * Hero oscuro: reel vertical + contenido + formulario HubSpot (dossier).
 *
 * $args (grupo ACF "hero"):
 * - rating_text, microsoft_label, title (textarea/br), meta
 * - reel_video (oembed/url) | reel_image (id), reel_label
 * - bullets_title, bullets (repeater: text)
 * - form_label, form_title, form_sub, form_id, portal_id?, region?, cta, note
 * - trust_title, trust_logos (gallery ids)
 */
$rating     = $args['rating_text'] ?? '';
$ms_label   = $args['microsoft_label'] ?? '';
$title      = $args['title'] ?? '';
$meta       = $args['meta'] ?? '';
$reel_img   = $args['reel_image'] ?? null;
$reel_label = $args['reel_label'] ?? '';
$b_title    = $args['bullets_title'] ?? '';
$bullets    = $args['bullets'] ?? [];
$form_id    = $args['form_id'] ?? null;
$portal_id  = $args['portal_id'] ?? null;
$region     = $args['region'] ?? null;
$f_label    = $args['form_label'] ?? '';
$f_title    = $args['form_title'] ?? __('Descarga el dossier', 'founderz-theme');
$f_sub      = $args['form_sub'] ?? '';
$f_note     = $args['note'] ?? '';
$trust_t    = $args['trust_title'] ?? '';
$trust      = $args['trust_logos'] ?? [];
if (!$title) return;
?>
<section class="baker-hero">
    <div class="container baker-hero__top">
        <?php // Logo del header simple ya viene del header-2025-simple-dark ?>
        <?php if ($rating) { ?>
            <span class="baker-hero__rating">
                <span class="baker-hero__rating__stars" aria-hidden="true"><?= str_repeat('★', 5) ?></span>
                <span><?= esc_html($rating) ?></span>
            </span>
        <?php } ?>
    </div>

    <div class="container baker-hero__wrapper">
        <?php if ($reel_img) { ?>
            <div class="baker-hero__reel">
                <?= wp_get_attachment_image($reel_img, 'large', false, [
                    'class' => 'baker-hero__reel__media', 'decoding' => 'async', 'fetchpriority' => 'high',
                ]) ?>
                <?php if ($reel_label) { ?><span class="baker-hero__reel__label"><?= esc_html($reel_label) ?></span><?php } ?>
            </div>
        <?php } ?>

        <div class="baker-hero__content">
            <?php if ($ms_label) {
                $args = ['title' => $ms_label, 'customClass' => 'pill-a--third'];
                include CHILD_DIR . '/partials/founderz/components/pill/pill-a.php';
            } ?>
            <h1 class="baker-hero__title"><?= $title ?></h1>
            <?php if ($meta) { ?><p class="baker-hero__meta"><?= esc_html($meta) ?></p><?php } ?>

            <?php if (!empty($bullets)) { ?>
                <div class="baker-hero__bullets">
                    <?php if ($b_title) { ?><p class="baker-hero__bullets__title"><?= esc_html($b_title) ?></p><?php } ?>
                    <ul>
                        <?php foreach ($bullets as $b) { if (empty($b['text'])) continue; ?>
                            <li><span class="baker-hero__bullets__check" aria-hidden="true"><?= SVG_ICONS['check'] ?? '✓' ?></span><?= esc_html($b['text']) ?></li>
                        <?php } ?>
                    </ul>
                </div>
            <?php } ?>
        </div>

        <div class="baker-hero__form" id="dossier">
            <div class="baker-hero__card">
                <?php if ($f_label) { ?><p class="baker-hero__card__label"><?= esc_html($f_label) ?></p><?php } ?>
                <h2 class="baker-hero__card__title"><?= esc_html($f_title) ?></h2>
                <?php if ($f_sub) { ?><p class="baker-hero__card__sub"><?= esc_html($f_sub) ?></p><?php } ?>
                <?php if (!empty($form_id)) { require CHILD_DIR . '/partials/founderz/components/hubspot/hubspot-form-lazy.php'; } ?>
                <?php if ($f_note) { ?><p class="baker-hero__card__note"><?= esc_html($f_note) ?></p><?php } ?>
            </div>
        </div>
    </div>

    <?php if (!empty($trust)) { ?>
        <div class="container baker-hero__trust">
            <?php if ($trust_t) { ?><p class="baker-hero__trust__title"><?= esc_html($trust_t) ?></p><?php } ?>
            <div class="baker-hero__trust__logos">
                <?php foreach ($trust as $logo) {
                    echo wp_get_attachment_image($logo, 'medium', false, ['loading' => 'lazy', 'decoding' => 'async', 'alt' => '']);
                } ?>
            </div>
        </div>
    <?php } ?>
</section>
