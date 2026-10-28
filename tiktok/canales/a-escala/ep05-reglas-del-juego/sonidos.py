# Efectos (guia/sonido.md): salen de las palabras de la voz. db frente a la voz.
def efectos(vt, dur):
    e = []
    pon = lambda s, t, db=-12, **o: e.append(dict(sonido=s, t=t, db=db, **o))
    pon('aire', 0.0, -10, ancla='empieza', vel=.7, que='crece la cordillera del índice')
    for i in range(6):
        pon('enganche', .2 + i * .22, -19, vel=1 + i * .03, que='suben las barras')
    pon('aire', 1.3, -14, vel=.6, que='el marco de 15 años empieza a moverse')
    pon('late', vt('quince') - .02, -12, que='pastilla 15 años: 0 de 40')
    pon('aire', vt('perdio') + .2, -15, vel=.6, que='el marco sigue recorriendo los años')
    pon('aire', vt('en', 2) - .05, -13, vel=.7, que='la cámara va a 2008')
    pon('estallido', vt('40 %') - .1, -9, lp=1400, que='2008 se hunde en rojo')
    pon('late', vt('40 %') + .05, -13, que='pastilla −40 %')
    pon('aire', vt('y'), -14, vel=.7, que='la cámara va a 2000')
    pon('aprieta', vt('cinco') - .1, -12, que='aparece el marco rojo de 5 años')
    pon('late', vt('pierdes') - .02, -14, que='pastilla a veces pierdes')
    for k, (w, n) in enumerate([('pero', 1), ('diez', 1), ('quince', 2)]):
        for i in range(4):
            pon('enganche', vt(w, n) + .05 + i * .12, -18 + (i % 2), vel=1 + k * .08 + i * .02, que='aparecen las casillas')
    pon('golpe', vt('vez') - .1, -12, que='la fila de 15 años, toda en verde')
    pon('aire', vt('lo') - .05, -13, vel=.7, que='corte al libro de Bogle')
    pon('papel', vt('bogle') - .1, -14, que='el libro gira')
    for w in ('compra', 'paga', 'aguanta'):
        pon('late', vt(w) - .08, -13, que='aparece una regla')
    pon('aire', vt('esas') - .05, -14, vel=.7, que='corte al tarro')
    pon('aire', vt('venden') - .15, -11, que='el tarro se vuelca')
    pon('golpe', vt('venden') + .4, -11, que='el tarro cae')
    for i in range(0, 18, 3):
        pon('enganche', vt('venden') + .2 + i * .08 + .4, -18, vel=1.1, que='se van monedas rojas')
    pon('aire', vt('por') - .05, -13, vel=.7, que='corte a los tres vehículos')
    pon('late', vt('pronto') - .02, -14, que='pastilla pronto')
    pon('hueco', vt('remunerada') + .1, -16, que='se marca la remunerada')
    pon('hueco', vt('monetario') + .1, -16, vel=.95, que='se marca el monetario')
    pon('late', vt('tocar') - .02, -14, que='pastilla 15+ años')
    pon('golpe-hondo', vt('indexado') + .35, -8, que='la cúpula cae sobre el indexado')
    pon('aire', vt('vender') - .2, -10, vel=.8, que='pasa la ola roja')
    for i in range(0, 8, 2):
        pon('enganche', vt('vender') + i * .12 + .6, -18, que='monedas de corto plazo para los gastos')
    pon('lingote', vt('favor') - .2, -12, que='el indexado sigue creciendo')
    pon('late', vt('favor') - .02, -13, que='pastilla las reglas a tu favor')
    pon('aire', vt('sigueme'), -12, vel=.6, que='corte a la torre; sube hacia el millón')
    for i in range(5):
        pon('enganche', vt('sigueme') + .4 + i * .6, -18, vel=1 + i * .03, que='crece la torre')
    pon('late', vt('millon') - .3, -11, que='pastilla Sígueme')
    # sin huecos de más de 2 s
    pon('aire', vt('resumio') + .5, -16, vel=.6, que='el libro gira')
    pon('aire', vt('juego') + .3, -16, vel=.6, que='la cámara se acerca al tarro')
    pon('aire', vt('sustos'), -16, vel=.6, que='la cámara pasa al indexado')
    pon('aire', vt('asi'), -16, vel=.6, que='la cámara se abre a los tres tarros')
    pon('aire', vt('menos'), -16, vel=.6, que='la cámara recorre las filas')
    pon('aire', vt('mercado'), -16, vel=.6, que='el libro gira')
    pon('aire', vt('problema') + .3, -15, vel=.6, que='la cámara se acerca al tarro')
    pon('aire', vt('vehiculo'), -16, vel=.6, que='la cámara recorre los tarros')
    pon('aire', vt('trabaje'), -16, vel=.6, que='la cámara se abre')
    pon('late', vt('lo', 2) + .1, -17, que='aparece la etiqueta de pronto')
    return e
