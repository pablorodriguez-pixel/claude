<?php
/**
 * Section: Webinar Hero + Form (webinar-hero-form)
 * Hero oscuro con imagen de fondo + columna de formulario HubSpot.
 * Contador en vivo, fecha/hora, prueba social.
 *
 * $args:
 * - label, title (textarea/br), subtitle (textarea)
 * - datetime (Y-m-d H:i:s), duration_text
 * - meta (repeater): svg_icon, text         → píldoras de fecha/duración
 * - hero_image (id)
 * - form_id (HubSpot), portal_id?, region?
 * - proof_text, proof_avatars (gallery ids)
 * - pills (repeater): title
 */
$label       = $args['label'] ?? '';
$title       = $args['title'] ?? '';
$subtitle    = $args['subtitle'] ?? '';
$datetime    = $args['webinar_datetime'] ?? ($args['datetime'] ?? '');
$hero_image  = $args['hero_image'] ?? null;
$form_id     = $args['form_id'] ?? null;
$portal_id   = $args['portal_id'] ?? null;
$region      = $args['region'] ?? null;
$proof_text  = $args['proof_text'] ?? '';
$proof_imgs  = $args['proof_avatars'] ?? [];
$pills       = $args['pills'] ?? [];
$meta        = $args['meta'] ?? [];
$form_title  = $args['form_title'] ?? __('Guarda tu plaza', 'founderz-theme');
$form_label  = $args['form_label'] ?? __('Reserva gratuita', 'founderz-theme');
if (!$title) return;
?>
<section class="webinar-hero">
    <div class="webinar-hero__bg-items">
        <?php if ($hero_image) {
            echo wp_get_attachment_image($hero_image, 'full', false, [
                'class'         => 'webinar-hero__bg-items__media',
                'decoding'      => 'async',
                'fetchpriority' => 'high',
                'sizes'         => '100vw',
                'alt'           => '',
            ]);
        } ?>
    </div>

    <div class="container">
        <div class="webinar-hero__wrapper">

            <!-- Columna de contenido -->
            <div class="webinar-hero__wrapper__left-items">
                <?php if (!empty($pills)) { ?>
                    <div class="webinar-hero__pills">
                        <?php foreach ($pills as $pill) {
                            if (empty($pill['title'])) continue;
                            $args = ['title' => $pill['title'], 'customClass' => 'pill-a--third'];
                            include CHILD_DIR . '/partials/founderz/components/pill/pill-a.php';
                        } ?>
                    </div>
                <?php } ?>

                <?php if ($label) { ?>
                    <p class="webinar-hero__label"><?= esc_html($label) ?></p>
                <?php } ?>

                <h1 class="webinar-hero__title"><?= $title ?></h1>

                <?php if ($subtitle) { ?>
                    <p class="webinar-hero__subtitle"><?= $subtitle ?></p>
                <?php } ?>

                <?php if (!empty($meta)) { ?>
                    <ul class="webinar-hero__meta">
                        <?php foreach ($meta as $m) {
                            if (empty($m['text'])) continue;
                            $svg = (!empty($m['svg_icon']) && defined('SVG_ICONS') && !empty(SVG_ICONS[$m['svg_icon']])) ? SVG_ICONS[$m['svg_icon']] : ''; ?>
                            <li class="webinar-hero__meta__item">
                                <?php if ($svg) { ?><span class="webinar-hero__meta__item__icon" aria-hidden="true"><?= $svg ?></span><?php } ?>
                                <span><?= esc_html($m['text']) ?></span>
                            </li>
                        <?php } ?>
                    </ul>
                <?php } ?>

                <?php if ($proof_text || !empty($proof_imgs)) { ?>
                    <div class="webinar-hero__proof">
                        <?php if (!empty($proof_imgs)) { ?>
                            <div class="webinar-hero__proof__avatars">
                                <?php foreach ($proof_imgs as $img) {
                                    echo wp_get_attachment_image($img, 'thumbnail', false, [
                                        'class'    => 'webinar-hero__proof__avatars__img',
                                        'loading'  => 'lazy',
                                        'decoding' => 'async',
                                        'alt'      => '',
                                    ]);
                                } ?>
                            </div>
                        <?php } ?>
                        <?php if ($proof_text) { ?>
                            <p class="webinar-hero__proof__text"><?= $proof_text ?></p>
                        <?php } ?>
                    </div>
                <?php } ?>
            </div>

            <!-- Columna de formulario -->
            <div class="webinar-hero__wrapper__right-items" id="registro">
                <div class="webinar-hero__card">
                    <div class="webinar-hero__card__hd">
                        <?php if ($form_label) { ?><p class="webinar-hero__card__hd__label"><?= esc_html($form_label) ?></p><?php } ?>
                        <h2 class="webinar-hero__card__hd__title"><?= esc_html($form_title) ?></h2>
                    </div>

                    <?php if ($datetime) {
                        // Contador en vivo (módulo WebinarCountdown lee data-end-date ISO)
                        require founderz_resolve_partial('founderz/components/countdown/countdown-a.php');
                    } ?>

                    <?php
                    if (!empty($form_id)) {
                        require CHILD_DIR . '/partials/founderz/components/hubspot/hubspot-form-lazy.php';
                    }
                    ?>

                    <p class="webinar-hero__card__note">
                        <?= esc_html__('Plazas limitadas · 100% gratis · Incluye grabación', 'founderz-theme') ?>
                    </p>
                </div>
            </div>

        </div>
    </div>
</section>
