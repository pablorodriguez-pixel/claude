<?php
/**
 * Section: Baker Showcase (baker-showcase)
 * Fondo oscuro. Grid de proyectos de alumnos (vídeos + imágenes) + CTA.
 *
 * $args (grupo "showcase"):
 * - label, title (textarea/br), cta_text, cta_anchor (#dossier)
 * - items (repeater: title, sub, image(id), is_video, video_url)
 */
$label  = $args['label'] ?? '';
$title  = $args['title'] ?? '';
$cta    = $args['cta_text'] ?? '';
$anchor = $args['cta_anchor'] ?? '#dossier';
$items  = $args['items'] ?? [];
if (!$title || empty($items)) return;
?>
<section class="baker-showcase">
    <div class="container">
        <?php
        $args = ['label' => $label, 'title' => $title, 'customClass' => 'heading-a--center heading-a--on-dark'];
        include CHILD_DIR . '/partials/founderz/components/heading/heading-a.php';
        ?>
        <div class="baker-showcase__grid">
            <?php foreach ($items as $i => $it) { ?>
                <article class="baker-showcase__item baker-showcase__item--<?= (int) $i ?>">
                    <?php if (!empty($it['image'])) {
                        echo wp_get_attachment_image($it['image'], 'large', false, ['class' => 'baker-showcase__item__media', 'loading' => 'lazy', 'decoding' => 'async', 'alt' => $it['title'] ?? '']);
                    } ?>
                    <div class="baker-showcase__item__overlay"></div>
                    <?php if (!empty($it['is_video'])) { ?>
                        <span class="baker-showcase__item__badge" aria-hidden="true"><?= SVG_ICONS['play'] ?? '▶' ?> <?= esc_html__('Ver con sonido', 'founderz-theme') ?></span>
                    <?php } ?>
                    <div class="baker-showcase__item__caption">
                        <h3 class="baker-showcase__item__caption__title"><?= esc_html($it['title'] ?? '') ?></h3>
                        <?php if (!empty($it['sub'])) { ?><p class="baker-showcase__item__caption__sub"><?= esc_html($it['sub']) ?></p><?php } ?>
                    </div>
                </article>
            <?php } ?>
        </div>
        <?php if ($cta) { ?>
            <div class="baker-showcase__cta">
                <?php
                $args = ['text' => $cta, 'url' => $anchor, 'customClass' => 'button-a--second', 'icon' => 'arrow-right'];
                include CHILD_DIR . '/partials/founderz/components/button/button-a.php';
                ?>
            </div>
        <?php } ?>
    </div>
</section>
