import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor({solver}) {
        super()
        this.solver = solver
    }

    render() {
        const items = this.solver.items.map(item => {
            return (
                <tr>
                    <td>{item.odds}</td>
                    <td>{item.distribution}</td>
                    <td><button>delete</button></td>
                </tr>
            )
        })

        return (
            <table>
                <thead>
                    <tr>
                        <th>O</th>
                        <th>Distribution</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        )
    }
}

export default class {
    constructor(solver) {
        this.solver = solver
    }

    render(containerElement) {
        ReactDOM.render(<App solver={this.solver} />, containerElement)
    }
}