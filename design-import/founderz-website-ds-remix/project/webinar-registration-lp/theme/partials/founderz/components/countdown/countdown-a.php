<?php
/**
 * Component: Countdown (countdown-a)
 * Contador regresivo. El módulo JS WebinarCountdown rellena los valores
 * leyendo `data-end-date` (ISO 8601) del hook `.js--countdown`.
 *
 * $args:
 * - datetime / webinar_datetime (Y-m-d H:i:s) → se normaliza a ISO en JS
 * - customClass?
 */
$datetime    = $args['datetime'] ?? ($args['webinar_datetime'] ?? '');
$customClass = $args['customClass'] ?? '';
if (!$datetime) return;

// Normaliza a ISO 8601 para el atributo data-end-date.
$iso = $datetime;
try {
    $iso = (new DateTime($datetime, wp_timezone()))->format('c');
} catch (Exception $e) {
    $iso = $datetime;
}

$units = [
    'days'    => __('días', 'founderz-theme'),
    'hours'   => __('horas', 'founderz-theme'),
    'minutes' => __('min', 'founderz-theme'),
    'seconds' => __('seg', 'founderz-theme'),
];
?>
<div class="countdown-a js--countdown <?= esc_attr($customClass) ?>" data-end-date="<?= esc_attr($iso) ?>" role="timer" aria-live="off">
    <?php foreach ($units as $key => $label) { ?>
        <div class="countdown-a__unit">
            <span class="countdown-a__unit__value js--countdown-<?= esc_attr($key) ?>">00</span>
            <span class="countdown-a__unit__label"><?= esc_html($label) ?></span>
        </div>
    <?php } ?>
</div>
