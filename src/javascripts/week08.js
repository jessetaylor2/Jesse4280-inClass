import * as THREE from 'three'
import * as dat from 'dat.gui'

export function displayThreeHelloWorld(){
  let canvas = document.querySelector('#webgl-scene')
  let scene = new THREE.Scene()
  let renderer = new THREE.WebGLRenderer({canvas})
  let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientWidth, .1, 1000)

  renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  renderer.setClearColor(0xEEEEEE)

  let axes = new THREE.AxesHelper(10)
  scene.add(axes)

  // Adding a point
  let geometry = new THREE.Geometry()
  geometry.vertices.push(
    new THREE.Vector3(0, 10, -10),
    new THREE.Vector3(20, 40, -30)
  )

  let material = new THREE.PointsMaterial({
    size: 2,
    color: 0xFF0000
  })

  scene.add(new THREE.Points(geometry, material))

  // Adding a line
  geometry = new THREE.Geometry()
  geometry.vertices.push(
    new THREE.Vector3(50, -10, 15),
    new THREE.Vector3(3, 40, 30),
    new THREE.Vector3(10, 10, 10)
  )

  material = new THREE.LineBasicMaterial({
    color: 0x0000FF
  })

  scene.add(new THREE.Line(geometry, material))

  // Adding a triangle
  geometry = new THREE.Geometry()
  geometry.vertices.push(
    new THREE.Vector3(40, 20, 0),
    new THREE.Vector3(30, 45, 0),
    new THREE.Vector3(20, 20, 0)
  )
  geometry.faces.push(new THREE.Face3(0, 1, 2))

  material = new THREE.MeshBasicMaterial({
    color: 0xFFFF00
  })

  let mesh = new THREE.Mesh(geometry, material)
  mesh.drawMode = THREE.TrianglesDrawMode
  scene.add(mesh)

  // Adding a plane
  geometry = new THREE.PlaneGeometry(200, 70, 40, 20)
  material = new THREE.MeshBasicMaterial({color: 0x00FFFF, wireframe: true})
  mesh = new THREE.Mesh(geometry, material)
  mesh.rotateY(Math.PI / 2)
  scene.add(mesh)

  // Adding a cube
  geometry = new THREE.BoxGeometry(30, 30, 30)
  material = new THREE.MeshNormalMaterial( {color: 0xFF00FF})
  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  let box2 = mesh.clone()
  box2.translateZ(40)
  scene.add(box2)

  //Adding sphere
  geometry = new THREE.SphereGeometry(20, 40, 40)
  material = new THREE.MeshNormalMaterial({wireframe: false})
  mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = 30
  mesh.position.y = 30
  mesh.position.z = 30
  scene.add(mesh)

  let sphere2 = mesh.clone()
  sphere2.position.x = 50
  sphere2.position.y = 150
  sphere2.scale.x = .2
  sphere2.scale.y = .2
  sphere2.scale.z = .2
  scene.add(sphere2)


  let controls = {
    radius: 400,
    theta: 1,
    phi: 1
  }

  function animate() {
    camera.position.x = controls.radius * Math.sin(controls.theta) * Math.cos(controls.phi)
    camera.position.y = controls.radius * Math.cos(controls.theta)
    camera.position.z = controls.radius * Math.sin(controls.theta) * Math.sin(controls.phi)

    camera.lookAt(scene.position)
    renderer.render(scene, camera)
  }

  animate()

  let gui = new dat.GUI()
  document.querySelector('aside').appendChild(gui.domElement)
  gui.add(controls, 'radius').min(2).max(900).onChange(animate)
  gui.add(controls, 'theta').min(-1 * Math.PI).max(Math.PI).onChange(animate)
  gui.add(controls, 'phi').min(-1 * Math.PI).max(Math.PI).onChange(animate)
}

export function displayAnimatedCube() {

    let canvas = document.querySelector('#webgl-scene')
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({canvas})
    //let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientWidth, .1, 1000)
    let camera = new THREE.OrthographicCamera(-10, 10, 12, -12, 12, -500)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xEEEEEE)

    let axes = new THREE.AxesHelper(5)
    scene.add(axes)

    let geometry = new THREE.BoxBufferGeometry(3, 3, 3)
    let material = new THREE.MeshNormalMaterial()

    let cube = new THREE.Mesh(geometry, material)

    scene.add(cube)

    camera.position.z = 12

    function animate() {
        
        cube.rotation.x += .05
        cube.rotation.y += .05
        cube.rotation.z += .05

        renderer.render(scene, camera)

        requestAnimationFrame(animate)

    }

    animate()

}

export function displayCubeScene() {

    let canvas = document.querySelector('#webgl-scene')
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({canvas})
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientWidth, .1, 1000)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xEEEEEE)

    let axes = new THREE.AxesHelper(5)
    scene.add(axes)

    let geometry = new THREE.BoxBufferGeometry(15, 15, 15)
    let lambertMaterial = new THREE.MeshLambertMaterial()

    let cube = new THREE.Mesh(geometry, lambertMaterial)

    // let sphereGeometry = new THREE.SphereBufferGeometry(8, 8, 8)
    // let sphereMaterial = new THREE.MeshNormalMaterial()

    let light = new THREE.DirectionalLight(0xFFFFFF, 1)
    light.position.set(40, 100, 5)
    light.castShadow = true
    scene.add(light)

    // let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

    let num = 10;

    //creating 1000 cubes
    for(let i = 0; i < num; i++) {

        for(let j = 0; j < num; j++){

            for(let k = 0; k < num; k++) {

                // let newSphere = sphere.clone()
                // newSphere.position.x = i * 25
                // newSphere.position.y = j * 25
                // newSphere.position.z = k * 25
                // newSphere.material = new THREE.MeshNormalMaterial()

                let box = cube.clone()
                box.position.x = i * 25
                box.position.y = j * 25
                box.position.z = k * 25
                box.material = new THREE.MeshLambertMaterial()
                box.material.color.setRGB(Math.random(), Math.random(), Math.random())
                //box.material.needsUpdate = true

                if(Math.random() > .2) {
                  
                  scene.add(box)

                }

            }

        }

    }

    let controls = {

        radius: 800,
        theta: 1,
        phi: 1

    }

    function animate() {
        
        camera.position.x = controls.radius * Math.sin(controls.theta) * Math.cos(controls.phi)
        camera.position.y = controls.radius * Math.cos(controls.phi)
        camera.position.z = controls.radius * Math.sin(controls.theta) * Math.sin(controls.phi)

        camera.lookAt(scene.position)

        renderer.render(scene, camera)

    }

    animate()

    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    gui.add(controls, 'radius').min(50).max(1000).onChange(animate)
    gui.add(controls, 'theta').min(-1 * Math.PI).max(Math.PI).onChange(animate)
    gui.add(controls, 'phi').min(-1 * Math.PI).max(Math.PI).onChange(animate)

} 