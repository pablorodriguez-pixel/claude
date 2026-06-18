<?php
/**
 * Section: Webinar Value Cards (webinar-value-cards)
 * "Qué vas a aprender" — heading-a + grid de card-e.
 *
 * $args:
 * - id?, label, title (textarea/br), description?
 * - cards (repeater): svg_icon, icon(id), title, text
 */
$label       = $args['label'] ?? '';
$title       = $args['title'] ?? '';
$description = $args['description'] ?? '';
$cards       = $args['cards'] ?? [];
$section_id  = $args['id'] ?? 'webinar-aprende';
if (!$title || empty($cards)) return;
?>
<section class="webinar-value" id="<?= esc_attr($section_id) ?>">
    <div class="container">
        <?php
        $args = ['label' => $label, 'title' => $title, 'description' => $description, 'customClass' => 'heading-a--center'];
        include CHILD_DIR . '/partials/founderz/components/heading/heading-a.php';
        ?>
        <div class="webinar-value__grid">
            <?php foreach ($cards as $card) {
                $args = [
                    'svg_icon' => $card['svg_icon'] ?? null,
                    'icon'     => $card['icon'] ?? null,
                    'title'    => $card['title'] ?? '',
                    'text'     => $card['text'] ?? '',
                ];
                include CHILD_DIR . '/partials/founderz/components/card/card-e.php';
            } ?>
        </div>
    </div>
</section>
