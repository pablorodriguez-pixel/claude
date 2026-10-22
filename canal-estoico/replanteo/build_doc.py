# Construye replanteamiento.html (autocontenido, con los storyboards incrustados en base64).
import base64, html

def img(fid):
    b = base64.b64encode(open('small/%s.jpg' % fid, 'rb').read()).decode()
    return '<img src="data:image/jpeg;base64,%s" alt="Fotograma %s">' % (b, fid)

PAIRS = [
    ('«Hoy no tengo ganas.»', 'Las ganas no deciden. Decido yo.', 'Actuar a pesar de la emoción', 'Procrastinación'),
    ('«¿Qué pensarán de mí?»', 'Su opinión no depende de mí. Mis actos, sí.', 'Dicotomía de control', 'Ansiedad social'),
    ('«Esto es un desastre.»', 'Ha pasado algo. Mi primera impresión es que es grave. Voy a comprobarlo.', 'Distanciamiento cognitivo', 'Catastrofizar'),
    ('«Cuando esté preparado, empiezo.»', 'Empiezo mal. Mejoro haciendo.', 'Reduce tus estándares (Epicteto)', 'Perfeccionismo'),
    ('«He fallado. Soy un desastre.»', 'Fallé. Aprendo. Sigo.', 'Perdona tus errores', 'Culpa'),
    ('«Me han criticado y me hundo.»', '¿Es cierto? ¿Quién lo dice? ¿Depende de mí?', 'Pon en perspectiva las críticas', 'Críticas'),
    ('«Cuando tenga eso, seré feliz.»', 'Ya tengo mucho que un día deseé.', 'Gratitud y visualización negativa', 'Insatisfacción'),
    ('«No puedo con esto.»', 'Esto me está entrenando.', 'El obstáculo es el camino', 'Adversidad'),
    ('«Solo un capítulo más…»', 'Si lo hago, ¿cómo me sentiré mañana?', 'Evalúa las consecuencias', 'Tentación'),
    ('«Me ha hecho enfadar.»', 'Nadie me enfada. Me enfado yo con lo que pienso.', 'Del estímulo a la respuesta', 'Ira'),
    ('«Tengo que conseguirlo sí o sí.»', 'Haré lo mejor posible, si nada me lo impide.', 'Cláusula de reserva', 'Ansiedad por resultados'),
    ('«Ya lo haré algún día.»', 'Hoy cuenta. Puede que no haya algún día.', 'Memento mori', 'Aplazar la vida'),
]

PROPS = [
 dict(k='A', name='La Forja', tag='Serie con protagonista', color='#2f6f6a',
      idea='Una serie animada con un protagonista fijo, Álex, en quien se reconoce el espectador. Cada episodio Álex choca con una mentalidad frágil; un maestro estoico (Marco Aurelio, Séneca, Epicteto) aparece en su historia, le da una herramienta concreta y Álex cambia. El espectador aprende viéndole forjarse.',
      why=['El centro es el espectador: Álex <i>es</i> él.', 'Engancha como una serie: quieres saber qué le pasa a Álex mañana.', 'Encaja con el nivel de edición de la referencia: un mundo ilustrado coherente, personajes con nombre y cámara continua.', 'Cada episodio deja un método aplicable.'],
      risk='Es el formato más exigente de producir: personajes y escenarios consistentes. Se compensa reutilizando el mundo (habitación de Álex, Roma).',
      freq='Diario (60–75 s)',
      title='Episodio 1 · La voz que dice «mañana»',
      script='''Esta es la historia de Álex. Y probablemente, también la tuya.
Álex quiere cambiar. Lo tiene todo pensado: entrenar, leer, empezar ese proyecto. Pero cada noche, una voz le dice lo mismo: «Mañana».
Esa voz es vieja. Muy vieja. Hace casi dos mil años, el hombre más poderoso de Roma la oía cada mañana desde su cama. Se llamaba Marco Aurelio.
Y en sus notas privadas se respondía así: «¿Naciste para estar cómodo… o para actuar?».
Porque la mente frágil espera a tener ganas. La mente forjada sabe un secreto: las ganas no llegan antes de empezar. Llegan después.
Por eso los estoicos tenían un método de tres pasos.
Uno: recuerda para qué. Tu porqué tiene que pesar más que tu pereza.
Dos: hazlo ridículamente pequeño. Cinco minutos. Una página. Una flexión.
Tres: decide antes de que llegue el momento. «Cuando suene la alarma: pies al suelo.» Sin negociar.
Esa mañana, la voz volvió. Y por primera vez, Álex no la obedeció.
Las ganas no deciden. Decides tú.
Esto es forjar el carácter. Mañana: por qué te importa tanto lo que piensan los demás.'''),
 dict(k='B', name='Frágil vs Forjada', tag='Comparativa', color='#a8402e',
      idea='Cada vídeo es una situación cotidiana (te critican, te dejan, fallas, te tienta algo) vista con dos mentes en pantalla partida: la frágil y la forjada. Ves en segundos la diferencia, y luego la herramienta para pasar de una a otra.',
      why=['Es el formato más claro: el espectador ve su propia mente reflejada en la mitad izquierda.', 'Muy compartible: «mándaselo a quien reacciona así».', 'Da mucho valor por segundo: situación, herramienta y frase.', 'Se convierte en catálogo: «Caso 1, Caso 2…».'],
      risk='Puede volverse repetitivo si no se varían las situaciones y los maestros. Funciona mejor combinado con historias.',
      freq='Diario o 3 por semana (45–60 s)',
      title='Caso 7 · Te critican delante de todos',
      script='''Te critican delante de todos. Mira cómo responden dos mentes.
La mente frágil: el corazón se acelera. «Me odian. Soy un desastre. Tengo que defenderme.» Esa noche repite la escena cien veces.
La mente forjada siente lo mismo. El golpe duele igual. La diferencia está en lo que piensa después. Se hace tres preguntas.
Uno: ¿es cierto? Si lo es, acabo de aprender algo gratis.
Dos: ¿quién lo dice? ¿Es alguien a quien le pediría consejo?
Tres: ¿depende de mí lo que piensen? No. Depende de mí lo que haga ahora.
Epicteto, que fue esclavo, lo resolvía con una sonrisa. Si alguien hablaba mal de él, respondía: «Se nota que no conoce mis otros defectos. Si no, habría dicho más.»
No eres lo que dicen de ti. Eres lo que haces después.
¿Cuál de las dos mentes tienes hoy? Sígueme, y forjamos la segunda.'''),
 dict(k='C', name='Cartas de Séneca', tag='Un maestro te habla', color='#b8864b',
      idea='Séneca escribió 124 cartas a su amigo Lucilio para enseñarle a vivir. Aquí te escribe a ti. Cada vídeo es una carta breve, leída con voz cálida, sobre un problema actual («para quien siente que va tarde», «para quien no puede más»), con un ejercicio al final.',
      why=['Es el formato más humano y cercano: te hablan en segunda persona.', 'Encaja con la historia real: Séneca escribía exactamente así.', 'Muy fácil de producir con calidad: papel, sello y escenas sencillas.', 'Ideal para comentarios: «necesitaba leer esto hoy».'],
      risk='Ritmo más pausado; el gancho tiene que ser muy concreto en el primer segundo («Para quien siente que va tarde»).',
      freq='2–3 por semana (50–70 s)',
      title='Carta I · Para quien siente que va tarde',
      script='''Querido amigo: me dices que vas tarde. Que otros, a tu edad, ya tienen más. Más dinero, más éxito, la vida más resuelta.
Déjame contarte algo. Yo he sido rico, y he sido desterrado. He estado en la corte de un emperador y en una isla, solo. Y he aprendido una cosa: la vida no es corta. La hacemos corta, malgastándola.
Tú no vas tarde. Vas distraído.
Así que haz esto hoy, antes de dormir, como hacía yo cada noche. Hazte tres preguntas.
¿Qué hice bien? Reconócelo: también cuenta.
¿En qué fallé? Mírate como un juez justo, no como un verdugo.
¿Qué haré mejor mañana? Una sola cosa.
Y compárate solo con quien eras ayer. Ahí está tu único rival.
Cuídate. Tu amigo, Séneca.'''),
 dict(k='D', name='Historias que forjan', tag='Historias reales', color='#3d4f6a',
      idea='Historias reales, contadas con suspense, de personas a las que el estoicismo sostuvo en el peor momento: antiguas (Zenón, Epicteto, Marco Aurelio en la peste) y modernas (James Stockdale, prisionero de guerra). Cada historia termina aplicada a tu vida con una pregunta y una herramienta.',
      why=['Es lo que pediste: historias con nivel de edición, como la referencia.', 'Las historias reales generan asombro y credibilidad.', 'Cada una demuestra que el método funciona en situaciones extremas.', 'Muy buen formato para el vídeo largo semanal.'],
      risk='Exige verificar cada dato. Hay menos historias modernas documentadas que antiguas: conviene alternar.',
      freq='1–2 por semana (75–90 s)',
      title='Historia nº 1 · El piloto que sobrevivió gracias a un esclavo griego',
      script='''Septiembre de 1965. Un piloto estadounidense es derribado sobre Vietnam. Mientras cae en paracaídas, piensa una sola frase: «Dejo el mundo de la tecnología. Entro en el mundo de Epicteto.»
Se llamaba James Stockdale. Pasaría más de siete años prisionero. Cuatro de ellos, aislado. Torturado. Sin saber si volvería a casa.
¿Qué le sostuvo? Un librito que había estudiado años antes, escrito por un esclavo griego: el Enquiridión de Epicteto.
Epicteto enseñaba una idea simple: hay cosas que dependen de ti, y cosas que no. Stockdale no controlaba la celda, ni el dolor, ni cuándo saldría. Pero controlaba una cosa: su respuesta. Y ahí decidió ser fuerte.
Años después le preguntaron quiénes no lo lograron. Respondió: «Los optimistas. Los que decían "saldremos por Navidad". Y la Navidad pasaba.»
La lección: no te engañes sobre lo dura que es tu situación. Pero nunca pierdas la fe en que vas a superarla.
Tú también tienes tu celda: un trabajo, una pérdida, un mal año. Pregúntate hoy: ¿qué parte de esto depende de mí?
Ahí empieza tu fuerza.'''),
]

CSS = '''
:root{--ink:#14161a;--stone:#ece8de;--paper:#f7f5ef;--bronze:#b8864b;--bronze-d:#8a5f2c;--teal:#2f4a4f;--mute:#5b5f66;--line:#d9d4c6;--red:#a8402e}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);font:17px/1.6 "Inter",system-ui,-apple-system,"Segoe UI",sans-serif}
.w{max-width:1080px;margin:0 auto;padding:0 16px}
h1,h2,h3{font-family:Georgia,"Times New Roman",serif;line-height:1.12;margin:0 0 .5em}
h1{font-size:clamp(2.2rem,7vw,3.8rem)}h2{font-size:clamp(1.7rem,4.6vw,2.4rem)}h3{font-size:1.3rem}
section{padding:52px 0;border-top:1px solid var(--line)}
.hero{background:var(--ink);color:var(--stone);padding:60px 0 48px;border:0}
.hero p{color:#c9c5b8;max-width:720px}
.tag{font:600 .75rem/1 system-ui;letter-spacing:.16em;text-transform:uppercase;color:var(--bronze-d);display:block;margin-bottom:10px}
.hero .tag{color:var(--bronze)}
.box{background:#fff;border:1px solid var(--line);border-radius:18px;padding:18px 20px}
.g{display:grid;gap:14px}@media(min-width:760px){.g2{grid-template-columns:1fr 1fr}.g3{grid-template-columns:repeat(3,1fr)}.g4{grid-template-columns:repeat(4,1fr)}}
.promise{background:var(--teal);color:#fff;border-radius:22px;padding:26px 26px}
.promise b{font-family:Georgia,serif;font-size:clamp(1.5rem,4vw,2.1rem);display:block;line-height:1.15;margin-bottom:8px}
table{width:100%;border-collapse:collapse;font-size:.94rem}
td,th{text-align:left;padding:10px 8px;border-bottom:1px solid var(--line);vertical-align:top}
th{font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--bronze-d)}
.scroll{overflow-x:auto}
.weak{color:#6b6e75}.strong{color:var(--teal);font-weight:600}
.phase{border-radius:18px;padding:18px 20px;color:#fff}
.phase h3{color:#fff}.phase ul{margin:.3em 0 0;padding-left:1.1em}.phase li{margin:.2em 0}
.beats{counter-reset:b;list-style:none;padding:0;margin:0}
.beats li{counter-increment:b;display:grid;grid-template-columns:42px 1fr;gap:12px;padding:12px 0;border-bottom:1px solid var(--line)}
.beats li::before{content:counter(b);width:34px;height:34px;border-radius:50%;background:var(--ink);color:var(--stone);display:grid;place-items:center;font-weight:700}
.prop{border-top:6px solid var(--c)}
.prop .badge{display:inline-block;background:var(--c);color:#fff;border-radius:100px;padding:4px 14px;font-size:.8rem;font-weight:700;letter-spacing:.08em;margin-bottom:10px}
.strip{display:flex;gap:10px;overflow-x:auto;padding:6px 2px 14px;scroll-snap-type:x mandatory}
.strip img{width:200px;flex:none;border-radius:12px;box-shadow:0 6px 20px rgba(0,0,0,.18);scroll-snap-align:start}
@media(min-width:900px){.strip img{width:calc((100% - 40px)/5)}}
.script{white-space:pre-line;background:#fff;border-left:4px solid var(--c);border-radius:0 14px 14px 0;padding:16px 20px;font-family:Georgia,serif;font-size:1.02rem;line-height:1.55}
.note{background:var(--stone);border-radius:16px;padding:14px 18px;font-size:.93rem;color:var(--mute)}
.ref img{width:100%;border-radius:14px}
'''

def esc(s): return html.escape(s)

out = ['<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Carácter Estoico — Replanteamiento</title><style>%s</style></head><body>' % CSS]
out.append('''<header class="hero"><div class="w"><span class="tag">Carácter Estoico · Replanteamiento</span>
<h1>Un canal que forja tu carácter</h1>
<p>Cuatro propuestas para que quien nos ve salga de cada vídeo un poco más fuerte: con una historia que engancha, una herramienta que puede usar hoy y una frase que se queda.</p></div></header>''')

out.append('''<section><div class="w"><span class="tag">1 · Qué fallaba</span><h2>Diagnóstico honesto</h2>
<div class="g g2">
<div class="box"><b>No se entendía la promesa.</b> En ningún momento quedaba claro que seguir el canal te hace más fuerte por dentro.</div>
<div class="box"><b>Mucha historia, poco valor.</b> Contábamos anécdotas de hace 2.000 años, pero el espectador no se llevaba una herramienta.</div>
<div class="box"><b>El centro era el pasado, no tú.</b> El protagonista tiene que ser quien nos ve: su mañana, su crítica, su miedo.</div>
<div class="box"><b>Ritmo a trompicones.</b> Cortes y efectos sueltos en lugar de una narración que fluye, como en la referencia.</div>
</div></div></section>''')

out.append('''<section><div class="w"><span class="tag">2 · La promesa</span><h2>Qué hace este canal por ti</h2>
<div class="promise"><b>Aquí forjamos un carácter que no se rompe.</b>Una mente que no depende de lo que pase fuera: ni de las ganas, ni de la opinión de los demás, ni de la suerte. Los estoicos lo llamaban la <i>ciudadela interior</i>. Una lección cada día.</div>
<p style="margin-top:18px"><b>Bio:</b> «Forjamos tu carácter con la filosofía de Marco Aurelio, Séneca y Epicteto. Una lección al día para una mente que no se rompe.»<br>
<b>Frase de cierre de cada vídeo:</b> «Esto es forjar el carácter.»</p>
<div class="note">Términos estoicos que usamos: <b>ciudadela interior</b> (Marco Aurelio: la mente libre de pasiones es una fortaleza), <b>ataraxia</b> (serenidad imperturbable), <b>templanza</b> y <b>areté</b> (excelencia del carácter). En pantalla los traducimos siempre a lenguaje de calle.</div>
</div></section>''')

out.append('''<section><div class="w"><span class="tag">3 · El método (del libro Invicto)</span><h2>Cómo se forja una mente fuerte</h2>
<p>Lo saco de la estructura del libro y lo convierto en un camino que el canal recorre una y otra vez. Cada vídeo trabaja <b>una</b> pieza.</p>
<div class="g g4">
<div class="phase" style="background:#2f4a4f"><h3>1 · Ver claro</h3><ul><li>Del estímulo a la respuesta</li><li>Miedo, ansiedad, ira, envidia</li><li>Trampas mentales: catastrofizar, leer mentes, generalizar</li><li>Tus valores y tu porqué</li></ul></div>
<div class="phase" style="background:#8a5f2c"><h3>2 · Actuar</h3><ul><li>Vencer la procrastinación</li><li>Foco y decir «no»</li><li>Tu tribu</li><li>Acción y descanso</li><li>Cláusula de reserva</li></ul></div>
<div class="phase" style="background:#a8402e"><h3>3 · Resistir</h3><ul><li>Perdonar tus errores</li><li>Adversidad</li><li>Tentación</li><li>Críticas</li><li>Paciencia</li></ul></div>
<div class="phase" style="background:#14161a"><h3>Armas diarias</h3><ul><li>Visualización negativa</li><li>Memento mori</li><li>Incomodidad voluntaria</li><li>Vista desde arriba</li><li>Gratitud y diario</li></ul></div>
</div></div></section>''')

rows = ''.join('<tr><td class="weak">%s</td><td class="strong">%s</td><td>%s</td><td>%s</td></tr>' % (esc(a), esc(b), esc(c), esc(d)) for a, b, c, d in PAIRS)
out.append('''<section><div class="w"><span class="tag">4 · Mente frágil vs mente forjada</span><h2>Lo que cambia en la cabeza de quien nos sigue</h2>
<p>Este es el corazón del contenido: mostrar cómo piensa una mente frágil, y cómo piensa la misma persona cuando se ha forjado. Doce ejemplos, cada uno un vídeo.</p>
<div class="scroll"><table><tr><th>Mente frágil</th><th>Mente forjada</th><th>Herramienta</th><th>Tema</th></tr>%s</table></div></div></section>''' % rows)

out.append('''<section><div class="w"><span class="tag">5 · Cómo se cuenta</span><h2>La estructura de cada vídeo</h2>
<p>Narración continua, sin saltos: una sola historia que fluye y en la que la cámara se mueve por un mismo mundo, como en la referencia. Al menos el 40 % del vídeo es valor práctico.</p>
<ol class="beats">
<li><div><b>Tu problema, hoy (0–3 s).</b> Una escena que el espectador reconoce como suya.</div></li>
<li><div><b>La trampa (≈10 s).</b> Cómo piensa la mente frágil. Su voz interior, en pantalla.</div></li>
<li><div><b>El maestro (≈15 s).</b> Un estoico que vivió lo mismo. Puente entre su historia y la tuya.</div></li>
<li><div><b>La herramienta (≈25 s).</b> Pasos concretos que puedes usar hoy. Numerados y visuales.</div></li>
<li><div><b>La forja (≈8 s).</b> Cómo piensa la mente forjada, con una frase ancla.</div></li>
<li><div><b>Identidad y siguiente (≈5 s).</b> «Esto es forjar el carácter. Mañana: …»</div></li>
</ol></div></section>''')

out.append('''<section><div class="w"><span class="tag">6 · Nivel de edición</span><h2>Qué tomo de la referencia (sin copiarla)</h2>
<div class="g g2">
<div class="box"><ul style="margin:0;padding-left:1.1em">
<li><b>Un mundo ilustrado coherente</b>: personajes planos con mucha personalidad, papel y paleta nocturna cálida.</li>
<li><b>Cámara continua</b>: en vez de cortar, la cámara viaja por el escenario (paneos, zooms, transiciones en círculo).</li>
<li><b>Personajes con nombre</b>: etiqueta con línea («MARCO AURELIO · emperador»).</li>
<li><b>Mapas y diagramas animados</b> para explicar (rutas, círculos de control).</li>
<li><b>Subtítulo en cinta de papel</b> con la palabra clave en rojo.</li>
<li><b>Ambiente</b>: lluvia, velas y antorchas con brillo, y sonido ambiente.</li>
</ul></div>
<div class="note">La referencia (Llegendes Catalanes) cuenta leyendas en ~86 s con ilustración animada. Nosotros adoptamos ese <b>lenguaje</b>, pero con nuestro mundo, nuestra paleta y una diferencia clave: <b>cada historia termina en una herramienta para el espectador</b>. Los storyboards de abajo están ilustrados por mí para validar la idea; en producción animo personajes (andar, parpadear, hablar) y cámara.</div>
</div></div></section>''')

for p in PROPS:
    strip = ''.join(img('%s%d' % (p['k'], i)) for i in range(1, 6))
    why = ''.join('<li>%s</li>' % w for w in p['why'])
    out.append('''<section class="prop" style="--c:%s"><div class="w"><span class="badge">Propuesta %s · %s</span><h2>%s</h2>
<p>%s</p>
<div class="strip">%s</div>
<div class="g g2"><div><h3>Por qué funciona</h3><ul>%s</ul><p><b>Riesgo:</b> %s</p><p><b>Frecuencia:</b> %s</p></div>
<div><h3>Guion de ejemplo: %s</h3><div class="script">%s</div></div></div></div></section>''' % (p['color'], p['k'], esc(p['tag']), esc(p['name']), p['idea'], strip, why, p['risk'], p['freq'], esc(p['title']), esc(p['script'])))

out.append('''<section><div class="w"><span class="tag">7 · Mi recomendación</span><h2>Cómo lo combinaría</h2>
<div class="g g3">
<div class="box"><b>Principal, diario: A · La Forja</b><br>Es lo que más hábito crea: una serie con un protagonista en el que te reconoces. Dentro de cada episodio meto el momento «frágil vs forjada» de la propuesta B, que es lo que más valor transmite.</div>
<div class="box"><b>Semanal: D · Historias que forjan</b><br>Una historia real con suspense y la máxima edición. Es el vídeo «evento» que se comparte.</div>
<div class="box"><b>Ocasional: C · Cartas de Séneca</b><br>Para los días duros. Muy cercano y fácil de producir.</div>
</div>
<p style="margin-top:16px"><b>Siguiente paso:</b> elige propuesta (o combinación) y produzco el primer episodio completo en este estilo ilustrado, animado y con la voz de Leónidas o la que prefieras para cada formato.</p>
<div class="note"><b>Comprobación de datos.</b> Stockdale: derribado el 9/9/1965, más de 7 años prisionero, unos 4 en aislamiento; la frase sobre Epicteto y la respuesta sobre los optimistas proceden de sus escritos y de su entrevista con Jim Collins. Séneca: «la vida no es corta, la hacemos corta» (<i>Sobre la brevedad de la vida</i>) y su examen nocturno (<i>Sobre la ira</i>, III). Epicteto y las críticas: <i>Enquiridión</i> 33. Marco Aurelio y la cama: <i>Meditaciones</i> V, 1. El método de tres fases está sacado de la estructura del libro <i>Invicto</i>, con palabras propias.</div>
</div></section>''')
out.append('</body></html>')
open('replanteamiento.html', 'w').write('\n'.join(out))
print('ok', sum(len(x) for x in out) // 1024, 'KB')
