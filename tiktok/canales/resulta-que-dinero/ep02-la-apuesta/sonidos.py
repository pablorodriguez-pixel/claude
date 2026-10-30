def efectos(vt):
    return [('golpe-hondo', vt('millon'), -9), ('late', vt('nada'), -12), ('papel', vt('diez'), -14), ('golpe', vt('acepto'), -10)] \
        + [('enganche', vt('cinco') + .12 * i, -18) for i in range(5)] + [('aprieta', vt('crisis'), -10), ('hueco', vt('37'), -10),
           ('aire', vt('poco'), -14), ('golpe', vt('perdido'), -12), ('lingote', vt('126'), -8), ('golpe', vt('36'), -12),
           ('late', vt('como'), -10), ('golpe', vt('2'), -10), ('golpe', vt('20'), -10)] \
        + [('golpe', vt('mordisco') + .14 * i, -18) for i in range(10)] + [('lingote', vt('casi', 2), -12), ('estallido', vt('dos'), -12), ('hueco', vt('supiera'), -16)]
