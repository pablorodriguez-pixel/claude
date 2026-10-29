# Efectos (guia/sonido.md): salen de las palabras de la voz. db frente a la voz.
def efectos(vt, dur):
    e = []
    pon = lambda s, t, db=-12, **o: e.append(dict(sonido=s, t=t, db=db, **o))
    pon('golpe-hondo', 0.02, -8, que='entran Lucía y las torres finales')
    pon('late', vt('marcos') - .02, -12, que='entra Marcos')
    pon('lingote', .9, -12, que='la torre de Marcos sube')
    pon('papel', vt('doscientos'), -14, que='200 €/mes')
    pon('aire', vt('pero') - .1, -14, vel=.8, que='giro: uno se jubila con más')
    pon('golpe', vt('siete'), -9, que='sello ×7')
    pon('aire', vt('lucia', 2) - .3, -9, vel=.7, que='rebobinado a los 25')
    pon('papel', vt('banco'), -13, que='chip BANCO 0 %')
    pon('lingote', vt('indexado'), -13, que='chip FONDO INDEXADO')
    for i in range(6):
        pon('enganche', vt('treinta') + i * .13, -20, vel=1.2, que='la edad sube a 35')
    pon('late', vt('pequena'), -15, que='diferencia pequeña')
    for i in range(6):
        pon('enganche', vt('cuarenta') + i * .13, -19, vel=1.25, que='la edad sube a 45')
    pon('golpe', vt('doble'), -11, que='sello ×2,5')
    for i in range(10):
        pon('enganche', vt('sesenta') + i * .1, -18, vel=1.3 + i * .02, que='la edad sube a 65')
    pon('estallido', vt('cinco', 3) + .4, -10, que='la torre de Marcos rompe el techo')
    pon('golpe-hondo', vt('noventa'), -11, que='96.000 €')
    pon('lingote', vt('setecientos'), -8, que='698.202 €')
    pon('aprieta', vt('inflacion'), -10, que='la torre de Lucía se vuelve roja')
    pon('late', vt('lucia', 3), -14, que='Lucía')
    pon('hueco', vt('cuarenta', 2), -11, que='se encoge al valor real')
    pon('golpe', vt('pusieron'), -13, que='raya de lo que pusieron')
    pon('aire', vt('donde') - .1, -12, vel=.8, que='+602.000 € de intereses')
    pon('golpe-hondo', vt('tu') - .05, -9, que='¿Tú eres Lucía o Marcos?')
    pon('late', vt('lucia', 4), -14, que='Lucía')
    pon('late', vt('marcos', 4), -12, que='Marcos')
    pon('golpe', vt('guardalo'), -11, que='GUÁRDALO')
    pon('aire', dur - 1.3, -14, vel=.8, que='cierre')
    return e
