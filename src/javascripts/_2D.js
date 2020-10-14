import { WebGLHelper } from './webgl_helper';


export class _2D {

    constructor () {   

        this.color = []

    } 

    static setColor(r, g, b) {

        this.color = []
        this.color.push(r, g, b)

    }

    static pointAt(x, y, pointSize) {

        const vs_script = `#version 300 es
        in vec3 coordinates;
        in vec3 color;
        in float pointSize;
        out vec4 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            gl_PointSize = pointSize;
            vColor = vec4(color, 1.0);
        }`

        const fs_script = `#version 300 es
        precision mediump float;
        out vec4 fragColor;
        in vec4 vColor;      
    
        void main(void){
    
            fragColor = vColor;
    
        }`

        let canvas = document.querySelector("#webgl-scene")
        let gl = WebGLHelper.initWebGL(canvas)
        let program = WebGLHelper.initShaders(gl, vs_script, fs_script)
    
        gl.useProgram(program)

        let vertices = []
        let pointSizes = []

        vertices.push(x, y)
        pointSizes.push(pointSize)

        let buffers = WebGLHelper.initBuffers(gl, program, [{

            name: 'coordinates',
            size: 2,
            data: vertices

        }, {

            name: 'color',
            size: 3,
            data: this.color

        }, {

            name: 'pointSize',
            size: 1,
            data: pointSizes

        }])
        
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers['coordinates'])
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

        gl.bindBuffer(gl.ARRAY_BUFFER, buffers['color'])
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW)

        gl.bindBuffer(gl.ARRAY_BUFFER, buffers['pointSize'])
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointSizes), gl.STATIC_DRAW)

        gl.drawArrays(gl.POINTS, 0, 2)

    }

    static lineBetween(x1, y1, x2, y2) {

        const vs_script = `#version 300 es
        in vec3 coordinates;
        in vec3 color;
        out vec4 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            vColor = vec4(color, 1.0);
        }`

        const fs_script = `#version 300 es
        precision mediump float;
        out vec4 fragColor;
        in vec4 vColor;      
    
        void main(void){
    
            fragColor = vColor;
    
        }`

        let canvas = document.querySelector("#webgl-scene")
        let gl = WebGLHelper.initWebGL(canvas)
        let program = WebGLHelper.initShaders(gl, vs_script, fs_script)
    
        gl.useProgram(program)

        let vertices = []

        vertices.push(x1, y1, 0, x2, y2, 0)

        for(let i = 0; i < 3; i++) {

            this.color.push(this.color[i])

        }

        let buffers = WebGLHelper.initBuffers(gl, program, [{

            name: 'coordinates',
            size: 3,
            data: vertices

        }, {

            name: 'color',
            size: 3,
            data: this.color

        }])
        
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers['coordinates'])
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

        gl.bindBuffer(gl.ARRAY_BUFFER, buffers['color'])
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color), gl.STATIC_DRAW)

        gl.drawArrays(gl.LINES, 0, vertices.length / 3)

    }

    static ellipseAt(x, y, width, height) {

        let canvas = document.querySelector("#webgl-scene")
        let gl = WebGLHelper.initWebGL(canvas)

        const vs_script = `#version 300 es
        in vec3 coordinates;
        in vec3 color;
        out vec4 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            vColor = vec4(color, 1.0);
        }`

        const fs_script = `#version 300 es
        precision mediump float;
        out vec4 fragColor;
        in vec4 vColor;      
    
        void main(void){
    
            fragColor = vColor;
    
        }`

        let program = WebGLHelper.initShaders(gl, vs_script, fs_script)
    
        gl.useProgram(program)

        let vertices = [x, y]

        let n = 200

        for(let i = 0; i < n; i++) {

            let loopX = x + width * Math.cos((2*Math.PI * i)/n)
            let loopY = y + height * Math.sin((2*Math.PI * i)/n)
            vertices.push(loopX, loopY)
    
        }

        let buffers = WebGLHelper.initBuffers(gl, program, [{

            name: 'coordinates',
            size: 2,
            data: vertices

        }, {

            name: 'color',
            size: 3,
            data: this.color

        }])

        gl.bindBuffer(gl.ARRAY_BUFFER, buffers['coordinates'])
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

        gl.bindBuffer(gl.ARRAY_BUFFER, buffers['color'])
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color), gl.STATIC_DRAW)

        gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length/2)


    }

    static polygon(x1, y1, x2, y2, x3, y3) {

        let canvas = document.querySelector("#webgl-scene")
        let gl = WebGLHelper.initWebGL(canvas)

        const vs_script = `#version 300 es
        in vec3 coordinates;
        in vec3 color;
        out vec4 vColor;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
            vColor = vec4(color, 1.0);
        }`

        const fs_script = `#version 300 es
        precision mediump float;
        out vec4 fragColor;
        in vec4 vColor;      
    
        void main(void){
    
            fragColor = vColor;
    
        }`

        let program = WebGLHelper.initShaders(gl, vs_script, fs_script)
    
        gl.useProgram(program)

        let vertices = []

        for(let i = 0; i < arguments.length; i++) {

            vertices.push(arguments[i])

        }

        for(let i = 0; i < vertices.length; i += 2) {

            for(let j = 0; j < 3; j++) {

                this.color.push(this.color[j])
    
            }

        }


        let buffers = WebGLHelper.initBuffers(gl, program, [{

            name: 'coordinates',
            size: 2,
            data: vertices

        }, {

            name: 'color',
            size: 3,
            data: this.color

        }])

        gl.bindBuffer(gl.ARRAY_BUFFER, buffers['coordinates'])
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

        gl.bindBuffer(gl.ARRAY_BUFFER, buffers['color'])
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color), gl.STATIC_DRAW)

        gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length/2)

    }

}