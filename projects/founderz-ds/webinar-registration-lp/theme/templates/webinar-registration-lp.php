<?php
/**
 * Template Name: Webinar Registration LP
 * Template Post Type: page, webinars
 *
 * Landing de registro de webinars (gratuita), orientada a conversión.
 * Consume ACF (grupos toggleables con `is_active`) y compone secciones
 * del Design System Founderz. Formulario vía HubSpot (lazy).
 *
 * Convenciones: ver CLAUDE.md del tema. No editar assets/ (legacy).
 */

if (!defined('ABSPATH')) {
    exit;
}

add_filter('body_class', function ($classes) {
    $classes[] = 'lang-' . ICL_LANGUAGE_CODE;
    $classes[] = 'webinar-registration-lp';
    return $classes;
});

// Encolar assets (CSS + JS) via Vite
founderz_enqueue_webinar_registration_lp_vite();

// Landing sin header/footer completos (usa header/footer simple)
const FOUNDERZ_LANDING_NO_HEADER_FOOTER = true;

// -----------------------------------------------------------------------------
// Campos ACF (grupos toggleables)
// -----------------------------------------------------------------------------
$hero         = get_field('hero');
$value        = get_field('value');
$agenda       = get_field('agenda');
$speaker      = get_field('speaker');
$audience     = get_field('audience');
$testimonials = get_field('testimonials');
$faqs         = get_field('faqs');
$final_cta    = get_field('final_cta');

// Datos de tracking / CRM (opcionales)
$tracking_script = get_field('tracking_script');
$data_lead_type  = get_field('data_lead_type');

// Fecha del webinar (compartida entre hero, sticky y CTA final).
// Se expone como atributo data-* en ISO 8601 para el contador JS.
$webinar_datetime = $hero['datetime'] ?? '';

// Header simple (con fallback)
if (file_exists(CHILD_DIR . '/header-2025-simple.php')) {
    get_header('2025-simple');
} else {
    get_header('2025');
}
?>

<main
    class="webinar-lp"
    data-lead-type="<?= esc_attr($data_lead_type['type'] ?? 'form_lead') ?>"
    <?php if ($webinar_datetime) { ?>data-webinar-datetime="<?= esc_attr($webinar_datetime) ?>"<?php } ?>
>
    <?php
    // Cada sección se incluye solo si su grupo ACF está activo.
    // $args se pasa al partial (que lee $args como en el resto del DS).
    $sections = [
        ['data' => $hero,         'active' => $hero['is_active'] ?? false,         'partial' => 'founderz/sections/webinar-hero-form.php'],
        ['data' => $value,        'active' => $value['is_active'] ?? false,        'partial' => 'founderz/sections/webinar-value-cards.php'],
        ['data' => $agenda,       'active' => $agenda['is_active'] ?? false,       'partial' => 'founderz/sections/webinar-agenda.php'],
        ['data' => $speaker,      'active' => $speaker['is_active'] ?? false,      'partial' => 'founderz/sections/webinar-speaker.php'],
        ['data' => $audience,     'active' => $audience['is_active'] ?? false,     'partial' => 'founderz/sections/webinar-audience.php'],
        ['data' => $testimonials, 'active' => $testimonials['is_active'] ?? false, 'partial' => 'founderz/sections/webinar-testimonials.php'],
        ['data' => $faqs,         'active' => $faqs['is_active'] ?? false,         'partial' => 'founderz/sections/webinar-faqs.php'],
        ['data' => $final_cta,    'active' => $final_cta['is_active'] ?? false,    'partial' => 'founderz/sections/webinar-final-cta.php'],
    ];

    foreach ($sections as $section) {
        if (empty($section['active'])) {
            continue;
        }
        $args = is_array($section['data']) ? $section['data'] : [];
        // Propagar la fecha del webinar a las secciones que la necesitan.
        $args['webinar_datetime'] = $webinar_datetime;
        require founderz_resolve_partial($section['partial']);
    }
    ?>
</main>

<?php if ($tracking_script) { ?>
    <?= $tracking_script ?>
<?php } ?>

<?php
if (file_exists(CHILD_DIR . '/footer-2025-simple-dark.php')) {
    get_footer('2025-simple-dark');
} else {
    get_footer('2025');
}
?>
