<?php
/**
 * SNIPPET — añadir a: functions/enqueues/vite-enqueues.php
 * ---------------------------------------------------------
 * Encola los assets de Webinar Registration LP (CSS + JS via Vite).
 * Se llama desde el template: founderz_enqueue_webinar_registration_lp_vite();
 */
function founderz_enqueue_webinar_registration_lp_vite() {
    add_action('wp_enqueue_scripts', function () {
        founderz_enqueue_vite('vite-webinar-registration-lp', 'src/js/entries/pages/WebinarRegistrationLp.js');
    }, 5);

    // Excluir de la optimización de WP Rocket (igual que el resto de entries Vite)
    add_filter('script_loader_tag', function ($tag, $handle, $src) {
        if ($handle === 'vite-webinar-registration-lp') {
            $tag = str_replace(' src=', ' nowprocket src=', $tag);
        }
        return $tag;
    }, 10, 3);
}
