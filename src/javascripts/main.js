// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

// First: Set up your name
let std_name = "Jesse Taylor"
document.querySelector('#std_name').innerHTML = `<strong>${std_name}</strong>`

//Then: comes everything else
// TODO


import vs_script from "../shaders/vertex-color.glsl";
import fs_script from "../shaders/fragment-color.glsl";
import { WebGLHelper } from './webgl_helper';
import { scribble, sierpinski, displayMultiProgram } from './week05'
import { displayCube, displayCubeIndexed, displayPyramid } from './week06'
import { displayMultipleCubes, displaySphere, displayNewCube} from './week07'

//displayCube();

//displaySphere();

//displayMultipleCubes();

//displayPyramid();

//displayCubeIndexed();

//sierpinski();

//displayColoredTriangles(vs_script, fs_script);


// export function displayColoredTriangles(vs_script, fs_script){

//     let canvas = document.querySelector("#webgl-scene");
//     let gl = WebGLHelper.initWebGL(canvas);
//     let program = WebGLHelper.initShaders(gl, vs_script, fs_script);

//     gl.useProgram(program);

//     WebGLHelper.initBuffers(gl, program, [{

//         name: 'coordinates',
//         size: 3,
//         data: [0, 0, 0, .5, .5, 0, .5, -.5, 0,
//                .5, -.5, 0, -.5, -.5, 0, 0, 0, 0,
//                -.5, -.5, 0, -.5, .5, 0, 0, 0, 0,
//                -.5, .5, 0, .5, .5, 0, 0, 0, 0]

//     }, {

//         name: 'color',
//         size: 3,
//         data: [1,0,0, 0,1,0, 0,0,1, 
//                0,1,0, 0,1,0, 0,1,0,
//                1,0,0, 1,0,0, 1,0,0,
//                0,0,1, 0,0,1, 0,0,1]

//     }]);

//     WebGLHelper.clear(gl, [1.0, 1.0, 1.0, 1.0]);

//     gl.drawArrays(gl.TRIANGLES, 0, 12);  

// }

// import * as d3 from 'd3'


// let article = d3.select("article")


// let icon1 = article.append('svg')
//       .attr('width', 100)
//       .attr('height', 100)
//       .style('background', 'darkorange')

// icon1.append("circle")
//       .attr('cx', 20)
//       .attr('cy', 30)
//       .attr('r', 10)
//       .style('fill', 'blue')
//       .append('animate')
//       .attr('attributeName', 'r')
//       .attr('from', 10)
//       .attr('to', 20)
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('repeatCount', 'indefinite')
// icon1.append('circle')
//       .attr('cx', 80)
//       .attr('cy', 30)
//       .attr('r', 10)
//       .style('fill', 'blue')
//       .append('animate')
//       .attr('attributeName', 'r')
//       .attr('from', 10)
//       .attr('to', 20)
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('repeatCount', 'indefinite')

// icon1.append('rect')
//       .attr('x', 40)
//       .attr('y', 80)
//       .attr('width', 20)
//       .attr('height', 10)
//       .style('fill', 'blue')
//       .append('animate')
//       .attr('attributeName', 'height')
//       .attr('from', 10)
//       .attr('to', 25)
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('repeatCount', 'indefinite')


// article.append('svg')
//       .attr('width', 100)
//       .attr('height', 100)
//       .style('background', 'white')


// let icon2 = article.append('svg')
//       .attr('width', 100)
//       .attr('height', 100)
//       .style('background', 'blue')

// icon2.append('rect')
//       .attr('x', 0)
//       .attr('y', 0)
//       .attr('width', 110)
//       .attr('height', 10)
//       .style('fill', 'hotpink')
//       .attr('transform', 'rotate(15)')
//       .append('animate')
//       .attr('attributeName', 'width')
//       .attr('from', 110)
//       .attr('to', 0)
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('repeatCount', 'indefinite')

// icon2.append('rect')
//       .attr('x', -20)
//       .attr('y', 50)
//       .attr('width', 110)
//       .attr('height', 10)
//       .style('fill', 'hotpink')
//       .attr('transform', 'rotate(345)')
//       .append('animate')
//       .attr('attributeName', 'width')
//       .attr('from', 110)
//       .attr('to', 0)
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('repeatCount', 'indefinite')

// icon2.append('rect')
//       .attr('x', 16)
//       .attr('y', 60)
//       .attr('width', 110)
//       .attr('height', 10)
//       .style('fill', 'hotpink')
//       .attr('transform', 'rotate(15)')
//       .append('animate')
//       .attr('attributeName', 'width')
//       .attr('from', 110)
//       .attr('to', 0)
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('repeatCount', 'indefinite')

// icon2.append('rect')
//       .attr('x', 45)
//       .attr('y', 0)
//       .attr('width', 10)
//       .attr('height', 110)
//       .style('fill', 'yellow')
//       .append('animate')
//       .attr('attributeName', 'height')
//       .attr('from', 110)
//       .attr('to', 0)
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('repeatCount', 'indefinite')

// icon2.append('circle')
//       .attr('cx', 50)
//       .attr('cy', 50)
//       .attr('r', 0)
//       .style('fill', 'yellow')
//       .transition()
//       .duration(3000)
//       .ease(d3.easeBounceInOut)
//       .delay(1500)
//       .attr("r", 20)


// article.append('svg')
//       .attr('width', 100)
//       .attr('height', 100)
//       .style('background', 'white')


// let icon3 = article.append('svg')
//       .attr('width', 100)
//       .attr('height', 100)
//       .style('background', 'green')

// icon3.append('line')
//       .attr('x1', 50)
//       .attr('y1', 20)
//       .attr('x2', 20)
//       .attr('y2', 70)
//       .style('stroke-width', '4')
//       .style('stroke', 'yellow')
//       .append('animate')
//       .attr('attributeName', 'stroke')
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('values', 'white; yellow; white')
//       .attr('repeatCount', 'indefinite')

// icon3.append('line')
//       .attr('x1', 50)
//       .attr('y1', 20)
//       .attr('x2', 80)
//       .attr('y2', 70)
//       .style('stroke-width', '4')
//       .style('stroke', 'yellow')
//       .append('animate')
//       .attr('attributeName', 'stroke')
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('values', 'white; yellow; white')
//       .attr('repeatCount', 'indefinite')

// icon3.append('line')
//       .attr('x1', 20)
//       .attr('y1', 70)
//       .attr('x2', 80)
//       .attr('y2', 70)
//       .style('stroke-width', '4')
//       .style('stroke', 'yellow')
//       .append('animate')
//       .attr('attributeName', 'stroke')
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('values', 'white; yellow; white')
//       .attr('repeatCount', 'indefinite')

// icon3.append('line')
//       .attr('x1', 35)
//       .attr('y1', 45)
//       .attr('x2', 65)
//       .attr('y2', 45)
//       .style('stroke-width', '4')
//       .style('stroke', 'yellow')
//       .append('animate')
//       .attr('attributeName', 'stroke')
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('values', 'white; yellow; white')
//       .attr('repeatCount', 'indefinite')

// icon3.append('line')
//       .attr('x1', 35)
//       .attr('y1', 45)
//       .attr('x2', 50)
//       .attr('y2', 70)
//       .style('stroke-width', '4')
//       .style('stroke', 'yellow')
//       .append('animate')
//       .attr('attributeName', 'stroke')
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('values', 'white; yellow; white')
//       .attr('repeatCount', 'indefinite')

// icon3.append('line')
//       .attr('x1', 65)
//       .attr('y1', 45)
//       .attr('x2', 50)
//       .attr('y2', 70)
//       .style('stroke-width', '4')
//       .style('stroke', 'yellow')
//       .append('animate')
//       .attr('attributeName', 'stroke')
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('values', 'white; yellow; white')
//       .attr('repeatCount', 'indefinite')

// icon3.append('line')
//       .attr('x1', 20)
//       .attr('y1', 70)
//       .attr('x2', 0)
//       .attr('y2', 85)
//       .style('stroke-width', '4')
//       .style('stroke', 'yellow')
//       .append('animate')
//       .attr('attributeName', 'stroke')
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('values', 'white; yellow; white')
//       .attr('repeatCount', 'indefinite')

// icon3.append('line')
//       .attr('x1', 80)
//       .attr('y1', 70)
//       .attr('x2', 100)
//       .attr('y2', 85)
//       .style('stroke-width', '4')
//       .style('stroke', 'yellow')
//       .append('animate')
//       .attr('attributeName', 'stroke')
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('values', 'white; yellow; white')
//       .attr('repeatCount', 'indefinite')

// icon3.append('line')
//       .attr('x1', 50)
//       .attr('y1', 0)
//       .attr('x2', 50)
//       .attr('y2', 20)
//       .style('stroke-width', '4')
//       .style('stroke', 'yellow')
//       .append('animate')
//       .attr('attributeName', 'stroke')
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('values', 'white; yellow; white')
//       .attr('repeatCount', 'indefinite')


// article.append('svg')
//       .attr('width', 100)
//       .attr('height', 100)
//       .style('background', 'white')


// let icon4 = article.append('svg')
//       .attr('width', 100)
//       .attr('height', 100)
//       .style('background', 'hotpink')

// icon4.append('rect')
//       .attr('x', 0)
//       .attr('y', 0)
//       .attr('width', 33.33)
//       .attr('height', 33.33)
//       .style('fill', 'limegreen')
//       .append('animate')
//       .attr('attributeName', 'height')
//       .attr('from', 0)
//       .attr('to', 33.33)
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('repeatCount', 'indefinite')

// icon4.append('rect')
//       .attr('x', 66.667)
//       .attr('y', 0)
//       .attr('width', 33.33)
//       .attr('height', 33.33)
//       .style('fill', 'limegreen')
//       .append('animate')
//       .attr('attributeName', 'width')
//       .attr('from', 33.33)
//       .attr('to', 0)
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('repeatCount', 'indefinite')

// icon4.append('rect')
//       .attr('x', 33.33)
//       .attr('y', 33.33)
//       .attr('width', 33.33)
//       .attr('height', 33.33)
//       .style('fill', 'limegreen')
//       .append('animateTransform')
//       .attr('attributeName', 'transform')
//       .attr('from', '0, 49.995, 49.995')
//       .attr('to', '360, 49.995, 49.995')
//       .attr('type', 'rotate')
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('repeatCount', 'indefinite')


// icon4.append('rect')
//       .attr('x', 0)
//       .attr('y', 66.667)
//       .attr('width', 33.33)
//       .attr('height', 33.33)
//       .style('fill', 'limegreen')
//       .append('animate')
//       .attr('attributeName', 'width')
//       .attr('from', 33.33)
//       .attr('to', 0)
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('repeatCount', 'indefinite')

// icon4.append('rect')
//       .attr('x', 66.667)
//       .attr('y', 66.667)
//       .attr('width', 33.33)
//       .attr('height', 33.33)
//       .style('fill', 'limegreen')
//       .append('animate')
//       .attr('attributeName', 'height')
//       .attr('from', 0)
//       .attr('to', 33.33)
//       .attr('begin', '0s')
//       .attr('dur', '4s')
//       .attr('repeatCount', 'indefinite')


// article.append('svg')
//       .attr('width', 100)
//       .attr('height', 100)
//       .style('background', 'white')


// let icon5 = article.append('svg')
//       .attr('width', 100)
//       .attr('height', 100)
//       .style('background', 'white')

// icon5.append('rect')
//       .attr('x', 0)
//       .attr('y', 0)
//       .attr('width', 100)
//       .attr('height', 100)
//       .style('fill', 'green')
//       .style('stroke', 'blue')
//       .style('stroke-width', 7)

// icon5.append('ellipse')
//       .attr('cx', 50)
//       .attr('cy', 50)
//       .attr('rx', 30)
//       .attr('ry', 40)
//       .style('fill', 'red')
//       .append('animateTransform')
//       .attr('attributeName', 'transform')
//       .attr('from', '0, 50, 50')
//       .attr('to', '360, 50, 50')
//       .attr('type', 'rotate')
//       .attr('begin', '0s')
//       .attr('dur', '7s')
//       .attr('repeatCount', 'indefinite')

// icon5.append('ellipse')
//       .attr('cx', 50)
//       .attr('cy', 50)
//       .attr('rx', 10)
//       .attr('ry', 38)
//       .style('fill', 'black')
//       .style('stroke', 'yellow')
//       .style('stroke-width', 5)
//       .append('animate')
//       .attr('attributeName', 'fill')
//       .attr('begin', '0s')
//       .attr('dur', '7s')
//       .attr('values', 'white; black; white')
//       .attr('repeatCount', 'indefinite')


      