import React, {Component} from 'react';
import './index.scss';
import axios from 'axios'
import {Spin, Alert, Input, message} from 'antd'
import 'font-awesome/less/font-awesome.less';
import 'react-fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {} from '@fortawesome/free-regular-svg-icons'
import {faFighterJet, faTrophy, faUsers} from '@fortawesome/free-solid-svg-icons'

class Battle extends Component {

    state = {
        player1: '',
        player2: '',
        isPlayerOneShowed: false,
        isPlayerTwoShowed: false,
        isPlayerOneLoading: false,
        isPlayerTwoLoading: false,
        playerOneResult: {},
        playerTwoResult: {},
        isButtonOneDisabled: true,
        isButtonTwoDisabled: true,
        playerOneNotFound: false,
        playerTwoNotFound: false
    }

    componentDidMount() {

    }

    handlePlayerChange = (player, e) => {
        if (player == 'player1') {
            if (e.target.value) {
                this.setState({isButtonOneDisabled: false})
            } else {
                this.setState({isButtonOneDisabled: true})
            }
            this.refs.input1.value = e.target.value
            this.setState({[player]: e.target.value})
        } else if (player == 'player2') {
            if (e.target.value) {
                this.setState({isButtonTwoDisabled: false})
            } else {
                this.setState({isButtonTwoDisabled: true})
            }
            this.refs.input2.value = e.target.value
            this.setState({[player]: e.target.value})
        }
    }

    doSearch = (player) => {
        let {player1, player2, isPlayerOneLoading, isPlayerTwoLoading} = this.state
        if (player == 'player1' && player1 && !isPlayerOneLoading) {
            this.setState({isPlayerOneLoading: true}, () => {
                axios.get(`https://api.github.com/users/${player1}`).then(res => {
                    console.log(res)
                    this.setState({
                        playerOneResult: res.data,
                        isPlayerOneLoading: false,
                        isPlayerOneShowed: true,
                        playerOneNotFound: false
                    })
                }).catch(err => {
                    console.log('艾热',err)
                    this.setState({
                        isPlayerOneLoading: false,
                        player1: '',
                        isButtonOneDisabled: true,
                        playerOneNotFound: true,
                        errMsg:err.message
                    })
                })
            })
        } else if (player == 'player2' && player2 && !isPlayerTwoLoading) {
            this.setState({isPlayerTwoLoading: true}, () => {
                axios.get(`https://api.github.com/users/${player2}`).then(res => {
                    console.log(res)
                    this.setState({
                        playerTwoResult: res.data,
                        isPlayerTwoLoading: false,
                        isPlayerTwoShowed: true,
                        playerTwoNotFound: false
                    })
                }).catch(err => {
                    console.log(err)
                    this.setState({
                        isPlayerTwoLoading: false,
                        player2: '',
                        isButtonTwoDisabled: true,
                        playerTwoNotFound: true
                    })
                })
            })
        } else {
            console.log('空 ')
            message.error('空')
        }
    }

    doClear = (player) => {
        this.setState({[player]: ''})
        if (player == 'player1') {
            this.setState({isPlayerOneShowed: false, playerOneResult: {}, isButtonOneDisabled: true})
        } else if (player == 'player2') {
            this.setState({isPlayerTwoShowed: false, playerTwoResult: {}, isButtonTwoDisabled: true})
        }
    }

    doBattle = (player1, player2, followers1, followers2) => {
        let storage = window.localStorage
        storage.player1 = player1
        storage.player2 = player2
        storage.followers1 = followers1
        storage.followers2 = followers2
        this.props.history.push({
            pathname: `/result`,
            state: {
                player1, player2, followers1, followers2
            },
            search: `?player1=${player1}&player2=${player2}`
        })
    }


    render() {
        let {
            player1, player2,
            isPlayerOneLoading,
            isPlayerOneShowed,
            isPlayerTwoLoading,
            isPlayerTwoShowed,
            playerOneResult,
            playerTwoResult,
            isButtonOneDisabled,
            isButtonTwoDisabled,
            playerOneNotFound,
            playerTwoNotFound,
            errMsg
        } = this.state
        console.log('res', playerOneResult)
        return (
            <div className="battle">
                <div className={'battle-title'}>
                    Instructions
                </div>
                <div className={'battle-items'}>
                    <div className={'battle-item'}>
                        <div className={'battle-item-title'}>Enter two Github</div>
                        <div className={'battle-item-icon'}>
                            <FontAwesomeIcon icon={faUsers} className={'users-icon'}/>
                        </div>
                    </div>
                    <div className={'battle-item'}>
                        <div className={'battle-item-title'}>Battle</div>
                        <div className={'battle-item-icon'}>
                            <FontAwesomeIcon icon={faFighterJet} className={'jet-icon'}/>
                        </div>
                    </div>
                    <div className={'battle-item'}>
                        <div className={'battle-item-title'}>See The Winner</div>
                        <div className={'battle-item-icon'}>
                            <FontAwesomeIcon icon={faTrophy} className={'trophy-icon'}/>
                        </div>
                    </div>
                </div>
                <div className={'battle-input'}>
                    <div className={'battle-input-player'}>
                        <div className={'battle-input-player-title'}>
                            Player One
                        </div>
                        <form>
                            {
                                !isPlayerOneShowed && !isPlayerOneLoading &&
                                <div className={'battle-input-player-area'}>
                                    <input className={`input-item ${playerOneNotFound && 'not-found-input'}`}
                                           placeholder={'github username'}
                                           type={"text"} ref={'input1'}
                                           value={player1} onChange={this.handlePlayerChange.bind(this, 'player1')}
                                           onSubmit={this.doSearch.bind(this, 'player1')}/>
                                    <button onClick={this.doSearch.bind(this, 'player1')}
                                            disabled={isButtonOneDisabled}
                                            className={`submit ${isButtonOneDisabled ? 'disabled' : ''}`}>
                                        Submit
                                    </button>
                                </div>
                            }
                            {
                                (playerOneNotFound && !isPlayerOneLoading) &&
                                <div className={'not-found'}>{errMsg}</div>
                            }
                            {
                                isPlayerOneLoading &&
                                <div className={'loading'}>
                                    loading......
                                </div>
                            }
                            {
                                isPlayerOneShowed &&
                                <div className={'battle-input-result'}>
                                    <img className={'battle-input-result-image'} src={playerOneResult.avatar_url}/>
                                    <div className={'battle-input-result-name'}>
                                        {playerOneResult.login}
                                    </div>
                                    <div
                                        className={'battle-input-result-clear'}
                                        onClick={this.doClear.bind(this, 'player1')}>
                                        X
                                    </div>
                                </div>
                            }
                        </form>
                    </div>
                    <div className={'battle-input-player'}>
                        <div className={'battle-input-player-title'}>
                            Player Two
                        </div>
                        <form>
                            {
                                !isPlayerTwoShowed && !isPlayerTwoLoading &&
                                <div className={'battle-input-player-area'}>
                                    <input className={`input-item ${playerTwoNotFound && 'not-found-input'}`}
                                           placeholder={'github username'}
                                           type={"text"} ref={'input2'}
                                           value={player2} onChange={this.handlePlayerChange.bind(this, 'player2')}
                                           onSubmit={this.doSearch.bind(this, 'player2')}/>
                                    <button onClick={this.doSearch.bind(this, 'player2')}
                                            disabled={isButtonTwoDisabled}
                                            className={`submit ${isButtonTwoDisabled ? 'disabled' : ''}`}>
                                        Submit
                                    </button>
                                </div>
                            }
                            {
                                (playerTwoNotFound && !isPlayerTwoLoading) &&
                                <div className={'not-found'}>{errMsg}</div>
                            }
                            {
                                isPlayerTwoLoading &&
                                <div className={'loading'}>
                                    loading......
                                </div>
                            }
                            {
                                isPlayerTwoShowed &&
                                <div className={'battle-input-result'}>
                                    <img className={'battle-input-result-image'} src={playerTwoResult.avatar_url}/>
                                    <div className={'battle-input-result-name'}>
                                        {playerTwoResult.login}
                                    </div>
                                    <div className={'battle-input-result-clear'}
                                         onClick={this.doClear.bind(this, 'player2')}>
                                        X
                                    </div>
                                </div>
                            }
                        </form>
                    </div>
                </div>
                <div className={'battle-begin'}>
                    {
                        isPlayerOneShowed && isPlayerTwoShowed &&
                        <button
                            onClick={
                                this.doBattle.bind(this, player1, player2, playerOneResult.followers, playerTwoResult.followers)
                            }>
                            BATTLE
                        </button>
                    }
                </div>
            </div>
        )

    }
}

export default Battle;
