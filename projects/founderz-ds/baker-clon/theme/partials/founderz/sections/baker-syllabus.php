<?php
/**
 * Section: Baker Syllabus (baker-syllabus)
 * Fondo gris. Acordeón de módulos (#syllabus-accordion) + bloque bloqueado.
 *
 * $args (grupo "syllabus"):
 * - title (textarea/br)
 * - modules (repeater: number, title, tag, lessons(repeater: text), teachers(text))
 * - locked_title, locked_sub, locked_cta, locked_anchor (#dossier), locked_note
 */
$title  = $args['title'] ?? '';
$mods   = $args['modules'] ?? [];
$l_title= $args['locked_title'] ?? '';
$l_sub  = $args['locked_sub'] ?? '';
$l_cta  = $args['locked_cta'] ?? '';
$l_anch = $args['locked_anchor'] ?? '#dossier';
$l_note = $args['locked_note'] ?? '';
if (!$title || empty($mods)) return;
?>
<section class="baker-syllabus">
    <div class="container">
        <?php
        $args = ['title' => $title, 'customClass' => 'heading-a--center'];
        include CHILD_DIR . '/partials/founderz/components/heading/heading-a.php';
        ?>
        <div class="baker-syllabus__list" id="syllabus-accordion">
            <?php foreach ($mods as $i => $m) { ?>
                <details class="baker-syllabus__item js--accordion-item<?= $i === 0 ? ' is-active' : '' ?>"<?= $i === 0 ? ' open' : '' ?>>
                    <summary class="baker-syllabus__item__summary js--accordion-button">
                        <span class="baker-syllabus__item__summary__lead">
                            <?php if (!empty($m['number'])) { ?><span class="baker-syllabus__item__num"><?= esc_html($m['number']) ?></span><?php } ?>
                            <span class="baker-syllabus__item__title"><?= esc_html($m['title'] ?? '') ?></span>
                            <?php if (!empty($m['tag'])) { ?><span class="baker-syllabus__item__tag"><?= esc_html($m['tag']) ?></span><?php } ?>
                        </span>
                        <span class="baker-syllabus__item__chevron" aria-hidden="true">
                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 1.5L7 6.5L13 1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </span>
                    </summary>
                    <div class="baker-syllabus__item__content">
                        <?php if (!empty($m['lessons'])) { ?>
                            <ul class="baker-syllabus__lessons">
                                <?php foreach ($m['lessons'] as $les) { ?><li><?= esc_html($les['text'] ?? '') ?></li><?php } ?>
                            </ul>
                        <?php } ?>
                        <?php if (!empty($m['teachers'])) { ?>
                            <p class="baker-syllabus__teachers"><?= esc_html($m['teachers']) ?></p>
                        <?php } ?>
                    </div>
                </details>
            <?php } ?>

            <?php if ($l_title) { ?>
                <div class="baker-syllabus__locked">
                    <span class="baker-syllabus__locked__icon" aria-hidden="true"><?= SVG_ICONS['lock'] ?? SVG_ICONS['award'] ?? '🔒' ?></span>
                    <h3 class="baker-syllabus__locked__title"><?= esc_html($l_title) ?></h3>
                    <?php if ($l_sub) { ?><p class="baker-syllabus__locked__sub"><?= esc_html($l_sub) ?></p><?php } ?>
                    <?php if ($l_cta) {
                        $args = ['text' => $l_cta, 'url' => $l_anch, 'customClass' => 'button-a'];
                        include CHILD_DIR . '/partials/founderz/components/button/button-a.php';
                    } ?>
                    <?php if ($l_note) { ?><p class="baker-syllabus__locked__note"><?= esc_html($l_note) ?></p><?php } ?>
                </div>
            <?php } ?>
        </div>
    </div>
</section>
