  const canvas = document.getElementById("heroCanvas");

  // Escena
  const scene = new THREE.Scene();

  // Cámara
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1, 5);

  // Renderizador
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x00ff00, 0); 
  // Luz
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // ===== Estrellas (fondo) =====
  function createStars() {
    const geometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const positions = [];

    for (let i = 0; i < starCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);
  }
  createStars();

  // ===== Planeta =====
  const loader = new THREE.TextureLoader();
  const planetTexture = loader.load("https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg");
  const planetMaterial = new THREE.MeshStandardMaterial({ map: planetTexture });
  const planet = new THREE.Mesh(new THREE.SphereGeometry(1.2, 64, 64), planetMaterial);
   // planet.position.x = 3;
  scene.add(planet);


  
  // ===== Animación =====
  function animate() {
    requestAnimationFrame(animate);

    // Rotación del planeta
    planet.rotation.y += 0.002;

    // Movimiento sutil de cámara (como flotando)
    const time = Date.now() * 0.0003;
    camera.position.x = (Math.sin(time) * 5) + 0;
    camera.position.z = (Math.cos(time) * 5) + 0;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  animate();

  // ===== Resize =====
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });