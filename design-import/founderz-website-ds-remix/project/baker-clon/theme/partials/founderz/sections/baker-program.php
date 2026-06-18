<?php
/**
 * Section: Baker Program (baker-program)
 * Fondo blanco. Stats + especializaciones + incluye + "qué aprenderás" +
 * "herramientas que dominarás".
 *
 * $args (grupo "program"):
 * - label, title (textarea/br), sub
 * - stats (repeater: value, label)
 * - spec_title, specs (repeater: name, image(id) | svg_icon)
 * - includes (repeater: text)
 * - learn_title, learn (repeater: text)
 * - tools_title, tools (repeater: name, logo(id))
 */
$label    = $args['label'] ?? '';
$title    = $args['title'] ?? '';
$sub      = $args['sub'] ?? '';
$stats    = $args['stats'] ?? [];
$spec_t   = $args['spec_title'] ?? '';
$specs    = $args['specs'] ?? [];
$includes = $args['includes'] ?? [];
$learn_t  = $args['learn_title'] ?? '';
$learn    = $args['learn'] ?? [];
$tools_t  = $args['tools_title'] ?? '';
$tools    = $args['tools'] ?? [];
$check    = SVG_ICONS['check'] ?? '✓';
if (!$title) return;
?>
<section class="baker-program">
    <div class="container">
        <?php
        $args = ['label' => $label, 'title' => $title, 'description' => $sub, 'customClass' => 'heading-a--center'];
        include CHILD_DIR . '/partials/founderz/components/heading/heading-a.php';
        ?>

        <?php if (!empty($stats)) { ?>
            <div class="baker-program__stats">
                <?php foreach ($stats as $s) { ?>
                    <div class="baker-program__stat">
                        <span class="baker-program__stat__value"><?= esc_html($s['value'] ?? '') ?></span>
                        <span class="baker-program__stat__label"><?= esc_html($s['label'] ?? '') ?></span>
                    </div>
                <?php } ?>
            </div>
        <?php } ?>

        <?php if (!empty($specs)) { ?>
            <?php if ($spec_t) { ?><p class="baker-program__spec-title"><?= esc_html($spec_t) ?></p><?php } ?>
            <div class="baker-program__specs">
                <?php foreach ($specs as $sp) { ?>
                    <div class="baker-program__spec">
                        <?php if (!empty($sp['image'])) {
                            echo wp_get_attachment_image($sp['image'], 'thumbnail', false, ['class' => 'baker-program__spec__icon', 'loading' => 'lazy', 'decoding' => 'async', 'alt' => '']);
                        } elseif (!empty($sp['svg_icon']) && !empty(SVG_ICONS[$sp['svg_icon']])) { ?>
                            <span class="baker-program__spec__icon"><?= SVG_ICONS[$sp['svg_icon']] ?></span>
                        <?php } ?>
                        <span class="baker-program__spec__name"><?= esc_html($sp['name'] ?? '') ?></span>
                    </div>
                <?php } ?>
            </div>
        <?php } ?>

        <div class="baker-program__detail">
            <?php if (!empty($includes)) { ?>
                <ul class="baker-program__includes">
                    <?php foreach ($includes as $it) { if (empty($it['text'])) continue; ?>
                        <li><span class="baker-program__includes__check" aria-hidden="true"><?= $check ?></span><?= esc_html($it['text']) ?></li>
                    <?php } ?>
                </ul>
            <?php } ?>

            <div class="baker-program__tags">
                <?php if (!empty($learn)) { ?>
                    <?php if ($learn_t) { ?><p class="baker-program__tags__title"><?= esc_html($learn_t) ?></p><?php } ?>
                    <div class="baker-program__pills">
                        <?php foreach ($learn as $l) { if (empty($l['text'])) continue;
                            $args = ['title' => $l['text']];
                            include CHILD_DIR . '/partials/founderz/components/pill/pill-a.php';
                        } ?>
                    </div>
                <?php } ?>

                <?php if (!empty($tools)) { ?>
                    <?php if ($tools_t) { ?><p class="baker-program__tags__title"><?= esc_html($tools_t) ?></p><?php } ?>
                    <div class="baker-program__tools">
                        <?php foreach ($tools as $t) { ?>
                            <span class="baker-program__tool">
                                <?php if (!empty($t['logo'])) {
                                    echo wp_get_attachment_image($t['logo'], 'thumbnail', false, ['class' => 'baker-program__tool__logo', 'loading' => 'lazy', 'decoding' => 'async', 'alt' => '']);
                                } ?>
                                <?= esc_html($t['name'] ?? '') ?>
                            </span>
                        <?php } ?>
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>
</section>
