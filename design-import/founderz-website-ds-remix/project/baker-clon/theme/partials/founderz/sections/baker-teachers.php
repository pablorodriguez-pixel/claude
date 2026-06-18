<?php
/**
 * Section: Baker Teachers (baker-teachers)
 * Fondo oscuro. Grid de retratos del equipo docente + CTA.
 *
 * $args (grupo "teachers"):
 * - label, title (textarea/br), sub, cta_text, cta_anchor (#dossier)
 * - items (repeater: photo(id), name, role, company_logo(id))
 */
$label  = $args['label'] ?? '';
$title  = $args['title'] ?? '';
$sub    = $args['sub'] ?? '';
$cta    = $args['cta_text'] ?? '';
$anchor = $args['cta_anchor'] ?? '#dossier';
$items  = $args['items'] ?? [];
if (!$title || empty($items)) return;
?>
<section class="baker-teachers">
    <div class="container">
        <?php
        $args = ['label' => $label, 'title' => $title, 'description' => $sub, 'customClass' => 'heading-a--center heading-a--on-dark'];
        include CHILD_DIR . '/partials/founderz/components/heading/heading-a.php';
        ?>
        <div class="baker-teachers__grid">
            <?php foreach ($items as $t) { ?>
                <article class="baker-teachers__item">
                    <?php if (!empty($t['photo'])) {
                        echo wp_get_attachment_image($t['photo'], 'medium', false, ['class' => 'baker-teachers__item__photo', 'loading' => 'lazy', 'decoding' => 'async', 'alt' => $t['name'] ?? '']);
                    } ?>
                    <div class="baker-teachers__item__overlay"></div>
                    <div class="baker-teachers__item__info">
                        <h3 class="baker-teachers__item__name"><?= esc_html($t['name'] ?? '') ?></h3>
                        <?php if (!empty($t['role'])) { ?><p class="baker-teachers__item__role"><?= esc_html($t['role']) ?></p><?php } ?>
                        <?php if (!empty($t['company_logo'])) { ?>
                            <span class="baker-teachers__item__company">
                                <?= wp_get_attachment_image($t['company_logo'], 'thumbnail', false, ['loading' => 'lazy', 'decoding' => 'async', 'alt' => '']) ?>
                            </span>
                        <?php } ?>
                    </div>
                </article>
            <?php } ?>
        </div>
        <?php if ($cta) { ?>
            <div class="baker-teachers__cta">
                <?php
                $args = ['text' => $cta, 'url' => $anchor, 'customClass' => 'button-a--second', 'icon' => 'arrow-right'];
                include CHILD_DIR . '/partials/founderz/components/button/button-a.php';
                ?>
            </div>
        <?php } ?>
    </div>
</section>
