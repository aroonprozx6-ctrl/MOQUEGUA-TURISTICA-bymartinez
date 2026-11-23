// --- EFECTOS DE SONIDO (Tone.js) ---
function sonarAcierto() {
    if (window.Tone) {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("C5", "8n");
    }
}

function sonarError() {
    if (window.Tone) {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("G2", "8n");
    }
}

// --- TRIVIA TURÍSTICA ---
const preguntas = [
    {
        pregunta: "¿Qué sitio arqueológico de la cultura Wari se encuentra en Torata, Moquegua?",
        opciones: ["Cerro Baúl", "Machu Picchu", "Chan Chan", "Geoglifos de Nasca"],
        correcta: 0
    },
    {
        pregunta: "¿Cuál es el principal puerto marítimo de la región de Moquegua?",
        opciones: ["Matarani", "Ilo", "Paita", "Callao"],
        correcta: 1
    },
    {
        pregunta: "¿Qué activo volcán se encuentra en la provincia de General Sánchez Cerro?",
        opciones: ["Misti", "Sabancaya", "Volcán Ubinas", "Cotopaxi"],
        correcta: 2
    },
    {
        pregunta: "¿Qué producto agrícola tradicional destaca en el Valle de Omate?",
        opciones: ["Café", "Paltas y Uvas", "Manzanas", "Plátanos"],
        correcta: 1
    },
    {
        pregunta: "¿Qué elemento arquitectónico destaca en el centro histórico de la ciudad de Moquegua?",
        opciones: ["Casas con mojinete", "Pirámides", "Rascacielos", "Construcciones de adobe circular"],
        correcta: 0
    }
];

let idxPregunta = 0;
let puntosTrivia = 0;

function cargarPregunta() {
    const p = preguntas[idxPregunta];
    document.getElementById('texto-pregunta').innerText = p.pregunta;
    document.getElementById('num-pregunta').innerText = idxPregunta + 1;
    document.getElementById('feedback-trivia').innerText = '';
    document.getElementById('btn-siguiente').classList.add('oculto');

    const contOpciones = document.getElementById('lista-opciones');
    contOpciones.innerHTML = '';

    p.opciones.forEach((op, index) => {
        const btn = document.createElement('button');
        btn.className = 'opcion-btn';
        btn.innerText = op;
        btn.onclick = () => responder(index, btn);
        contOpciones.appendChild(btn);
    });
}

function responder(indexSeleccionado, btnSeleccionado) {
    const p = preguntas[idxPregunta];
    const botones = document.querySelectorAll('.opcion-btn');
    botones.forEach(b => b.disabled = true);

    if (indexSeleccionado === p.correcta) {
        btnSeleccionado.classList.add('correcta');
        puntosTrivia += 10;
        document.getElementById('puntos-trivia').innerText = puntosTrivia;
        document.getElementById('feedback-trivia').innerText = "¡Correcto! +10 puntos";
        document.getElementById('feedback-trivia').style.color = "green";
        sonarAcierto();
    } else {
        btnSeleccionado.classList.add('incorrecta');
        botones[p.correcta].classList.add('correcta');
        document.getElementById('feedback-trivia').innerText = "Incorrecto";
        document.getElementById('feedback-trivia').style.color = "red";
        sonarError();
    }

    if (idxPregunta < preguntas.length - 1) {
        document.getElementById('btn-siguiente').classList.remove('oculto');
    } else {
        document.getElementById('feedback-trivia').innerText += ` - ¡Juego terminado! Puntuación final: ${puntosTrivia}`;
    }
}

document.getElementById('btn-siguiente').addEventListener('click', () => {
    idxPregunta++;
    cargarPregunta();
});

// --- JUEGO ARCADE ---
const canvas = document.getElementById('canvasJuego');
const ctx = canvas.getContext('2d');
let jugadorX = canvas.width / 2 - 25;
let puntosArcade = 0;
let vidasArcade = 3;
let objetos = [];
let bucleArcade = null;

function cambiarModo(modo) {
    const btnTrivia = document.getElementById('btn-modo-trivia');
    const btnArcade = document.getElementById('btn-modo-arcade');
    const secTrivia = document.getElementById('seccion-trivia');
    const secArcade = document.getElementById('seccion-arcade');

    if (modo === 'trivia') {
        btnTrivia.classList.add('activo');
        btnArcade.classList.remove('activo');
        secTrivia.classList.remove('oculto');
        secArcade.classList.add('oculto');
        clearInterval(bucleArcade);
    } else {
        btnArcade.classList.add('activo');
        btnTrivia.classList.remove('activo');
        secArcade.classList.remove('oculto');
        secTrivia.classList.add('oculto');
        iniciarArcade();
    }
}

document.getElementById('btn-modo-trivia').addEventListener('click', () => cambiarModo('trivia'));
document.getElementById('btn-modo-arcade').addEventListener('click', () => cambiarModo('arcade'));
document.getElementById('btn-reiniciar-arcade').addEventListener('click', () => iniciarArcade());

function iniciarArcade() {
    puntosArcade = 0;
    vidasArcade = 3;
    objetos = [];
    jugadorX = canvas.width / 2 - 25;
    document.getElementById('puntos-arcade').innerText = puntosArcade;
    document.getElementById('vidas-arcade').innerText = vidasArcade;
    
    clearInterval(bucleArcade);
    bucleArcade = setInterval(actualizarArcade, 1000 / 60);
}

function crearObjeto() {
    if (Math.random() < 0.04) {
        const esBueno = Math.random() > 0.3;
        objetos.push({
            x: Math.random() * (canvas.width - 20),
            y: 0,
            velocidad: 2 + Math.random() * 3,
            tipo: esBueno ? 'fruta' : 'roca'
        });
    }
}

function actualizarArcade() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar Jugador
    ctx.fillStyle = '#1B5E20';
    ctx.fillRect(jugadorX, canvas.height - 30, 50, 20);

    crearObjeto();

    // Mover y dibujar objetos
    for (let i = objetos.length - 1; i >= 0; i--) {
        let o = objetos[i];
        o.y += o.velocidad;

        if (o.tipo === 'fruta') {
            ctx.fillStyle = '#43A047';
            ctx.beginPath();
            ctx.arc(o.x + 10, o.y + 10, 10, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillStyle = '#795548';
            ctx.fillRect(o.x, o.y, 18, 18);
        }

        // Colisión con el jugador
        if (o.y + 20 >= canvas.height - 30 && o.x >= jugadorX - 10 && o.x <= jugadorX + 50) {
            if (o.tipo === 'fruta') {
                puntosArcade += 5;
                document.getElementById('puntos-arcade').innerText = puntosArcade;
                sonarAcierto();
            } else {
                vidasArcade--;
                document.getElementById('vidas-arcade').innerText = vidasArcade;
                sonarError();
                if (vidasArcade <= 0) {
                    alert("¡Juego terminado! Puntos finales: " + puntosArcade);
                    iniciarArcade();
                }
            }
            objetos.splice(i, 1);
            continue;
        }

        // Eliminar cuando sale de la pantalla
        if (o.y > canvas.height) {
            objetos.splice(i, 1);
        }
    }
}

// Controles de teclado
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && jugadorX > 0) {
        jugadorX -= 25;
    } else if (e.key === 'ArrowRight' && jugadorX < canvas.width - 50) {
        jugadorX += 25;
    }
});

// Inicializar la Trivia al cargar
cargarPregunta();