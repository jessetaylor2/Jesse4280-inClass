import { WebGLHelper } from './webgl_helper';
import * as dat from 'dat.gui';
import * as THREE from 'three';
import { color } from 'd3';

class Pyramid {

    constructor() {

        this.vertices = [

            -.5, -.5,  .5, //Front bottom left 0
             .5, -.5,  .5, //Front bottom right 1
             .5,  .5,  .5, //Back bottom right 2
            -.5,  .5,  .5, //Back bottom left 3
             .5, -.5, -.5, //Top 4
            
        ]

        this.indices = []

        //Use cube pic with these indexes on slide drawn in class. (9/28/2020 class. The one with the stick figures drawn around it.)
        this.face(0, 1, 4) //Front
        this.face(1, 2, 4) //Right side
        this.face(2, 3, 4) //Back
        this.face(3, 0, 4) //Left
        this.face(3, 2, 1, 0) //Bottom Right

        this.v_out = []

        for(let i of this.indices) {

            this.v_out.push(this.vertices[3 * i],
                            this.vertices[3 * i + 1],
                            this.vertices[3 * i + 2])

        }

        this.colors = [

            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
            [1, 1, 0],
            [1, 0, 1],
            [0, 1, 1]

        ]

        this.c_out = []

        for(let c of this.colors) {

            for(let i = 0; i < 6; i++) {

                this.c_out.push(c[0], c[1], c[2])

            }

        }

    }

    face(a, b, c, d) {

        this.indices.push(a, b, c)
        this.indices.push(a, c, d)

    }

}


export function displayPyramid() {

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

    let pyramid = new Pyramid()

    let buffers = WebGLHelper.initBuffers(gl, program, [{
    
        name: 'coordinates',
        size: 3,
        data: pyramid.v_out
    
    }, {

        name: 'color',
        size: 3,
        data: pyramid.c_out

    }])

    let transformByLoc = gl.getUniformLocation(program, 'transformBy')

    let controls = {

        axis: 2,
        theta: 30,

    }

    let theta = [0, 0, 0]

    function animate() {

        theta[controls.axis] += 1

        let s = new THREE.Matrix4().makeScale(.5, .5, .5)
        let rx = new THREE.Matrix4().makeRotationX(theta[0] * Math.PI / 180)
        let ry = new THREE.Matrix4().makeRotationY(theta[1] * Math.PI / 180)
        let rz = new THREE.Matrix4().makeRotationZ(theta[2] * Math.PI / 180)

        let ryz = new THREE.Matrix4().multiplyMatrices(ry, rz)
        let rxyz = new THREE.Matrix4().multiplyMatrices(rx, ryz)
        let rs = new THREE.Matrix4().multiplyMatrices(rxyz, s)

        WebGLHelper.clear(gl, [1, 1, 1, 1])

        gl.uniformMatrix4fv(transformByLoc, false, rs.elements)

        WebGLHelper.clear(gl, [1.0, 1.0, 1.0, 1.0])

        gl.drawArrays(gl.TRIANGLES, 0, pyramid.v_out.length / 3)

        requestAnimationFrame(animate)
    
    }

    animate()

    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    gui.add(controls, 'axis', {x: 0, y: 1, z: 2})

}

class CubeIndexed {

    constructor() {

        this.vertices = [

            -.5, -.5,  .5, //0
             .5, -.5,  .5, //1
             .5,  .5,  .5, //2
            -.5,  .5,  .5, //3
            -.5, -.5, -.5, //4
             .5, -.5, -.5, //5
             .5,  .5, -.5, //6
            -.5,  .5, -.5, //7
            
        ]

        this.indices = []

        //Use cube pic with these indexes on slide drawn in class. (9/28/2020 class. The one with the stick figures drawn around it.)
        this.face(0, 1, 2, 3) //Front
        this.face(5, 4, 7, 6) //Back
        this.face(3, 2, 6, 7) //Top
        this.face(1, 0, 4, 5) //Bottom
        this.face(4, 0, 3, 7) //Left
        this.face(1, 5, 6, 2) //Right

        this.colors = [

            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
            1, 1, 0,
            1, 0, 1,
            0, 1, 1,
            .5, .6, .4,
            .9, .7, .2

        ]

    }

    face(a, b, c, d) {

        this.indices.push(a, b, c)
        this.indices.push(a, c, d)

    }

}


export function displayCubeIndexed() {

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

    let cube = new CubeIndexed()

    let buffers = WebGLHelper.initBuffers(gl, program, [{
    
        name: 'coordinates',
        size: 3,
        data: cube.vertices,
        indices: cube.indices
    
    }, {

        name: 'color',
        size: 3,
        data: cube.colors

    }])

    let transformByLoc = gl.getUniformLocation(program, 'transformBy')

    let controls = {

        axis: 2,
        theta: 30,

    }

    let theta = [0, 0, 0]

    function animate() {

        theta[controls.axis] += 1

        let s = new THREE.Matrix4().makeScale(.1, .9, .9)
        let t = new THREE.Matrix4().makeTranslation(-.2, .3, .1)
        let rx = new THREE.Matrix4().makeRotationX(theta[0] * Math.PI / 180)
        let ry = new THREE.Matrix4().makeRotationY(theta[1] * Math.PI / 180)
        let rz = new THREE.Matrix4().makeRotationZ(theta[2] * Math.PI / 180)

        let ryz = new THREE.Matrix4().multiplyMatrices(ry, rz)
        let rxyz = new THREE.Matrix4().multiplyMatrices(rx, ryz)
        let rs = new THREE.Matrix4().multiplyMatrices(rxyz, s)
        let trs = new THREE.Matrix4().multiplyMatrices(t, rs)

        WebGLHelper.clear(gl, [1, 1, 1, 1])

        gl.uniformMatrix4fv(transformByLoc, false, trs.elements)

        WebGLHelper.clear(gl, [1.0, 1.0, 1.0, 1.0])

        gl.drawElements(gl.TRIANGLES, cube.indices.length, gl.UNSIGNED_SHORT, 0)

        requestAnimationFrame(animate)
    
    }

    animate()

    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    gui.add(controls, 'axis', {x: 0, y: 1, z: 2})

}

class Cube {

    constructor() {

        this.vertices = [

            -.5, -.5,  .5, //0
             .5, -.5,  .5, //1
             .5,  .5,  .5, //2
            -.5,  .5,  .5, //3
            -.5, -.5, -.5, //4
             .5, -.5, -.5, //5
             .5,  .5, -.5, //6
            -.5,  .5, -.5, //7
            
        ]

        this.indices = []

        //Use cube pic with these indexes on slide drawn in class. (9/28/2020 class. The one with the stick figures drawn around it.)
        this.face(0, 1, 2, 3) //Front
        this.face(5, 4, 7, 6) //Back
        this.face(3, 2, 6, 7) //Top
        this.face(1, 0, 4, 5) //Bottom
        this.face(4, 0, 3, 7) //Left
        this.face(1, 5, 6, 2) //Right

        this.v_out = []

        for(let i of this.indices) {

            this.v_out.push(this.vertices[3 * i],
                            this.vertices[3 * i + 1],
                            this.vertices[3 * i + 2])

        }

        this.colors = [

            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
            [1, 1, 0],
            [1, 0, 1],
            [0, 1, 1]

        ]

        this.c_out = []

        for(let c of this.colors) {

            for(let i = 0; i < 6; i++) {

                this.c_out.push(c[0], c[1], c[2])

            }

        }

    }

    face(a, b, c, d) {

        this.indices.push(a, b, c)
        this.indices.push(a, c, d)

    }

}


export function displayCube() {

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

    let theta = [0, 0, 0]

    function animate() {

        theta[controls.axis] += 1

        let s = new THREE.Matrix4().makeScale(.5, .5, .5)
        let t = new THREE.Matrix4().makeTranslation(-.2, .3, .1)
        let rx = new THREE.Matrix4().makeRotationX(theta[0] * Math.PI / 180)
        let ry = new THREE.Matrix4().makeRotationY(theta[1] * Math.PI / 180)
        let rz = new THREE.Matrix4().makeRotationZ(theta[2] * Math.PI / 180)

        let ryz = new THREE.Matrix4().multiplyMatrices(ry, rz)
        let rxyz = new THREE.Matrix4().multiplyMatrices(rx, ryz)
        let rs = new THREE.Matrix4().multiplyMatrices(rxyz, s)
        let trs = new THREE.Matrix4().multiplyMatrices(rxyz, t)

        WebGLHelper.clear(gl, [1, 1, 1, 1])

        gl.uniformMatrix4fv(transformByLoc, false, trs.elements)

        WebGLHelper.clear(gl, [1.0, 1.0, 1.0, 1.0])

        gl.drawArrays(gl.TRIANGLES, 0, cube.v_out.length / 3)

        requestAnimationFrame(animate)
    
    }

    animate()

    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    gui.add(controls, 'axis', {x: 0, y: 1, z: 2})

}