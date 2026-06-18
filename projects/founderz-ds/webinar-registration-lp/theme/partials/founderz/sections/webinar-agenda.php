<?php
/**
 * Section: Webinar Agenda (webinar-agenda)
 * Fondo lilac. Dos columnas: heading-a + botón / timeline de items.
 *
 * $args:
 * - id?, label, title (textarea/br), description?
 * - button (link: url, title, target)
 * - items (repeater): time, title, description
 */
$label       = $args['label'] ?? '';
$title       = $args['title'] ?? '';
$description = $args['description'] ?? '';
$button      = $args['button'] ?? null;
$items       = $args['items'] ?? [];
$section_id  = $args['id'] ?? 'webinar-agenda';
if (!$title || empty($items)) return;
?>
<section class="webinar-agenda" id="<?= esc_attr($section_id) ?>">
    <div class="container">
        <div class="webinar-agenda__wrapper">
            <div class="webinar-agenda__wrapper__left-items">
                <?php
                $args = ['label' => $label, 'title' => $title, 'description' => $description];
                include CHILD_DIR . '/partials/founderz/components/heading/heading-a.php';
                ?>
                <?php if ($button && !empty($button['url'])) {
                    $args = [
                        'text'   => $button['title'] ?? __('Reserva tu plaza', 'founderz-theme'),
                        'url'    => $button['url'],
                        'target' => $button['target'] ?? '_self',
                        'icon'   => 'arrow-right',
                    ];
                    include CHILD_DIR . '/partials/founderz/components/button/button-a.php';
                } ?>
            </div>

            <ol class="webinar-agenda__wrapper__right-items webinar-agenda__list">
                <?php foreach ($items as $item) { ?>
                    <li class="webinar-agenda__item">
                        <?php if (!empty($item['time'])) { ?>
                            <span class="webinar-agenda__item__time"><?= esc_html($item['time']) ?></span>
                        <?php } ?>
                        <div class="webinar-agenda__item__content">
                            <h3 class="webinar-agenda__item__content__title"><?= esc_html($item['title'] ?? '') ?></h3>
                            <?php if (!empty($item['description'])) { ?>
                                <p class="webinar-agenda__item__content__description"><?= esc_html($item['description']) ?></p>
                            <?php } ?>
                        </div>
                    </li>
                <?php } ?>
            </ol>
        </div>
    </div>
</section>
