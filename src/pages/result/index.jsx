import React, {Component} from 'react';
import './index.scss';
import axios from 'axios'
import {Spin, Alert, Input} from 'antd'
import 'font-awesome/less/font-awesome.less';
import 'react-fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faWindowClose} from '@fortawesome/free-regular-svg-icons'
import {faFighterJet, faTrophy, faUsers} from '@fortawesome/free-solid-svg-icons'

class Result extends Component {

    state = {
        player1: undefined,
        player2: undefined,
        winner: {},
        loser: {},
        isWrongPlayer: false,
        isEqual: false
    }

    componentDidMount() {
        console.log('哎', this.props.location.search.split('?')[1].split('&'))
        let params = this.props.location.search.split('?')[1].split('&')
        if (params.length < 2) {
            this.setState({isWrongPlayer: true})
        } else {
            this.setState({isWrongPlayer: false})
        }
        let players = {}
        params.forEach(param => {
            console.log('普拉姆', param)
            players[param.split('=')[0]] = param.split('=')[1]
        })
        console.log('普雷厄斯', players)
        let {player1, player2} = players
        if (player1 && player2) {
            axios.get(`https://api.github.com/users/${player1}`).then(res => {
                console.log(res)
                this.setState({
                    player1: res.data
                })
            })
            axios.get(`https://api.github.com/users/${player2}`).then(res => {
                console.log(res)
                this.setState({
                    player2: res.data
                })
            })
        } else {
            this.props.history.push({
                pathname: '/battle'
            })
        }
    }

    doReset = () => {
        this.setState({player1: {}, player2: {}, winner: {}, loser: {}}, () => {
            window.localStorage.removeItem('player1')
            window.localStorage.removeItem('player2')
            window.localStorage.removeItem('followers1')
            window.localStorage.removeItem('followers2')
            this.props.history.push('/battle')
        })
    }

    render() {
        let {winner, loser, isWrongPlayer, player1, player2, isEqual} = this.state
        if (player1 && player2) {
            if (player1.followers > player2.followers) {
                winner = player1
                loser = player2
                if(isEqual){
                    this.setState({isEqual: false})
                }
            } else if (player1.followers == player2.followers){
                winner = player1
                loser = player2
                if(!isEqual){
                    this.setState({isEqual: true})
                }
                console.log('评')
            }else {
                winner = player2
                loser = player1
                if(isEqual){
                    this.setState({isEqual: false})
                }
            }
        }
        console.log('winner', winner)
        console.log('loser', loser)
        console.log('荣恩普蕾尔', isWrongPlayer)
        return (
            <div>
                {
                    isWrongPlayer ?
                        <div className={'wrong-page'}>
                            <div>
                                <FontAwesomeIcon className={'wrong-page-icon'} icon={faWindowClose}/>
                            </div>
                            <div className={'wrong-page-content'}>
                                参数错误，请<a onClick={this.doReset.bind(this)}>返回重试</a>
                            </div>
                        </div> :
                        <div className="result">
                            <div className={'result-players'}>
                                <div className={'result-player'}>
                                    <div className={'result-player-title'}>
                                        {isEqual ? 'Equal' : 'Winner'}
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
                                        followers:{winner.followers}
                                    </div>
                                </div>
                                <div className={'result-player'}>
                                    <div className={'result-player-title'}>
                                        {isEqual ? 'Equal' : 'Loser'}
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
                                        followers:{loser.followers}
                                    </div>
                                </div>
                            </div>
                            <div className={'reset'} onClick={this.doReset}>
                                Reset
                            </div>
                        </div>
                }
            </div>
        )

    }
}

export default Result;
