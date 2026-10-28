# Efectos (guia/sonido.md): salen de las palabras de la voz. db frente a la voz.
def efectos(vt, dur):
    e = []
    pon = lambda s, t, db=-12, **o: e.append(dict(sonido=s, t=t, db=db, **o))
    # la carrera: galope (pelota sorda), la cámara corre con ellos
    pon('aire', 0.0, -10, ancla='empieza', vel=.8, que='la cámara corre junto a los caballos')
    for i in range(10):
        pon('madera', .25 + i * .42, -19 + (i % 2) * 2, vel=1.1 + (i % 3) * .05, lp=3000, que='galope')
    pon('late', 1.45, -14, que='pastilla ¿qué caballo gana?')
    pon('aire', vt('profesionales') - .2, -13, vel=.7, que='la cámara se eleva; llega la barrera')
    pon('muro', vt('profesionales') + .1, -12, que='aparece la barrera dorada')
    pon('aire', vt('nueve') - .1, -11, que='nueve caballos se quedan atrás')
    pon('late', vt('nueve') - .02, -13, que='pastilla 9 de cada 10')
    for i in range(6):
        pon('madera', vt('nueve') + .9 + i * .45, -20, vel=1.05, lp=3000, que='galope')
    pon('aire', vt('y', 2), -14, vel=.7, que='la cámara se acerca a la barrera')
    # el fondo
    pon('aire', vt('indexado') - .3, -11, vel=.8, que='corte al tarro; la cámara se acerca')
    pon('lingote', vt('indexado') + .3, -13, que='el tarro se llena')
    for i in range(8):
        pon('enganche', vt('trocito') - .1 + i * .2, -19 + (i % 2), vel=1.2 + (i % 3) * .05, que='caen empresas en el tarro')
    for i in range(3):
        pon('golpe', vt('trescientas') + .65 + i * .25, -15, vel=1.1, que='cae una empresa grande')
    pon('late', vt('trescientas') - .02, -13, que='pastilla +1.300 empresas')
    pon('aire', vt('si') - .1, -14, vel=.7, que='la cámara baja a las barras')
    pon('aprieta', vt('mal'), -12, que='una barra se hunde en rojo')
    pon('aire', vt('tiran'), -13, vel=.9, que='las demás barras suben')
    # el podio
    pon('aire', vt('no', 2), -13, vel=.7, que='corte al podio')
    pon('golpe-hondo', vt('segundo') + .2, -9, que='tu fondo cae en el segundo puesto')
    pon('late', vt('delante') - .02, -13, que='pastilla por delante de 9 de cada 10')
    pon('aire', vt('nada') + .2, -16, vel=.6, que='la cámara se aleja del podio')
    # año a año
    for i in range(12):
        pon('lingote' if i % 4 == 0 else 'enganche', vt('y', 3) + .3 + i * .12 + .4, -17 + (i % 2), vel=1 + i * .02, que='crece una pila de un año')
    pon('late', vt('8 %') - .02, -13, que='pastilla 8 %')
    pon('aprieta', vt('malos'), -14, que='los años malos, en rojo')
    pon('aire', vt('camino'), -16, vel=.6, que='la cámara recorre las pilas')
    # este año
    pon('aire', vt('este') + .1, -14, vel=.7, que='corte al tarro invertido')
    for i in range(0, 24, 3):
        pon('enganche', vt('15 %') - .2 + i * .13 + .45, -18, vel=1.1, que='caen monedas en el tarro')
    pon('late', vt('15 %') - .02, -12, que='pastilla +14,8 %')
    pon('aire', vt('con', 3), -15, vel=.6, que='la cámara se abre a los dos tarros')
    pon('late', vt('quinientos') - .1, -13, que='etiqueta +1.500 €')
    pon('hueco', vt('parados') - .1, -14, que='etiqueta 0 € en el tarro parado')
    pon('aire', vt('dejado') - .3, -12, vel=.8, que='las monedas rojas se escapan')
    pon('late', vt('dejado') - .02, -12, que='pastilla −1.500 €')
    # remate
    pon('aire', vt('asi'), -12, vel=.7, que='corte a la carrera; la barrera avanza')
    for i in range(6):
        pon('madera', vt('asi') + .4 + i * .5, -20, vel=1.05, lp=3000, que='galope')
    pon('aire', vt('esperar') - .3, -13, vel=.6, que='la cámara sube y se aleja')
    # cierre
    pon('aire', vt('sigueme'), -11, vel=.6, que='corte a la torre; la cámara sube')
    for i in range(6):
        pon('enganche', vt('sigueme') + .4 + i * .5, -18, vel=1 + i * .03, que='la torre crece')
    pon('late', vt('millon') - .3, -11, que='pastilla Sígueme')
    # sin huecos de más de 2 s
    for i in range(4):
        pon('madera', vt('profesionales') + .6 + i * .5, -20, vel=1.1, lp=3000, que='galope')
    for i in range(4):
        pon('madera', vt('y', 2) + .5 + i * .5, -20, vel=1.1, lp=3000, que='galope')
    pon('aire', vt('indexado') + 1.2, -16, vel=.6, que='la cámara rodea el tarro')
    pon('aire', vt('ganador') + .1, -16, vel=.6, que='la cámara sube al podio')
    pon('aire', vt('indice') - .2, -16, vel=.6, que='la cámara se acerca al tarro')
    pon('aire', vt('banco') + .3, -16, vel=.6, que='la cámara mira el tarro parado')
    return e
