# Efectos (guia/sonido.md): salen de las palabras de la voz. db frente a la voz.
def efectos(vt, dur):
    e = []
    pon = lambda s, t, db=-12, **o: e.append(dict(sonido=s, t=t, db=db, **o))
    # hook: billetes de 500 que caen sobre la torre; arriba, el millón
    pon('aire', 0.0, -11, ancla='empieza', vel=.7, que='la cámara mira de la torre al millón')
    for i in range(8):
        pon('papel', .3 + i * .55 + .6, -16 + (i % 2), vel=1 + i * .02, que='un billete de 500 cae en la torre')
    pon('late', vt('quinientos') - .02, -13, que='pastilla 500 € al mes')
    # treinta años
    pon('aire', vt('si', 2), -12, vel=.8, que='corte a las treinta pilas')
    for i in range(0, 30, 3):
        pon('enganche', vt('si', 2) + .25 + i * .17, -19 + (i % 2), vel=1 + i * .01, que='crece la pila de un año')
    pon('lingote', vt('treinta') - .1, -11, que='las últimas pilas se disparan')
    pon('late', vt('treinta') - .02, -13, que='pastilla 30 años')
    # el millón partido en dos
    pon('aire', vt('y'), -13, vel=.7, que='corte a la torre partida')
    pon('golpe', vt('puesto') + .05, -12, que='aparece lo que pusiste tú (frío)')
    pon('aire', vt('resto') - .1, -12, vel=.7, que='la torre de intereses sube en oro')
    pon('lingote', vt('resto') + .5, -12, que='la torre dorada crece')
    pon('late', vt('compuesto') - .02, -12, que='pastilla interés compuesto')
    # monedas que hacen monedas
    for k, w in enumerate([('tu', 2), ('gana', 1), ('gana', 1), ('gana', 2), ('gana', 2)]):
        pon('enganche', vt(*w) + (.6 if k in (2, 4) else .1) + .3, -14 + (k % 2), vel=1 + k * .06, que='una generación de monedas')
    # bola de nieve
    pon('aire', vt('bola') - .1, -10, vel=.6, que='la bola empieza a rodar')
    pon('aire', vt('cien') - .2, -12, vel=.7, que='la bola pasa los 10 años')
    pon('late', vt('cien'), -14, que='cartel 10 años')
    pon('aire', vt('veinte') + .2, -11, vel=.8, que='la bola acelera')
    pon('late', vt('veinte') + .4, -14, que='cartel 20 años')
    pon('golpe-hondo', vt('dispara') + .4, -8, que='la bola llega al millón')
    # empezar hoy o diez años tarde
    pon('aire', vt('por'), -13, vel=.7, que='corte a las dos torres')
    pon('lingote', vt('por') + .9, -12, que='sube la torre de hoy')
    pon('hueco', vt('tarde') + .4, -12, que='la torre de 10 años tarde se queda corta')
    pon('late', vt('millon', 4) - .1, -12, que='pastilla −640.000 €')
    # cada día que esperas
    for i in range(8):
        pon('papel', vt('cada') + .2 + i * .42 + .3, -15 - (i % 2) * 2, vel=1.1, que='se arranca una hoja del calendario')
    pon('late', vt('doscientos') - .02, -12, que='pastilla −270 €')
    # tus vehículos
    pon('aire', vt('por', 2), -14, vel=.7, que='corte a los dos tarros')
    pon('late', vt('mover') - .02, -13, que='pastilla cada euro a su vehículo')
    pon('enganche', vt('remunerada') + .1, -16, que='se marca la remunerada')
    pon('enganche', vt('fondo') + .1, -16, vel=.95, que='se marca el indexado')
    # cierre
    pon('aire', vt('sigueme'), -12, vel=.6, que='corte a la torre; sube hacia el millón')
    for i in range(6):
        pon('papel', vt('sigueme') + .2 + i * .55 + .6, -17, vel=1.05, que='billetes que suben la torre')
    pon('late', vt('hoy') - .3, -11, que='pastilla Empieza hoy')
    # sin huecos de más de 2 s
    pon('aire', vt('siglo'), -16, vel=.6, que='la cámara recorre las pilas')
    pon('aire', vt('bola') - 1.2, -16, vel=.6, que='la cámara rodea las monedas')
    pon('aire', vt('cuando') - .2, -16, vel=.6, que='la cámara sube por las torres')
    pon('aire', vt('mañana') + .2, -16, vel=.6, que='la cámara pasa al indexado')
    pon('aire', vt('increible'), -16, vel=.6, que='la cámara se acerca a lo que pusiste')
    pon('aire', vt('ochenta') + .3, -16, vel=.6, que='la cámara empieza a subir')
    pon('aire', vt('nieve') + .3, -15, vel=.7, que='la bola rueda')
    pon('aire', vt('trescientos') + .5, -15, vel=.7, que='la bola rueda más rápido')
    pon('aire', vt('si', 3), -15, vel=.6, que='la torre de 10 años tarde empieza a subir')
    pon('aire', vt('llegas') + .4, -16, vel=.6, que='la cámara sube por las torres')
    pon('aire', vt('anos', 4) + .2, -16, vel=.6, que='la cámara se aleja de los tarros')
    pon('late', vt('ese') + .1, -17, que='la cámara se para en la torre')
    pon('aire', vt('ultimos'), -14, vel=.8, que='la bola se lanza')
    return e
