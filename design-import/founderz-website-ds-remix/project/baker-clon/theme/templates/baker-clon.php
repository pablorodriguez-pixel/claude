<?php
/**
 * Template Name: Baker Clon
 * Template Post Type: page, landing-pages
 *
 * LP del Máster MAIC (IA para creativos), formato dossier (HubSpot).
 * Consume ACF (grupos toggleables con `is_active`) y compone secciones del
 * Design System Founderz. Convenciones: ver CLAUDE.md del tema.
 */

if (!defined('ABSPATH')) {
    exit;
}

add_filter('body_class', function ($classes) {
    $classes[] = 'lang-' . ICL_LANGUAGE_CODE;
    $classes[] = 'baker-clon';
    return $classes;
});

founderz_enqueue_baker_clon_vite();

const FOUNDERZ_LANDING_NO_HEADER_FOOTER = true;

// -----------------------------------------------------------------------------
// Campos ACF (grupos toggleables)
// -----------------------------------------------------------------------------
$hero         = get_field('hero');
$quotes       = get_field('quotes');
$showcase     = get_field('showcase');
$program      = get_field('program');
$syllabus     = get_field('syllabus');
$method       = get_field('method');
$testimonials = get_field('testimonials');
$teachers     = get_field('teachers');
$awards       = get_field('awards');
$faqs         = get_field('faqs');
$final_cta    = get_field('final_cta');

$tracking_script = get_field('tracking_script');
$data_lead_type  = get_field('data_lead_type');

if (file_exists(CHILD_DIR . '/header-2025-simple-dark.php')) {
    get_header('2025-simple-dark');
} else {
    get_header('2025');
}
?>

<main class="baker-lp" data-lead-type="<?= esc_attr($data_lead_type['type'] ?? 'form_lead') ?>">
    <?php
    $sections = [
        ['data' => $hero,         'active' => $hero['is_active'] ?? false,         'partial' => 'founderz/sections/baker-hero-dossier.php'],
        ['data' => $quotes,       'active' => $quotes['is_active'] ?? false,       'partial' => 'founderz/sections/baker-quotes.php'],
        ['data' => $showcase,     'active' => $showcase['is_active'] ?? false,     'partial' => 'founderz/sections/baker-showcase.php'],
        ['data' => $program,      'active' => $program['is_active'] ?? false,      'partial' => 'founderz/sections/baker-program.php'],
        ['data' => $syllabus,     'active' => $syllabus['is_active'] ?? false,     'partial' => 'founderz/sections/baker-syllabus.php'],
        ['data' => $method,       'active' => $method['is_active'] ?? false,       'partial' => 'founderz/sections/baker-method.php'],
        ['data' => $testimonials, 'active' => $testimonials['is_active'] ?? false, 'partial' => 'founderz/sections/baker-testimonials.php'],
        ['data' => $teachers,     'active' => $teachers['is_active'] ?? false,     'partial' => 'founderz/sections/baker-teachers.php'],
        ['data' => $awards,       'active' => $awards['is_active'] ?? false,       'partial' => 'founderz/sections/baker-awards.php'],
        ['data' => $faqs,         'active' => $faqs['is_active'] ?? false,         'partial' => 'founderz/sections/baker-faqs.php'],
        ['data' => $final_cta,    'active' => $final_cta['is_active'] ?? false,    'partial' => 'founderz/sections/baker-final-cta.php'],
    ];

    foreach ($sections as $section) {
        if (empty($section['active'])) {
            continue;
        }
        $args = is_array($section['data']) ? $section['data'] : [];
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
