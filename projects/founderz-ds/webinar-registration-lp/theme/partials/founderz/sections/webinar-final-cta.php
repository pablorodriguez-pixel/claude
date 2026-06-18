<?php
/**
 * Section: Webinar Final CTA (webinar-final-cta)
 * Fondo morado. Cierre con urgencia: label + título + contador + botón
 * que hace scroll al formulario del hero.
 *
 * $args:
 * - label, title (textarea/br)
 * - webinar_datetime → contador
 * - button_text, form_anchor? (default #registro)
 */
$label       = $args['label'] ?? '';
$title       = $args['title'] ?? '';
$datetime    = $args['webinar_datetime'] ?? ($args['datetime'] ?? '');
$button_text = $args['button_text'] ?? __('Reserva tu plaza gratis', 'founderz-theme');
$anchor      = $args['form_anchor'] ?? '#registro';
if (!$title) return;
?>
<section class="webinar-final-cta">
    <div class="container">
        <div class="webinar-final-cta__inner">
            <?php if ($label) { ?><p class="webinar-final-cta__label"><?= esc_html($label) ?></p><?php } ?>
            <h2 class="webinar-final-cta__title"><?= $title ?></h2>

            <?php if ($datetime) {
                $args = ['datetime' => $datetime, 'customClass' => 'countdown-a--second'];
                require founderz_resolve_partial('founderz/components/countdown/countdown-a.php');
            } ?>

            <?php
            $args = [
                'text'        => $button_text,
                'url'         => $anchor,
                'customClass' => 'button-a--second',
                'icon'        => 'arrow-right',
                'data'        => ['gtm-cta-position' => 'final'],
            ];
            include CHILD_DIR . '/partials/founderz/components/button/button-a.php';
            ?>
        </div>
    </div>
</section>
