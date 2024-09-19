        const canvas = document.getElementById('miCanvas');
        const ctx = canvas.getContext('2d');
        const cubos = ['perspectiva', 'ortografico', 'isometrico'];
        const titulos = {
            perspectiva: 'Cubo en Perspectiva',
            ortografico: 'Cubo Ortográfico',
            isometrico: 'Cubo Isométrico'
        };
        let indiceCubo = 0;

        const centroX = canvas.width / 2;
        const centroY = canvas.height / 2;

        function dibujarCuboPerspectiva() {
            const puntoFugaX = centroX;
            const puntoFugaY = centroY;

            const vertices = [
                { x: -50, y: 50, z: 100 },
                { x: -50, y: 50, z: 0 },
                { x: -50, y: -50, z: 100 },
                { x: -50, y: -50, z: 0 },
                { x: 50, y: 50, z: 100 },
                { x: 50, y: 50, z: 0 },
                { x: 50, y: -50, z: 100 },
                { x: 50, y: -50, z: 0 }
            ];

            const puntosProyectados = vertices.map(vertex => {
                const { x, y, z } = vertex;
                const factor = 200 / (z + 200);
                return {
                    x: puntoFugaX + x * factor,
                    y: puntoFugaY - y * factor
                };
            });

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();

            const aristas = [
                [0, 1], [1, 3], [3, 2], [2, 0], // Frente
                [4, 5], [5, 7], [7, 6], [6, 4], // Fondo
                [0, 4], [1, 5], [2, 6], [3, 7]  // Conexiones
            ];

            aristas.forEach(arista => {
                const [start, end] = arista;
                ctx.moveTo(puntosProyectados[start].x, puntosProyectados[start].y);
                ctx.lineTo(puntosProyectados[end].x, puntosProyectados[end].y);
            });

            ctx.strokeStyle = 'red';
            ctx.stroke();
        }

        function dibujarCuboOrtografico() {
            const offsetX = centroX - 50;
            const offsetY = centroY;

            const vertices = [
                { x: -50, y: 50 },  // Frente inferior izquierdo
                { x: 50, y: 50 },   // Frente inferior derecho
                { x: 50, y: -50 },  // Frente superior derecho
                { x: -50, y: -50 }, // Frente superior izquierdo
                { x: -100, y: 0 },  // Fondo inferior izquierdo
                { x: 0, y: 0 },     // Fondo inferior derecho
                { x: 0, y: -100 },  // Fondo superior derecho
                { x: -100, y: -100 } // Fondo superior izquierdo
            ];

            ctx.beginPath();

            const aristas = [
                [0, 1], [1, 2], [2, 3], [3, 0], // Frente
                [4, 5], [5, 6], [6, 7], [7, 4], // Fondo
                [0, 4], [1, 5], [2, 6], [3, 7]  // Conexiones
            ];

            aristas.forEach(arista => {
                const [start, end] = arista;
                ctx.moveTo(vertices[start].x + offsetX, vertices[start].y + offsetY);
                ctx.lineTo(vertices[end].x + offsetX, vertices[end].y + offsetY);
            });

            ctx.strokeStyle = 'red';
            ctx.stroke();
        }

        function dibujarCuboIsometrico() {
            const offsetX = centroX;
            const offsetY = centroY;
            const size = 50;

            const vertices = [
                { x: 1, y: 1, z: 1 },
                { x: 1, y: 1, z: 0 },
                { x: 1, y: 0, z: 1 },
                { x: 1, y: 0, z: 0 },
                { x: 0, y: 1, z: 1 },
                { x: 0, y: 1, z: 0 },
                { x: 0, y: 0, z: 1 },
                { x: 0, y: 0, z: 0 }
            ];

            const puntosIsometricos = vertices.map(vertex => {
                const { x, y, z } = vertex;
                return {
                    x: offsetX + (x - z) * size, // Proyección isométrica
                    y: offsetY - (y - z) * size * 0.5 // Ajusta la altura
                };
            });

            ctx.beginPath();

            const aristas = [
                [0, 1], [1, 3], [3, 2], [2, 0], // Frente
                [4, 5], [5, 7], [7, 6], [6, 4], // Fondo
                [0, 4], [1, 5], [2, 6], [3, 7]  // Conexiones
            ];

            aristas.forEach(arista => {
                const [start, end] = arista;
                ctx.moveTo(puntosIsometricos[start].x, puntosIsometricos[start].y);
                ctx.lineTo(puntosIsometricos[end].x, puntosIsometricos[end].y);
            });

            ctx.strokeStyle = 'red';
            ctx.stroke();
        }

        function dibujarCubo() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            switch (cubos[indiceCubo]) {
                case 'perspectiva':
                    dibujarCuboPerspectiva();
                    break;
                case 'ortografico':
                    dibujarCuboOrtografico();
                    break;
                case 'isometrico':
                    dibujarCuboIsometrico();
                    break;
            }
            document.getElementById('titulo').innerText = titulos[cubos[indiceCubo]];
        }

        document.getElementById('boton').addEventListener('click', () => {
            indiceCubo = (indiceCubo + 1) % cubos.length;
            dibujarCubo();
        });

        dibujarCubo();