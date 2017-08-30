import fmin from 'fmin'
import Table from './react.js'

class Solver {
    constructor() {
        this.items = []
    }

    optimize() {
        let x = []
        x.length = this.items.length
        x.fill(1)

        const probrem = x => {
            let x_sum = sum(x)
            let margin = []

            for (const i in this.items) {
                margin[i] = this.items[i].odds * x[i] - x_sum
            }

            let margin_average = sum(margin) / margin.length
            let margin_variance = 0

            for (const i in margin) {
                margin_variance += Math.pow(margin[i] - margin_average, 2)
            }

            margin_variance /= margin.length

            return margin_variance
        }

        let res = fmin.nelderMead(probrem, x)
        let sum_res = sum(res.x)
        let distribution = res.x.map(x => {
            return x / sum_res
        })

        for (const i in this.items) {
            this.items[i].distribution = distribution[i]
        }
    }

}

const sum = x => {
    let sum = 0
    for (let i = 0; i < x.length; i++) {
        sum += x[i]
    }
    return sum
}

const solver = new Solver()
const table = new Table(solver)

solver.items = [
    { odds: 3 },
    { odds: 4 },
    { odds: 5 },
    { odds: 6 },
    { odds: 7 }
]
solver.optimize()

table.render(document.querySelector('#app'))