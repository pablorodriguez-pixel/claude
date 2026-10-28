# Efectos (guia/sonido.md): cada uno sale de una palabra de la voz o de un momento de un plano. db frente a la voz.
def efectos(vt, dur):
    e = []
    pon = lambda s, t, db=-12, **o: e.append(dict(sonido=s, t=t, db=db, **o))
    # hook: la corriente de billetes entra en el banco
    pon('aire', 0.0, -9, ancla='empieza', vel=.8, que='los billetes pasan pegados a la cámara')
    pon('aire', 0.9, -13, que='más billetes')
    pon('aire', 1.7, -12, vel=.7, que='la cámara se aleja del banco')
    pon('late', vt('paga') - .02, -13, que='pastilla «a ti: 0 €»')
    pon('aire', vt('lo'), -12, vel=.7, que='la cámara sube por encima del banco')
    pon('aire', vt('presta') - .1, -11, que='los billetes salen hacia las casas')
    for i in range(0, 9, 2):
        pon('papel', vt('presta') + .05 + i * .11 + 1.25, -18 + (i % 3), vel=1.1, que='un billete llega a una casa')
    for i in range(0, 24, 4):
        pon('enganche', vt('queda') - .2 + i * .07 + 1.15, -20 + (i % 3), vel=.9 + i * .01, que='una moneda cae en la pila')
    pon('lingote', vt('intereses') + .3, -12, que='la pila del banco crece')
    # mesa
    pon('aire', vt('pero') + .3, -16, vel=.6, que='la cámara rodea el fajo')
    for i in range(0, 5):
        pon('enganche', vt('pagan') - .05 + i * .16 + .43, -18 + i % 2, vel=1 + i * .03, que='una moneda cae sobre el fajo')
    pon('late', vt('remuneradas') - .02, -12, que='la faja cambia a «3 % / año»')
    pon('aire', vt('mejores'), -15, vel=.7, que='la cámara gira')
    pon('late', vt('tres') - .02, -13, que='pastilla 3 %')
    for i in range(5, 10):
        pon('enganche', vt('tres') - .8 + (i - 5) * .16 + .43 + .8, -19, vel=1.05, que='más monedas')
    pon('papel', vt('diez') + .4, -11, que='llega el segundo fajo')
    pon('late', vt('trescientos') - .02, -13, que='pastilla +300 €')
    for i in range(6):
        pon('papel', vt('trescientos') + .15 + i * .42 + .45, -15 - (i % 2) * 2, vel=1 + i * .03, que='un billete de 50 se posa')
    pon('aire', vt('hace', 2), -15, vel=.7, que='la cámara baja hacia el fajo')
    pon('late', vt('precios') - .02, -13, que='pastilla precios +4,9 %')
    pon('aprieta', vt('precios') + .3, -14, que='los billetes se ponen rojos')
    pon('aire', vt('pierde') - .1, -9, que='diez billetes salen volando')
    pon('aire', vt('pierde') + .5, -13, vel=.8, que='siguen volando')
    pon('late', vt('quinientos') - .02, -13, que='pastilla −490 €')
    pon('aire', vt('seguro') - .2, -15, vel=.7, que='la cámara rodea los fajos')
    pon('golpe-hondo', vt('garantizados') + .4, -8, que='la cúpula se cierra sobre el dinero')
    pon('late', vt('cien') - .02, -13, que='pastilla 100.000 €')
    pon('aire', vt('banco', 2) + .2, -16, vel=.6, que='la cámara se aleja de la cúpula')
    # quiebra
    pon('aire', vt('aunque'), -14, vel=.7, que='la cámara delante del banco')
    pon('muro', vt('quiebre') + .25, -6, que='el banco empieza a caer')
    pon('golpe-hondo', vt('quiebre') + .75, -8, que='las columnas llegan al suelo')
    pon('golpe', vt('quiebre') + 1.1, -12, que='los trozos caen')
    pon('aire', vt('devuelven') - .2, -11, que='la cámara se lanza hacia la cúpula')
    # remate
    pon('aire', vt('asi'), -12, vel=.7, que='la cámara se aleja; el banco en pie')
    pon('papel', vt('asi') + 1.5, -18, que='los billetes entran gratis')
    pon('late', vt('presta', 2) - .1, -13, que='pastilla 0 %')
    # cierre
    for i in range(0, 30, 3):
        pon('enganche', vt('este') + i * .15 + .38, -18 + (i % 2), vel=.95 + (i % 4) * .03, que='una moneda cae junto al fajo')
    pon('late', vt('primer') - .02, -12, que='pastilla TRUCO #1')
    pon('aire', vt('trabajar'), -12, vel=.6, que='la cámara sube por encima de la mesa')
    # sin huecos de más de 2 s
    pon('aire', vt('parado'), -16, vel=.6, que='los billetes se tiñen')
    pon('aire', vt('depositos'), -16, vel=.6, que='la cúpula baja')
    pon('aire', vt('prestarselo'), -15, vel=.6, que='la cámara sigue subiendo')
    pon('aire', vt('cada') + .2, -16, vel=.6, que='la cámara se aleja de los billetes')
    pon('aire', vt('casi') + .3, -16, vel=.6, que='la cámara baja hacia el fajo')
    pon('aire', vt('valor') - .2, -16, vel=.6, que='la cámara sube con los billetes')
    pon('aire', vt('europa') - .3, -15, vel=.7, que='la cámara se eleva')
    pon('papel', vt('asi') + 2.6, -19, que='más billetes entran')
    pon('aire', vt('presta', 2) + .8, -16, vel=.6, que='la cámara se acerca al banco')
    return e
