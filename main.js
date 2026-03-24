import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
import RAPIER from 'https://cdn.jsdelivr.net/npm/@dimforge/rapier3d-compat@0.10.0/dist/rapier.mjs';

async function init() {
  const gravityModifier = 3;

  await RAPIER.init();
  const world = new RAPIER.World({ x: 0, y: -9.81 * gravityModifier, z: 0 });

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Lighting
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  scene.add(hemiLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(5, 10, 5);
  scene.add(dirLight);

  // Ground
  const groundGeo = new THREE.PlaneGeometry(50, 50);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x228b22, side: THREE.DoubleSide });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Player Controls
  const keys = {};
  let yaw = 0;
  let pitch = 0;
  const mouseSensitivity = 0.002;

  document.body.addEventListener("click", () => { document.body.requestPointerLock(); });
  document.addEventListener("mousemove", (e) => {
    if (document.pointerLockElement === document.body) {
      yaw -= e.movementX * mouseSensitivity;
      pitch -= e.movementY * mouseSensitivity;
      pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
    }
  });
  document.addEventListener("keydown", (e) => { keys[e.code] = true; });
  document.addEventListener("keyup", (e) => { keys[e.code] = false; });

  // Player Body
  const playerHeight = 1.8;
  const playerRadius = 0.3;
  const speed = 4;
  const jumpSpeed = 6;

  const playerBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(0, playerHeight / 2, 5)
      .lockRotations()
  );
  world.createCollider(RAPIER.ColliderDesc.capsule(playerHeight / 2, playerRadius), playerBody);

  // Ground Body
  const groundBody = world.createRigidBody(RAPIER.RigidBodyDesc.fixed());
  world.createCollider(RAPIER.ColliderDesc.cuboid(25, 0.1, 25), groundBody);

  // Obstacles Helper
  function addObstacle(pos, size, color = 0x888888) {
    const geo = new THREE.BoxGeometry(size.x, size.y, size.z);
    const mat = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pos);
    scene.add(mesh);

    const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(pos.x, pos.y, pos.z);
    const body = world.createRigidBody(bodyDesc);
    world.createCollider(RAPIER.ColliderDesc.cuboid(size.x / 2, size.y / 2, size.z / 2), body);
  }

  // Simple Obstacle Course
  addObstacle(new THREE.Vector3(2, 0.5, -3), new THREE.Vector3(1, 1, 1));
  addObstacle(new THREE.Vector3(4, 0.5, -3), new THREE.Vector3(1, 1, 1));
  addObstacle(new THREE.Vector3(6, 0.5, -3), new THREE.Vector3(1, 1, 1));
  addObstacle(new THREE.Vector3(0, 1, -8), new THREE.Vector3(8, 2, 0.5));

  // X-shaped Crosshair
  const crosshair = document.createElement("div");
  crosshair.style.position = "absolute";
  crosshair.style.top = "50%";
  crosshair.style.left = "50%";
  crosshair.style.width = "20px";
  crosshair.style.height = "20px";
  crosshair.style.pointerEvents = "none";
  crosshair.style.transform = "translate(-50%, -50%)";
  document.body.appendChild(crosshair);

  const line1 = document.createElement("div");
  line1.style.position = "absolute";
  line1.style.top = "50%";
  line1.style.left = "0";
  line1.style.width = "100%";
  line1.style.height = "1px";
  line1.style.backgroundColor = "white";
  line1.style.transform = "translateY(-50%) rotate(45deg)";
  crosshair.appendChild(line1);

  const line2 = document.createElement("div");
  line2.style.position = "absolute";
  line2.style.top = "50%";
  line2.style.left = "0";
  line2.style.width = "100%";
  line2.style.height = "1px";
  line2.style.backgroundColor = "white";
  line2.style.transform = "translateY(-50%) rotate(-45deg)";
  crosshair.appendChild(line2);

  // Update Player
  function updatePlayer() {
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

    const movement = new THREE.Vector3();
    if (keys["KeyW"]) movement.add(forward);
    if (keys["KeyS"]) movement.add(forward.clone().multiplyScalar(-1));
    if (keys["KeyA"]) movement.add(right.clone().multiplyScalar(-1));
    if (keys["KeyD"]) movement.add(right);

    if (movement.length() > 0) movement.normalize().multiplyScalar(speed);

    const vel = playerBody.linvel();
    playerBody.setLinvel({ x: movement.x, y: vel.y, z: movement.z }, true);

    if (keys["Space"] && Math.abs(vel.y) < 0.01) {
      playerBody.applyImpulse({ x: 0, y: jumpSpeed, z: 0 }, true);
    }

    const pos = playerBody.translation();
    camera.position.set(pos.x, pos.y + playerHeight / 2, pos.z);
  }

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    world.step();

    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;

    updatePlayer();
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

init();
