import { WebGLHelper } from './webgl_helper';
import * as dat from 'dat.gui';
import * as THREE from 'three';
import { color } from 'd3';
import { Cube } from './cube'
import { Sphere } from './sphere'

function getTRSTransformation(controls) {

    let e = new THREE.Euler(

        controls.r_x * Math.PI/180,
        controls.r_y * Math.PI/180,
        controls.r_z * Math.PI/180

    )
    
    let t = new THREE.Matrix4().makeTranslation(controls.t_x, controls.t_y, controls.t_z)
    let r = new THREE.Matrix4().makeRotationFromEuler(e)
    let s = new THREE.Matrix4().makeScale(controls.s_x, controls.s_y, controls.s_z)

    return new THREE.Matrix4().multiplyMatrices(t, new THREE.Matrix4().multiplyMatrices(r, s))

}

function getEulerTransformation(controls) {

    let e = new THREE.Euler(

        controls.r_x * Math.PI/180,
        controls.r_y * Math.PI/180,
        controls.r_z * Math.PI/180

    )
    
    return new THREE.Matrix4().makeRotationFromEuler(e)

}

function getQuaternionTransformation(controls) {

    let e = new THREE.Euler(

        controls.r_x * Math.PI/180,
        controls.r_y * Math.PI/180,
        controls.r_z * Math.PI/180

    )

    let q = new THREE.Quaternion().setFromEuler(e)

    return new THREE.Matrix4().makeRotationFromQuaternion(q)

}

export function displayNewCube() {

    const vs_script = `#version 300 es

        in vec3 coordinates;
        in vec3 color;
        out vec4 vColor;
        uniform mat4 transformBy;

        void main(void) {

            gl_Position = transformBy * vec4(coordinates, 1.0);
            vColor = vec4(color, 1.0);

        }`

    const fs_script = `#version 300 es

        precision mediump float;
        in vec4 vColor;
        out vec4 fragColor;      
    
        void main(void){
    
            fragColor = vColor;
    
        }`

    
    let canvas = document.querySelector("#webgl-scene"),
        gl = WebGLHelper.initWebGL(canvas),
        program = WebGLHelper.initShaders(gl, vs_script, fs_script)
    
    gl.useProgram(program)

    let cube = new Cube()

    let buffers = WebGLHelper.initBuffers(gl, program, [{
    
        name: 'coordinates',
        size: 3,
        data: cube.v_out
    
    }, {

        name: 'color',
        size: 3,
        data: cube.c_out

    }])

    let transformByLoc = gl.getUniformLocation(program, 'transformBy')

    let controls = {

        t_x: 0,
        t_y: 0,
        t_z: 0,
        r_x: 0,
        r_y: 0,
        r_z: 0,
        s_x: 0,
        s_y: 0,
        s_z: 0

    }

    let theta = [0, 0, 0]

    function animate() {

        // theta[controls.axis] += 1

        // let s = new THREE.Matrix4().makeScale(.5, .5, .5)
        // let t = new THREE.Matrix4().makeTranslation(-.2, .3, .1)
        // let rx = new THREE.Matrix4().makeRotationX(theta[0] * Math.PI / 180)
        // let ry = new THREE.Matrix4().makeRotationY(theta[1] * Math.PI / 180)
        // let rz = new THREE.Matrix4().makeRotationZ(theta[2] * Math.PI / 180)

        // let ryz = new THREE.Matrix4().multiplyMatrices(ry, rz)
        // let rxyz = new THREE.Matrix4().multiplyMatrices(rx, ryz)
        // let rs = new THREE.Matrix4().multiplyMatrices(rxyz, s)
        // let trs = new THREE.Matrix4().multiplyMatrices(rxyz, t)

        WebGLHelper.clear(gl, [1, 1, 1, 1])

        let e = getEulerTransformation(controls)

        let s = new THREE.Matrix4().makeScale(1.5, .2, 1.5)

        let t = new THREE.Matrix4().makeTranslation(.3, 0, .3)

        gl.uniformMatrix4fv(transformByLoc, false, getTRSTransformation(controls).elements)

        gl.drawArrays(gl.TRIANGLES, 0, cube.v_out.length / 3)

        let newE = getEulerTransformation(controls)

        let newS = new THREE.Matrix4().makeScale(.1, .5, .8)

        gl.uniformMatrix4fv(transformByLoc, false, new THREE.Matrix4().multiplyMatrices(newS, newE).elements)

        gl.drawArrays(gl.TRIANGLES, 0, cube.v_out.length / 3)

        

        //requestAnimationFrame(animate)
    
    }

    animate()

    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    gui.add(controls, 't_x').min(-1).max(1).onChange(animate)
    gui.add(controls, 't_y').min(-1).max(1).onChange(animate)
    gui.add(controls, 't_z').min(-1).max(1).onChange(animate)

    gui.add(controls, 'r_x').min(0).max(360).onChange(animate)
    gui.add(controls, 'r_y').min(0).max(360).onChange(animate)
    gui.add(controls, 'r_z').min(0).max(360).onChange(animate)

    gui.add(controls, 's_x').min(0.1).max(2).onChange(animate)
    gui.add(controls, 's_y').min(0.1).max(2).onChange(animate)
    gui.add(controls, 's_z').min(0.1).max(2).onChange(animate)

}


export function displayMultipleCubes() {

    const vs_script = `#version 300 es

        in vec3 coordinates;
        in vec3 color;
        out vec4 vColor;
        uniform mat4 transformBy;

        void main(void) {

            gl_Position = transformBy * vec4(coordinates, 1.0);
            vColor = vec4(color, 1.0);

        }`

    const fs_script = `#version 300 es

        precision mediump float;
        in vec4 vColor;
        out vec4 fragColor;      
    
        void main(void){
    
            fragColor = vColor;
    
        }`

    
    let canvas = document.querySelector("#webgl-scene"),
        gl = WebGLHelper.initWebGL(canvas),
        program = WebGLHelper.initShaders(gl, vs_script, fs_script)
    
    gl.useProgram(program)

    let cube = new Cube()

    let buffers = WebGLHelper.initBuffers(gl, program, [{
    
        name: 'coordinates',
        size: 3,
        data: cube.v_out
    
    }, {

        name: 'color',
        size: 3,
        data: cube.c_out

    }])

    let transformByLoc = gl.getUniformLocation(program, 'transformBy')

    let controls = {

        axis: 2,
        theta: 30,

    }

    function instantiateCube(i, thetaIncrement, scaleBy, translateTo) {

        theta[controls.axis] += thetaIncrement

        let rx = new THREE.Matrix4().makeRotationX(theta[0] * Math.PI / 180)
        let ry = new THREE.Matrix4().makeRotationY(theta[1] * Math.PI / 180)
        let rz = new THREE.Matrix4().makeRotationZ(theta[2] * Math.PI / 180)

        let ryz = new THREE.Matrix4().multiplyMatrices(ry, rz)
        let r = new THREE.Matrix4().multiplyMatrices(rx, ryz)

        let s = new THREE.Matrix4().makeScale(...scaleBy)
        let t = new THREE.Matrix4().makeTranslation(...translateTo)

        //TRS Transformation
        let m = new THREE.Matrix4().multiplyMatrices(t, new THREE.Matrix4().multiplyMatrices(r, s))

        gl.uniformMatrix4fv(transformByLoc, false, m.elements)

        gl.drawArrays(gl.TRIANGLES, 0, cube.v_out.length / 3)


    }

    let theta = [0, 0, 0]

    WebGLHelper.clear(gl, [1, 1, 1, 1])

    function animate() {

        //theta[controls.axis] += .8

        instantiateCube(0, .4, [1.2, 1.2, 1.2], [0, 0, 0])
        instantiateCube(1, .4, [.3, .3, .3], [-.7, -.7, .4])
        instantiateCube(2, .4, [.3, .6, .3], [.6, .6, .4])
        instantiateCube(3, .4, [.2, .2, .2], [-.6, .7, -.4])
        instantiateCube(4, .4, [.2, .6, .1], [.6, -.6, .5])

        requestAnimationFrame(animate)
    
    }

    animate()

    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    gui.add(controls, 'axis', {x: 0, y: 1, z: 2})

}


export function displaySphere() {

    const vs_script = `#version 300 es

        in vec3 coordinates;
        in vec3 color;
        out vec4 vColor;
        uniform mat4 transformBy;

        void main(void) {

            gl_Position = transformBy * vec4(coordinates, 1.0);
            gl_PointSize = 3.0;
            vColor = vec4(color, 1.0);

        }`

    const fs_script = `#version 300 es

        precision mediump float;
        in vec4 vColor;
        out vec4 fragColor;      
    
        void main(void){
    
            fragColor = vColor;
    
        }`

    
    let canvas = document.querySelector("#webgl-scene"),
        gl = WebGLHelper.initWebGL(canvas),
        program = WebGLHelper.initShaders(gl, vs_script, fs_script)
    
    gl.useProgram(program)

    let sphere = new Sphere(.9, 200)

    let buffers = WebGLHelper.initBuffers(gl, program, [{
    
        name: 'coordinates',
        size: 3,
        data: sphere.vertices
    
    }])

    let transformByLoc = gl.getUniformLocation(program, 'transformBy')

    let controls = {

        axis: 2,
        theta: 30,

    }

    let theta = [30, 0, 30]

    function animate() {

        theta[controls.axis] += .8

        let rx = new THREE.Matrix4().makeRotationX(theta[0] * Math.PI / 180)
        let ry = new THREE.Matrix4().makeRotationY(theta[1] * Math.PI / 180)
        let rz = new THREE.Matrix4().makeRotationZ(theta[2] * Math.PI / 180)

        let ryz = new THREE.Matrix4().multiplyMatrices(ry, rz)
        let rxyz = new THREE.Matrix4().multiplyMatrices(rx, ryz)

        WebGLHelper.clear(gl, [1, 1, 1, 1])

        gl.uniformMatrix4fv(transformByLoc, false, rxyz.elements)

        WebGLHelper.loadAttributeF(gl, program, 'color', 1, 0, 0)

        gl.drawArrays(gl.POINTS, 0, sphere.vertices.length / 3)

        requestAnimationFrame(animate)
    
    }

    animate()

    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    gui.add(controls, 'axis', {x: 0, y: 1, z: 2})

}