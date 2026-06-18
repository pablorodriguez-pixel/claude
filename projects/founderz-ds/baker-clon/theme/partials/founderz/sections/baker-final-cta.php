<?php
/**
 * Section: Baker Final CTA (baker-final-cta)
 * Fondo morado. Contenido (checks) + formulario HubSpot (dossier).
 *
 * $args (grupo "final_cta"):
 * - label, title (textarea/br), sub, checks (repeater: text)
 * - form_title, form_sub, form_id, portal_id?, region?, note
 */
$label   = $args['label'] ?? '';
$title   = $args['title'] ?? '';
$sub     = $args['sub'] ?? '';
$checks  = $args['checks'] ?? [];
$f_title = $args['form_title'] ?? __('Descarga el dossier gratuito', 'founderz-theme');
$f_sub   = $args['form_sub'] ?? '';
$form_id = $args['form_id'] ?? null;
$portal_id = $args['portal_id'] ?? null;
$region  = $args['region'] ?? null;
$check   = SVG_ICONS['check'] ?? '✓';
if (!$title) return;
?>
<section class="baker-final-cta">
    <div class="container baker-final-cta__wrapper">
        <div class="baker-final-cta__content">
            <?php if ($label) { ?><p class="baker-final-cta__label"><?= esc_html($label) ?></p><?php } ?>
            <h2 class="baker-final-cta__title"><?= $title ?></h2>
            <?php if ($sub) { ?><p class="baker-final-cta__sub"><?= esc_html($sub) ?></p><?php } ?>
            <?php if (!empty($checks)) { ?>
                <ul class="baker-final-cta__checks">
                    <?php foreach ($checks as $c) { if (empty($c['text'])) continue; ?>
                        <li><span aria-hidden="true"><?= $check ?></span><?= esc_html($c['text']) ?></li>
                    <?php } ?>
                </ul>
            <?php } ?>
        </div>
        <div class="baker-final-cta__form">
            <div class="baker-final-cta__card">
                <h3 class="baker-final-cta__card__title"><?= esc_html($f_title) ?></h3>
                <?php if ($f_sub) { ?><p class="baker-final-cta__card__sub"><?= esc_html($f_sub) ?></p><?php } ?>
                <?php if (!empty($form_id)) { require CHILD_DIR . '/partials/founderz/components/hubspot/hubspot-form-lazy.php'; } ?>
            </div>
        </div>
    </div>
</section>
