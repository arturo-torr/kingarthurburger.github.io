// Importación de la librería
import * as THREE from "three";
// Importación de los controles para poder manipular la imagen
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Elemento div del HTML que contiene las imágenes
const cont = document.getElementById("escene");

// Configuración de la escena, cámara y renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  cont.clientWidth / cont.clientHeight,
  1,
  500
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(cont.clientWidth, cont.clientHeight);

// Agregar el renderizador al contenedor
cont.appendChild(renderer.domElement);

// Crear una esfera
const geometry = new THREE.SphereGeometry(620, 350, 220); // Cambio a una esfera

// Variable que almacena el mapa con la primera imagen
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load("./img/360.jpg"),
});

// Creación del cubo añadido a la escena
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Invertir la esfera para que el usuario esté en el centro
cube.scale.x = -1; // Invertir solo la coordenada X

// Configurar la posición de la cámara
camera.position.set(0, 100, 1000);

// Creación de los controles
var controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false; // Desactivar el zoom mediante scroll

// Función que permite visualizar la imagen 360
function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.setSize(cont.clientWidth, cont.clientHeight);
  camera.aspect = cont.clientWidth / cont.clientHeight;
  camera.updateProjectionMatrix();

  renderer.render(scene, camera);
}

// Llamar a la función de animación
animate();

// Manejar cambios en el tamaño de la ventana
window.addEventListener("resize", function () {
  renderer.setSize(cont.clientWidth, cont.clientHeight);
  camera.aspect = cont.clientWidth / cont.clientHeight;
  camera.updateProjectionMatrix();
});
