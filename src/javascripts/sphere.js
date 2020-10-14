export class Sphere {

    constructor(r = .9, numPoints = 36) {

        this.vertices = []

        for(let i = 0; i < numPoints; i++) {

            let theta = i * 2 * Math.PI / numPoints

            for(let j = 0; j <= numPoints; j++) {

                let phi = j * 2 * Math.PI / numPoints

                this.vertices.push(

                    r * Math.cos(phi) * Math.sin(theta),
                    r * Math.cos(theta),
                    r * Math.sin(phi) * Math.sin(theta)

                )

            }

        }

    }

}