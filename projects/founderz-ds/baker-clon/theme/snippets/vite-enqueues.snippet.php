<?php
/**
 * SNIPPET — añadir a: functions/enqueues/vite-enqueues.php
 * ---------------------------------------------------------
 * Encola los assets de Baker Clon (CSS + JS via Vite).
 * Se llama desde el template: founderz_enqueue_baker_clon_vite();
 */
function founderz_enqueue_baker_clon_vite() {
    add_action('wp_enqueue_scripts', function () {
        founderz_enqueue_vite('vite-baker-clon', 'src/js/entries/pages/BakerClon.js');
    }, 5);

    add_filter('script_loader_tag', function ($tag, $handle, $src) {
        if ($handle === 'vite-baker-clon') {
            $tag = str_replace(' src=', ' nowprocket src=', $tag);
        }
        return $tag;
    }, 10, 3);
}
