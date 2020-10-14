export class Cube {

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