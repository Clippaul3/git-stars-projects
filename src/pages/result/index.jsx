import React, {Component} from 'react';
import './index.scss';
import axios from 'axios'
import {Spin, Alert, Input} from 'antd'
import 'font-awesome/less/font-awesome.less';
import 'react-fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {} from '@fortawesome/free-regular-svg-icons'
import {faFighterJet, faTrophy, faUsers} from '@fortawesome/free-solid-svg-icons'

class Result extends Component {

    state = {
        player1: '',
        player2: '',
        winner: {},
        loser: {}
    }

    componentDidMount() {
        console.log('哎', this)
        if (this.props.history.location.state) {
            let {player1, player2, followers1, followers2} = this.props.history.location.state
            if (followers1 >= followers2) {
                axios.get(`https://api.github.com/users/${player1}`).then(res => {
                    console.log(res)
                    this.setState({
                        winner: res.data
                    })
                })
                axios.get(`https://api.github.com/users/${player2}`).then(res => {
                    console.log(res)
                    this.setState({
                        loser: res.data
                    })
                })
            } else {
                axios.get(`https://api.github.com/users/${player1}`).then(res => {
                    console.log(res)
                    this.setState({
                        loser: res.data
                    })
                })
                axios.get(`https://api.github.com/users/${player2}`).then(res => {
                    console.log(res)
                    this.setState({
                        winner: res.data
                    })
                })
            }
        } else {
            this.props.history.push({
                pathname: '/battle'
            })
        }
    }

    doReset = () => {
        this.setState({player1: '', player2: '', winner: {}, loser: {}}, () => {
            this.props.history.push('/battle')
        })
    }

    render() {
        let {winner, loser} = this.state
        console.log('winner', winner)
        console.log('loser', loser)
        return (
            <div className="result">
                <div className={'result-players'}>
                    <div className={'result-player'}>
                        <div className={'result-player-title'}>
                            Winner
                        </div>
                        <div className={'result-player-avatar'}>
                            {
                                winner &&
                                <img src={winner.avatar_url}/>
                            }
                        </div>
                        <div className={'result-player-name'}>
                            {
                                winner && winner.login
                            }
                        </div>
                        <div className={'result-player-score'}>
                            score:1
                        </div>
                    </div>
                    <div className={'result-player'}>
                        <div className={'result-player-title'}>
                            Loser
                        </div>
                        <div className={'result-player-avatar'}>
                            {
                                loser &&
                                <img src={loser.avatar_url}/>
                            }
                        </div>
                        <div className={'result-player-name'}>
                            {
                                loser && loser.login
                            }
                        </div>
                        <div className={'result-player-score'}>
                            score:0
                        </div>
                    </div>
                </div>
                <div className={'reset'} onClick={this.doReset}>
                    Reset
                </div>
            </div>
        )

    }
}

export default Result;
