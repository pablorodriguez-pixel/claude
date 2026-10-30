def efectos(vt):
    return [('golpe-hondo', vt('ocho'), -8), ('papel', vt('cuando') + .1, -16), ('enganche', vt('imperdibles'), -10),
            ('golpe', vt('heredo'), -10), ('golpe', vt('loteria'), -10), ('golpe', vt('alto'), -10),
            ('madera', vt('lena'), -8), ('papel', vt('taco'), -12), ('papel', vt('acciones'), -14),
            ('lingote', vt('cinco', 2), -10), ('lingote', vt('hospital'), -12), ('golpe-hondo', vt('dos', 2), -12),
            ('late', vt('como'), -10)] + [('enganche', vt('cada') + .33 * i, -20) for i in range(4)] \
        + [('enganche', vt('trocito') + .45 * i, -20) for i in range(12)] + [('aprieta', vt('caia'), -12), ('hueco', vt('no', 4), -14)]
